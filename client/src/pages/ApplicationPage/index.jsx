import React from "react";
import { getUserDetails } from "../../utils/api";
import './style.css';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify'
import logo from "../img/utils.png";

export function ApplicationPage({
    history,
}) {
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        getUserDetails()
            .then(({ data }) => {
                setUser(data);
                console.log(data)
                setLoading(false);
            }).catch((err) => {
                console.error(err)
                window.location.href = `https://simplify-code.com/api/auth/discord`
            })
    }, [])

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

    const closed = () => {
        toast.error('Sorry but this application is closed')
    }

    return !loading && (
        <body>

            <nav>
                <div className={
                    "nav-bar " + (open ? 'open' : '')
                }>
                    <img src={logo} alt="" className="logo" onClick={openWindowDiscord} />
                    <ul className="navLinks">
                        <li><Link to="/rule" className="aa">Rules</Link></li>
                        <li><Link to="/faq" className="ab">FAQ</Link></li>
                        <li><Link to="/team" className="ab">Team</Link></li>
                        <li><Link to="/dashboard" className="ad">Dashboard</Link></li>

                    </ul>
                    <div className="burger" onClick={navSlide}>
                        <div className="line1"></div>
                        <div className="line2"></div>
                        <div className="line3"></div>
                    </div>
                </div>
            </nav>

            <div className="top"></div>


            <div className="applications-container">
                <ul className="app-top">
                    <li>
                        <span className="app-name">Name</span>
                        <span className="app-name">Status</span>
                    </li>
                </ul>
                <ul className="applications" >
                    <Link to="/applications/staff">
                        <li>
                            <span className="app-name" >Staff Team</span>
                            <button className="open-btn">Available</button>
                        </li>
                    </Link>

                    <li onClick={closed} >
                        <span className="app-name" >Development Team</span>
                        <button className="closed-btn">Unavailable</button>
                    </li>
                    <Link to="/applications/support">
                        <li>
                            <span className="app-name" >Support Team</span>
                            <button className="open-btn">Available</button>
                        </li>
                    </Link>

                    <Link to="/applications/appeal">
                        <li>
                            <span className="app-name" >Ban Appeal</span>
                            <button className="open-btn">Available</button>
                        </li>
                    </Link>
                    <Link to="/applications/art">
                        <li>
                            <span className="app-name" >Art poster</span>
                            <button className="open-btn">Available</button>
                        </li>
                    </Link>
                    <Link to="/applications/creator">
                        <li>
                            <span className="app-name" >Content Creator</span>
                            <button className="open-btn">Available</button>
                        </li>
                    </Link>

                </ul>
            </div>


            <div className="footer-container">
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
                                <li><a onClick={() => window.open("https://discord.com/invite/XveJX7Z", "_blank")}>Support</a></li>
                                <li><a onClick={() => window.open("https://discord.com/invite/XveJX7Z", "_blank")}>Contact</a></li>
                            </ul>
                        </div>
                    </div>
                </footer>
            </div>
        </body>
    )
}



