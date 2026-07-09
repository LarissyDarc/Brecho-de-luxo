import { useEffect, useRef, useState } from "react";
import { buildResponsiveImage } from "../../lib/image-utils";

function focusableElements(container) {
  if (!container) return [];
  return Array.from(
    container.querySelectorAll(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((el) => !el.hasAttribute("disabled"));
}

function Lightbox({ products = [], index = null, onClose, onPrev, onNext }) {
  const dialogRef = useRef(null);
  const prevActive = useRef(null);
  const [internalIndex, setInternalIndex] = useState(index);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (index !== null) {
      setInternalIndex(index);
      setIsClosing(false);
      return undefined;
    }

    if (internalIndex === null) return undefined;

    setIsClosing(true);
    const timeout = setTimeout(() => setInternalIndex(null), 240);
    return () => clearTimeout(timeout);
  }, [index, internalIndex]);

  useEffect(() => {
    if (internalIndex === null) return undefined;

    prevActive.current = document.activeElement;
    const dialog = dialogRef.current;

    const focusFirst = () => {
      const els = focusableElements(dialog);
      if (els.length) els[0].focus();
    };

    const onKey = (e) => {
      if (e.key === "Escape") {
        requestClose();
      } else if (e.key === "ArrowLeft") {
        onPrev && onPrev();
      } else if (e.key === "ArrowRight") {
        onNext && onNext();
      } else if (e.key === "Tab") {
        const els = focusableElements(dialog);
        if (els.length === 0) return;
        const first = els[0];
        const last = els[els.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKey);
    setTimeout(focusFirst, 0);

    return () => {
      document.removeEventListener("keydown", onKey);
      if (prevActive.current && prevActive.current.focus)
        prevActive.current.focus();
    };
  }, [internalIndex, onPrev, onNext]);

  if (internalIndex === null) return null;

  const product = products[internalIndex];

  if (!product) return null;

  const requestClose = () => {
    setIsClosing(true);
    setTimeout(() => onClose(), 240);
  };

  return (
    <div
      className={`lightbox ${isClosing ? "closing" : "open"}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby={`lightbox-title-${product.id}`}
      aria-describedby={`lightbox-description-${product.id}`}
      onClick={requestClose}
    >
      <div
        className="lightbox__dialog"
        ref={dialogRef}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="lightbox__close"
          onClick={requestClose}
          aria-label="Fechar"
        >
          ×
        </button>

        <div className="lightbox__content">
          <button
            type="button"
            className="lightbox__nav lightbox__nav--prev"
            onClick={() => onPrev && onPrev()}
            aria-label="Anterior"
            disabled={index <= 0}
          >
            ‹
          </button>

          <img
            className="lightbox__image"
            src={buildResponsiveImage(product.image, [900, 1200, 1600]).src}
            srcSet={
              buildResponsiveImage(product.image, [900, 1200, 1600]).srcSet
            }
            sizes="(min-width: 820px) 70vw, 90vw"
            alt={product.alt}
          />

          <button
            type="button"
            className="lightbox__nav lightbox__nav--next"
            onClick={() => onNext && onNext()}
            aria-label="Próximo"
            disabled={index >= products.length - 1}
          >
            ›
          </button>
        </div>

        <div className="lightbox__meta">
          <h3 id={`lightbox-title-${product.id}`}>{product.name}</h3>
          <p className="product-card__brand">{product.brand}</p>
          <strong>{product.price}</strong>
          <p id={`lightbox-description-${product.id}`}>{product.tag}</p>
        </div>
      </div>
    </div>
  );
}

export default Lightbox;
