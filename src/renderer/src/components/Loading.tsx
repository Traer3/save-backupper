import loadingGif from '../../../../resources/server.gif'

interface LoadingProps {
  children?: React.ReactNode
  loading?: boolean
}
const Loading = ({ children, loading }: LoadingProps): React.JSX.Element => {
  return loading ? (
    <div style={{ position: 'relative', pointerEvents: 'none' }}>
      <img src={loadingGif} style={styles.imgStyle} />
      {children}
    </div>
  ) : (
    <>{children}</>
  )
}

export default Loading
const styles: Record<string, React.CSSProperties> = {
  imgStyle: {
    backgroundColor: '#ffffff',
    position: 'absolute',
    height: '100%',
    width: '100%',
    objectFit: 'scale-down',
    opacity: '0.9'
  }
}
