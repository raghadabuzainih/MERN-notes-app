import { shared } from "./shared";

export interface Note extends shared{
    title: string,
    content: string,
    user_id: string,
}