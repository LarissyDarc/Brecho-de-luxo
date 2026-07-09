import Button from "../atoms/Button";
import Reveal from "../atoms/Reveal";
import { buildResponsiveImage } from "../../lib/image-utils";

function Experience() {
  const experienceImage = buildResponsiveImage(
    "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=85",
  );

  return (
    <Reveal
      as="section"
      className="section experience"
      id="experiencia"
      aria-labelledby="experiencia-title"
    >
      <div className="experience__copy">
        <p className="eyebrow">Experiencia</p>
        <h2 id="experiencia-title">
          Atendimento discreto para decidir com calma.
        </h2>
        <p>
          A curadoria envia medidas, videos curtos, orientacao de styling e
          disponibilidade em tempo real. O fluxo foi pensado para celular:
          toque, filtre, reserve e finalize pelo canal preferido.
        </p>
        <Button href="#contato" variant="dark">
          Quero reservar uma peca
        </Button>
      </div>
      <img
        src={experienceImage.src}
        srcSet={experienceImage.srcSet}
        sizes="(min-width: 820px) 40vw, 90vw"
        alt="Cliente analisando pecas de moda em um atendimento reservado"
        loading="lazy"
      />
    </Reveal>
  );
}

export default Experience;
