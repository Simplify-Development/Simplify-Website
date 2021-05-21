import React from "react";
import { getUserDetails } from "../../utils/api";
import './style.css';
import { Link } from 'react-router-dom'
import axios from 'axios';
import CountUp from 'react-countup';
import { toast } from 'react-toastify'
import logo from "../img/utils.png";

export function DashboardPage({
    history,
}) {

    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true)
    const [count, setCount] = React.useState(0);
    const [apps, setApps] = React.useState(0)
    const [applications, setApplications] = React.useState([])

    const getNumberOfUsers = () => {
        axios.get('https://simplify-code.com/api/users')
            .then((res) => {
                const data = res.data;
                setCount(data)
            })
            .catch(() => {
                console.log('There was an error getting the number of users.')
            })
    }

    const getNumberOfApps = () => {
        axios.get('https://simplify-code.com/api/apps')
            .then((res) => {
                const data = res.data;
                setApps(data)
            })
            .catch(() => {
                console.log('There was an error getting the number of applications.')
            })
    }

    function getUsersApplications(discordId) {
        return axios.get(`https://simplify-code.com/api/userapps/${discordId}`)
    }

    React.useEffect(() => {
        getNumberOfApps()
        getNumberOfUsers()
        getUserDetails()
            .then(({ data }) => {
                getUsersApplications(data.discordId).then((res) => {
                    setApplications(res.data)
                })
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

    return !loading && (
        <body>

            <nav>
                <div className={
                    "nav-bar " + (open ? 'open' : '')
                }>
                    <img src={logo} alt="" className="logo" onClick={openWindowDiscord} />
                    <ul className="navLinks">
                        <li><Link to="/rules" className="aa">Rules</Link></li>
                        <li><Link to="/faq" className="ab">FAQ</Link></li>
                        <li><Link to="/team" className="ab">Team</Link></li>
                        <li><Link to="/" className="ad">Home</Link></li>

                    </ul>
                    <div className="burger" onClick={navSlide}>
                        <div className="line1"></div>
                        <div className="line2"></div>
                        <div className="line3"></div>
                    </div>
                </div>
            </nav>

            <div className="top"></div>

            <div className="info-container">

                <div className="info-box">
                    <h2>Total Users</h2>
                    <h1>
                        <CountUp end={count} />
                    </h1>
                </div>

                <div className="info-box">
                    <h2>Total Applications</h2>
                    <h1>
                        <CountUp end={apps} />
                    </h1>
                </div>
            </div>

            <div className="app-container">
                <div className="app-box">
                    <h1>Your Applications</h1>
                    <Link to="/applications">
                        <button className="application-btn">
                            <i class="fas fa-pencil-alt"></i>New
                        </button>
                    </Link>
                </div>

                <li className="dashboard-tags" key="tags">
                    <span>Application</span>
                    <span className="status">Status</span>
                    <span>Applied on</span>
                </li>

                {applications.map(app => {
                    return (
                        <li key={app.applicationId} className="dashboard-bar">
                            <span>{app.appType} </span>
                            <span className={app.status}>{app.status} </span>
                            <span>{app.date}</span>
                        </li>
                    )
                })}
            </div>

            <div className="dummy"></div>

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
                    <div className="top"></div>

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
