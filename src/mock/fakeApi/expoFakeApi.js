import wildCardSearch from 'utils/wildCardSearch'
import sortBy from 'utils/sortBy'
import paginate from 'utils/paginate'

export default function expoFakeApi(server, apiPrefix) {
    server.get(`${apiPrefix}/dashboard`, (schema) => {
        return schema.db.expoDashboardData[0]
    })

    server.put(
        `${apiPrefix}/status/online-ordering`,
        (schema, { requestBody }) => {
            const data = JSON.parse(requestBody)
            schema.db.expoDashboardData.update('1', data)
            return true
        }
    )

    server.post(`${apiPrefix}/alerts`, (schema, { requestBody }) => {
        const body = JSON.parse(requestBody)
        const { pageIndex, pageSize, sort, query, type } = body
        const { order, key } = sort
        const alerts = schema.db.expoAlerts
        let sanitizeAlerts = alerts.filter((elm) => typeof elm !== 'function')
        switch (type) {
            case 'all':
                break
            case 'unread':
                sanitizeAlerts = sanitizeAlerts.filter((alert) => alert.read)
                break
            default:
                break
        }

        let data = sanitizeAlerts
        let total = alerts.length

        if (query) {
            data = wildCardSearch(data, query)
            total = data.length
        }

        data = paginate(data, pageSize, pageIndex)

        const responseData = {
            data: data,
            total: total,
        }
        return responseData
    })

    server.get(`${apiPrefix}/orders/live`, (schema, request) => {
        const { pageIndex, pageSize, sort, query, type } = request.queryParams
        const { order, key } = sort
        const db = schema.db.expoOrders
        let data = db
        let total = data.length
        if (query) {
            data = wildCardSearch(data, query)
            total = data.length
        }

        data = paginate(data, pageSize, pageIndex)
        const responseData = {
            data: data,
            total: total,
        }

        return responseData
    })

    server.get(`${apiPrefix}/orders/:id`, (schema, request) => {
        const id = request.params.id
        const db = schema.db.expoOrders
        let idx = db.findIndex((elm) => elm.orderId === id)
        const responseData = {
            data: [],
        }
        if (idx != -1) responseData.data = db[idx].items
        console.log(db[idx].items)
        return responseData
    })
}
