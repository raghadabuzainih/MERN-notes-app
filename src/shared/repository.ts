import { Document, Model } from "mongoose"

export class GenericRepository<T extends Document>{
    private model: Model<T>

    constructor(model: Model<T>){
        this.model = model
    }

    async findAll(): Promise<T[]>{
        return await this.model.find()
    }

    async findById(id: string): Promise<T | null>{
        return await this.model.findById(id)
    }

    async insert(note: Omit<T, '_id'>): Promise<T>{
        return await this.model.create(note)
    }

    async update(id: string, updating: Partial<T>): Promise<T | null>{
        //{new: true} -> to return the newest(updated) version of item
        return await this.model.findByIdAndUpdate(id, updating, {new: true})
    }

    async deleteById(id: string): Promise<T | null>{
        return this.model.findByIdAndDelete(id)
    }
}