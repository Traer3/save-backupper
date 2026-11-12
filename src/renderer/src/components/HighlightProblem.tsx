interface HighlightProblemProps {
  isProblem?: boolean
  children?: React.ReactNode
  problem?: string
}

// interface HighlightProblemFromProps {
//   children?: React.ReactNode
//   problem?: string
// }

// // const HighlightProblemFrom = ({
// //   children,
// //   problem
// // }: HighlightProblemFromProps): React.JSX.Element => (
// //   <div title={`${problem}`} style={styles.container}>
// //     {children}

// //     <div style={styles.overlay} />
// //   </div>
// // )

const HighlightProblem = ({
  isProblem,
  children,
  problem = 'Error with backup'
}: HighlightProblemProps): React.JSX.Element => {
  if (!isProblem) return <>{children}</>
  // if (isProblem) {
  //   return <HighlightProblemFrom problem={problem}>{children}</HighlightProblemFrom>
  // }
  return (
    <div style={styles.container} className="problem-container">
      {children}
      <div style={styles.overlay} />
      <div style={styles.tooltip} className="problem-tooltip">
        {problem}
      </div>
      <style>{`
      .problem-container:hover .problem-tooltip{
        opacity: 1 !important;
        visibility: visible !important;
      }
      `}</style>
    </div>
  )
}

export default HighlightProblem

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
  },
  tooltip: {
    position: 'absolute',
    bottom: '100%',
    left: '50%',
    transform: 'translateX(-50%) translateY(-6px)',
    backgroundColor: '#1E1E1E',
    color: '#FF6B6B',
    border: '1px solid #FF4D4D',
    padding: '6px 10px',
    borderRadius: '6px',
    fontSize: '12px',
    whiteSpace: 'nowrap',
    boxShadow: '0px 4px 12px rgba(0,0,0,0.4)',
    pointerEvents: 'none',
    zIndex: 101,
    opacity: 0,
    visibility: 'hidden',
    transition: 'opacity 0.2s ease, visibility 0.2s ease'
  }
}
