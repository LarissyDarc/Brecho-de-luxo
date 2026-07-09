import Badge from "../atoms/Badge";
import { buildResponsiveImage } from "../../lib/image-utils";

function ProductCard({ product, onView }) {
  const whatsappLink = `https://wa.me/5500000000000?text=Ol%C3%A1%2C%20quero%20saber%20sobre%20a%20pe%C3%A7a%20${encodeURIComponent(
    product.name,
  )}%20do%20Ateli%C3%AA%20Raro.`;
  const imageSources = buildResponsiveImage(
    product.image,
    [480, 768, 1024, 1200],
  );

  return (
    <article className="product-card">
      <img
        className="product-card__image"
        src={imageSources.src}
        srcSet={imageSources.srcSet}
        sizes="(min-width: 820px) 28vw, (min-width: 560px) 45vw, 90vw"
        alt={product.alt}
        loading="lazy"
      />
      <div className="product-card__body">
        <div>
          <Badge>{product.tag}</Badge>
          <p className="product-card__brand">{product.brand}</p>
          <h3>{product.name}</h3>
        </div>
        <div className="product-card__meta">
          <strong>{product.price}</strong>
          <div className="product-card__actions">
            <a
              className="product-card__link"
              href={whatsappLink}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`Consultar disponibilidade de ${product.name}`}
            >
              Consultar
            </a>
            <button
              type="button"
              className="button button--ghost"
              onClick={() => onView && onView(product)}
              aria-label={`Ver imagem ampliada de ${product.name}`}
            >
              Ver
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
