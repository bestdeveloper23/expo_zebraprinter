export const expoDashboardData = {
    id: "1",
    user: {
        id: 'e2738e1305954a409b9027c1a5dcb8e6',
        name: 'YML Demo User',
        default_store_id: '11',
        updat: '1709633510',
    },
    store: {
        id: '11',
        name: 'Demo',
    },
    settings: {
        from_mins: 20,
        orderby: 'number',
        orderdir: 'asc',
    },
    alerts: [
        {
            type: 'warning',
            message: 'Product ABC is out of stock',
            read: false,
        },
        {
            type: 'info',
            message: 'Shift closes at 5pm today',
            read: false,
        },
        {
            type: 'error',
            message:
                'The system was unable to process the last order. Please contact IT department.',
            read: false,
        },
    ],
    orders_count: {
        total: 171,
        local: 55,
        app: 28,
        delivery: 27,
    },
    status: {
        'online-ordering-enabled': true,
        'break-enabled': false,
        message:
            'Online ordering is disabled due to maintenance. Please contact IT department.',
    },
}

export const expoAlerts = [
    {
        "type": "warning",
        "message": "Product ABC is out of stock",
        "read": false
    },
    {
        "type": "info",
        "message": "Shift closes at 5pm today",
        "read": false
    },
    {
        "type": "error",
        "message": "The system was unable to process the last order. Please contact IT department.",
        "read": false
    }
]