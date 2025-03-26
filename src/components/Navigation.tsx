"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ollifiaPoettry } from "@/utils/font";

const NAV_LINKS = ["Home", "BizScribes", "Upcoming"];

const Navigation: React.FC = () => {
  const pathName = usePathname();
  const pathNameLength = pathName.split("/").length;

  const isActive = (href: string) => pathName === href;

  const setStyleForActiveLink = (link: string) => {
    const href = setHref(link);
    return `${
      isActive(href) ? "font-semibold" : ""
    } mr-4 lg:pb-3 text-md lg:text-lg`;
  };

  const setHref = (link: string) =>
    link === "Home" ? "/" : `/${link.toLowerCase()}`;

  return (
    <header className=" fixed top-0 w-full z-10 bg-[#ff99f3] text-[#1d071b] pb-2">
      <section className="flex flex-col items-center lg:flex-row lg:justify-between lg:items-center mt-7 pb-3 mx-auto max-w-6xl w-5/6">
        <h2
          className={`${ollifiaPoettry.className} text-3xl lg:text-4xl text-center lg:text-left`}
        >
          <Link href="/">NuttyVibes</Link>
        </h2>
        {/* {pathNameLength < 3 && (
          <nav className="flex justify-between mt-7 lg:mt-0">
            {NAV_LINKS.map((link, index) => (
              <Link
                href={setHref(link)}
                key={index}
                className={setStyleForActiveLink(link)}
              >
                {link}
              </Link>
            ))}
          </nav>
        )} */}
      </section>
    </header>
  );
};

export default Navigation;
