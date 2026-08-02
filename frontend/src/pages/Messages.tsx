import { AppLayout } from "../components/layout/AppLayout";
import { ComingSoon } from "../components/ui/ComingSoon";

export default function Messages() {
  return (
    <AppLayout title="Messages">
      <ComingSoon
        title="Messages is being built"
        description="Direct messages with friends and club members."
      />
    </AppLayout>
  );
}
