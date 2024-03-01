import { PageProps } from "$fresh/server.ts"
import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";

import mongoose from "mongoose"
const env = await load(); 
const MONGO_URL = env.MONGO_URL || Deno.env.get("MONGO_URL"); 

if(!MONGO_URL){
    console.log("Falta MONGO_URL")
    Deno.exit()
}

try { // Conexion con mongo DB 
  await mongoose.connect(MONGO_URL)
  console.log("Conexión exitosa a MongoDB");
} catch (error) {
  console.error("Error al conectar a MongoDB:", error);
  Deno.exit()
}

const Layout = (props:PageProps) => {
    const Component = props.Component
    return(<div class="main">
            <div class="menu">
                <div class="bts">
                    <a href="/posts"><button >Posts</button></a>
                    <a href="/add"><button >Add</button></a>
                </div>
                <div>
                    <p>@2024</p>
                    <p>Nebrija</p>
                    <br/>
                </div>
            </div>
            <Component/>
        </div>  
    );
}

export default Layout;