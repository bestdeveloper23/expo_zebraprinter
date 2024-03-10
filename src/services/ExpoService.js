import ApiService from './ApiService'

export async function apiGetExpoDashboardData(data) {
    return ApiService.fetchData({
        url: '/dashboard',
        method: 'get',
        data,
    })
}

export async function apiUpdateExpoStatus(data) {
    return ApiService.fetchData({
        url: '/status/online-ordering',
        method: 'put',
        data,
    })
}

export async function apiGetExpoAlerts(data) {
    return ApiService.fetchData({
        url: '/alerts',
        method: 'post',
        data,
    })
}

export async function apiGetExpoApplianceList(data) {
    return ApiService.fetchData({
        url: '/appliances',
        method: 'get',
        data,
    })
}

export async function apiUpdateExpoApplianceStatus(reqdata) {
    const data = reqdata.data
    return ApiService.fetchData({
        url: `/appliances/${reqdata.id}`,
        method: 'put',
        data,
    })
}

export async function apiGetExpoProductInventoryList(data) {
    return ApiService.fetchData({
        url: '/products/inventory',
        method: 'get',
        data,
    })
}

export async function apiUpdateExpoProductInventory(reqdata) {
    const data = reqdata.data
    return ApiService.fetchData({
        url: `/products/inventory/${reqdata.id}`,
        method: 'put',
        data,
    })
}

export async function apiGetExpoProductAvailability(data) {
    return ApiService.fetchData({
        url: '/products/availability',
        method: 'get',
        data,
    })
}

export async function apiUpdateExpoProductAvailability(reqdata) {
    const data = reqdata.data
    return ApiService.fetchData({
        url: `/products/availability/${reqdata.id}`,
        method: 'put',
        data,
    })
}

export async function apiGetExpoCurrentUser(data) {
    return ApiService.fetchData({
        url: '/users/current',
        method: 'get',
        data,
    })
}

export async function apiGetExpoLiveOrders(data) {
    return ApiService.fetchData({
        url: '/orders/live',
        method: 'get',
        data,
    })
}

export async function apiGetExpoHistoryOrders(data) {
    return ApiService.fetchData({
        url: '/orders/historical',
        method: 'get',
        data,
    })
}

export async function apiGetExpoOrderDetail(reqdata) {
    const data = reqdata.data
    return ApiService.fetchData({
        url: `/orders/${reqdata.id}`,
        method: 'get',
        data,
    })
}

export async function apiGetExpoOrderPrint(reqdata) {
    const data = reqdata.data
    return ApiService.fetchData({
        url: `/orders/${reqdata.id}/print`,
        method: 'get',
        data,
    })
}

export async function apiUpdateExpoOrderRowRemake(reqdata) {
    const data = reqdata.data
    return ApiService.fetchData({
        url: `/orders/${reqdata.order}/rows/${reqdata.row}/remake`,
        method: 'put',
        data,
    })
}

export async function apiUpdateExpoOrderRowReplace(reqdata) {
    const data = reqdata.data
    return ApiService.fetchData({
        url: `/orders/${reqdata.order}/rows/${reqdata.row}/replace`,
        method: 'put',
        data,
    })
}

export async function apiUpdateExpoOrderRowRefund(reqdata) {
    const data = reqdata.data
    return ApiService.fetchData({
        url: `/orders/${reqdata.order}/rows/${reqdata.other}/refund`,
        method: 'put',
        data,
    })
}