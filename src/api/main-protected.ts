import HttpClientProtected from './http-client-protected';

export interface createCompany {
  name:string
}

export interface postBotsRun {
  organizationId: string,
  botId: number,
  bankQuantity: number,
  commentPhrase: string,
  errorPhrase:string
}

export default class MainProtected extends HttpClientProtected {
  private static instanceCached: MainProtected;

  private constructor() {
    super(process.env.BASE_URL);
  }

  static getInstance = () => {
    if (!MainProtected.instanceCached) {
      MainProtected.instanceCached = new MainProtected();
    }

    return MainProtected.instanceCached;
  };

  // public getUserInfo = () => this.instance.get<User>('/admin');

}
