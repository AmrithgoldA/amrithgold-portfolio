import { contactInfoType } from '../../types/contactType'
import client from '../client'

async function getSocialLinks() {
    const response = await client('/portfolio/sociallinks','GET','')
    return response
}

async function sendEmail(contactDetails: contactInfoType) {

    try {
        const response = await client('/portfolio/sendmail', 'POST', contactDetails);
        
        return response

    } catch (error) {
        console.error('An error occurred:', error);
    }

}

export {
    getSocialLinks,
    sendEmail
}