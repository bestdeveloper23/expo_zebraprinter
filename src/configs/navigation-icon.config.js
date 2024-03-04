import React from 'react'
import {
    HiOutlineColorSwatch,
    HiOutlineDesktopComputer,
    HiOutlineTemplate,
    HiOutlineViewGridAdd,
    HiOutlineHome,
    HiClipboardList,
    HiOutlineCake,
    HiOutlineShieldCheck,
    HiOutlineChartSquareBar
} from 'react-icons/hi'

const navigationIcon = {
    orders: <HiClipboardList />,
    inventory: <HiOutlineCake />,
    availability: <HiOutlineShieldCheck />,
    appliances: <HiOutlineTemplate />,
    history: <HiOutlineChartSquareBar />,
    home: <HiOutlineHome />,
    singleMenu: <HiOutlineViewGridAdd />,
    collapseMenu: <HiOutlineTemplate />,
    groupSingleMenu: <HiOutlineDesktopComputer />,
    groupCollapseMenu: <HiOutlineColorSwatch />,
}

export default navigationIcon
