"use client";

import { useEffect } from "react";

const BannerAds = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/javascript";
    script.innerHTML = `
        <script async type="application/javascript" src="https://a.magsrv.com/ad-provider.js"></script> 
        <ins class="eas6a97888e2" data-zoneid="5571162" data-keywords="keywords"></ins> 
        <script>(AdProvider = window.AdProvider || []).push({"serve": {}});</script>
     `;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
};

export default BannerAds;
