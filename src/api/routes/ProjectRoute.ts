import client from "../client";

async function getProjectsDetails() {

    try {
        const response = await client('/portfolio/getprojectdetails', 'GET', '');
        
        return response

    } catch (error) {
        console.error('An error occurred:', error);
    }

}

export { getProjectsDetails }
