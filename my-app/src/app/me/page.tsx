'use client'
import { useState, useEffect, useRef, useCallback } from "react";
import Header from "../components/Header";
import { getMembers } from "../apiService/api";
import { useRouter } from "next/navigation";

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
    region?: string;
    country?: string;
    engagementTypes?: string;
}

const Member = () => {
    const [data, setData] = useState<User[]>([])
    const [totalCount, setTotalCount] = useState(0)
    const [filterData, setFilterData] = useState<User[]>([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)

    const [isCheckedOfficeHours, setIsCheckedOfficeHours] = useState(false)
    const [isCheckedOpenToCollaborate, setIsCheckedOpenToCollaborate] = useState(false)
    const [isFriends, setIsFriends] = useState(false)
    const [isNewMember, setNewMember] = useState(false)

    const router = useRouter()

    const regions = ["Africa", "Asia", "Europe", "NorthAmerica", "NotDefined", "Oceania", "SouthAmerica"]
      
    const countries = ["Argentina", "Armenia", "Australia", "Belarus", "Belgium", "Brazil", "Cambodia", "Cameroon", "Canada", "Chile"]
    
    const observer = useRef<IntersectionObserver | null>(null)
    
    useEffect(() => {
        const fetchData = async () => {
            const jsonData = await getMembers()
            setTotalCount(jsonData.length)
            setData(jsonData)
            setFilterData(jsonData.slice(0, 9))
        }
        fetchData()
    }, [])


    const loadMoreData = useCallback(() => {
        if (loading)
            return;
        setLoading(true);

        // setTimeout(() => {
        const newPage = page + 1;
        setPage(newPage);
        const startIndex = newPage * 9 - 9;
        const newItems = data.slice(startIndex, startIndex + 9);
        setFilterData((prev) => [...prev, ...newItems]);
        setLoading(false);
        // }, 1000);
    }, [loading, page, data]);

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: "20px",
            threshold: 1.0
        };

        const handleObserver = (entities: IntersectionObserverEntry[]) => {
            if (entities[0].isIntersecting && !loading) {
                     loadMoreData();
            }
        }

        observer.current = new IntersectionObserver(handleObserver, options);
        const currentElement = document.querySelector("#scroll-trigger");
        if (currentElement) observer.current.observe(currentElement);

        return () => {
            if (observer.current && currentElement) {
                observer.current.unobserve(currentElement);
            }
        };
    }, [loadMoreData, loading]);

    const filterByRegion = (region: string) => {
        let filtered = data.filter((user) => user.region === region)
        router.push(`?memberRegion=${region}`)
        setFilterData(filtered)
        setTotalCount(filtered.length)
        resetToggleState()
    }

    const filterByCountry = (country: string) => {
        let filtered = data.filter((user) => user.country === country)
        router.push(`?memberCountry=${country}`)
        setFilterData(filtered)
        setTotalCount(filtered.length)
        resetToggleState()
    }   

    const filterByEngagementType = (engagementType: string) => {
        let filtered = data.filter((user) => user.engagementTypes === engagementType)
        router.push(`?memberEngagementType=${engagementType}`)
        setFilterData(filtered)
        setTotalCount(filtered.length)

        resetToggleState()

        switch (engagementType) {
            case "OfficeHours" : 
                setIsCheckedOfficeHours(true)
                break
            case "OpenToCollaborate" :
                setIsCheckedOpenToCollaborate(true)
                break
            case "Friends" :
                setIsFriends(true)
                break
            case "NewMember" :
                setNewMember(true)
                break
            default :
                resetToggleState()
                break
        }
    }

    const resetToggleState = () => {
        setIsCheckedOfficeHours(false)
        setIsCheckedOpenToCollaborate(false)
        setIsFriends(false)
        setNewMember(false)
    }

    const clearFilters = () => {
        setFilterData(data)
        setTotalCount(data.length)
        router.push('/me')
        resetToggleState()
    }

    return (
        <>
            <Header></Header>
            <div className=" panel ">
                <div className="filter__panel mt-20">
                    <div className="bg-white">
                        <div className="filter__controls pt-5 pl-10 pr-7">
                            <div className="filter__controls-label">
                                Filters
                            </div>
                            <div className="filter__controls-clear">
                                <button onClick={clearFilters}>Clear Filters</button>
                            </div>
                        </div>
                        <div className="filter__controls-span"></div>

                        <div className="member__filters pt-5 pl-10 pr-">
                            <div className="filter__office-hours filter">
                                <h3 className="filter__title">Only Show Members with Office Hours</h3>
                                <label className="switch ">
                                    <input type="checkbox" checked={isCheckedOfficeHours} onChange={(e) => e.target.checked ? filterByEngagementType("OfficeHours") : clearFilters()} />
                                    <span className="slider -ml-1" ></span>
                                </label>
                            </div>
                            <div className="filter__collaboration filter">
                                <h3 className="filter__title" >Open to Collaborate</h3>
                                <label className="switch">
                                    <input type="checkbox" checked={isCheckedOpenToCollaborate} onChange={(e) => e.target.checked ? filterByEngagementType("OpenToCollaborate") : clearFilters()} />
                                    <span className="slider"></span>
                                </label>
                            </div>
                            <div className="filter__friends filter">
                                <h3 className="filter__title">Include Friends of Protocol Labs</h3>
                                <label className="switch">
                                    <input type="checkbox" checked={isFriends} onChange={(e) => e.target.checked ? filterByEngagementType("Friends") : clearFilters()} />
                                    <span className="slider"></span>
                                </label>
                            </div>
                            <div className="filter__new-members filter">
                                <h3 className="filter__title">New Members</h3>
                                <label className="switch">
                                    <input type="checkbox" checked={isNewMember} onChange={(e) => e.target.checked ? filterByEngagementType("NewMember") : clearFilters()} />
                                    <span className="slider"></span>
                                </label>
                            </div>
                        </div>

                        <div className="pl-10 pr-7">
                            <span className="filter__span"></span>
                            <h2>Region</h2>
                            <div className="filter__region">
                                {regions.map((region) => (
                                    <div key={region}>
                                        <button onClick={() => filterByRegion(region)}>{region}</button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="pl-10 pr-7 pb-6">
                            <span className="filter__span"></span>
                            <h2>Country</h2>
                            <div className="filter__region">
                                {countries.map((country) => (
                                    <div key={country}>
                                        <button onClick={() => filterByCountry(country)}>{country}</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* right side */}
                <div className="member__content mt-10">
                    <div className="member__content_header">
                        <div className="member__content_title">
                            <h1 className="member__content_h1"> Members <span className="member__content_span">({totalCount})</span></h1>
                        </div>
                        <div className="member__content_search">
                            <input type="text" placeholder="Search by Mentor Name, Team or Project" />
                            <img src="./search.svg"></img>
                        </div>
                        <span className="member__content_line"></span>
                        <div>
                            <div>Sort by:</div>
                        </div>

                        <div className="member__content_sort">
                            <div className="mr-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="pointer-events-none relative top-px mr-1 h-4 mb-[2px]"><path d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h5a1 1 0 000-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM13 16a1 1 0 102 0v-5.586l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 101.414 1.414L13 10.414V16z"></path></svg>
                            </div>
                            <div className="mr-2">
                                Ascending
                            </div>
                            <div>
                                <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.61427 5.53233C3.81426 5.77481 4.18574 5.77481 4.38573 5.53233L7.65534 1.56814C7.92431 1.24202 7.69234 0.75 7.26961 0.75L0.730393 0.75C0.307659 0.75 0.0756859 1.24202 0.344665 1.56814L3.61427 5.53233Z" fill="currentColor"></path></svg>
                            </div>
                        </div>

                        <div className="member__content_view">
                            <div className="member__content_view_grid">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true" className="stroke-1.5 h-6 w-6 stroke-blue-700"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                            </div>
                            <div className="member__content_view_list">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true" className="stroke-1.5 h-6 w-6 stroke-slate-600 group-focus:stroke-slate-900"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path></svg>
                            </div>
                        </div>
                    </div>
                    <div className="member__card-wrapper">
                        <div className="member__card">
                            {filterData.map((item) => (
                                <div key={item.uid} className="member__list card">
                                    <div className="member__image-container">
                                        <div className="member__image">
                                            <img src="./photo.jpg" alt="photo" />
                                        </div>
                                    </div>
                                    <div className="member__details">
                                        <div className="member__name">{item.name}</div>
                                        <div className="member__department">{item.region}</div>
                                        <div className="member__role">{item.country}</div>
                                    </div>
                                    <div className="member__divider"></div>
                                    <div className="member__product-container">
                                        <span className="member__product-span"></span>
                                        <div className="member__product">
                                            Engineering
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div id="scroll-trigger" className="infinite__scroll-trigger"></div>
                        {loading && <div>Loading... </div>}
                    </div> 
                </div>
            </div>
        </>
    )
}

export default Member