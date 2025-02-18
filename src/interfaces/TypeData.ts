export interface TypeData {
    id: string;
    types: TypeData[];
}

export interface TypeItem {
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