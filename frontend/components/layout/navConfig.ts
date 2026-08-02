import {
  LayoutDashboard,
  Clapperboard,
  BookOpen,
  Gamepad2,
  Trophy,
  Library,
  CalendarDays,
  Newspaper,
  Users,
  Store,
  UserPlus,
  MessageCircle,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  label: string;
  path: string;
  icon: LucideIcon;
  // Shown in the compact mobile bottom nav (max 5 for thumb reach).
  primary?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard, primary: true },
  { label: "Anime", path: "/anime", icon: Clapperboard, primary: true },
  { label: "Manga", path: "/manga", icon: BookOpen, primary: true },
  { label: "Games", path: "/games", icon: Gamepad2, primary: true },
  { label: "Trophy Hub", path: "/trophies", icon: Trophy },
  { label: "Library", path: "/library", icon: Library },
  { label: "Calendar", path: "/calendar", icon: CalendarDays },
  { label: "News", path: "/news", icon: Newspaper },
  { label: "Community", path: "/community", icon: Users, primary: true },
  { label: "Marketplace", path: "/marketplace", icon: Store },
  { label: "Friends", path: "/friends", icon: UserPlus },
  { label: "Messages", path: "/messages", icon: MessageCircle },
];
