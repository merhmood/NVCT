import Image from "next/image";
import { ollifiaPoettry } from "@/utils/font";

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
        <div className=" lg:text-2xl">
          <span className={ollifiaPoettry.className}>Copyright</span> of{" "}
          <span className="">Nutty Vibes</span>
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
      </div>
    </footer>
  );
};

export default Footer;
