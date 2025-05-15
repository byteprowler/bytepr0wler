import Link from "next/link";
import Image from "next/image";
import SocialIcons from "./SocialIcons";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();
  const isHome = router.pathname === "/";

  return (
    <header className="absolute w-full flex sm:block items-center px-6 xl:px-0 xl:h-[90px]">
      <div className="container mx-auto">
        <div className="flex lg:flex-row items-center justify-between sm:gap-0 gap-y-2 py-2 sm:gap-y-0 sm:py-0">
          <Link href="/">
            <Image
              src="/logo.png"
              width={180}
              height={100}
              alt="Logo Of ByteProwler"
            />
          </Link>

          {/* Only show socials if NOT on homepage */}
          {!isHome && <SocialIcons />}
        </div>
      </div>
    </header>
  );
}

// import Link from "next/link";
// import Image from "next/image";
// import SocialIcons from "./SocialIcons";
// import { useRouter } from "next/router";

// export default function Header() {
//   const router = useRouter();
//   const isHome = router.pathname === "/";

//   return (
//     <header className="absolute w-full flex sm:block items-center px-6 xl:px-0 xl:h-[90px]">
//       <div className="container mx-auto">
//         <div className="flex flex-col lg:flex-row items-center xl:justify-between sm:gap-0 gap-y-2 py-2 sm:gap-y-0 sm:py-0">
//           <Link href="/">
//             <Image
//               src="/logo.png"
//               width={180}
//               height={100}
//               alt="Logo Of ByteProwler"
//             />
//           </Link>

//           {/* Only show socials if NOT on homepage */}
//           {!isHome && <SocialIcons />}
//         </div>
//       </div>
//     </header>
//   );
// }

