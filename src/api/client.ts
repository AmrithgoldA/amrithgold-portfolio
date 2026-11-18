import axios from "axios";

const BASE_URL = "https://amrith-portfolio-backend.vercel.app";

// A cold serverless start or a dropped database connection can make a single request fail or hang.
// Reads are retried with a short backoff; writes (the contact form) are sent once so a message is
// never delivered twice.
const REQUEST_TIMEOUT_MS = 12000;
const READ_RETRY_DELAYS_MS = [1000, 3000];

const isRetryable = (error: any) => {
    if (!axios.isAxiosError(error)) return false;
    const status = error.response?.status;
    // No response at all (network error or timeout), or a server-side failure
    return status === undefined || status >= 500;
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const client = async (url: string, method: string, body: any) => {

    const config: any = {
        url: `${BASE_URL}${url}`,
        method: method,
        headers: {
            "content-type": 'application/json'
        },
        data: body,
        timeout: REQUEST_TIMEOUT_MS
    }

    const retryDelays = method.toUpperCase() === "GET" ? READ_RETRY_DELAYS_MS : [];

    for (let attempt = 0; ; attempt++) {
        try {
            return await axios(config);
        } catch (error) {
            if (attempt >= retryDelays.length || !isRetryable(error)) throw error;
            await sleep(retryDelays[attempt]);
        }
    }
}

export default client;
