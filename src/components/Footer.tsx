import Image from "next/image";
import { ollifiaPoettry } from "@/utils/font";

const Footer = () => {
  const socialIcons = [
    {
      image: "/social-icons/twitter.png",
      url: "https://x.com/nuttyvibes",
      alt: "twitter",
    },
    {
      image: "/social-icons/instagram.png",
      url: "https://www.instagram.com/nutty__vibes",
      alt: "instagram",
    },
  ];
  return (
    <footer className="bg-[#ff99f3] text-[#1d071b] mt-16 py-8 lg:py-6">
      <div className="w-5/6 lg:w-11/12 max-w-7xl mx-auto flex flex-col justify-center items-center lg:flex-row lg:justify-between lg:items-center">
        <div className="text-[#000] lg:text-2xl">
          <span className={ollifiaPoettry.className}>Copyright</span> of{" "}
          <span className="text-[#37113b]">Nutty Vibes</span>
        </div>
        <div className="flex mt-3 lg:mt-0">
          {socialIcons.map((socialIcon, index) => (
            <a key={index} href={socialIcon.url}>
              <div className="relative h-7 w-7 ml-3">
                <Image
                  src={socialIcon.image}
                  alt={socialIcon.alt}
                  objectFit="cover"
                  fill
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
