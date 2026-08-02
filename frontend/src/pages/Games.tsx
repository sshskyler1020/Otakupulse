import { AppLayout } from "../components/layout/AppLayout";
import { ComingSoon } from "../components/ui/ComingSoon";

export default function Games() {
  return (
    <AppLayout title="Games">
      <ComingSoon
        title="Games is being built"
        description="One unified library for every platform you play on."
      />
    </AppLayout>
  );
}
