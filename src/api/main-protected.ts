import HttpClientProtected from './http-client-protected';



export interface UserResponse {
 email: string;
 id: number;
 firstName: string;
 lastName: string;
 phone: string;
 avatar?: string;
}

export type Observations = {
    clock_at_from: null | string
    clock_to: null |string
    continuous: string
    distance: number
    id: string
    joint: string
    pacp_code: string
    remarks: string
    value1st_dimension: null | string
    value2nd_dimension: null | string
    value_percent: null | string
}
export type Inspection =  {
    date: any,
    finishedAt: any,
    id:string,
    source :{
        certificate_number: string
        city: string
        observations: Array<Observations>
        comments: string
        coordinate_system: string
        customer: string
        date:string
        date_cleaned: any
        direction: string
        down_grade_to_invert: string
        down_rim_to_grade: string | null
        down_rim_to_invert: null | string
        downstream_ap: string
        drainage_area: string
        easting: string
        elevation: string
        flow_control: string
        gps_accuracy: string
        height: number
        inspection_timestamp: string
        length_surveyed: number
        lining_method: string
        location_code: string
        location_details: string
        material: string
        media_label: string
        northing: string
        owner: string
        pipe_joint_length: null | string
        pipe_segment_reference: string
        po_number: string
        pre_cleaning: string
        pressure_value: null | string
        project: string
        purpose: string
        sewer_category: string
        sewer_use: string
        shape: string
        street: string
        surveyed_by: string
        time: string
        total_length: null | string
        up_grade_to_invert: null | string
        up_rim_to_grade: null | string
        up_rim_to_invert: null | string
        upstream_ap: string
        weather: string
        width: null | number
        work_order: string
        year_laid: null | string
        year_renewed: null | string
    }
}

export interface AssetsResponse {
    assets: {
        data: Array<{
            activeProjects: Array<any>,
            fieldType: string,
            id:string,
            checkbox?: boolean
            inspectionCount: number,
            inspections:Array<Inspection>
            lastInspected: null | string,
            projects: any,
            source :{
                certificate_number: string
                city: string
                observations: Array<Observations>
                comments: string
                coordinate_system: string
                customer: string
                date:string
                date_cleaned: any
                direction: string
                down_grade_to_invert: string
                down_rim_to_grade: string | null
                down_rim_to_invert: null | string
                downstream_ap: string
                drainage_area: string
                easting: string
                elevation: string
                flow_control: string
                gps_accuracy: string
                height: number
                inspection_timestamp: string
                length_surveyed: number
                lining_method: string
                location_code: string
                location_details: string
                material: string
                media_label: string
                northing: string
                owner: string
                pipe_joint_length: null | string
                pipe_segment_reference: string
                po_number: string
                pre_cleaning: string
                pressure_value: null | string
                project: string
                purpose: string
                sewer_category: string
                sewer_use: string
                shape: string
                street: string
                surveyed_by: string
                time: string
                total_length: null | string
                up_grade_to_invert: null | string
                up_rim_to_grade: null | string
                up_rim_to_invert: null | string
                upstream_ap: string
                weather: string
                width: null | number
                work_order: string
                year_laid: null | string
                year_renewed: null | string
            }

            systemIndexId: {
                upstream_ap:string,
                downstream_ap:string,
            }
        }>
    }
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

    public getOrganizationAssets = (organizationId:string, page:string, limit: string) => this.instance.get<AssetsResponse>(`/organisation/${organizationId}/assets`, {
        params: {
            page,
            limit,
        }
    });

    public getUserInfo = (organizationId:string) => this.instance.get<UserResponse>(`/users/${organizationId}`);


}
