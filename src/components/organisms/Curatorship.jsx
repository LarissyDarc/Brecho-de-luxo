import Reveal from '../atoms/Reveal'

const steps = [
  ['Selecao', 'Entram apenas pecas com procedencia, acabamento preservado e desejo real de uso.'],
  ['Autenticacao', 'Cada item passa por verificacao visual, material, ferragens, etiquetas e historico.'],
  ['Entrega', 'Voce recebe consultoria de combinacoes, reserva rapida e envio protegido.'],
]

function Curatorship() {
  return (
    <Reveal as="section" className="section curatorship" id="curadoria" aria-labelledby="curadoria-title">
      <div className="section__intro">
        <p className="eyebrow">Curadoria</p>
        <h2 id="curadoria-title">Compra consciente com padrao de boutique.</h2>
      </div>
      <div className="steps" role="list">
        {steps.map(([title, text]) => (
          <article className="step" key={title} role="listitem">
            <span aria-hidden="true">{String(steps.findIndex(([item]) => item === title) + 1).padStart(2, '0')}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </Reveal>
  )
}

export default Curatorship
