import { AppLayout } from "../components/layout/AppLayout";
import { ComingSoon } from "../components/ui/ComingSoon";

export default function Trophies() {
  return (
    <AppLayout title="Trophy Hub">
      <ComingSoon
        title="Trophy Hub is being built"
        description="PlayStation, Xbox, and Steam achievements, unified in one feed."
      />
    </AppLayout>
  );
}
