import "./App.css";
import { useEffect, useState } from "react";
import Curatorship from "./components/organisms/Curatorship";
import Experience from "./components/organisms/Experience";
import Footer from "./components/organisms/Footer";
import Gallery from "./components/organisms/Gallery";
import GalleryPage from "./components/organisms/GalleryPage";
import Header from "./components/organisms/Header";
import Hero from "./components/organisms/Hero";
import TrustBar from "./components/organisms/TrustBar";
import Stores from "./components/organisms/Stores";

function App() {
  const [currentHash, setCurrentHash] = useState(
    () => window.location.hash || "#topo",
  );

  useEffect(() => {
    const handleHashChange = () =>
      setCurrentHash(window.location.hash || "#topo");
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const isGalleryPage = currentHash === "#galeria-page";

  return (
    <>
      <Header />
      <main>
        {isGalleryPage ? (
          <GalleryPage />
        ) : (
          <>
            <Hero />
            <TrustBar />
            <Stores />
            <Curatorship />
            <Gallery />
            <Experience />
          </>
        )}
      </main>
      <Footer />
    </>
  );
}

export default App;
