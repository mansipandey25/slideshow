import {
  Activity,
  BarChart3,
  Dumbbell,
  Home,
  Users,
} from "lucide-react";
import { Link, useLocation } from "wouter";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
    testId: "nav-dashboard",
  },
  {
    title: "Live Workout",
    url: "/workout",
    icon: Activity,
    testId: "nav-workout",
  },
  {
    title: "Members",
    url: "/members",
    icon: Users,
    testId: "nav-members",
  },
  {
    title: "Exercises",
    url: "/exercises",
    icon: Dumbbell,
    testId: "nav-exercises",
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: BarChart3,
    testId: "nav-analytics",
  },
];

export function AppSidebar() {
  const [location] = useLocation();

  return (
    <Sidebar>
      <SidebarHeader className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary">
            <Activity className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-display text-xl font-bold text-sidebar-foreground">
              ANGLE X
            </h1>
            <p className="text-xs text-muted-foreground">AI Fitness Tracker</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = location === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link href={item.url} data-testid={item.testId}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
