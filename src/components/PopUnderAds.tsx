"use client";

import Script from "next/script";

const PopUnderAds = () => {
  return (
    <>
      <Script id="ads-popunder-details">
        {`    
          var ad_idzone = "5581746",
          ad_popup_fallback = false,
          ad_popup_force = false,
          ad_chrome_enabled = true,
          ad_new_tab = false,
          ad_frequency_period = 60,
          ad_frequency_count = 2,
          ad_trigger_method = 3,
          ad_trigger_delay = 0,
          ad_capping_enabled = true; 
      `}
      </Script>
      <Script id="ads-popunder" src="https://a.pemsrv.com/popunder1000.js" />
    </>
  );
};

export default PopUnderAds;
