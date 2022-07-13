import axios, { AxiosInstance, AxiosResponse } from 'axios';
import TokensLocalStorage from '@/local-storage/TokensLocalStorage';
import Main from '@/api/main';

interface CustomResponse extends AxiosResponse<{
  code: number;
  data: any;
  status: string;
}> {}

abstract class HttpClient {
  protected readonly instance: AxiosInstance;

  public constructor(baseURL: string | undefined) {
    this.instance = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
      paramsSerializer: (args):any => `${Object.entries(args).map(([key, value]) => `${key}=${value}`).join('&')}`,
    });

    this.initializeResponseInterceptor();
  }

  private initializeResponseInterceptor = () => {
    this.instance.interceptors.response.use(this.handleSuccessResponse, this.handleResponseError);
  };

  private handleSuccessResponse = (response: CustomResponse) => response.data.data;

  private handleResponseError = async (e: any): Promise<any> => {
    const status = e.response ? e.response.status : null;
    const tokens = TokensLocalStorage.getInstance();
    const main = Main.getInstance();
    const currentRefreshToken = tokens.getRefreshToken();
    if (status === 401 && currentRefreshToken) {
      try {
        const { accessToken, refreshToken } = await main
          .refresh({ refreshToken: currentRefreshToken });
        tokens.setAccessToken(accessToken);
        tokens.setRefreshToken(refreshToken);
        e.config.headers.Authorization = `Bearer ${accessToken}`;
        const { data } = await axios.request(e.config);
        return data.data;
      } catch (_) {
        tokens.clear();
        return Promise.reject(e);
      }
    }
    return Promise.reject(e);
  };
}

export default HttpClient;
