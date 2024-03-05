import React from 'react'
import authRoute from './authRoute'

export const publicRoutes = [...authRoute]

export const protectedRoutes = [
    {
        key: 'orders',
        path: '/orders',
        component: React.lazy(() => import('views/sales/OrderList')),
        authority: [],
    },
    {
        key: 'orderdetails',
        path: '/order-details/:orderId',
        component: React.lazy(() => import('views/sales/OrderDetails')),
        authority: [],
    },
    {
        key: 'inventory',
        path: '/inventory',
        component: React.lazy(() => import('views/sales/ProductList')),
        authority: [],
    },
    {
        key: 'inventoryEdit',
        path: '/product-edit/:productId',
        component: React.lazy(() => import('views/sales/ProductEdit')),
        authority: [],
        meta: {
            header: 'Edit Product',
        },
    },
    {
        key: 'availability',
        path: '/availability',
        component: React.lazy(() => import('views/sales/ProductList')),
        authority: [],
    },
    {
        key: 'appliances',
        path: '/appliances',
        component: React.lazy(() => import('views/page/Appliances')),
        authority: [],
    },
    {
        key: 'applianceEdit',
        path: '/product-edit/:productId',
        component: React.lazy(() => import('views/sales/ProductEdit')),
        authority: [],
        meta: {
            header: 'Edit Appliance',
        },
    },
    {
        key: 'history',
        path: '/orderhistory',
        component: React.lazy(() => import('views/page/History')),
        authority: [],
    },
]
