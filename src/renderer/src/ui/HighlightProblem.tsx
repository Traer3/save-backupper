interface HighlightProblemProps {
  isProblem?: boolean
  children?: React.ReactNode
  problem?: string
}

const HighlightProblemFrom = ({
  isProblem,
  children,
  problem
}: HighlightProblemProps): React.JSX.Element => {
  if (!isProblem) return <>{children}</>
  return (
    <div title={isProblem ? problem : undefined} style={styles.container}>
      {children}

      <div style={styles.overlay} />
    </div>
  )
}

export default HighlightProblemFrom

const styles: Record<string, React.CSSProperties> = {
  container: {
    position: 'relative',
    display: 'block',
    width: '100%'
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(255, 0, 0, 0.3) 0%, transparent 100%)',
    pointerEvents: 'none',
    zIndex: 100
  }
}
