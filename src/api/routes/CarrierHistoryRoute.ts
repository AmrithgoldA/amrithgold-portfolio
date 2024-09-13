import client from '../client'

const getSkillsData = async() => {
    const response = client('/portfolio/userskills', 'GET', '')

    return response
}

const getCarrierDetails = async() => {
    try {
        const response = client('/portfolio/carrierDetails', 'GET', '')
        return response
    }
    catch (e) {
        console.log("Error");
        
    }
}

export { getSkillsData, getCarrierDetails }