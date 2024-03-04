import React from 'react'
import authRoute from './authRoute'

export const publicRoutes = [...authRoute]

export const protectedRoutes = [
    {
        key: 'orders',
        path: '/orders',
        component: React.lazy(() => import('views/page/Orders')),
        authority: [],
    },
    {
        key: 'inventory',
        path: '/inventory',
        component: React.lazy(() => import('views/page/Inventory')),
        authority: [],
    },
    {
        key: 'availability',
        path: '/availability',
        component: React.lazy(() => import('views/page/Availability')),
        authority: [],
    },
    {
        key: 'appliances',
        path: '/appliances',
        component: React.lazy(() => import('views/page/Appliances')),
        authority: [],
    },
    {
        key: 'history',
        path: '/orderhistory',
        component: React.lazy(() => import('views/page/History')),
        authority: [],
    },
]
