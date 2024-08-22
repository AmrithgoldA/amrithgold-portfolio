import axios from "axios";

const client = async(url: string, method: string, body: any ) => {

    let config: any = {
        url: `http://localhost:3001${url}`,
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