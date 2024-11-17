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
        }))

        return updatedData
    } catch (error) {
        console.error('Error fetching members:', error)
        return [] // Returning an empty array in case of error
    }
}

const getRandomRegion = () => {
    const regions = ["Africa", "Asia", "Europe", "NorthAmerica", "NotDefined", "Oceania", "SouthAmerica"]
    const randomIndex = Math.floor(Math.random() * regions.length)
    return regions[randomIndex]
}