import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dna } from 'react-loader-spinner';

const Home = () => {

    const [loader, setLoader] = useState(false)
    const [data, setData] = useState([])
    const [search, setSearch] = useState("")
    const Navigate = useNavigate()

    const fetchApi = async () => {
        setLoader(true)
        const resp = await fetch(`/api/apps`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        setLoader(false)
        const data = await resp.json()
        setData(data)
    }

    const formHanlder = async (e) => {
        e.preventDefault()
        Navigate(`/search?search=${search.toLowerCase()}`)
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
                    <div className="search_app">
                        <form onSubmit={formHanlder}>
                            <input type="text" required placeholder='Search Apps' value={search} onChange={(e) => setSearch(e.target.value)} />
                            <button type='submit'>Search</button>
                        </form>
                    </div>


                    <div className="apps_container" >


                        {
                            data.map((item, index) => {
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
                            }).reverse()
                        }

                    </div></>
            }

        </>
    );
}

export default Home;
