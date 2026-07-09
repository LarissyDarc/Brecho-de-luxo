function BrandFilter({ brands, activeBrand, onChange }) {
  return (
    <div
      className="brand-filter"
      role="group"
      aria-label="Filtrar galeria por marca"
    >
      <ul className="brand-filter__list">
        {brands.map((brand) => (
          <li key={brand} className="brand-filter__item">
            <button
              className="brand-filter__button"
              type="button"
              aria-pressed={activeBrand === brand}
              onClick={() => onChange(brand)}
            >
              {brand}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BrandFilter;
