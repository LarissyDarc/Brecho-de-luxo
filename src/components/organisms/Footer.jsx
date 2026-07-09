import Button from "../atoms/Button";

const whatsappLink =
  "https://wa.me/5500000000000?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20um%20atendimento%20e%20conhecer%20as%20pe%C3%A7as%20do%20Ateli%C3%AA%20Raro.";

function Footer() {
  return (
    <footer
      className="site-footer"
      id="contato"
      aria-labelledby="footer-heading"
    >
      <div>
        <p className="eyebrow">Contato</p>
        <h2 id="footer-heading">Encontre a proxima peca assinatura.</h2>
        <p>
          Atendimento por WhatsApp, showroom com hora marcada e envios para todo
          o Brasil.
        </p>
      </div>
      <Button
        href={whatsappLink}
        target="_blank"
        rel="noreferrer noopener"
        variant="primary"
        aria-label="Abrir conversa no WhatsApp"
      >
        Chamar no WhatsApp
      </Button>
    </footer>
  );
}

export default Footer;
