import React,{useState} from 'react';
import {Link} from 'react-router-dom'

const Navbar = () => {

    const [top,setTop] = useState("-170px")

    const navtoogle = () => {
        if(top === "-170px"){
            setTop("78px")
        }else{
            setTop("-170px")
        }
    }

    return (
        <>
            <div className="navbar">
                <nav>
                    <div className="logo">
                        <img src="https://i.ibb.co/Bzxx7yG/android.png" alt="android" height={40} />
                        <Link to='/'>ApkFire</Link>
                    </div>
                    <div className="nav_menu">
                        <ul style={{top}}>
                            <li><Link to="/">Home</Link></li>
                            {/* <li><a href="#">Games</a></li>
                            <li><a href="#">Apps</a></li> */}
                        </ul>
                    </div>
                    <img onClick={navtoogle} className="menu" id="menu" src="https://i.ibb.co/VCpXZJh/menu-1.png" alt="menu" height={40} />
                </nav>
            </div>

        </>
    );
}

export default Navbar;
