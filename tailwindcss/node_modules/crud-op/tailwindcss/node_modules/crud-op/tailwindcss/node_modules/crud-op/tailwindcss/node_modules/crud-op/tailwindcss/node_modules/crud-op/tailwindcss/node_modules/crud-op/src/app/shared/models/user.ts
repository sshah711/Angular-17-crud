export interface ApiResponses<T>{
    message?: string;
    data: T ;
}

export interface IUser{
    _id?: string;
    name: string;
    email: string;
    mobile: string;
    dob: string;
    doj: string;
}