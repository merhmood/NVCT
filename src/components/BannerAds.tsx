"use client";

import Script from "next/script";

const BannerAds = () => {
  return (
    <div className="relative mt-1 h-28 md:h-36 lg:h-fit">
      <iframe
        src="//a.magsrv.com/iframe.php?idzone=5571162&size=auto"
        width="100%"
        height="100%"
      ></iframe>
      <p className="absolute top-0 left-2 font-bold">Ads</p>
    </div>
  );
};

export default BannerAds;
