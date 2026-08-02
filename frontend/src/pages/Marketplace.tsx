import { AppLayout } from "../components/layout/AppLayout";
import { ComingSoon } from "../components/ui/ComingSoon";

export default function Marketplace() {
  return (
    <AppLayout title="Marketplace">
      <ComingSoon
        title="Marketplace is being built"
        description="Affiliate merch, figures, and accessories for fans."
      />
    </AppLayout>
  );
}
