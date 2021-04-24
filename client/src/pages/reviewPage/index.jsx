import React from "react";
import './style.css';
import { Link } from 'react-router-dom'
import axios from 'axios'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { getUserDetails, getWhitelistStatus } from '../../utils/api'
import logo from "../img/utils.png";

export function ReviewPage({
    history,
    match,
}) {
    const [content, setContent] = React.useState([])
    const [requirements, setRequirements] = React.useState('')
    const [loading, setLoading] = React.useState(true)

    function getApplication() {
        return axios.get(`https://simplify-code.com/api/apps/${match.params.id}`)
    }

    React.useEffect(() => {
        getUserDetails()
            .then(({ data }) => {
                getWhitelistStatus(data.discordId).then(({ data }) => {
                    if (data.message === "Yes") {

                        getApplication().then(async ({ data }) => {
                            await setContent(data)
                            if (data.reqs === false) await setRequirements('No')
                            else if (data.reqs === true) await setRequirements('Yes')
                            await setLoading(false)
                        }).catch(err => {
                            console.log(err)
                            history.push("/404")
                        })
                    } else {
                        window.location.href = "/"
                    }
                }).catch(() => {
                    window.location.href = "/"
                })
            }).catch(() => {
                window.location.href = "/"
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

            <div className="app-background">
                <div className="editor-container">
                    <h1 className="review-title">{content.user}'s {content.appType}</h1>
                    <CKEditor
                        data={`${content.content}`}
                        editor={ClassicEditor}
                    />
                    <div className="review-info-container">
                        <h1 className="review-info-title">Info</h1>
                        <p>Discord user info : {content.user}#{content.tag} ({content.discordId})</p> <br />
                        <p>Meets the requirements : {requirements}</p> <br />
                        <p>
                            To accpets this application use "-accept {content.applicationId}"<br /><br />
                        To decline this application use "-deny {content.applicationId}"
                    </p>
                    </div>
                </div>
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