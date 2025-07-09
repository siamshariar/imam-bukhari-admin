import AuthLogo from './extensions/logo-web.png';
import MenuLogo from './extensions/logo-web.png';
import favicon from './extensions/logo-web.png';
import initializeBengaliSlug from "./extensions/bengali-slug.js"


export default {
  config: {
    auth: {
      logo: AuthLogo,
    },
    head: {
      favicon: favicon,
    },
    menu: {
      logo: MenuLogo,
    },
    theme: {
      // overwrite light theme properties
      light: {
        colors: {
          primary100: '#f6ecfc',
          primary200: '#e0c1f4',
          primary500: '#ac73e6',
          primary600: '#9736e8',
          primary700: '#8312d1',
          danger700: '#b72b1a'
        },
      },

      // overwrite dark theme properties
      dark: {
        // ...
      }
    },
    translations: {
      en: {
        "app.components.LeftMenu.navbrand.title": "Dashboard",
        "app.components.HomePage.welcome.again": "Salam, Welcome back!",
        "app.components.HomePage.welcome": "Salam, Welcome!",
        "app.components.HomePage.welcomeBlock.content": "Use Incognito!",
        "app.components.HomePage.welcomeBlock.content.again": "Salam",
        "Auth.form.welcome.title": "Incognito!",
        "Auth.form.welcome.subtitle": "Please login by Incognito window",
        "app.components.NpsSurvey.banner-title": "How likely are you to recommend this application to a friend or colleague?",
      },
    },
    // Disable video tutorials
    tutorials: false,
    // Disable notifications about new Strapi releases
    // notifications: { release: false },
  },
    bootstrap() {
    // Initialize the Bengali/Arabic slug extension
    if (typeof window !== "undefined") {
      console.log("Bootstrapping Bengali/Arabic slug functionality...")
      
      // Wait for Strapi to fully load before initializing the extension
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", () => {
          setTimeout(() => {
            initializeBengaliSlug()
          }, 2000)
        })
      } else {
        setTimeout(() => {
          initializeBengaliSlug()
        }, 2000)
      }
    }
    // TODO: ADMINISTRATION PANEL hide After adding this
    //   document.title = "Dashboard"
    //   const styleTag = document.createElement("style");
    //   styleTag.innerText = `
    //   a[href*="/dashboard/plugins/cloud"], a[href*="/strapi/strapi/releases/tag/v"], a[href*="strapi.io/"], a[href*="cloud.strapi.io"] {
    //     display: none;
    //   }
    //   nav[aria-label="Settings"] ol li:nth-child(2), nav[aria-label="Settings"] ol ol li:nth-child(3) {
    //     display: none;
    //   }
    //   aside[aria-labelledby="join-the-community"], .home-page #main-content>div:first-child>img {
    //     display: none;
    //   }
    // `;
    //   document.head.appendChild(styleTag);
    //   const isHomePage =
    //     window.location.pathname === "/dashboard" ||
    //     window.location.pathname === "/dashboard/";
    //   document.documentElement.classList.add(
    //     isHomePage ? "home-page" : "not-home-page"
    //   );
  },
};
