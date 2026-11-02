import "./App.css";
import { useEffect, useMemo, useRef, useState } from "react";

const categories = ["Todas as peças", "Bolsas", "Roupas", "Sapatos", "Acessórios"];

const products = [
  { id: 1, brand: "Chanel", name: "Bolsa Classic Flap lambskin", price: "R$ 18.900", tag: "Curadoria premium", image: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=1200&q=85", alt: "Bolsa de couro preta elegante em uma composição de moda de luxo" },
  { id: 2, brand: "Dior", name: "Vestido midi em seda", price: "R$ 6.480", tag: "Peça única", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85", alt: "Modelo usando vestido sofisticado em editorial de moda" },
  { id: 3, brand: "Prada", name: "Mocassim em couro escovado", price: "R$ 3.740", tag: "Estado excelente", image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1200&q=85", alt: "Sapatos de couro fotografados em close" },
  { id: 4, brand: "Gucci", name: "Blazer alfaiataria vintage", price: "R$ 4.290", tag: "Vintage raro", image: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1200&q=85", alt: "Arara com peças de alfaiataria selecionadas" },
  { id: 5, brand: "Louis Vuitton", name: "Mala Keepall monograma", price: "R$ 12.600", tag: "Autenticada", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=85", alt: "Bolsa de viagem de luxo em couro marrom" },
  { id: 6, brand: "Chanel", name: "Óculos cat eye acetate", price: "R$ 2.180", tag: "Novo sem uso", image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1200&q=85", alt: "Óculos de sol em fundo claro" },
  { id: 7, brand: "Hermès", name: "Lenço Carré seda", price: "R$ 3.200", tag: "Estado impecável", image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=1200&q=85", alt: "Lenço de seda luxuoso com estampa clássica" },
  { id: 8, brand: "Fendi", name: "Bolsa baguette vintage", price: "R$ 9.400", tag: "Vintage raro", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=85", alt: "Bolsa de ombro com detalhe de logo" },
  { id: 9, brand: "Saint Laurent", name: "Jaqueta de couro cropped", price: "R$ 6.900", tag: "Curadoria premium", image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=1200&q=85", alt: "Jaqueta de couro preta em exposição" },
  { id: 10, brand: "Bottega Veneta", name: "Bolsa intrecciato couro", price: "R$ 11.250", tag: "Autenticada", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=85", alt: "Bolsa de couro com padrão intrecciato" },
  { id: 11, brand: "Givenchy", name: "Vestido longo de festa", price: "R$ 7.800", tag: "Peça única", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1200&q=85", alt: "Vestido elegante em composição de moda" },
  { id: 12, brand: "Balenciaga", name: "Tênis plataforma assinatura", price: "R$ 4.950", tag: "Estado excelente", image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1200&q=85", alt: "Tênis de plataforma em composição de moda" },
];

const categoryProductIds = {
  Bolsas: [1, 5, 8, 10],
  Roupas: [2, 4, 9, 11],
  Sapatos: [3, 12],
  Acessórios: [6, 7],
};

const brands = [...new Set(products.map((product) => product.brand))];
const categoryFeatureImages = [products[9], products[1], products[2], products[5]];
const priceValue = (price) => Number(price.replace(/\D/g, ""));
const normalize = (value) =>
  value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

function App() {
  const [category, setCategory] = useState(categories[0]);
  const [brand, setBrand] = useState("Todas as marcas");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("curadoria");
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const dialogRef = useRef(null);
  const searchRef = useRef(null);

  const visibleProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const matchesCategory =
        category === categories[0] || categoryProductIds[category].includes(product.id);
      const matchesBrand = brand === "Todas as marcas" || product.brand === brand;
      const matchesSearch = normalize(`${product.name} ${product.brand}`).includes(
        normalize(search.trim()),
      );
      return matchesCategory && matchesBrand && matchesSearch;
    });

    if (sort === "menor") filtered.sort((a, b) => priceValue(a.price) - priceValue(b.price));
    if (sort === "maior") filtered.sort((a, b) => priceValue(b.price) - priceValue(a.price));
    return filtered;
  }, [category, brand, search, sort]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (selectedProduct && !dialog.open) dialog.showModal();
    if (!selectedProduct && dialog.open) dialog.close();
  }, [selectedProduct]);

  const selectCategory = (nextCategory) => {
    setCategory(nextCategory);
    setBrand("Todas as marcas");
    setSearch("");
    setMenuOpen(false);
  };

  const resetCatalog = () => {
    selectCategory(categories[0]);
    setSort("curadoria");
  };

  const focusSearch = () => {
    document.getElementById("colecao")?.scrollIntoView({ behavior: "smooth" });
    window.setTimeout(() => searchRef.current?.focus({ preventScroll: true }), 350);
  };

  return (
    <div className="shop-app">
      <div className="announcement">
        PEÇAS ESPECIAIS. NOVAS HISTÓRIAS.
        <span>Conheça nossa curadoria de luxo circular</span>
      </div>

      <header className="shop-header">
        <div className="header-main wrap">
          <button
            className="menu-toggle icon-button"
            type="button"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            aria-controls="shop-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? "×" : "☰"}
          </button>
          <a className="header-note" href="#sobre">Um novo olhar para o luxo</a>
          <a className="wordmark" href="#topo" onClick={resetCatalog}>
            ATELIÊ RARO<span>CURADORIA • SECOND HAND</span>
          </a>
          <div className="header-actions">
            <button className="icon-button" type="button" aria-label="Buscar peças" onClick={focusSearch}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
                <circle cx="10.5" cy="10.5" r="6.5" />
                <path d="m16 16 5 5" />
              </svg>
            </button>
            <a href="#contato">Atendimento ↗</a>
          </div>
        </div>
        <nav id="shop-navigation" className={`shop-nav ${menuOpen ? "is-open" : ""}`} aria-label="Navegação principal">
          <a href="#colecao" onClick={() => selectCategory(categories[0])}>NEW IN</a>
          {categories.slice(1).map((item) => (
            <a href="#colecao" key={item} onClick={() => selectCategory(item)}>{item}</a>
          ))}
          <a href="#marcas" onClick={() => setMenuOpen(false)}>Marcas</a>
          <a href="#sobre" onClick={() => setMenuOpen(false)}>O Ateliê</a>
        </nav>
      </header>

      <main id="topo">
        <section className="editorial-hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="kicker">THE RARE EDIT · ATELIÊ RARO</p>
            <h1 id="hero-title">O extraordinário<br />merece uma<br /><em>nova história.</em></h1>
            <p>Encontros raros, escolhas com significado.<br />Descubra sua próxima peça favorita.</p>
            <a className="shop-button" href="#colecao">EXPLORE A CURADORIA <span>↗</span></a>
            <span className="hero-caption">ESTILO QUE PERMANECE. LUXO QUE CIRCULA.</span>
          </div>
          <div className="hero-photo">
            <img src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1400&q=85" alt="Editorial de moda com vestido leve em um jardim" fetchPriority="high" />
            <span>Uma nova forma de vestir histórias.</span>
          </div>
        </section>

        <div className="service-strip" aria-label="Diferenciais">
          <span>◇ Curadoria de peças especiais</span>
          <span>↺ Moda circular</span>
          <span>♡ Atendimento personalizado</span>
        </div>

        <section className="category-section wrap" aria-labelledby="categories-title">
          <div className="section-heading">
            <div><p className="kicker">ENCONTRE O SEU PRÓXIMO FAVORITO</p><h2 id="categories-title">Explore a coleção</h2></div>
            <a className="text-link" href="#colecao" onClick={() => selectCategory(categories[0])}>Ver todas as peças ↗</a>
          </div>
          <div className="category-grid">
            {categories.slice(1).map((item, index) => (
              <a className="category-tile" href="#colecao" key={item} onClick={() => selectCategory(item)}>
                <div><img src={categoryFeatureImages[index].image} alt="" loading="lazy" /></div>
                <span>{item}<span aria-hidden="true">↗</span></span>
              </a>
            ))}
          </div>
        </section>

        <section className="collection wrap" id="colecao" aria-labelledby="collection-title">
          <div className="section-heading">
            <div>
              <p className="kicker">ESCOLHIDAS A DEDO, PARA VOCÊ</p>
              <h2 id="collection-title">{category === categories[0] ? "New in" : category}</h2>
              <p>Peças com personalidade. Um novo capítulo no seu closet.</p>
            </div>
            <span className="result-count" aria-live="polite">{visibleProducts.length} {visibleProducts.length === 1 ? "peça" : "peças"}</span>
          </div>

          <div className="collection-toolbar">
            <label className="search-field">
              <span className="sr-only">Buscar por peça ou marca</span>
              <input ref={searchRef} type="search" placeholder="Busque uma peça ou marca" value={search} onChange={(event) => setSearch(event.target.value)} />
              <span aria-hidden="true">⌕</span>
            </label>
            <label>
              <span className="sr-only">Filtrar categoria</span>
              <select value={category} onChange={(event) => selectCategory(event.target.value)}>
                {categories.map((item) => <option key={item}>{item}</option>)}
              </select>
            </label>
            <label>
              <span className="sr-only">Filtrar marca</span>
              <select value={brand} onChange={(event) => setBrand(event.target.value)}>
                <option>Todas as marcas</option>
                {brands.map((item) => <option key={item}>{item}</option>)}
              </select>
            </label>
            <label>
              <span className="sr-only">Ordenar peças</span>
              <select value={sort} onChange={(event) => setSort(event.target.value)}>
                <option value="curadoria">Seleção da curadoria</option>
                <option value="menor">Menor preço</option>
                <option value="maior">Maior preço</option>
              </select>
            </label>
          </div>

          {visibleProducts.length ? (
            <div className="shop-products" aria-live="polite">
              {visibleProducts.map((product) => (
                <article className="shop-product" key={product.id}>
                  <button className="product-photo" type="button" onClick={() => setSelectedProduct(product)} aria-label={`Ver detalhes de ${product.name}`}>
                    <img src={product.image} alt={product.alt} loading="lazy" />
                    <span className="product-label">{product.tag}</span>
                    <span className="quick-view">VER DETALHES ↗</span>
                  </button>
                  <div className="product-info">
                    <p>{product.brand}</p>
                    <h3><button type="button" onClick={() => setSelectedProduct(product)}>{product.name}</button></h3>
                    <strong>{product.price}</strong>
                    <button className="detail-link" type="button" onClick={() => setSelectedProduct(product)}>Conhecer a peça ↗</button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-state"><h3>Nenhuma peça encontrada</h3><p>Experimente outra marca ou um termo diferente.</p><button className="shop-button" type="button" onClick={resetCatalog}>LIMPAR FILTROS</button></div>
          )}
        </section>

        <section className="brands-section" id="marcas" aria-labelledby="brands-title">
          <p className="kicker">NOMES ICÔNICOS. ESCOLHAS ATEMPORAIS.</p>
          <h2 id="brands-title">Suas marcas favoritas, um novo encontro.</h2>
          <div className="brand-list wrap">
            {brands.map((item) => <a href="#colecao" key={item} onClick={() => { selectCategory(categories[0]); setBrand(item); }}>{item}</a>)}
          </div>
        </section>

        <section className="about-section wrap" id="sobre" aria-labelledby="about-title">
          <img src="https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1000&q=85" alt="Seleção de roupas em uma arara" loading="lazy" />
          <div><p className="kicker">MENOS EXCESSO. MAIS SIGNIFICADO.</p><h2 id="about-title">O estilo é seu.<br />A história continua.</h2><p>Acreditamos na beleza de redescobrir. O Ateliê Raro reúne peças de segunda mão para quem valoriza design, personalidade e um consumo mais consciente.</p><a className="shop-button" href="#colecao" onClick={resetCatalog}>ENCONTRE SUA PRÓXIMA PEÇA ↗</a></div>
        </section>
      </main>

      <footer className="shop-footer" id="contato">
        <div className="footer-grid wrap">
          <div><a className="wordmark" href="#topo" onClick={resetCatalog}>ATELIÊ RARO</a><p>Peças raras. Escolhas conscientes.<br />Histórias que merecem continuar.</p></div>
          <div><h2>EXPLORE</h2><a href="#colecao" onClick={() => selectCategory(categories[0])}>Todas as peças</a><a href="#marcas">Nossas marcas</a><a href="#sobre">Sobre o Ateliê</a></div>
          <div><h2>ATENDIMENTO</h2><p>Gostou de uma peça?<br />Explore os detalhes na nossa coleção.</p><a href="#colecao">Conheça a seleção ↗</a></div>
        </div>
        <div className="footer-bottom wrap"><span>© {new Date().getFullYear()} Ateliê Raro</span><span>MODA CIRCULAR · ESTILO ATEMPORAL</span></div>
      </footer>

      <dialog className="product-dialog" ref={dialogRef} onCancel={() => setSelectedProduct(null)} onClose={() => setSelectedProduct(null)} onClick={(event) => { if (event.target === event.currentTarget) setSelectedProduct(null); }}>
        {selectedProduct && <><button className="dialog-close icon-button" type="button" aria-label="Fechar detalhes" onClick={() => setSelectedProduct(null)}>×</button><div className="dialog-layout"><img src={selectedProduct.image} alt={selectedProduct.alt} /><div><p className="kicker">{selectedProduct.brand}</p><h2>{selectedProduct.name}</h2><p className="dialog-tag">{selectedProduct.tag}</p><strong>{selectedProduct.price}</strong><p>Uma peça da seleção Ateliê Raro para um novo capítulo no seu closet.</p><button className="shop-button" type="button" onClick={() => setSelectedProduct(null)}>CONTINUAR EXPLORANDO</button></div></div></>}
      </dialog>
    </div>
  );
}

export default App;
