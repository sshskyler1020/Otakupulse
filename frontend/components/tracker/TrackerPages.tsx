import { useEffect, useState, useCallback } from "react";
import { Heart, Search, Star } from "lucide-react";
import { api } from "../../lib/api";
import { useAuth } from "../../lib/auth";
import { GlassCard } from "../ui/GlassCard";
import { StatusSelect } from "../ui/StatusSelect";

export interface TrackerConfig {
  resource: "anime" | "manga" | "games";
  fkField: string; // 'anime_id' | 'manga_id' | 'game_id'
  progressField: string; // 'episode_progress' | 'chapter_progress' | 'completion_percentage'
  progressUnit: string; // 'Episodes' | 'Chapters' | '% complete'
  statusOptions: { value: string; label: string }[];
}

interface CatalogItem {
  id: string;
  title: string;
  cover_url: string | null;
  [key: string]: unknown;
}

interface TrackingItem {
  id: string;
  status: string;
  rating: number | null;
  is_favorite: number;
  title: string;
  cover_url: string | null;
  [key: string]: unknown;
}

export function TrackerPage({ title, config }: { title: string; config: TrackerConfig }) {
  const { token } = useAuth();
  const [tab, setTab] = useState<"browse" | "mine">("mine");
  const [search, setSearch] = useState("");
  const [catalog, setCatalog] = useState<CatalogItem[]>([]);
  const [mine, setMine] = useState<TrackingItem[]>([]);
  const [loading, setLoading] = useState(true);

  const loadMine = useCallback(async () => {
    const res = await api.get<{ results: TrackingItem[] }>(`/api/user/${config.resource}`, token);
    setMine(res.results);
  }, [config.resource, token]);

  const loadCatalog = useCallback(async () => {
    const qs = search ? `?search=${encodeURIComponent(search)}` : "";
    const res = await api.get<{ results: CatalogItem[] }>(`/api/${config.resource}${qs}`, token);
    setCatalog(res.results);
  }, [config.resource, search, token]);

  useEffect(() => {
    setLoading(true);
    Promise.all([loadMine(), loadCatalog()]).finally(() => setLoading(false));
  }, [loadMine, loadCatalog]);

  async function setStatus(itemId: string, status: string) {
    await api.post(`/api/user/${config.resource}/${itemId}`, { status }, token);
    loadMine();
  }

  async function toggleFavorite(item: TrackingItem) {
    const itemId = item[config.fkField] as string;
    await api.post(`/api/user/${config.resource}/${itemId}`, { isFavorite: !item.is_favorite }, token);
    loadMine();
  }

  const mineIds = new Set(mine.map((m) => m[config.fkField] as string));

  return (
    <div>
      <div className="flex items-center gap-2 mb-5">
        <button
          onClick={() => setTab("mine")}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
            tab === "mine" ? "bg-violet-500/15 text-violet-300 border border-violet-500/30" : "text-muted border border-transparent hover:bg-surface-2"
          }`}
        >
          My {title}
        </button>
        <button
          onClick={() => setTab("browse")}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
            tab === "browse" ? "bg-violet-500/15 text-violet-300 border border-violet-500/30" : "text-muted border border-transparent hover:bg-surface-2"
          }`}
        >
          Browse Catalog
        </button>

        {tab === "browse" && (
          <div className="flex items-center gap-2 ml-auto rounded-xl border border-edge bg-surface-2 px-3 py-2 w-64">
            <Search size={15} className="text-muted" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`Search ${title.toLowerCase()}...`}
              className="bg-transparent text-sm outline-none placeholder:text-muted w-full"
            />
          </div>
        )}
      </div>

      {loading ? (
        <p className="text-muted text-sm">Loading...</p>
      ) : tab === "mine" ? (
        mine.length === 0 ? (
          <GlassCard className="text-center py-12">
            <p className="text-muted mb-1">Nothing tracked yet.</p>
            <p className="text-sm text-muted">Switch to Browse Catalog to add your first title.</p>
          </GlassCard>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {mine.map((item) => (
              <GlassCard key={item.id} padding="sm">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-display font-semibold text-sm leading-snug line-clamp-2">{item.title}</h3>
                  <button onClick={() => toggleFavorite(item)} aria-label="Toggle favorite">
                    <Heart
                      size={16}
                      className={item.is_favorite ? "fill-violet-400 text-violet-400" : "text-muted"}
                    />
                  </button>
                </div>
                <p className="text-xs text-muted font-mono mb-3">
                  {(item[config.progressField] as number) ?? 0} {config.progressUnit}
                  {item.rating ? ` · ${item.rating}/10` : ""}
                </p>
                <StatusSelect
                  value={item.status}
                  options={config.statusOptions}
                  onChange={(status) => setStatus(item[config.fkField] as string, status)}
                />
              </GlassCard>
            ))}
          </div>
        )
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {catalog.map((item) => (
            <GlassCard key={item.id} padding="sm">
              <h3 className="font-display font-semibold text-sm leading-snug line-clamp-2 mb-2">{item.title}</h3>
              <p className="text-xs text-muted mb-3 line-clamp-2">
                {(item.genre as string) || (item.platform as string) || (item.studio as string) || ""}
              </p>
              {mineIds.has(item.id) ? (
                <span className="inline-flex items-center gap-1 text-xs text-cyan-300 font-medium">
                  <Star size={12} className="fill-cyan-300" /> Tracking
                </span>
              ) : (
                <button
                  onClick={() => setStatus(item.id, config.statusOptions[0].value)}
                  className="text-xs font-medium text-violet-400 hover:text-violet-300"
                >
                  + Add to list
                </button>
              )}
            </GlassCard>
          ))}
          {catalog.length === 0 && <p className="text-muted text-sm col-span-full">No results.</p>}
        </div>
      )}
    </div>
  );
}
