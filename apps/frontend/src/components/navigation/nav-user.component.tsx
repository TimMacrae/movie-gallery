import { useSignoutUserMutation } from "@/components/auth/query/use-signout-user.mutation";
import Link from "next/link";
import { CircleUser } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { APIROUTES } from "@/api/api-routes.config";
import { useUser } from "@/hooks/useUser.query";

export const NavUser: React.FC = () => {
  const { data } = useUser();
  const { mutate } = useSignoutUserMutation();

  const handleSignOut = () => {
    mutate();
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          size="icon"
          className="rounded-full bg-black text-white"
        >
          <CircleUser className="h-5 w-5" />
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {!data && (
          <>
            <DropdownMenuItem>
              <Link
                href={APIROUTES.URL.SIGNIN}
                className="text-muted-foreground hover:text-foreground"
              >
                Signin
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                href={APIROUTES.URL.SIGNUP}
                className="text-muted-foreground hover:text-foreground"
              >
                Signup
              </Link>
            </DropdownMenuItem>
          </>
        )}
        {data && (
          <DropdownMenuItem>
            <Link
              onClick={() => handleSignOut()}
              href="#"
              className="text-muted-foreground hover:text-foreground"
            >
              Signout
            </Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
