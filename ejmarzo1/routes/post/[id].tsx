import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import PostModel from "../../db/schema.tsx"
import { post } from "../../types.tsx";

type result={
    post?:post
    error?:string
}


export const handler:Handlers = {
    GET:async(req:Request,ctx:FreshContext<result>) =>{
        const {id}=ctx.params
        if(!id)throw new Error("Falta ID")
        try {
            const res = await PostModel.findById({_id:id})
            const post = res as post
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
            <h1>{props.data.post?.title}</h1>
            <h2>{props.data.post?.autor}</h2>
            <text>{props.data.post?.content}</text>
            
            <a href={"../posts"} ><button>Volver</button></a>
            
        </div>
    );
}

export default Page;