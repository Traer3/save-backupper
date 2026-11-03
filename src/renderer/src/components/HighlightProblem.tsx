interface HighlightProblemProps {
  isProblem?: boolean
  children?: React.ReactNode
}

interface HighlightProblemFromProps {
  children?: React.ReactNode
}

const HighlightProblemFrom = ({ children }: HighlightProblemFromProps): React.JSX.Element => (
  <div style={styles.container}>
    {children}

    <div style={styles.overlay} />
  </div>
)

const HighlightProblem = ({ isProblem, children }: HighlightProblemProps): React.JSX.Element => {
  if (isProblem) {
    return <HighlightProblemFrom>{children}</HighlightProblemFrom>
  }
  return <>{children}</>
}

export default HighlightProblem

const styles: Record<string, React.CSSProperties> = {
  container: {
    position: 'relative'
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
