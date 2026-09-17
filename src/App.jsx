import { useEffect, useMemo, useRef, useState } from 'react';
import { products } from './data/products';
import './Storefront.css';

const categories = ['Todas as peças', 'Bolsas', 'Roupas', 'Sapatos', 'Acessórios'];
const categoryIds = { Bolsas: [1, 5, 8, 10], Roupas: [2, 4, 9, 11], Sapatos: [3, 12], Acessórios: [6, 7] };
const categoryImages = [products[9], products[1], products[2], products[5]];
const brands = [...new Set(products.map(product => product.brand))];
const normalize = text => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
const priceValue = product => Number(product.price.replace(/\D/g, ''));

export default function App() {
  const [category, setCategory] = useState('Todas as peças');
  const [brand, setBrand] = useState('Todas as marcas');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('curadoria');
  const [menuOpen, setMenuOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const dialog = useRef(null);
  const searchInput = useRef(null);
  const filtered = useMemo(() => {
    const result = products.filter(product =>
      (category === 'Todas as peças' || categoryIds[category].includes(product.id)) &&
      (brand === 'Todas as marcas' || product.brand === brand) &&
      normalize(`${product.name} ${product.brand}`).includes(normalize(search.trim()))
    );
    if (sort === 'menor') result.sort((a, b) => priceValue(a) - priceValue(b));
    if (sort === 'maior') result.sort((a, b) => priceValue(b) - priceValue(a));
    return result;
  }, [category, brand, search, sort]);

  useEffect(() => {
    if (selected) dialog.current?.showModal();
    else dialog.current?.close();
  }, [selected]);

  const chooseCategory = value => {
    setCategory(value);
    setBrand('Todas as marcas');
    setSearch('');
    setMenuOpen(false);
  };
  const reset = () => { chooseCategory('Todas as peças'); setSort('curadoria'); };

  return (
    <>
      <div className="announcement">PEÇAS ESPECIAIS. NOVAS HISTÓRIAS. <span>Conheça nossa curadoria de luxo circular</span></div>
      <header className="shop-header">
        <div className="header-main wrap">
          <button className="menu-toggle icon-button" aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menuOpen} aria-controls="shop-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? '×' : '☰'}</button>
          <a className="header-note" href="#sobre">Um novo olhar para o luxo</a>
          <a className="wordmark" href="#topo" onClick={reset}>ATELIÊ RARO<span>CURADORIA • SECOND HAND</span></a>
          <div className="header-actions"><button className="icon-button" aria-label="Buscar peças" onClick={() => { document.getElementById('colecao').scrollIntoView(); searchInput.current.focus({ preventScroll: true }); }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></svg></button><a href="#contato">Atendimento ↗</a></div>
        </div>
        <nav id="shop-navigation" className={`shop-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Navegação principal">
          <a href="#colecao" onClick={reset}>NEW IN</a>
          {categories.slice(1).map(item => <a key={item} href="#colecao" onClick={() => chooseCategory(item)}>{item}</a>)}
          <a href="#marcas" onClick={() => setMenuOpen(false)}>Marcas</a><a href="#sobre" onClick={() => setMenuOpen(false)}>O Ateliê</a>
        </nav>
      </header>
      <main id="topo">
        <section className="editorial-hero" aria-labelledby="hero-title">
          <div className="hero-copy"><p className="kicker">THE RARE EDIT · ATELIÊ RARO</p><h1 id="hero-title">O extraordinário<br/>merece uma<br/><em>nova história.</em></h1><p>Encontros raros, escolhas com significado.<br/>Descubra sua próxima peça favorita.</p><a className="shop-button" href="#colecao" onClick={reset}>EXPLORE A CURADORIA <span>↗</span></a><span className="hero-caption">ESTILO QUE PERMANECE. LUXO QUE CIRCULA.</span></div>
          <div className="hero-photo"><img src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1400&q=85" alt="Editorial de moda com vestido leve em um jardim" fetchPriority="high"/><span>Uma nova forma de vestir histórias.</span></div>
        </section>
        <div className="service-strip"><span>◇ Curadoria de peças especiais</span><span>↺ Moda circular</span><span>♡ Atendimento personalizado</span></div>
        <section className="category-section wrap" aria-labelledby="categories-title"><div className="section-heading"><div><p className="kicker">ENCONTRE O SEU PRÓXIMO FAVORITO</p><h2 id="categories-title">Explore a coleção</h2></div><a className="text-link" href="#colecao" onClick={reset}>Ver todas as peças ↗</a></div><div className="category-grid">{categories.slice(1).map((item, i) => <a className="category-tile" key={item} href="#colecao" onClick={() => chooseCategory(item)}><div><img src={categoryImages[i].image} alt="" loading="lazy"/></div><span>{item}<span aria-hidden="true">↗</span></span></a>)}</div></section>
        <section className="collection wrap" id="colecao" aria-labelledby="collection-title"><div className="section-heading"><div><p className="kicker">ESCOLHIDAS A DEDO, PARA VOCÊ</p><h2 id="collection-title">{category === 'Todas as peças' ? 'New in' : category}</h2><p>Peças com personalidade. Um novo capítulo no seu closet.</p></div><span className="result-count" aria-live="polite">{filtered.length} {filtered.length === 1 ? 'peça' : 'peças'}</span></div>
          <div className="collection-toolbar"><label className="search-field"><span className="sr-only">Buscar por peça ou marca</span><input ref={searchInput} type="search" placeholder="Busque uma peça ou marca" value={search} onChange={event => setSearch(event.target.value)}/><span aria-hidden="true">⌕</span></label><label><span className="sr-only">Filtrar categoria</span><select value={category} onChange={event => setCategory(event.target.value)}>{categories.map(item => <option key={item}>{item}</option>)}</select></label><label><span className="sr-only">Filtrar marca</span><select value={brand} onChange={event => setBrand(event.target.value)}><option>Todas as marcas</option>{brands.map(item => <option key={item}>{item}</option>)}</select></label><label><span className="sr-only">Ordenar peças</span><select value={sort} onChange={event => setSort(event.target.value)}><option value="curadoria">Seleção da curadoria</option><option value="menor">Menor preço</option><option value="maior">Maior preço</option></select></label></div>
          <div className="shop-products">{filtered.map(product => <article className="shop-product" key={product.id}><button className="product-photo" onClick={() => setSelected(product)} aria-label={`Ver detalhes de ${product.name}`}><img src={product.image} alt={product.alt} loading="lazy"/><span className="product-label">{product.tag}</span><span className="quick-view">VER DETALHES ↗</span></button><div className="product-info"><p>{product.brand}</p><h3><button onClick={() => setSelected(product)}>{product.name}</button></h3><strong>{product.price}</strong><button className="detail-link" onClick={() => setSelected(product)}>Conhecer a peça ↗</button></div></article>)}</div>
          {!filtered.length && <div className="empty-state"><h3>Nenhuma peça encontrada</h3><p>Experimente outra marca ou um termo diferente.</p><button className="shop-button" onClick={reset}>LIMPAR FILTROS</button></div>}
        </section>
        <section className="brands-section" id="marcas"><p className="kicker">NOMES ICÔNICOS. ESCOLHAS ATEMPORAIS.</p><h2>Suas marcas favoritas, um novo encontro.</h2><div className="brand-list wrap">{brands.map(item => <a href="#colecao" key={item} onClick={() => { chooseCategory('Todas as peças'); setBrand(item); }}>{item}</a>)}</div></section>
        <section className="about-section wrap" id="sobre"><img src="https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1000&q=85" alt="Seleção de roupas em uma arara" loading="lazy"/><div><p className="kicker">MENOS EXCESSO. MAIS SIGNIFICADO.</p><h2>O estilo é seu.<br/>A história continua.</h2><p>Acreditamos na beleza de redescobrir. O Ateliê Raro reúne peças de segunda mão para quem valoriza design, personalidade e um consumo mais consciente.</p><a className="shop-button" href="#colecao" onClick={reset}>ENCONTRE SUA PRÓXIMA PEÇA ↗</a></div></section>
      </main>
      <footer className="shop-footer" id="contato"><div className="footer-grid wrap"><div><a className="wordmark" href="#topo">ATELIÊ RARO</a><p>Peças raras. Escolhas conscientes.<br/>Histórias que merecem continuar.</p></div><div><h2>EXPLORE</h2><a href="#colecao" onClick={reset}>Todas as peças</a><a href="#marcas">Nossas marcas</a><a href="#sobre">Sobre o Ateliê</a></div><div><h2>ATENDIMENTO</h2><p>Gostou de uma peça?<br/>Explore os detalhes na nossa coleção.</p><a href="#colecao">Conheça a seleção ↗</a></div></div><div className="footer-bottom wrap"><span>© {new Date().getFullYear()} Ateliê Raro</span><span>MODA CIRCULAR · ESTILO ATEMPORAL</span></div></footer>
      <dialog className="product-dialog" ref={dialog} onCancel={() => setSelected(null)} onClose={() => setSelected(null)} onClick={event => { if (event.target === event.currentTarget) setSelected(null); }}>{selected && <><button className="dialog-close icon-button" aria-label="Fechar detalhes" onClick={() => setSelected(null)} autoFocus>×</button><div className="dialog-layout"><img src={selected.image} alt={selected.alt}/><div><p className="kicker">{selected.brand}</p><h2>{selected.name}</h2><p className="dialog-tag">{selected.tag}</p><strong>{selected.price}</strong><p>Uma peça da seleção Ateliê Raro para um novo capítulo no seu closet.</p><button className="shop-button" onClick={() => setSelected(null)}>CONTINUAR EXPLORANDO</button></div></div></>}</dialog>
    </>
  );
}
