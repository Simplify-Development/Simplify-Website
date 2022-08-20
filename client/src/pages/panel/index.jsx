import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import logo from "../img/utils.png";
import { getUserDetails } from '../../utils/api'
import { getPanelUsers } from '../../utils/api'
import { getPanelPerms } from '../../utils/api'
import { Loading } from 'react-loading-dot'

export function PanelPage(props) {
    const [loading, setLoading] = React.useState(true)
    const [users, setUsers] = React.useState([])
    const [searchTerm, setSearchTerm] = useState('')

    React.useEffect(() => {
        getUserDetails().then(({ data }) => {
            getPanelPerms(data.discordId).then(({ data }) => {
                if (data.response == "Yes") {
                    getPanelUsers().then(({ data }) => {
                        setUsers(data)
                        console.log(data)
                        setLoading(false)
                    })
                } else {
                    window.location.href = `http://localhost:5001`;    
                }
            }).catch(() => {
                window.location.href = `http://localhost:5001/api/auth/discord`;
            })
        }).catch(() => {
            window.location.href = `http://localhost:5001/api/auth/discord`;
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

    if (loading) {
        return (
            <div>
                <nav>
                    <div className={
                        "nav-bar " + (open ? 'open' : '')
                    }>
                        <img src={logo} alt="" className="logo" onClick={openWindowDiscord} />
                        <ul className="navLinks">
                            <li><Link to="/rules" className="aa">Rules</Link></li>
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
                <div className="center">
                    <Loading background="rgb(66,69,73)" duration="0.6s" size="2rem" />
                </div>
            </div>

        )

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

            <div className="panel-search-container">
                <input type="text" placeholder="Search for users..." className="panel-search" onChange={event => { setSearchTerm(event.target.value) }} />
            </div>

            <div className="panel-container">

                <ul className="panel-users">
                    {
                        users.filter(member => {
                            if (searchTerm == "") return member;
                            else if (member.name.toLowerCase().includes(searchTerm.toLowerCase()) || member.id.toLowerCase().includes(searchTerm.toLowerCase())) {
                                return member
                            }
                        }).map(member => {
                            return (
                                <Link to={`/panel/users/${member.id}`}>
                                    <li className="panel-box" key={member.id}>
                                        <img src={member.avatar} />
                                        <span>{member.name}</span>
                                    </li>
                                </Link>
                            )
                        })
                    }
                </ul>
            </div>

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