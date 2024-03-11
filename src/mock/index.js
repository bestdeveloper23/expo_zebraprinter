import { createServer } from 'miragejs'
import appConfig from 'configs/app.config'

import { signInUserData } from './data/authData'
import {
    salesDashboardData,
    productsData,
    ordersData,
    orderDetailsData,
} from './data/salesData'
import { expoDashboardData, expoAlerts, expoOrders } from './data/expoData'

import { authFakeApi, salesFakeApi, expoFakeApi } from './fakeApi'

const { apiPrefix } = appConfig

export default function mockServer({ environment = 'test' }) {
    return createServer({
        environment,
        seeds(server) {
            server.db.loadData({
                signInUserData,               
                productsData,
                ordersData,
                orderDetailsData,
                salesDashboardData,
                expoDashboardData,
                expoAlerts,
                expoOrders
            })
        },
        routes() {
            this.urlPrefix = ''
            this.namespace = ''
            this.passthrough((request) => {
                let isExternal = request.url.startsWith('http')
                return isExternal
            })
            this.passthrough()

            authFakeApi(this, apiPrefix)
            salesFakeApi(this, apiPrefix)
            expoFakeApi(this, apiPrefix)
        },
    })
}
