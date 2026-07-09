import Button from "../atoms/Button";
import Reveal from "../atoms/Reveal";
import { buildResponsiveImage } from "../../lib/image-utils";

const whatsappLink =
  "https://wa.me/5500000000000?text=Ol%C3%A1%2C%20gostaria%20de%20falar%20com%20a%20curadoria%20do%20Ateli%C3%AA%20Raro.";

function Hero() {
  return (
    <section className="hero" id="topo" aria-labelledby="hero-title">
      <div className="hero__media" aria-hidden="true">
        <img
          src={
            buildResponsiveImage(
              "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1600&q=88",
            ).src
          }
          srcSet={
            buildResponsiveImage(
              "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1600&q=88",
            ).srcSet
          }
          sizes="100vw"
          alt=""
          loading="lazy"
        />
      </div>
      <Reveal className="hero__content">
        <p className="eyebrow">Luxo circular com curadoria humana</p>
        <h1 id="hero-title">Ateliê Raro</h1>
        <p>
          Pecas autenticadas, atendimento reservado e uma galeria pensada para
          encontrar marcas desejo sem perder tempo.
        </p>
        <div
          className="hero__actions"
          role="group"
          aria-label="Ações principais"
        >
          <Button href="#galeria-page">Ver galeria</Button>
          <Button
            href={whatsappLink}
            variant="ghost"
            target="_blank"
            rel="noreferrer noopener"
          >
            Falar com curadoria
          </Button>
        </div>
      </Reveal>
      <aside className="hero__panel" aria-label="Resumo da colecao">
        <strong>+320</strong>
        <span>pecas verificadas por temporada</span>
      </aside>
    </section>
  );
}

export default Hero;
