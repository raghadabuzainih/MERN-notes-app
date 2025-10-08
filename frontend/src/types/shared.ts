export interface shared{
    _id: string,
    createdAt: string,
    updatedAt: string
}

//excluded when add new item or update
export type excludedTypes = '_id' | 'createdAt' | 'updatedAt'