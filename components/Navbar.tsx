import { SignedIn, UserButton, SignedOut, SignInButton } from "@clerk/nextjs";
import React from "react";
import { ModeToggle } from "./ModeToggle";

const Navbar = () => {
  return (
    <nav className="container flex items-center justify-between py-4">
      <ModeToggle />

      <SignedIn>
        {/* Mount the UserButton component */}
        <UserButton />
      </SignedIn>
      <SignedOut>
        {/* Signed out users get sign in button */}
        <SignInButton />
      </SignedOut>
    </nav>
  );
};

export default Navbar;
