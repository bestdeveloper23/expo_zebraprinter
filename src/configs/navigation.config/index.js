import {
    NAV_ITEM_TYPE_TITLE,
    NAV_ITEM_TYPE_COLLAPSE,
    NAV_ITEM_TYPE_ITEM,
} from 'constants/navigation.constant'

const navigationConfig = [
    {
        key: 'orders',
        path: '/orders',
        title: 'Orders',
        translateKey: 'nav.orders',
        icon: 'orders',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
    },
    {
        key: 'inventory',
        path: '/inventory',
        title: 'Inventory',
        translateKey: 'nav.inventory',
        icon: 'inventory',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
    },
    {
        key: 'availability',
        path: '/availability',
        title: 'Availability',
        translateKey: 'nav.availability',
        icon: 'availability',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
    },
    {
        key: 'appliances',
        path: '/appliances',
        title: 'Appliances',
        translateKey: 'nav.appliances',
        icon: 'appliances',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
    },
    {
        key: 'history',
        path: '/orderhistory',
        title: 'History',
        translateKey: 'nav.orderhistory',
        icon: 'history',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
    },
]

export default navigationConfig
