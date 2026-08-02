import { AppLayout } from "../components/layout/AppLayout";
import { ComingSoon } from "../components/ui/ComingSoon";

export default function Community() {
  return (
    <AppLayout title="Community">
      <ComingSoon
        title="Community is being built"
        description="Forums, clubs, fan art, and discussion."
      />
    </AppLayout>
  );
}
