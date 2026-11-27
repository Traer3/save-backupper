import loadingGif from '../../../../resources/server.gif'
import loading from '../../../../resources/loading.jpg'

interface LoadingProps {
  children?: React.ReactNode
  loading?: boolean
  loadingStyle?: boolean
}

const loadingImg = {
  APgif: loadingGif,
  loadingBackground: loading
}

interface LoadingItemProps {
  showImg?: boolean
  children?: React.ReactNode
}
const LoadingItem = ({ showImg, children }: LoadingItemProps): React.JSX.Element => (
  <div style={{ position: 'relative', pointerEvents: 'none' }}>
    <img
      src={showImg ? loadingImg.loadingBackground : loadingImg.APgif}
      style={showImg ? styles.secondImg : styles.imgStyle}
    />
    {children}
  </div>
)

const Loading = ({ children, loading, loadingStyle }: LoadingProps): React.JSX.Element => {
  if (!loading) {
    return <>{children}</>
  }
  return <LoadingItem showImg={loadingStyle}>{children}</LoadingItem>
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
  },
  secondImg: {
    backgroundColor: '#101010',
    position: 'absolute',
    height: '100%',
    width: '100%',
    objectFit: 'scale-down',
    opacity: '0.9'
  }
}
