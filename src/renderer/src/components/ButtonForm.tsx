/* eslint-disable prettier/prettier */
import settingsIcon from '../../../../resources/settingsIcon.png'
import addCircleIcon from '../../../../resources/addCircleIcon.png'
import archiveIcon from '../../../../resources/archiveIcon.png'
import cancelIcon from '../../../../resources/cancelIcon.png'
import closeIcon from '../../../../resources/closeIcon.png'
import emptyTrashIcon from '../../../../resources/emptyTrashIcon.png'
import fullTrashIcon from '../../../../resources/fullTrashIcon.png'
import googleIcon from '../../../../resources/googleIcon.png'
import mainIcon from '../../../../resources/mainIcon.png'
import saveIcon from '../../../../resources/saveIcon.png'
import startIcon from '../../../../resources/startIcon.png'
import terminalIcon from '../../../../resources/terminalIcon.png'
import toggleOffIcon from '../../../../resources/toggleOffIcon.png'
import toggleOnIcon from '../../../../resources/toggleOnIcon.png'
import folderIcon from '../../../../resources/folderIcon.png'
import DefaultIcon from '../../../../resources/defaultIcon.png'

type ButtonFormProps = {
  size?: number;
  iconName?: string ;
  onClick?: () => void
}

const icons = {
  settings: settingsIcon,
  addCircle: addCircleIcon,
  archive: archiveIcon,
  cancel: cancelIcon,
  close: closeIcon,
  emptyTrash: emptyTrashIcon,
  fullTrash: fullTrashIcon,
  google: googleIcon,
  mainLogo: mainIcon,
  save: saveIcon,
  start: startIcon,
  terminal: terminalIcon,
  toggleOff: toggleOffIcon,
  toggleOn: toggleOnIcon,
  folder: folderIcon,
  default: DefaultIcon
}

function ButtonForm({ size, onClick, iconName }: ButtonFormProps): React.JSX.Element {
  const IconName = iconName ? iconName :"default";
  return (
    <button
      style={{
        width:`clamp(24px, 15vw, ${size}px)`, //height: size,
        height:`clamp(24px, 15vw, ${size}px)`,//width: size,
        flexShrink:0,
        objectFit:'contain',
        backgroundColor: '#4C7DC0',
        borderStyle: 'solid',
        borderColor: '#97DEBF',
        borderWidth: 1,
        borderRadius: 3,
        cursor: 'pointer',
        padding: 0,
      }}
      onClick={onClick}
    >
      <img
        src={icons[IconName] || icons.default}
        style={{
          height: `clamp(24px, 15vw, ${size}px)`,
          width: `clamp(24px, 15vw, ${size}px)`,
          flexShrink:0,
          objectFit:'contain',
          padding: 0
        }}
      />
    </button>
  )
}

export default ButtonForm
