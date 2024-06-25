import Logo from "../logo/page";
import { ModeToggle } from "../modeToggle/mode-toggle";

export default function Navigation() {
  return (
    <nav className="flex justify-between">
      <Logo />
      <ModeToggle />
    </nav>
  );
}
