import { useEffect, useRef, useState } from "react";
import Button from "../atoms/Button";
import MobileMenuButton from "../molecules/MobileMenuButton";

const links = [
  { href: "#curadoria", label: "Curadoria" },
  { href: "#galeria-page", label: "Galeria" },
  { href: "#experiencia", label: "Experiencia" },
  { href: "#contato", label: "Contato" },
];

const whatsappLink =
  "https://wa.me/5500000000000?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20um%20atendimento%20com%20o%20Ateli%C3%AA%20Raro.";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenu, setIsMobileMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const query = window.matchMedia("(max-width: 819px)");
    const updateMobile = (event) => setIsMobileMenu(event.matches);
    setIsMobileMenu(query.matches);
    query.addEventListener?.("change", updateMobile);
    return () => query.removeEventListener?.("change", updateMobile);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", isOpen);

    const getFocusableElements = () => {
      if (!menuRef.current) return [];
      return Array.from(
        menuRef.current.querySelectorAll(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
        ),
      );
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        return;
      }

      if (event.key !== "Tab" || !isOpen || !isMobileMenu) return;
      const focusable = getFocusableElements();
      if (focusable.length === 0) return;

      const firstElement = focusable[0];
      const lastElement = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }

      if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      setTimeout(() => {
        const first = getFocusableElements()[0];
        first?.focus();
      }, 0);
    }

    return () => {
      document.body.classList.remove("menu-open");
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, isMobileMenu]);

  const [activeLink, setActiveLink] = useState("#topo");

  useEffect(() => {
    const ids = ["topo", "curadoria", "galeria", "experiencia", "contato"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveLink(`#${entry.target.id}`);
          }
        });
      },
      { root: null, rootMargin: "0px 0px -55% 0px", threshold: [0.18, 0.5] },
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setIsOpen(false);

  const handleNavClick = (event, href) => {
    if (!href || !href.startsWith("#")) return;
    event.preventDefault();
    closeMenu();

    const id = href.replace("#", "") || "topo";
    const el = document.getElementById(id);
    const header = document.querySelector(".site-header");
    const headerHeight = header ? header.offsetHeight : 56;

    if (el) {
      const y =
        el.getBoundingClientRect().top + window.pageYOffset - headerHeight - 8;
      window.scrollTo({ top: y, behavior: "smooth" });
      try {
        history.replaceState(null, "", href);
      } catch (e) {
        // ignore
      }
    } else {
      // fallback: update hash
      window.location.hash = href;
    }
  };

  return (
    <header className="site-header">
      <a className="brand" href="#topo" aria-label="Ateliê Raro - início">
        <img
          src="/ateliere-logo.svg"
          alt="Ateliê Raro"
          className="brand__logo"
        />
        <span className="visually-hidden">Ateliê Raro</span>
      </a>
      <MobileMenuButton
        isOpen={isOpen}
        onClick={() => setIsOpen((current) => !current)}
      />
      <nav
        ref={menuRef}
        className={`main-nav ${isOpen ? "is-open" : ""}`}
        id="menu-principal"
        aria-label="Menu principal"
        aria-hidden={isMobileMenu ? (!isOpen).toString() : undefined}
      >
        {links.map((link) => (
          <a
            href={link.href}
            key={link.href}
            onClick={(e) => handleNavClick(e, link.href)}
            className={activeLink === link.href ? "is-active" : ""}
            aria-current={activeLink === link.href ? "true" : undefined}
          >
            {link.label}
          </a>
        ))}
        <Button
          href={whatsappLink}
          target="_blank"
          rel="noreferrer noopener"
          variant="dark"
          className="main-nav__cta"
          onClick={closeMenu}
        >
          Agendar atendimento
        </Button>
      </nav>
    </header>
  );
}

export default Header;
