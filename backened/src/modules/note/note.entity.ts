import { Document, Types } from "mongoose";
export interface Note extends Document{
    title: string,
    content: string,
    user_id: Types.ObjectId
}