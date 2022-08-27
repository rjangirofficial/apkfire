import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Dna } from 'react-loader-spinner';

const AdminDashboard = () => {

    const [loader, setLoader] = useState(false)
    const notifySuccess = (msg) => toast.success(msg);
    const notifyError = (msg) => toast.error(msg);
    const Navigate = useNavigate()
    const [data, setData] = useState([])

    const [appname, setAppName] = useState("")
    const [logourl, setLogoUrl] = useState("")
    const [publisher, setPublisher] = useState("")
    const [category, setCategory] = useState("")
    const [modfeature, setModFeature] = useState("")
    const [version, setVersion] = useState("")
    const [size, setSize] = useState("")
    const [price, setPrice] = useState("")
    const [downloadlink, setDownloadLink] = useState("")

    const verify = async () => {
        const resp = await fetch(`/api/verify`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem('token')
            }
        })
        const data = await resp.json()
        console.log(data)
        if (data.status === 400) {
            Navigate('/admin')
            notifyError(data.msg)
        }
    }

    const formHanlder = async (e) => {
        e.preventDefault()
        setLoader(true)
        const resp = await fetch(`/api/addapp`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem('token')
            },
            body: JSON.stringify({
                name: appname.toLowerCase(),
                logourl,
                publisher: publisher.toLowerCase(),
                category: category.toLowerCase(),
                modfeature: modfeature.toLowerCase(),
                version, size, price: price.toLowerCase(),
                link: downloadlink
            })
        })
        setLoader(false)
        const data = await resp.json()
        console.log(data)
        setAppName("")
        setLogoUrl("")
        setPublisher("")
        setCategory("")
        setModFeature("")
        setVersion("")
        setSize("")
        setPrice("")
        setDownloadLink("")
        if (data.status === 201) {
            fetchApi()
            notifySuccess(data.msg)
        }
    }

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
        console.log(data)
        setData(data)
    }

    const deleteApp = async (id) => {
        setLoader(true)
        const resp = await fetch(`/api/apps/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem('token')
            }
        })
        setLoader(false)
        const data = await resp.json()
        console.log(data)
        notifySuccess(data.msg)
        fetchApi()
    }

    useEffect(() => {
        verify()
        fetchApi()
    }, [])

    return (
        <>




            <div className="dashboard_container dashboard">
                <h2>Add Apps</h2>
                <form onSubmit={formHanlder}>
                    <input required type="text" value={appname} onChange={(e) => setAppName(e.target.value)} placeholder='App Name' />
                    <input required type="text" value={logourl} onChange={(e) => setLogoUrl(e.target.value)} placeholder='Logo Url' />
                    <input required type="text" value={publisher} onChange={(e) => setPublisher(e.target.value)} placeholder='Publisher' />
                    <input required type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder='Category' />
                    <input required type="text" value={modfeature} onChange={(e) => setModFeature(e.target.value)} placeholder='Mod Feature' />
                    <input required type="text" value={version} onChange={(e) => setVersion(e.target.value)} placeholder='Version' />
                    <input required type="text" value={size} onChange={(e) => setSize(e.target.value)} placeholder='Size' />
                    <input required type="text" value={price} onChange={(e) => setPrice(e.target.value)} placeholder='Price' />
                    <input required type="text" value={downloadlink} onChange={(e) => setDownloadLink(e.target.value)} placeholder='Download Link' />
                    <button>Add App</button>
                </form>


                <h2 className='recent_apps_txt'>Recent Apps</h2>


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

                <div className="apps_container dashboard_app_container" >


                    {
                        data.map((item, index) => {
                            return (
                                <div className="app_card main_card" key={index} >
                                    <div className="app_card">
                                        <img src={item.logourl} height={80} alt="app_logo" />
                                        <div className="app_details">
                                            <p>{item.name}</p>
                                            <span>{item.version}</span>
                                            <p className="mod_tag">Mod - {item.modfeature}</p>
                                            <button onClick={() => deleteApp(item._id)} className='delete_btn'>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        }).reverse()
                    }

                </div>


            </div>
        </>
    );
}

export default AdminDashboard;
