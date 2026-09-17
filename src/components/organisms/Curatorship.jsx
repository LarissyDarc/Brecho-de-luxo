import Reveal from '../atoms/Reveal'

const steps = [
  ['Seleção', 'Entram apenas peças com procedência, acabamento preservado e desejo real de uso.'],
  ['Autenticação', 'Cada item passa por verificação visual, material, ferragens, etiquetas e histórico.'],
  ['Entrega', 'Você recebe consultoria de combinações, reserva rápida e envio protegido.'],
]

function Curatorship() {
  return (
    <Reveal as="section" className="section curatorship" id="curadoria" aria-labelledby="curadoria-title">
      <div className="section__intro">
        <p className="eyebrow">Curadoria</p>
        <h2 id="curadoria-title">Compra consciente com padrão de boutique.</h2>
      </div>
      <div className="steps" role="list">
        {steps.map(([title, text], index) => (
          <article className="step" key={title} role="listitem">
            <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </Reveal>
  )
}

export default Curatorship
