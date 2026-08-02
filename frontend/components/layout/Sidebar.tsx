import { NavLink } from "react-router-dom";
import { Settings, LogOut } from "lucide-react";
import { Logo } from "../ui/Logo";
import { NAV_ITEMS } from "./navConfig";
import { useAuth } from "../../lib/auth";

export function Sidebar() {
  const { user, logout } = useAuth();

  return (
    <aside className="hidden lg:flex fixed inset-y-0 left-0 w-64 flex-col border-r border-edge bg-surface/80 backdrop-blur-xl px-4 py-6 z-30">
      <div className="px-2 mb-8">
        <Logo />
      </div>

      <nav className="flex-1 flex flex-col gap-1 overflow-y-auto">
        {NAV_ITEMS.map(({ label, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-violet-500/15 text-violet-300 border border-violet-500/30"
                  : "text-muted hover:text-paper hover:bg-surface-2 border border-transparent"
              }`
            }
          >
            <Icon size={18} strokeWidth={2} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-4 pt-4 border-t border-edge flex flex-col gap-1">
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
              isActive ? "bg-violet-500/15 text-violet-300" : "text-muted hover:text-paper hover:bg-surface-2"
            }`
          }
        >
          <div className="h-6 w-6 rounded-full bg-pulse-gradient flex items-center justify-center text-[10px] font-bold text-void">
            {user?.username?.[0]?.toUpperCase() ?? "?"}
          </div>
          {user?.username ?? "Profile"}
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
              isActive ? "bg-violet-500/15 text-violet-300" : "text-muted hover:text-paper hover:bg-surface-2"
            }`
          }
        >
          <Settings size={18} />
          Settings
        </NavLink>
        <button
          onClick={logout}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted hover:text-red-300 hover:bg-surface-2 transition-colors"
        >
          <LogOut size={18} />
          Log out
        </button>
      </div>
    </aside>
  );
}
