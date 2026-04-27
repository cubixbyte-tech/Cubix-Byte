import { useState } from "react";
import { LimitedDropAuth } from "./components/LimitedDropAuth";
import { CubixByteWebsite } from "./components/CubixByteWebsite";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { TermsOfService } from "./pages/TermsOfService";
import { NDATemplate } from "./pages/NDATemplate";
import { CookiePolicy } from "./pages/CookiePolicy";

type Page = "home" | "privacy" | "terms" | "nda" | "cookies";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>("home");

  // Handle navigation to legal pages
  const navigateTo = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  // Show auth screen if not logged in
  if (!isLoggedIn) {
    return <LimitedDropAuth onLogin={() => setIsLoggedIn(true)} />;
  }

  // Show legal pages
  switch (currentPage) {
    case "privacy":
      return <PrivacyPolicy onBack={() => navigateTo("home")} />;
    case "terms":
      return <TermsOfService onBack={() => navigateTo("home")} />;
    case "nda":
      return <NDATemplate onBack={() => navigateTo("home")} />;
    case "cookies":
      return <CookiePolicy onBack={() => navigateTo("home")} />;
    default:
      return (
        <CubixByteWebsite
          onLogout={() => setIsLoggedIn(false)}
          onNavigate={navigateTo}
        />
      );
  }
}
