'use client'
import { useEffect, useState } from "react"
import Header from "../components/Header";

interface User {
    uid: string;
    name: string;
    email: string;
    imageUid: string;
    githubHandler: string | null;
    discordHandler: string | null;
    twitterHandler: string | null;
    linkedinHandler: string | null;
    telegramHandler: string | null;
    officeHours: string | null;
    moreDetails: string | null;
    bio: string | null;
    plnFriend: boolean;
    plnStartDate: string;
    airtableRecId: string;
    externalId: string;
    openToWork: boolean;
    isFeatured: boolean;
    createdAt: string;
    updatedAt: string;
    approvedAt: string;
    locationUid: string;
    preferences: string | null;
}

const Member = () => {
    const [data, setData] = useState<User[]>([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const itemsPerPage = 9

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const response = await fetch('https://stag-protocol-labs-network-api.herokuapp.com/v1/members?pagination=false')
            const jsonData = await response.json()
            
            const paginatedData = jsonData.slice((page - 1) * itemsPerPage, page * itemsPerPage);
                
                // If no more data is available, stop loading
                if (paginatedData.length === 0) return;

                setData(prevData => [...prevData, ...paginatedData]);
            setLoading(false)
        }   
        fetchData()
    }, [page])

    const loadMore = () => {
        if (!loading) {
            setPage((prevPage) => prevPage+1 )
        }
    }

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100) {
                loadMore();
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    return (
        <div>
            <Header></Header>
        
        <div className="flex pt-20">
            <div className="w-2/12 p-4 bg-gray-100">
                <div className="m-2">
                    <div className="flex justify-between">
                        <div>Filters</div>
                        <div className="text-blue-500">Clear filters</div>
                    </div>
                    <h3 className="mt-2 mb-2">Region</h3>
                    <div className="flex flex-wrap gap-3">
                        <button className="border border-black bg-gray-200 rounded-md px-2 py-1">Africa</button>
                        <button className="border border-black bg-gray-200 rounded-md px-2 py-1">Asia</button>
                        <button className="border border-black bg-gray-200 rounded-md px-2 py-1">Europe</button>
                        <button className="border border-black bg-gray-200 rounded-md px-2 py-1">North America</button>
                        <button className="border border-black bg-gray-200 rounded-md px-2 py-1">Not Defined</button>
                        <button className="border border-black bg-gray-200 rounded-md px-2 py-1">Oceania</button>
                        <button className="border border-black bg-gray-200 rounded-md px-2 py-1">South America</button>
                    </div>
                </div>
            </div>

            <div className="w-10/12 p-4 m-4">
            
                <div>Members (count : {data.length})</div>
                <div className="flex flex-wrap">
                    {data.map((item) => (
                        <div key={item.uid} className="w-64 p-4 m-4 bg-white rounded-lg shadow-md flex flex-col items-center">
                            <img
                                src="./photo.jpg"
                                alt={item.name}
                                className="w-24 h-24 rounded-full object-cover mb-4"
                            />
                            <h3 className="text-lg font-semibold">{item.name}</h3>
                        </div>
                    ))}
                    
                </div>
            </div>
        </div>
        </div>
    )
}

export default Member
