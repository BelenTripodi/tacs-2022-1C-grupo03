import axios, {  AxiosInstance, AxiosRequestHeaders } from "axios";

class HttpService{
  private static instance: HttpService;
  private client: AxiosInstance;
  
  constructor(){
    const apiURL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8080/";
    this.client = axios.create({
      baseURL: apiURL
    })
  }

  public static getInstance(): HttpService{
    if(!HttpService.instance){
      HttpService.instance = new HttpService();
    }

    return HttpService.instance;
  }

  public httpGet(path: string,params?: any){
    return this.client.get(path, {
      headers: this.headers(),
      params: params
    });
  }

  public httpPost(path: string,body: any){
    return this.client.post(path,body,{
      headers: this.headers()
    })
  }

  public httpPut(path: string,body: any){
    return this.client.put(path,body,{
      headers: this.headers()
    })
  }

  public httpDelete(path: string){
    return this.client.delete(path,{
      headers: this.headers()
    })
  }

  public httpPatch(path: string,body: any){
    return this.client.patch(path,body,{
      headers: this.headers()
    })
  }

  public httpPostWithoutHeaders(path: string,body: any){
    return this.client.post(path,body);
  }

  public headers(): AxiosRequestHeaders | undefined {
      const jwt = localStorage.getItem("jwt");

      return {
        "Authorization": `Bearer ${jwt}`
      }
  }
}


export default HttpService.getInstance();
