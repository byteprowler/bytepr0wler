import Link from "next/link";
import Image from "next/image";
import SocialIcons from "./SocialIcons";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();
  const isHome = router.pathname === "/";

  return (
    <header className="absolute w-full px-6 xl:px-0 xl:h-[90px]">
      {/* Desktop */}
      <div className="hidden md:flex container mx-auto items-center justify-between p-0">
        <Link href="/">
          <Image
            src="/logo.png"
            width={180}
            height={100}
            alt="Logo Of ByteProwler"
          />
        </Link>
        {!isHome && <SocialIcons />}
      </div>

      {/* Mobile */}
      <div className="flex md:hidden flex-col items-center w-full py-0 space-y-0">
        <Link href="/">
          <Image
            src="/logo.png"
            width={140}
            height={70}
            alt="Logo Of ByteProwler"
          />
        </Link>
        {!isHome && <SocialIcons />}
      </div>
    </header>
  );
}
