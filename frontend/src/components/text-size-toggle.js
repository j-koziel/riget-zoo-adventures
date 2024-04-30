import { LetterCaseCapitalizeIcon } from "@radix-ui/react-icons";

import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useTextSize } from "../contexts/text-size-provider";

export function TextSizeToggle() {
  const { setTextSize } = useTextSize();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <LetterCaseCapitalizeIcon className="absolute h-[1.2rem] w-[1.2rem] transition-all" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTextSize("small")}>
          Small
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTextSize("normal")}>
          Normal
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTextSize("large")}>
          Large
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
