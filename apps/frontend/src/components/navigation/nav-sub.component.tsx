import Link from "next/link";
import { Menu, Popcorn } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { APIROUTES } from "@/src/api/api-routes.config";

export const NavSub: React.FC = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <nav className="grid gap-6 text-lg font-medium">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold"
          >
            <Popcorn className="h-6 w-6" />
            <span className="sr-only">Movie gallery</span>
          </Link>
          <Link
            href={APIROUTES.URL.MOVIES}
            className="text-muted-foreground hover:text-foreground"
          >
            Movies
          </Link>
          <Link
            href={APIROUTES.URL.MY_GALLERY}
            className="text-muted-foreground hover:text-foreground"
          >
            My Gallery
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
};
