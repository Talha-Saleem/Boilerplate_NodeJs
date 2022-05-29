

export enum UserRoles{
    admin='admin',
    user='user',
    premiumUser='premiumUser'
}

export interface User{
    email?:string,
    role?:string,
    uid?:string

}
