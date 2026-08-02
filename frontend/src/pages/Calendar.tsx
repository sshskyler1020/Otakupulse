import { AppLayout } from "../components/layout/AppLayout";
import { ComingSoon } from "../components/ui/ComingSoon";

export default function Calendar() {
  return (
    <AppLayout title="Calendar">
      <ComingSoon
        title="Calendar is being built"
        description="Anime episodes, manga chapters, game launches, and community events."
      />
    </AppLayout>
  );
}
