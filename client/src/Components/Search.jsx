import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Dna } from 'react-loader-spinner';

const Search = () => {

    const [loader, setLoader] = useState(false)
    const [search, setSearch] = useState([])
    const [searchParams, setSearchParams] = useSearchParams();

    const fetchApi = async () => {
        setLoader(true)
        const resp = await fetch(`/api/apps/search/${searchParams.get("search")}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        setLoader(false)
        const data = await resp.json()
        setSearch(data)
    }

    useEffect(() => {
        fetchApi()
    }, [])


    return (
        <>

            {loader &&
                <Dna
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="dna-loading"
                    wrapperStyle={{}}
                    wrapperClass="dna-wrapper"
                />
            }

            {
                !loader && <>
                    <div className="search_result_txt">
                        <h2 >Search results for "{searchParams.get("search")}"</h2>
                    </div>
                    <div className="apps_container" >
                        {
                            search.map((item, index) => {
                                return (
                                    <Link to={`/${item._id}`} className="app_card main_card" key={index} >
                                        <div className="app_card">
                                            <img src={item.logourl} height={80} alt="app_logo" />
                                            <div className="app_details">
                                                <p>{item.name}</p>
                                                <span>{item.version}</span>
                                                <p className="mod_tag">Mod - {item.modfeature}</p>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })
                        }
                    </div>
                </>
            }
        </>
    );
}

export default Search;