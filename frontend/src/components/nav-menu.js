import { PawPrint } from "lucide-react";

import { Button } from "./ui/button";
import { ThemeToggle } from "./theme-toggle";
import { HamburgerMenu } from "./hamburger-menu.js";
import { TextSizeToggle } from "./text-size-toggle.js";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth-provider.js";
import { PersonIcon } from "@radix-ui/react-icons";

/**
 * A navigation menu so that people can navigate the site
 * @returns {React.JSX.Element}
 */
export function NavMenu() {
  const { accessToken, logout } = useAuth();

  const navigate = useNavigate();

  // An array holding the links for the nav bar
  const links = [
    { label: "About", href: "/#about" },
    { label: "Zoo Tickets", href: "/booking/zoo" },
    { label: "Hotel Stays", href: "/booking/hotel" },
    { label: "Articles", href: "/articles" },
    { label: "Quizzes", href: "/quizzes" },
  ];

  return (
    <div className="min-w-full bg-background">
      <nav className="p-4 rounded-lg flex items-center justify-between backdrop-blur-lg absolute top-4 right-4 left-4 z-10">
        <div
          id="site-logo"
          className="hidden md:flex flex-col transition-all cursor-pointer hover:scale-105"
          onClick={() => navigate("/")}
        >
          <span className="flex gap-x-1">
            <PawPrint /> RZA
          </span>
          <span>Riget Zoo Adventures</span>
        </div>
        <div className="md:hidden flex items-center">
          <HamburgerMenu links={links} />
        </div>
        <div
          className="md:hidden flex items-center gap-x-2 font-bold text-2xl cursor-pointer"
          onClick={() => navigate("/")}
        >
          <PawPrint /> RZA
        </div>
        <div id="site-links" className="hidden md:flex items-center gap-x-4">
          {links.map((link, i) => (
            <a
              key={i}
              href={link.href}
              className="text-xl font-bold transition-all hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </div>
        <div id="misc-links" className="flex items-center gap-x-2">
          {accessToken ? (
            <div className="flex items-center gap-x-2">
              <Button size="icon" onClick={() => navigate("/dashboard")}>
                <PersonIcon />
              </Button>
              <Button variant="destructive" onClick={() => logout()}>
                Log out
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-x-2">
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

          <ThemeToggle />
          <TextSizeToggle />
        </div>
      </nav>
    </div>
  );
}
