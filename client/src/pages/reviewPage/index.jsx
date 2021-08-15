import React from "react";
import './style.css';
import { Link } from 'react-router-dom'
import axios from 'axios'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { getUserDetails, getWhitelistStatus } from '../../utils/api'
import logo from "../img/utils.png";
import { toast } from "react-toastify";
import { Loading } from 'react-loading-dot'

export function ReviewPage({
    history,
    match,
}) {
    const [content, setContent] = React.useState([])
    const [requirements, setRequirements] = React.useState('')
    const [loading, setLoading] = React.useState(true)
    const [moderator, setModerator] = React.useState('')

    function getApplication() {
        return axios.get(`https://simplify-code.com/api/apps/${match.params.id}`)
    }

    React.useEffect(() => {
        getUserDetails()
            .then(({ data }) => {
                setModerator(data.discordId)
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

    const accept = async () => {
        const answer = {
            moderator: moderator,
            id: match.params.id
        }
        await axios.post("https://simplify-code.com/api/applications/accept", answer).then(() => {
            window.location.href = "/applications/review"
        }).catch(() => {
            return toast.error("Could not accept the application due to an error")
        })
    }
    const decline = async () => {
        const answer = {
            moderator: moderator,
            id: match.params.id
        }
        await axios.post("https://simplify-code.com/api/applications/decline", answer).then(() => {
            window.location.href = "/applications/review"
        }).catch(() => {
            return toast.error("Could not decline the application due to an error")
        })
    }

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

            <div className="app-background">
                <div className="editor-container">
                    <h1 className="review-title">{content.user}'s {content.appType}</h1>

                    {content.content.map(current => {
                        return (
                            <div className="input-container">
                                <h3 className="app-input-header">{current.question}</h3>
                                <div disabled={true} className="review-box"><p>{current.answer}</p></div>
                            </div>
                        )

                    })}

                    <div className="review-info-container">
                        <h1 className="review-info-title">Info</h1>
                        <div className="review-info-box">
                            <p><span className="red">{content.user}</span><span className="dark"> #</span><span className="red">{content.tag}</span><span className="dark"> (</span><span className="red">{content.discordId}</span><span className="dark">)</span></p>
                        </div> <br />
                        <p>Meets the requirements : {requirements}</p> <br />
                    
                </div>
                <div className="review-buttons">
                    <button className="decline-button" onClick={decline}>Decline</button>
                    <button className="accept-button" onClick={accept}>Accept</button>
                </div>
                </div>
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