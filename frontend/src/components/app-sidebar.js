import { FileQuestion, Newspaper, Hotel, Ticket, Info } from "lucide-react";
import { PersonIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import { Button } from "./ui/button";
import { useAuth } from "../contexts/auth-provider.js";

// Menu items
const items = [
  { title: "About", url: "/#about", icon: Info },
  { title: "Zoo Tickets", url: "/booking/zoo", icon: Ticket },
  { title: "Hotel Stays", url: "/booking/hotel", icon: Hotel },
  { title: "Articles", url: "/articles", icon: Newspaper },
  { title: "Quizzes", url: "/quizzes", icon: FileQuestion },
];

export function AppSidebar() {
  const { accessToken, logout } = useAuth();

  const navigate = useNavigate();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              {accessToken ? (
                <div className="flex flex-col gap-y-2">
                  <Button size="icon" onClick={() => navigate("/dashboard")}>
                    <PersonIcon />
                  </Button>
                  <Button variant="destructive" onClick={() => logout()}>
                    Log out
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-y-2">
                  <Button
                    onClick={() => {
                      navigate("/auth");
                    }}
                  >
                    Sign In
                  </Button>
                  <Button
                    onClick={() => {
                      navigate("/auth");
                    }}
                  >
                    Register
                  </Button>
                </div>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
