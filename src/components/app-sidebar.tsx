import React, { useMemo } from "react";
import { Moon, Sun, Laptop, Menu } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarFooter,
  SidebarGroup,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import { useSidebarLogic } from "@/hooks/useSidebarLogic";
import { sidebarStructure, type SidebarItem } from "@/config/sidebarConfig";

const ThemeToggle = React.memo(() => {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => {
        if (theme === "dark") setTheme("light");
        else if (theme === "light") setTheme("system");
        else setTheme("dark");
      }}
      className="w-full justify-start px-2"
    >
      {theme === "dark" ? (
        <Moon className="h-[1.2rem] w-[1.2rem]" />
      ) : theme === "light" ? (
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      ) : (
        <Laptop className="h-[1.2rem] w-[1.2rem]" />
      )}
      <span className="ml-2">
        {theme === "dark" ? "Dark" : theme === "light" ? "Light" : "System"}
      </span>
    </Button>
  );
});

const SidebarItem = React.memo(
  ({ item, isCollapsed }: { item: SidebarItem; isCollapsed: boolean }) => (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <Link to={item.url} className="flex items-center gap-2">
          <item.icon className="h-4 w-4" />
          {!isCollapsed && <span>{item.title}</span>}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
);
const SidebarGroupComponent = React.memo(
  ({
    group,
    isCollapsed,
  }: {
    group: { label: string; items: SidebarItem[] };
    isCollapsed: boolean;
  }) => (
    <SidebarGroup>
      {!isCollapsed && <SidebarGroupLabel>{group.label}</SidebarGroupLabel>}
      <SidebarGroupContent>
        <SidebarMenu>
          {group.items.map((item: SidebarItem) => (
            <SidebarItem
              key={item.title}
              item={item}
              isCollapsed={isCollapsed}
            />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
);

export function AppSidebar() {
  const { isMobile, toggleSidebar, isCollapsed } = useSidebarLogic();

  const memoizedSidebarStructure = useMemo(() => sidebarStructure, []);

  return (
    <>
      {isMobile && (
        <Button onClick={toggleSidebar} className="fixed top-4 left-4 z-50">
          <Menu className="h-4 w-4" />
        </Button>
      )}
      <Sidebar className="dark:bg-gray-800 dark:text-white">
        <SidebarContent>
          {memoizedSidebarStructure.map((group, index) =>
            group === "separator" ? (
              <SidebarSeparator key={`separator-${index}`} />
            ) : (
              <SidebarGroupComponent
                key={group.label}
                group={group}
                isCollapsed={isCollapsed}
              />
            )
          )}
        </SidebarContent>
        <SidebarFooter>
          <ThemeToggle />
        </SidebarFooter>
      </Sidebar>
    </>
  );
}
