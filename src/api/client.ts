import axios from "axios";

const client = async(url: string, method: string, body: any ) => {

    let config: any = {
        url: `https://amrith-portfolio-backend-p4slpv08m-amrithgoldas-projects.vercel.app${url}`,
        method: method,
        headers:{
            "content-type": 'application/json'
        },
        data: body
    }

    const response = await axios(config)

    return response
}

export default client;