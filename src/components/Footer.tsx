import Image from "next/image";
import { ollifiaPoettry } from "@/utils/font";
import Link from "next/link";

const Footer = () => {
  const socialIcons = [
    {
      url: "https://x.com/nuttyvibes",
      title: "Twitter",
    },
    {
      url: "https://www.instagram.com/nutty__vibes",
      title: "Instagram",
    },
    {
      url: "#",
      title: "Telegram",
    },
  ];
  return (
    <footer className="bg-[#6d2867] text-white mt-4 lg:mt-16 py-8 lg:py-6">
      <div className="w-5/6 lg:w-11/12 max-w-7xl mx-auto flex flex-col justify-center items-center lg:flex-row lg:justify-between lg:items-center">
        <div>
          <span className="text-lg lg:text-2xl">&copy;</span>{" "}
          <span className="lg:text-2xl">
            Nutty Vibes {new Date().getFullYear()}
          </span>
        </div>
        <div className="flex mt-1 lg:mt-0">
          {socialIcons.map((socialIcon, index) => (
            <>
              <a key={index} href={socialIcon.url}>
                {socialIcon.title}
              </a>
              {index < socialIcons.length - 1 && (
                <span className="mx-2">•</span>
              )}
            </>
          ))}
        </div>
        <div className="mt-2 opacity-80">
          <Link href="/dmca">DMCA</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
