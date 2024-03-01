import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import PostModel from "../../db/schema.tsx"
import { post } from "../../types.tsx";

type result={
    post?:post[]
    error?:string
}


export const handler:Handlers = {
    GET:async(req:Request,ctx:FreshContext<result>) =>{

        try {
            const res = await PostModel.find()
            const post = res as post[]
            return ctx.render({post:post}) 
        } catch (error) {
            return ctx.render({error:error.message})
        }
    },
}

const Page = (props:PageProps<result>) =>{
    if(props.data.error) return <div><text>{props.data.error}</text></div>
    return(
        <div class="mipost"> 
            {props.data.post?.map(i=>( <><button href={`../post/${i.id}`}>{i.title}/{i.autor}/{i.content}</button></>
            
            ))}
            
        </div>
    );
}

export default Page;