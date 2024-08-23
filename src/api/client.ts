import axios from "axios";

const client = async(url: string, method: string, body: any ) => {

    let config: any = {
        url: `https://amrith-portfolio-backend.onrender.com${url}`,
        method: method,
        header:{
            "content-type": 'application/json'
        },
        data: body
    }

    const response = axios(config)

    return response
}

export default client;
