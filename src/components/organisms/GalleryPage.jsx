import { useEffect, useMemo, useState } from "react";
import Button from "../atoms/Button";
import Reveal from "../atoms/Reveal";
import BrandFilter from "../molecules/BrandFilter";
import ProductCard from "../molecules/ProductCard";
import Lightbox from "../atoms/Lightbox";
import { brands, products } from "../../data/products";

const PAGE_SIZE = 6;

function GalleryPage() {
  const [activeBrand, setActiveBrand] = useState("Todos");
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filteredProducts = useMemo(
    () =>
      activeBrand === "Todos"
        ? products
        : products.filter((product) => product.brand === activeBrand),
    [activeBrand],
  );

  const open = (product) => {
    const idx = filteredProducts.findIndex((p) => p.id === product.id);
    setSelectedIndex(idx >= 0 ? idx : null);
  };
  const close = () => setSelectedIndex(null);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
    setSelectedIndex(null);
  }, [activeBrand]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;
  const loadMore = () =>
    setVisibleCount((current) =>
      Math.min(current + PAGE_SIZE, filteredProducts.length),
    );

  const prev = () => setSelectedIndex((i) => (i > 0 ? i - 1 : i));
  const next = () =>
    setSelectedIndex((i) => (i < filteredProducts.length - 1 ? i + 1 : i));

  return (
    <>
      <Reveal
        as="section"
        className="gallery-page"
        aria-labelledby="galeria-page-title"
      >
        <div className="gallery-page__header">
          <p className="eyebrow">Galeria</p>
          <h1 id="galeria-page-title">
            Fotos de luxo para um guarda-roupa curado.
          </h1>
          <p>
            Navegue pela seleção exclusiva de peças de grife, com imagens amplas
            e detalhes que ajudam a escolher com confiança.
          </p>
          <div className="gallery-page__actions">
            <Button href="#topo">Voltar para o início</Button>
            <Button
              href="https://wa.me/5500000000000?text=Ol%C3%A1%2C%20gostaria%20de%20visitar%20a%20galeria%20de%20pe%C3%A7as%20de%20luxo."
              variant="ghost"
              target="_blank"
              rel="noreferrer noopener"
            >
              Pedir consultoria
            </Button>
          </div>
        </div>

        <BrandFilter
          brands={brands}
          activeBrand={activeBrand}
          onChange={setActiveBrand}
        />

        <p className="gallery-page__status" aria-live="polite">
          Mostrando {visibleProducts.length} de {filteredProducts.length} peças
        </p>

        <div className="product-grid" aria-live="polite">
          {visibleProducts.map((product) => (
            <ProductCard product={product} key={product.id} onView={open} />
          ))}
        </div>

        {hasMore && (
          <div className="gallery-page__footer">
            <button
              type="button"
              className="button button--ghost"
              onClick={loadMore}
              aria-label="Carregar mais peças"
            >
              Carregar mais
            </button>
          </div>
        )}
      </Reveal>

      <Lightbox
        products={filteredProducts}
        index={selectedIndex}
        onClose={close}
        onPrev={prev}
        onNext={next}
      />
    </>
  );
}

export default GalleryPage;
