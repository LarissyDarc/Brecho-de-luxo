import { useEffect, useMemo, useRef, useState } from "react";
import Reveal from "../atoms/Reveal";
import Button from "../atoms/Button";
import { stores } from "../../data/stores";

function Stores() {
  const [activeLocation, setActiveLocation] = useState("Todos");
  const [activeStore, setActiveStore] = useState(null);
  const closeModalButtonRef = useRef(null);
  const modalPanelRef = useRef(null);

  const locations = useMemo(() => {
    const unique = Array.from(new Set(stores.map((store) => store.city)));
    return ["Todos", ...unique];
  }, []);

  const filteredStores = useMemo(
    () =>
      activeLocation === "Todos"
        ? stores
        : stores.filter((store) => store.city === activeLocation),
    [activeLocation],
  );

  useEffect(() => {
    if (!activeStore) {
      document.body.classList.remove("modal-open");
      return undefined;
    }

    document.body.classList.add("modal-open");

    const getFocusableElements = () => {
      const panel = modalPanelRef.current;
      if (!panel) return [];
      return Array.from(
        panel.querySelectorAll(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
        ),
      );
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setActiveStore(null);
        return;
      }

      if (event.key !== "Tab") return;
      const focusableElements = getFocusableElements();
      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }

      if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    setTimeout(() => closeModalButtonRef.current?.focus(), 0);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("modal-open");
    };
  }, [activeStore]);

  return (
    <>
      <Reveal
        as="section"
        className="section stores"
        id="lojas"
        aria-labelledby="lojas-title"
      >
        <div className="section__intro">
          <p className="eyebrow">Nossas Lojas</p>
          <h2 id="lojas-title">
            Visite nossos espaços ou agende um atendimento
          </h2>
          <p>
            Atendimento presencial por hora marcada e consultoria online para
            clientes que preferem privacidade.
          </p>
        </div>

        <div className="store-filter" aria-label="Filtrar lojas por cidade">
          <div className="store-filter__list">
            {locations.map((location) => (
              <button
                key={location}
                type="button"
                className={`store-filter__button ${
                  activeLocation === location ? "is-active" : ""
                }`}
                onClick={() => setActiveLocation(location)}
                aria-pressed={activeLocation === location}
              >
                {location}
              </button>
            ))}
          </div>
        </div>

        <div className="stores-grid">
          {filteredStores.map((store) => (
            <article className="store-card" key={store.id}>
              <div className="store-card__head">
                <h3>{store.name}</h3>
                <span className="store-card__city">{store.city}</span>
              </div>
              <p className="store-card__address">{store.address}</p>
              <p className="store-card__hours">{store.hours}</p>
              <div className="store-card__actions">
                <button
                  type="button"
                  className="button button--ghost"
                  onClick={() => setActiveStore(store)}
                >
                  Detalhes
                </button>
                {store.maps && (
                  <Button
                    href={store.maps}
                    target="_blank"
                    rel="noreferrer noopener"
                    variant="ghost"
                  >
                    Ver no mapa
                  </Button>
                )}
                <Button
                  href={store.whatsapp}
                  target="_blank"
                  rel="noreferrer noopener"
                  variant="dark"
                >
                  Agendar / WhatsApp
                </Button>
              </div>
            </article>
          ))}
        </div>
      </Reveal>

      {activeStore ? (
        <div
          className="store-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="store-modal-title"
          onClick={() => setActiveStore(null)}
        >
          <div
            className="store-modal__panel"
            ref={modalPanelRef}
            onClick={(event) => event.stopPropagation()}
            role="document"
            tabIndex={-1}
          >
            <button
              type="button"
              className="store-modal__close"
              onClick={() => setActiveStore(null)}
              aria-label="Fechar detalhes da loja"
              ref={closeModalButtonRef}
            >
              ×
            </button>
            <div className="store-modal__header">
              <p className="eyebrow">Detalhes da loja</p>
              <h2 id="store-modal-title">{activeStore.name}</h2>
              <span className="store-card__city">{activeStore.city}</span>
            </div>

            {activeStore.mapEmbed ? (
              <div className="store-modal__map">
                <iframe
                  src={activeStore.mapEmbed}
                  title={`Mapa de ${activeStore.name}`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            ) : (
              <div className="store-modal__map store-modal__map--empty">
                Mapa não disponível para este local.
              </div>
            )}

            <div className="store-modal__details">
              <p>{activeStore.description}</p>
              <ul>
                <li>
                  <strong>Endereço:</strong> {activeStore.address}
                </li>
                <li>
                  <strong>Horário:</strong> {activeStore.hours}
                </li>
              </ul>
              <div className="store-modal__actions">
                {activeStore.maps && (
                  <Button
                    href={activeStore.maps}
                    variant="ghost"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    Abrir no mapa
                  </Button>
                )}
                <Button
                  href={activeStore.whatsapp}
                  variant="dark"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Agendar agora
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Stores;
