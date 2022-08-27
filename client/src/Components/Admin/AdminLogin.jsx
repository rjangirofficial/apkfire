import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Dna } from 'react-loader-spinner';

const AdminLogin = () => {

    const [loader, setLoader] = useState(false)
    const notifySuccess = (msg) => toast.success(msg);
    const notifyError = (msg) => toast.error(msg);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const Navigate = useNavigate()

    const formHandler = async (e) => {
        e.preventDefault()
        setLoader(true)
        const resp = await fetch(`/api/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: email.toLowerCase(), password })
        })
        setLoader(false)
        const data = await resp.json()
        console.log(data)
        if (data.status === 200) {
            localStorage.setItem('token', data.token)
            Navigate('/admin/dashboard')
            notifySuccess(data.msg)
        } else {
            notifyError(data.msg)
        }
    }

    return (
        <>
            <div>
                <div className="login_container login">
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
                    <h2>Admin Login</h2>
                    <form onSubmit={formHandler}>
                        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
                        <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
                        <button>Login</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default AdminLogin;
