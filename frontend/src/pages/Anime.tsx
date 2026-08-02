import { AppLayout } from "../components/layout/AppLayout";
import { ComingSoon } from "../components/ui/ComingSoon";

export default function Anime() {
  return (
    <AppLayout title="Anime">
      <ComingSoon
        title="Anime is being built"
        description="Search, track, and review every series you watch."
      />
    </AppLayout>
  );
}
