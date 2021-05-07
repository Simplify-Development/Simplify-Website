import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import logo from "../../img/utils.png";
import { getUserDetails } from '../../../utils/api'
import { getPanelUser } from '../../../utils/api'
import { getPanelPerms } from '../../../utils/api'

import { loadWarns } from './loadWarns'
import { loadAutoWarns } from './loadAutoWarns'
import axios from 'axios';

export function PanelUserPage({
    history,
    match,
}) {
    const [loading, setLoading] = React.useState(true)

    const [userWarns, setUserWarns] = React.useState([])
    const [userAutoWarns, setUserAutoWarns] = React.useState([])
    const [member, setMember] = React.useState([])

    const [punishment, setPunishment] = React.useState('')
    const [reason, setReason] = React.useState('')
    const [time, setTime] = React.useState('')
    const [content, setContent] = React.useState({})

    React.useEffect(() => {
        getUserDetails().then(({ data }) => {
            let moderator = data.discordId


            getPanelPerms(data.discordId).then(({ data }) => {
                if (data.response == "Yes") {

                    getPanelUser(match).then(({ data }) => {
                        setLoading(false)
                        setUserWarns(data.warnsData)
                        setUserAutoWarns(data.autoWarnsData)
                        setMember(data.userData)

                        let info = {
                            reason: reason,
                            time: time,
                            type: punishment,
                            moderator: moderator,
                            user: match.params.id
                        }
                        setContent(info);
                    })

                } else {
                    window.location.href = "https://simplify-code.com"
                }
            }).catch(() => {
                window.location.href = `https://simplify-code.com/api/auth/discord`;
            })

        }).catch(() => {
            window.location.href = `https://simplify-code.com/api/auth/discord`;
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

    function loadTime() {
        return punishment == "mute" && (
            <input type="text" placeholder="Time" className="punish-time" onChange={val => {
                setTime(val.target.value)
            }} />
        )
    }

    async function submit() {
        await axios.post("https://simplify-code.com/api/panel/moderation", content)
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

            <div className="panel-user-container">
                <div className="panel-user-box">


                    <img src={member.avatar} />

                    <div className="colum">
                        <div className="panel-flex">
                            <h3>{member.username}</h3>
                            <p>{member.id}</p>
                        </div>

                        <div className="panel-flex">
                            <h3>Joined</h3>
                            <p>{member.joined}</p>
                        </div>

                        <div className="panel-flex">
                            <h3>Created</h3>
                            <p>{member.created}</p>
                        </div>
                    </div>

                </div>
            </div>
            <div className="center">

                <div className="panel-info-container">
                    <div className="panel-info-box">
                        {
                            loadWarns(userWarns, member)
                        }
                    </div>

                    <div className="panel-info-box">
                        {
                            loadAutoWarns(userAutoWarns, member)
                        }
                    </div>
                </div>

            </div>

            <div className="punishment-container">
                <div className="select-container">
                    <select className="punish-select" onChange={e => {
                        setPunishment(e.target.value);
                    }}>
                        <option selected disabled hidden>Type</option>
                        <option value="kick">Kick</option>
                        <option value="warn">Warn</option>
                        <option value="mute">Mute</option>
                        <option value="ban">Ban</option>

                    </select>
                    <span className="punish-arrow"></span>
                </div>

                {
                    loadTime()
                }
                <input type="text" placeholder="Reason..." className="punish-reason" onChange={val => {
                    setReason(val.target.value)
                }} />
                <button className="punish-button" onClick={submit}>Submit</button>
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