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
import halfHourIcon from '../../../../resources/halfHourIcon.png'
import oneHourIcon from '../../../../resources/oneHourIcon.png'
import twelveHoursIcon from '../../../../resources/twelveHoursIcon.png'
import thirtyDaysIcon from '../../../../resources/thirtyDaysIcon.png'
import oneMonthIcon from '../../../../resources/oneMonthIcon.png'
import DefaultIcon from '../../../../resources/defaultIcon.png'

type ButtonFormProps = {
  size?: number;
  iconName?: string ;
  onClick?: () => void
  onRightClick?: () => void
  title?: string
  //onRiht
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
  halfHour:halfHourIcon,
  oneHour: oneHourIcon,
  twelveHours: twelveHoursIcon,
  thirtyDays: thirtyDaysIcon,
  oneMonth: oneMonthIcon,
  default: DefaultIcon
}

function ButtonForm({ size, onClick, iconName, onRightClick, title }: ButtonFormProps): React.JSX.Element {
  const IconName = iconName ? iconName :"default";
  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>): void => {
    if(e.button === 0){
      //left button
      onClick?.()
    }else if (e.button === 2) {
      //right button
      onRightClick?.()
    }
  }
  return (
    <button
      title={title}
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
      //onClick={onClick}
      onMouseDown={handleMouseDown}
      onContextMenu={(e) => e.preventDefault()}
      
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
