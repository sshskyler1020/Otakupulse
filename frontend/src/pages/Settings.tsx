import { AppLayout } from "../components/layout/AppLayout";
import { ComingSoon } from "../components/ui/ComingSoon";

export default function Settings() {
  return (
    <AppLayout title="Settings">
      <ComingSoon
        title="Settings is being built"
        description="Account, privacy, and notification preferences."
      />
    </AppLayout>
  );
}
