import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { BottomNav } from "./BottomNav";
import { TopBar } from "./TopBar";

export function AppLayout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <div className="lg:pl-64">
        <TopBar title={title} />
        <main className="px-4 lg:px-8 py-6 pb-24 lg:pb-10">{children}</main>
      </div>
      <BottomNav />
    </div>
  );
}
