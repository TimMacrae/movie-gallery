import { APIROUTES } from "@/src/api/api-routes.config";
import { useUser } from "@/src/hooks/useUser.query";
import { Popcorn } from "lucide-react";
import Link from "next/link";

export const NavMain: React.FC = () => {
  const { data } = useUser();

  return (
    <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
      <Link
        href={APIROUTES.URL.HOME}
        className="flex items-center gap-2 text-lg font-semibold md:text-base"
      >
        <Popcorn className="h-6 w-6" />
        <span className="sr-only">Movie gallery</span>
      </Link>
      <Link
        href={APIROUTES.URL.MOVIES}
        className="text-muted-foreground transition-colors hover:text-foreground"
      >
        Movies
      </Link>

      {data && (
        <Link
          href={APIROUTES.URL.GALLERY}
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Gallery
        </Link>
      )}
    </nav>
  );
};
