import { AppLayout } from "../components/layout/AppLayout";
import { ComingSoon } from "../components/ui/ComingSoon";

export default function News() {
  return (
    <AppLayout title="News">
      <ComingSoon
        title="News is being built"
        description="Anime, manga, and gaming news, plus platform updates."
      />
    </AppLayout>
  );
}
