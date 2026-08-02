import { AppLayout } from "../components/layout/AppLayout";
import { ComingSoon } from "../components/ui/ComingSoon";

export default function Profile() {
  return (
    <AppLayout title="Profile">
      <ComingSoon
        title="Profile is being built"
        description="Your public identity, showcase, and favorites."
      />
    </AppLayout>
  );
}
