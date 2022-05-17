import axios, { AxiosInstance, AxiosRequestHeaders } from 'axios'

class HttpService {
    private static instance: HttpService
    private client: AxiosInstance

    constructor() {
        /*
        Cuando lo dockericemos, le tenemos que pegar a http://app/, tal como hice en el bot
        Esto seria asi porque cuando lo dockerizas, y agregar la dependencia en el docker compose,
        se agrega una entrada en el /etc/resolv.conf si mal no me acuerdo con la IP del container ese que es dependencia y el puerto donde estaria levantado el servicio
        cuestion que vos le pegas a eso, y cuando se hace el dns lookup, primero se busca en ese archivo a ver que onda, y se reemplaza el valor de ese nombre
        yo digo de que hagamos algo asi

        ** .env
        REACT_APP_BACKEND_NAME=app

        ** this file
        const apiUrl = `http://${process.env.REACT_APP_BACKEND_NAME}:${REACT_APP_BACKEND_PORT}/`
        algo asi hcie con el bot
        */
        const apiURL =
            process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080/'
        this.client = axios.create({
            baseURL: apiURL,
        })
    }

    public static getInstance(): HttpService {
        if (!HttpService.instance) {
            HttpService.instance = new HttpService()
        }

        return HttpService.instance
    }

    public httpGet(path: string, params?: any) {
        return this.client.get(path, {
            headers: this.headers(),
            params: params,
        })
    }

    public httpPost(path: string, body: any) {
        return this.client.post(path, body, {
            headers: this.headers(),
        })
    }

    public httpPut(path: string, body: any) {
        return this.client.put(path, body, {
            headers: this.headers(),
        })
    }

    public httpDelete(path: string) {
        return this.client.delete(path, {
            headers: this.headers(),
        })
    }

    public httpPatch(path: string, body: any) {
        return this.client.patch(path, body, {
            headers: this.headers(),
        })
    }

    public httpPostWithoutHeaders(path: string, body: any) {
        return this.client.post(path, body)
    }

    public headers(): AxiosRequestHeaders | undefined {
        const jwt = localStorage.getItem('jwt')

        return {
            Authorization: `Bearer ${jwt}`,
        }
    }
}

export default HttpService.getInstance()
