import moongose from "mongoose"
import {post} from "../types.tsx"

const Schema = moongose.Schema;
const Postschema = new Schema(
    {
        title:{type:String,required:true},
        autor:{type:String,unique:true,required:true},
        content:{type:String,required:true},
    },
    {timestamps:true}
)


export type PostModel = moongose.Document & Omit<post,"id">
export default moongose.model<PostModel>("Post",Postschema)