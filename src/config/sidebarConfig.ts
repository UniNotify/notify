import { Calendar, Settings, Plus, Info, LayoutDashboard } from "lucide-react";

export type SidebarItem = {
  title: string;
  url: string;
  icon: React.ElementType;
};

export type SidebarGroup = {
  label: string;
  items: SidebarItem[];
};

export type SidebarStructure = (SidebarGroup | "separator")[];

export const sidebarStructure: SidebarStructure = [
  {
    label: "Main",
    items: [
      { title: "Dashboard", url: "/", icon: LayoutDashboard },
      { title: "Calendar", url: "/calendar", icon: Calendar },
    ],
  },
  "separator",
  {
    label: "Features",
    items: [{ title: "Add-on", url: "/add-on", icon: Plus }],
  },
  "separator",
  {
    label: "System",
    items: [
      { title: "About", url: "/about", icon: Info },
      { title: "Settings", url: "/settings", icon: Settings },
    ],
  },
];
