// export type PeopleType  = KeyValuePair;
export type FilterType = "name" | "email" | "address" | "location" | "status"

export type PeopleEditKeyType = "email" | "address" | "location" | "dob"

export interface PeopleType {
    id: string;
    name: string;
    dob?: string;
    email: string;
    address?: string;
    location?: string;
    status?: string;
    avatarUrl?: string;
}

// export interface PeoplePageStateType {
//     filteredPeople: DataGridRows[];
// }

// export interface PeoplePageActionType {
//     type: string;
//     payload: DataGridRows[];
// }

export type DropdownOptionType<V, I> = {
    value: V;
    item: I;
}

export type DataGridColumns = {
    field: string;
    headerName: string;
    align?: string;
    sortable?: boolean;
}

export interface KeyValuePair {
    [key: string]: string;
}

export interface DataGridRows extends KeyValuePair {
}

export interface DataGridProps {
    rows: DataGridRows[];
    columns: DataGridColumns[];
    rowsPerPage?: number;
    onViewClickHandler: (personId: string) => void;
}

export interface MyKnownError {
    errorMessage: string
}