import { AppLayout } from "../components/layout/AppLayout";
import { ComingSoon } from "../components/ui/ComingSoon";

export default function Library() {
  return (
    <AppLayout title="Unified Library">
      <ComingSoon
        title="Unified Library is being built"
        description="Every anime, manga, and game you track, in one sortable view."
      />
    </AppLayout>
  );
}
