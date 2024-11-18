export const getMembers = async () => {
    try {
        const res = await fetch('https://stag-protocol-labs-network-api.herokuapp.com/v1/members?pagination=false')
        if (!res.ok) {
            throw new Error('Failed to fetch data')
        }
        const jsonData = await res.json()

        const updatedData = jsonData.map((user: any) => ({
            ...user,
            region: getRandomRegion(), 
            country: getRandomCountry(),
            engagementTypes: getEngagementTypes(),
        }))

        return updatedData
    } catch (error) {
        console.error('Error fetching members:', error)
        return []
    }
}

const getRandomRegion = () => {
    const regions = ["Africa", "Asia", "Europe", "NorthAmerica", "NotDefined", "Oceania", "SouthAmerica"]
    const randomIndex = Math.floor(Math.random() * regions.length)
    return regions[randomIndex]
}

const getRandomCountry = () => {
    const country = ["Argentina", "Armenia", "Australia", "Belarus", "Belgium", "Brazil", "Cambodia", "Cameroon", "Canada", "Chile"]
    const countryIndex = Math.floor(Math.random() * country.length)
    return country[countryIndex]
}

const getEngagementTypes = () => {
    const engagementTypes = ["OfficeHours", "OpenToCollaborate", "Friends", "NewMember"]
    const engagementTypesIndex = Math.floor(Math.random() * engagementTypes.length)
    return engagementTypes[engagementTypesIndex]
}