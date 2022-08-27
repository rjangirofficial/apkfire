import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Dna } from 'react-loader-spinner';

const Apps = () => {

    const { id } = useParams()
    const Navigate = useNavigate()
    const [data, setData] = useState([])
    const [loader, setLoader] = useState(false)

    const fetchApi = async () => {
        setLoader(true)
        const resp = await fetch(`/api/apps/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        setLoader(false)
        const data = await resp.json()
        if (data.status === 400) {
            Navigate('/')
        }
        setData(data)
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
                    <div>
                        <div className="tableData">
                            <table>
                                <tbody>
                                    <tr>
                                        <td className="center"><img src={data.logourl} alt="logo" height="100" /></td>
                                        <td className="center"><a href={data.link} target="_blank">Download</a></td>
                                    </tr>
                                    <tr>
                                        <td className="left">Name</td>
                                        <td className="right">{data.name}</td>
                                    </tr>
                                    <tr>
                                        <td className="left">Publisher</td>
                                        <td className="right">{data.publisher}</td>
                                    </tr>
                                    <tr>
                                        <td className="left">Category</td>
                                        <td className="right">{data.category}</td>
                                    </tr>
                                    <tr>
                                        <td className="left">MOD Features</td>
                                        <td className="right">{data.modfeature}</td>
                                    </tr>
                                    <tr>
                                        <td className="left">Version</td>
                                        <td className="right">{data.version}</td>
                                    </tr>
                                    <tr>
                                        <td className="left">Size</td>
                                        <td className="right">{data.size}</td>
                                    </tr>
                                    <tr>
                                        <td className="left">Price</td>
                                        <td className="right">{data.price}</td>
                                    </tr>
                                </tbody></table>
                        </div>
                    </div>
                </>
            }

        </>
    );
}

export default Apps;
