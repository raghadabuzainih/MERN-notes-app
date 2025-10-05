export interface shared{
    _id: string,
    created_at: string,
    updated_at: string
}

//excluded when add new item or update
export type excludedTypes = '_id' | 'created_at' | 'updated_at'