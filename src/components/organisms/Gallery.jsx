import { useMemo, useState } from "react";
import Reveal from "../atoms/Reveal";
import BrandFilter from "../molecules/BrandFilter";
import ProductCard from "../molecules/ProductCard";
import { brands, products } from "../../data/products";

function Gallery() {
  const [activeBrand, setActiveBrand] = useState("Todos");
  const filteredProducts = useMemo(
    () =>
      activeBrand === "Todos"
        ? products
        : products.filter((product) => product.brand === activeBrand),
    [activeBrand],
  );

  return (
    <Reveal
      as="section"
      className="section gallery"
      id="galeria"
      aria-labelledby="galeria-title"
    >
      <div className="section__intro section__intro--split">
        <div>
          <p className="eyebrow">Galeria</p>
          <h2 id="galeria-title">
            Fotos amplas, marcas filtraveis e detalhes sem friccao.
          </h2>
          <p className="gallery__status" aria-live="polite">
            {filteredProducts.length} peça
            {filteredProducts.length === 1 ? "" : "s"} disponíveis
          </p>
        </div>
        <BrandFilter
          brands={brands}
          activeBrand={activeBrand}
          onChange={setActiveBrand}
        />
      </div>
      <div className="product-grid" aria-live="polite">
        {filteredProducts.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </Reveal>
  );
}

export default Gallery;
