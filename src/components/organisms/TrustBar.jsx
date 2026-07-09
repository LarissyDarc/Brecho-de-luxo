import Reveal from '../atoms/Reveal'

const stats = [
  ['24h', 'reserva expressa'],
  ['100%', 'autenticidade analisada'],
  ['4.9/5', 'experiencia de compra'],
]

function TrustBar() {
  return (
    <Reveal as="section" className="trust-bar" aria-label="Diferenciais do brecho">
      {stats.map(([value, label]) => (
        <div className="trust-bar__item" key={label}>
          <strong>{value}</strong>
          <span>{label}</span>
        </div>
      ))}
    </Reveal>
  )
}

export default TrustBar
