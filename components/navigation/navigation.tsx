import Link from "next/link";
import Logo from "../logo/page";
import { ModeToggle } from "../modeToggle/mode-toggle";
import { Button } from "../ui/button";
import { LogIn } from "lucide-react";

export default function Navigation() {
  return (
    <nav className="flex justify-between items-center">
      <Logo />
      <ul className="flex gap-5 items-center">
        <li>
          <Link href="/" prefetch>
            Home
          </Link>
        </li>
        <li>
          <Link href="/about" prefetch>
            About
          </Link>
        </li>
      </ul>
      <div className="flex items-center justify-end gap-5">
        <Button variant={"default"}>
          <LogIn className="mr-2 h-4 w-4" />
          <Link href={"/sign-in"}>Login</Link>
        </Button>
        <Button variant={"ghost"}>
          <Link href={"/sign-in"}>Register</Link>
        </Button>
        <ModeToggle />
      </div>
    </nav>
  );
}
