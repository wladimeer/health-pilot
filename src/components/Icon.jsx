import { HiChartPie, HiCog, HiUserGroup, HiDeviceMobile } from 'react-icons/hi'
import { HiOutlineMinusSm, HiOutlinePlusSm, HiChevronRight } from 'react-icons/hi'
import { HiArrowSmLeft, HiArrowSmRight, HiChevronLeft } from 'react-icons/hi'
import { HiOutlineViewList, HiOutlinePencilAlt, HiX } from 'react-icons/hi'
import { HiChevronDoubleLeft, HiChevronDoubleRight, HiHome } from 'react-icons/hi'
import { cloneElement } from 'react'

const Icon = ({ icon, size = 5, isButton = false }) => {
  const ICONS = {
    hiChartPie: <HiChartPie className="" />,
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
    hiHome: <HiHome />
  }

  const iconElement = ICONS[icon]

  return cloneElement(iconElement, {
    className: `w-${size} h-${size} ${isButton && 'cursor-pointer'}`
  })
}

export default Icon
