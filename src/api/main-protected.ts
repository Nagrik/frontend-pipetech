import HttpClientProtected from './http-client-protected';



export interface UserResponse {
 email: string;
 id: number;
 firstName: string;
 lastName: string;
 phone: string;
 avatar?: string;
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

    public createUser = (body:any) => this.instance.post<UserResponse>('/users', body);

    public addUserToOrganization = (id: string, body: { roles: string[] }) => this.instance.post<UserResponse>(`/organisation/1/add-user/${id}`, body);

    public getOrganizationInfo = () => this.instance.get<UserResponse>(`/organisation/1`);

    public getUserInfo = (organizationId:string) => this.instance.get<UserResponse>(`/users/${organizationId}`);




}
