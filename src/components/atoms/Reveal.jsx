import { useEffect, useRef, useState } from 'react'

function Reveal({ as: Tag = 'div', children, className = '' }) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const node = ref.current

    if (!node) {
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.18 },
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [])

  return (
    <Tag ref={ref} className={`reveal ${isVisible ? 'is-visible' : ''} ${className}`.trim()}>
      {children}
    </Tag>
  )
}

export default Reveal
