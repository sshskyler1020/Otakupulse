import { AppLayout } from "../components/layout/AppLayout";
import { ComingSoon } from "../components/ui/ComingSoon";

export default function Manga() {
  return (
    <AppLayout title="Manga">
      <ComingSoon
        title="Manga is being built"
        description="Track chapters, build collections, log your reading history."
      />
    </AppLayout>
  );
}
