export default interface IApplicationUser {
    userId: string; // UUID
    username: string;
    name: string;
    email: string;
    firstName: string;
    lastName: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    address: string;
    dateOfBirth: Date | string; // ISO date format
    age: number;
    homePhone: string;
    mobilePhone: string;
    website: string;
    createdAt: Date | string; // ISO date format
    modifiedAt: Date | string; // ISO date format
}

export interface IApplicationUserForm {
    userId: string; // UUID
    name: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    dateOfBirth: Date | string; // ISO date format
    homePhone: string;
    mobilePhone: string;
    website: string;
}