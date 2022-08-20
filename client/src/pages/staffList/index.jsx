import React from "react";
import { Link } from 'react-router-dom';
import "./style.css";
import { getStaffList } from '../../utils/api'
import logo from "../img/utils.png";
import { Loading } from 'react-loading-dot'




export function StaffList(props) {
    const [list, setList] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    const [open, setOpen] = React.useState(false)

    const navSlide = () => {
        const burger = document.querySelector('.burger');
        burger.classList.toggle('toggle')

        if (open) {
            setOpen(false)
        } else if (!open) {
            setOpen(true)
        }
    }

    function openWindowDiscord() {
        window.open("https://discord.gg/PaGJGzbzw6", "_blank")
    }

    React.useEffect(() => {
        getStaffList().then(({ data }) => {
            setList(data)
            setLoading(false)
        })
    }, [])

    const openNav = () => {
        setOpen(!open)
    }

    if (loading) {
        return (
            <div>
                <div className="nav">
                    <div className="logo-container">
                        <img src={logo} alt="" className="logo" />
                        <h1 className="logo-title">Simplify Code</h1>
                    </div>

                    <div className="links-container">
                        <div className="nav-links">
                            <li><Link to="/rules">Rules</Link></li>
                            <li><Link to="/faq">FAQ</Link></li>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/dashboard">Dashboard</Link></li>
                        </div>
                        <div className={"nav-menu " + (open ? "open" : "")}>
                            <Link to="/rules">Rules</Link>
                            <Link to="/faq">FAQ</Link>
                            <Link to="/">Home</Link>
                            <Link to="/dashboard">Dashboard</Link>
                        </div>

                        
                        <div className="burger" onClick={openNav}>
                            <div className="line1"></div>
                            <div className="line2"></div>
                            <div className="line3"></div>
                        </div>
                    </div>

                </div>
                <div className="center">
                    <Loading background="rgb(66,69,73)" duration="0.6s" size="2rem" />
                </div>
            </div>

        )

    }

    return !loading && (
        <body>
            <div className="nav">
                <div className="logo-container">
                    <img src={logo} alt="" className="logo" />
                    <h1 className="logo-title">Simplify Code</h1>
                </div>

                <div className="links-container">
                    <div className="nav-links">
                        <li><Link to="/rules">Rules</Link></li>
                        <li><Link to="/faq">FAQ</Link></li>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/dashboard">Dashboard</Link></li>
                    </div>
                    <div className={"nav-menu " + (open ? "open" : "")}>
                        <Link to="/rules">Rules</Link>
                        <Link to="/faq">FAQ</Link>
                        <Link to="/">Home</Link>
                        <Link to="/dashboard">Dashboard</Link>
                    </div>

                    <div className="burger" onClick={openNav}>
                        <div className="line1"></div>
                        <div className="line2"></div>
                        <div className="line3"></div>
                    </div>
                </div>
            </div>

            <div className="top"></div>

            <div className="staff-center">
                <ul className="staff-container">
                    {
                        list.map(user => {
                            return (
                                <li key={user.username} className="staff-box">
                                    <img className="staff-img" src={user.avatar} />
                                    <span className="staff-username" >{user.username}</span>
                                    <span className="staff-role" >{user.role}</span>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>

            <div className="top"></div>

            <div className="footer-container">
                <svg className="footer-wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fill="#191a1f" fill-opacity="1" d="M0,32L48,48C96,64,192,96,288,101.3C384,107,480,85,576,96C672,107,768,149,864,165.3C960,181,1056,171,1152,154.7C1248,139,1344,117,1392,106.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>

                <footer>
                    <div className="container">
                        <div className="about">
                            <h2>About</h2>
                            <p>Simplify Code is a coding community for everyone to join, we are growing more every day so why not join?</p>
                            <br />
                            <p>© Simplify Development 2020-2021</p>
                        </div>
                        <ul className="icons">
                            <li><a onClick={() => window.open("https://discord.gg/XveJX7Z", "_blank")}><i class="fab fa-discord"></i></a></li>
                            <li><a onClick={() => window.open("https://github.com/Simplify-Development", "_blank")}><i class="fab fa-github"></i></a></li>
                            <li><a onClick={() => window.open("https://www.youtube.com/channel/UCkCQKpugToFwY_EWkI0GlWw", "_blank")}><i class="fab fa-youtube"></i></a></li>
                        </ul>
                    </div>

                    <div className="links">
                        <div className="product">
                            <h2>Product</h2>
                            <ul>
                                <Link to="/rules"><li><a >Rules</a></li></Link>
                                <Link to="/faq"><li><a >FAQ</a></li></Link>
                                <Link to="/privacy"><li><a >Privacy</a></li></Link>
                            </ul>
                        </div>
                        <div className="reacources">
                            <h2>Resources</h2>
                            <ul>
                                <li><a onClick={() => window.open("https://discord.gg/XveJX7Z", "_blank")}>Support</a></li>
                                <li><a onClick={() => window.open("https://discord.gg/XveJX7Z", "_blank")}>Contact</a></li>
                            </ul>
                        </div>
                    </div>
                </footer>
            </div>
        </body>
    )
}
