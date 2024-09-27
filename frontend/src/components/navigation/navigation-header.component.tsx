"use client";

import { NavMain } from "./nav-main.component";
import { NavSub } from "./nav-sub.component";
import { NavUser } from "./nav-user.component";

export const NavigationHeader: React.FC = () => {
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4  bg-black px-4 md:px-6 z-50 ">
      <NavMain />
      <NavSub />
      <div className="flex w-full items-center justify-end gap-4 md:ml-auto md:gap-2 lg:gap-4 ">
        <NavUser />
      </div>
    </header>
  );
};
