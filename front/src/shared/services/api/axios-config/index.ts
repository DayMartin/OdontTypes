import axios from "axios";

import { errorInterceptor, responseInterceptor } from "./interceptors/";
import { Environment } from "../../../environment";

axios.defaults.withCredentials = false;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

const Api = axios.create({
    baseURL: Environment.URL_BASE,
    headers: {
       
        'Content-Type': 'application/json',
    }
});

Api.interceptors.response.use(
    (response) => responseInterceptor(response),
    (error) => errorInterceptor(error),
);



export { Api };