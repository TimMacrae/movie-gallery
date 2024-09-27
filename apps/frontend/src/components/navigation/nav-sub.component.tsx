import Link from "next/link";
import { Menu, Popcorn } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { APIROUTES } from "@/api/api-routes.config";

export const NavSub: React.FC = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5 text-white" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="bg-withe">
        <nav className="grid gap-6 text-lg font-medium text-white">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold"
          >
            <Popcorn className="h-6 w-6" />
            <span className="sr-only">Movie gallery</span>
          </Link>
          <Link
            href={APIROUTES.URL.MOVIES}
            className="text-muted-foreground hover:text-foreground text-white"
          >
            MOVIES
          </Link>
          <Link
            href={APIROUTES.URL.GALLERY}
            className="text-muted-foreground hover:text-foreground text-white"
          >
            GALLERY
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
};
