import { client } from '../client'

const getSkillsData = async() => {
    const response = client('/portfolio/userskills', 'GET', "")

    return response
}

export { getSkillsData }