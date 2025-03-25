import Image from "next/image";

const About: React.FC = () => {
  return (
    <section
      className="bg-gradient-to-b from-[#288054] to-[#107684] mt-10 lg:mt-20"
      id="about"
    >
      <div className="mx-auto max-w-6xl w-5/6 pt-11 lg:pt-20 h-fit">
        <p className="text-white text-xs lg:text-4xl text-center max-w-5xl mx-auto font-normal lg:font-medium leading-5 lg:leading-[50px]">
          Our mission is to make a meaningful difference by creating products
          that truly innovate and enhance people&apos;s lives. We&apos;re
          committed to developing solutions that not only solve real-world
          problems but also inspire positive change, making everyday experiences
          better, easier, and more fulfilling for everyone.
        </p>
        <div className="relative h-32 lg:h-[496px] w-5/6 lg:w-full mx-auto mt-4 lg:mt-8">
          <Image src="/about.png" fill objectFit="contain" alt="home" />
        </div>
      </div>
    </section>
  );
};

export default About;
