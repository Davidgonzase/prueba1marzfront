import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import PostModel from "../../db/schema.tsx"

type result={
    error?:string
}


export const handler:Handlers = {
    GET:async(req:Request,ctx:FreshContext<result>) =>{
        return ctx.render({})
    },
    POST:async(req:Request,ctx:FreshContext<result>) => {
        try{
            const form = await req.formData();
            const data ={
                title:form.get("title"),
                autor:form.get("autor"),
                content:form.get("content")
            }
            if(!data.title||!data.autor||!data.content)throw new Error("Faltan datos")
            const post = await PostModel.create(data)
            return new Response("", {
                status: 303,
                headers: {
                "Location": `../post/${post.id}`,
                },
            });
        }catch(error){
            return ctx.render({error:error.message})
        }
    }
}

const Page = (props:PageProps<result>) =>{
    return(
        <div class="formu">
            <h1>ADD POST</h1>
            <div>
            <form action="/add" method="post">
                <text>Titulo</text>
                <input type="text" name="title" placeholder="Titulo" />
                <text>Autor</text>
                <input type="text" name="autor" placeholder="Autor" />
                <text>Content</text>
                <input class="content" type="text" name="content" placeholder="Content" />
                <button type="submit">Publish</button>
            </form>
            </div>
        </div>
    );
}

export default Page;