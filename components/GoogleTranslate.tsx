"use client";
import React, { useEffect } from "react";
import "@/app/globals.css";

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}

const GoogleTranslate: React.FC = () => {
  useEffect(() => {
    // Define the initialization function
    const googleTranslateElementInit = () => {
      if (!window.google?.translate) return; // Check if the google translate object exists
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en", // Default language of your website
          includedLanguages: "en,kn,hi", // Only include English, Kannada, and Hindi
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        "google_translate_element"
      );

      // Add custom styles after initialization
      const style = document.createElement("style");
      style.textContent = `
        .goog-te-gadget {
          font-size: 0px !important;
        }
        .goog-te-gadget .goog-te-combo {
          margin: 0px !important;
          padding: 0px !important;
        }
        .goog-te-gadget img {
          display: none !important;
        }
        .goog-te-gadget .goog-te-combo {
          font-size: 14px !important;
          padding: 4px !important;
          border-radius: 4px !important;
          border: 1px solid #e2e8f0 !important;
        }
      `;
      document.head.appendChild(style);
    };

    // Check if the script is already loaded or initialized
    if (!window.googleTranslateElementInit) {
      const script = document.createElement("script");
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);

      // Set the init function globally
      window.googleTranslateElementInit = googleTranslateElementInit;
    } else {
      // If script already loaded, just initialize the translate element
      googleTranslateElementInit();
    }
  }, []);

  return (
    <div className="fixed top-4 right-4 z-50">
      <div
        id="google_translate_element"
        className="bg-white rounded-lg shadow-lg p-2"
      ></div>
    </div>
  );
};

export default GoogleTranslate;
