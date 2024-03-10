import axios from 'axios'
import appConfig from 'configs/app.config'
import { TOKEN_TYPE, REQUEST_HEADER_AUTH_KEY } from 'constants/api.constant'
import { PERSIST_STORE_NAME } from 'constants/app.constant'
import deepParseJson from 'utils/deepParseJson'
import store from '../store'
import { onSignOutSuccess } from '../store/auth/sessionSlice'
const CryptoJS = require("crypto-js");

const unauthorizedCode = [401]
// const BASE_API_URL = process.env.REACT_APP_URL_EXPO

// const BaseService = axios.create({
//     timeout: 60000,
//     baseURL: BASE_API_URL,
// })

const BaseService = axios.create({
    timeout: 60000,
    baseURL: appConfig.apiPrefix,
})

BaseService.interceptors.request.use(
    (config) => {
        const rawPersistData = localStorage.getItem(PERSIST_STORE_NAME)
        const persistData = deepParseJson(rawPersistData)

        let accessToken = persistData.auth.session.token

        // const REQUEST_HEADER_AUTH_KEY = `MKEY ${process.env.REACT_APP_MKEY}`
        // let user_cid = process.env.REACT_APP_USER_EXPO
        // let user_pass = process.env.REACT_APP_USER_EXPO_PASSWORD
        // let base_v_url = process.env.REACT_APP_URL_EXPO
        // let secret = process.env.REACT_APP_SECRET_KEY_HASH
        // let secret_for_pass = process.env.REACT_APP_SECRET_KEY_PASSWORD

        // let ts = Math.floor(Date.now() / 1000);
        // let url = base_v_url + config.url;
        // let hash = CryptoJS.SHA256(url + ts + secret)        
        // let hash_pass = CryptoJS.SHA256(user_pass + secret_for_pass).toString()

        // console.log("Date now", Date.now()/1000, ts)        

        if (!accessToken) {
            const { auth } = store.getState()
            accessToken = auth.session.token
        }

        if (accessToken) {
            config.headers[
                REQUEST_HEADER_AUTH_KEY
            ] = `${TOKEN_TYPE}${accessToken}`
        }
        // config.headers['Accept'] = '*/*'
        // config.headers['Content-Type'] = 'application/json'

        // config.headers['Authorization'] = REQUEST_HEADER_AUTH_KEY;
        // config.headers['x-yak-user-pass'] = user_cid + '|' + hash_pass
        // config.headers['x-yak-timestamp'] = ts
        // config.headers['x-yak-signature'] = hash

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

BaseService.interceptors.response.use(
    (response) => response,
    (error) => {
        const { response } = error

        if (response && unauthorizedCode.includes(response.status)) {
            store.dispatch(onSignOutSuccess())
        }

        return Promise.reject(error)
    }
)

export default BaseService
