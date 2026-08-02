import { AppLayout } from "../components/layout/AppLayout";
import { ComingSoon } from "../components/ui/ComingSoon";

export default function Friends() {
  return (
    <AppLayout title="Friends">
      <ComingSoon
        title="Friends is being built"
        description="Add friends, follow fellow fans, and compare stats."
      />
    </AppLayout>
  );
}
