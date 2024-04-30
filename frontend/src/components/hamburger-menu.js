import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

/**
 * A simple hamburger menu for when the screen size is too small
 * @param {{links: {href: string, label: string}[]}} props The links to be displayed in the menu
 * @returns
 */
export function HamburgerMenu({ links }) {
  const navigateTo = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <HamburgerMenuIcon height={24} width={24} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {links.map((link, i) => (
          <DropdownMenuItem key={i} onClick={() => navigateTo(link.href)}>
            {link.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
