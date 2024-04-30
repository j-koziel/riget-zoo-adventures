import { PawPrint } from "lucide-react";

/**
 * Renders the footer section of the site
 * @returns {React.JSX.Element}
 */
export function Footer() {
  // An array holding all the footer links
  const links = [
    { label: "Home", href: "/" },
    { label: "About", href: "/#about" },
    { label: "Zoo Tickets", href: "/booking/zoo-tickets" },
    { label: "Hotel Stays", href: "/booking/hotel-stays" },
    { label: "Sign In", href: "/auth" },
    { label: "Register", href: "/auth" },
    { label: "Membership", href: "/membership" },
    { label: "T&Cs", href: "/tncs" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Quizzes", href: "/quizzes" },
    { label: "Educational Tour", href: "/interactive-tour" },
    { label: "Articles", href: "/articles" },
  ];

  return (
    <footer className="min-w-full min-h-[400px] bg-primary text-primary-foreground flex flex-col md:flex-row justify-evenly items-center">
      <div className="flex items-center gap-x-4">
        <PawPrint height={128} width={128} />
        <span className="text-5xl font-bold">Riget Zoo Adventures</span>
      </div>
      <div className="w-[300px] h-1 md:h-[300px] md:w-1 bg-background"></div>
      <div className="flex flex-col gap-4 flex-wrap h-[200px]">
        {links.map((link, i) => (
          <a
            key={i}
            href={link.href}
            className="underline font-bold transition-all hover:text-secondary-foreground"
          >
            {link.label}
          </a>
        ))}
      </div>
    </footer>
  );
}
