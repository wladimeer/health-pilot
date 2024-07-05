import { HiChartPie, HiCog, HiUserGroup, HiDeviceMobile } from 'react-icons/hi'
import { HiOutlineMinusSm, HiOutlinePlusSm, HiChevronRight } from 'react-icons/hi'
import { HiArrowSmLeft, HiArrowSmRight, HiChevronLeft } from 'react-icons/hi'
import { HiOutlineViewList, HiOutlinePencilAlt, HiX } from 'react-icons/hi'
import { HiChevronDoubleLeft, HiChevronDoubleRight, HiHome } from 'react-icons/hi'
import { HiOutlineLogout } from 'react-icons/hi'
import { cloneElement } from 'react'

const Icon = ({ icon, size = 5, isButton = false, color = 'black' }) => {
  const ICONS = {
    hiChartPie: <HiChartPie />,
    hiCog: <HiCog />,
    hiUserGroup: <HiUserGroup />,
    hiDeviceMobile: <HiDeviceMobile />,
    hiArrowSmLeft: <HiArrowSmLeft />,
    hiArrowSmRight: <HiArrowSmRight />,
    hiChevronLeft: <HiChevronLeft />,
    hiChevronRight: <HiChevronRight />,
    hiChevronDoubleLeft: <HiChevronDoubleLeft />,
    hiChevronDoubleRight: <HiChevronDoubleRight />,
    hiOutlineViewList: <HiOutlineViewList />,
    hiOutlinePencilAlt: <HiOutlinePencilAlt />,
    hiX: <HiX />,
    hiOutlineMinusSm: <HiOutlineMinusSm />,
    hiOutlinePlusSm: <HiOutlinePlusSm />,
    hiHome: <HiHome />,
    hiOutlineLogout: <HiOutlineLogout />
  }

  const iconElement = ICONS[icon]

  return cloneElement(iconElement, {
    color: color,
    className: `w-${size} h-${size} ${isButton && 'cursor-pointer'}`,
    'data-testid': icon
  })
}

export default Icon
