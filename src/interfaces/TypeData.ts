export interface TypesResponse {
    States: TypeGroup;
    Genders: TypeGroup;
}

export interface TypeGroup {
    id: number;
    name: string;
    description: string;
    version: number;
    data: TypeListItem[];
    lastUpdated: string | null;
}

export interface TypeListItem {
    id: number;
    value: string;
}