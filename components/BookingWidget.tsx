import React, { useEffect } from 'react';
import Cal, { getCalApi } from "@calcom/embed-react";

// Define global interface for Meta Pixel
declare global {
  interface Window {
    fbq: any;
  }
}

export const BookingWidget: React.FC = () => {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({"namespace":"30min"});
      cal("ui", {
        "styles": {
          "branding": {
            "brandColor": "#000000"
          }
        },
        "hideEventTypeDetails": false,
        "layout": "month_view"
      });

      // Listen for successful bookings
      cal("on", {
        action: "bookingSuccessful",
        callback: (e) => {
          // Track 'Schedule' event in Meta Pixel
          if (typeof window !== 'undefined' && window.fbq) {
            window.fbq('track', 'Schedule');
            console.log("Meta Pixel: Schedule event tracked");
          }
        }
      });
    })();
  }, []);

  return (
    <div id="booking-calendar" className="w-full max-w-6xl mx-auto h-[700px] bg-white rounded-lg shadow-2xl overflow-hidden mt-8 scroll-mt-20">
      <Cal 
        namespace="30min"
        calLink="webnexaai/30min"
        style={{width:"100%", height:"100%", overflow:"scroll"}}
        config={{
          "layout":"month_view",
          "useSlotsViewOnSmallScreen":"true",
          "theme": "light"
        }}
      />
    </div>
  );
};