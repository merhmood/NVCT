"use client";

import Script from "next/script";

const BannerAds = () => {
  return (
    <>
      <Script id="ads-banner" async src="https://a.magsrv.com/ad-provider.js" />
      <ins className="eas6a97888e2" data-zoneid="5571162"></ins>
      <Script id="ads-banner-details">
        {`(AdProvider = window.AdProvider || []).push({"serve": {}})`}
      </Script>
    </>
  );
};

export default BannerAds;
