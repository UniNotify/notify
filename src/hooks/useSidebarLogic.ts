import { useState, useCallback, useLayoutEffect } from "react";
import { useSidebar } from "@/components/ui/sidebar";

export function useSidebarLogic() {
  const { isMobile, toggleSidebar } = useSidebar();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleResize = useCallback(() => {
    try {
      setIsCollapsed(window.innerWidth < 1024);
    } catch (error) {
      console.error("Error in handleResize:", error);
    }
  }, []);

  useLayoutEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  return { isMobile, toggleSidebar, isCollapsed };
}
