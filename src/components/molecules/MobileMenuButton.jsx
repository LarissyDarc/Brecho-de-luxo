function MobileMenuButton({ isOpen, onClick }) {
  return (
    <button
      className="menu-button"
      type="button"
      aria-expanded={isOpen}
      aria-controls="menu-principal"
      aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
      onClick={onClick}
    >
      <span aria-hidden="true" />
      <span aria-hidden="true" />
      <span aria-hidden="true" />
    </button>
  )
}

export default MobileMenuButton
