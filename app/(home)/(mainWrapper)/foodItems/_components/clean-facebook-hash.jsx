"use client"; // Ensure this is a client-side component

import { useEffect } from "react";

export default function CleanFacebookHash() {
  useEffect(() => {
    if (window.location.hash && window.location.hash === "#_=_") {
      if (window.history && window.history.replaceState) {
        window.history.replaceState(
          null,
          document.title,
          window.location.pathname + window.location.search
        );
      } else {
        window.location.hash = "";
      }
    }
  }, []);

  return null; // This component doesn't render any UI
}
