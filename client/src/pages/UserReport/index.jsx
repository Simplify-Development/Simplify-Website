import React from "react";
import "./style.css"
import logo from "../img/utils.png";
import { toast } from 'react-toastify';
import axios from 'axios'
import { getUserDetails } from '../../utils/api';
import { Loading } from 'react-loading-dot'

import { Link } from "react-router-dom"
import { NavLogin } from "../components/navLogin";


export function ReportPage() {

    const [loading, setLoading] = React.useState(true)
    const [user, setUser] = React.useState([])

    const [open, setOpen] = React.useState(false)

    const [checked1, setChecked1] = React.useState(false)
    const [checked2, setChecked2] = React.useState(false)
    const [checked3, setChecked3] = React.useState(false)
    const [checked4, setChecked4] = React.useState(false)
    const [checked5, setChecked5] = React.useState(false)
    const [checked6, setChecked6] = React.useState(false)
    const [checked7, setChecked7] = React.useState(false)
    const [checked8, setChecked8] = React.useState(false)
    const [checked9, setChecked9] = React.useState(false)
    const [checked10, setChecked10] = React.useState(false)
    const [checked11, setChecked11] = React.useState(false)
    const [checked12, setChecked12] = React.useState(false)
    const [checked13, setChecked13] = React.useState(false)

    const [userId, setUserId] = React.useState('')
    const [reason, setReason] = React.useState('')

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

    const growers = document.querySelectorAll(".grow-wrap");

    growers.forEach((grower) => {
        const textarea = grower.querySelector("textarea");
        textarea.addEventListener("input", () => {
            grower.dataset.replicatedValue = textarea.value;
        });
    });

    async function submitHandler() {
        if (userId.length < 1) toast.error("Please fill out a user id")
        if (reason.length < 1) toast.error("Please fill out a reason for the report")
        if (reason.split(" ").join("").length > 600) toast.error("Please keep the reason under 600 letters")

        const checked = []

        if (checked1) checked.push("Use of bad language")
        if (checked2) checked.push("Advertising")
        if (checked3) checked.push("Use of unwholesome content")
        if (checked4) checked.push("Using the wrong channel for support")
        if (checked5) checked.push("Harrassment or toxic behavior")
        if (checked6) checked.push("Sharing sexually explicit or other disturbing kinds of content")
        if (checked7) checked.push("Inproper use of voice channels")
        if (checked8) checked.push("Breaking Discord ToS")
        if (checked9) checked.push("Inproper use of spoilers")
        if (checked10) checked.push("Mini modding")
        if (checked11) checked.push("Use of Racist or Homophobis content")
        if (checked12) checked.push("Inappropriate profile picture or username")
        if (checked13) checked.push("Other")

        const content = {
            userId: user.discordId,
            reportedId: userId,
            checked: checked,
            reason: reason,
        }

        await axios.post('https://simplify-code.com/api/newreport', content).then(res => {
            window.location.href = "/dashboard"
        })

    }

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
                            <li><Link to="/team">Team</Link></li>
                        </div>
                        <div className={"nav-menu " + (open ? "open" : "")}>
                            <Link to="/rules">Rules</Link>
                            <Link to="/faq">FAQ</Link>
                            <Link to="/team">Team</Link>
                        </div>

                        <NavLogin />
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
                        <li><Link to="/team">Team</Link></li>
                    </div>
                    <div className={"nav-menu " + (open ? "open" : "")}>
                        <Link to="/rules">Rules</Link>
                        <Link to="/faq">FAQ</Link>
                        <Link to="/team">Team</Link>
                    </div>

                    <NavLogin />
                    <div className="burger" onClick={openNav}>
                        <div className="line1"></div>
                        <div className="line2"></div>
                        <div className="line3"></div>
                    </div>
                </div>

            </div>


            <div className="report-container">
                <div className="report-card">
                    <h1 className="report-title">Report a user</h1>
                    <p className="report-description">Please provide as much information as possible</p>
                    <div className="report-devider"></div>

                    <div className="report-content">
                        <div className="report-id-box">
                            <input type="text" className="report-id-field" onChange={e => setUserId(e.target.value)} />
                            <p>ID of the user you are reporting.</p>
                        </div>

                        <div className="report-checks">
                            <h2 className="report-header">What rules did they break?</h2>

                            <div className="report-check">
                                <div onClick={() => {
                                    if (checked1) {
                                        setChecked1(!checked1)
                                    } else {
                                        setChecked1(!checked1)
                                    }
                                }} className={"report-checkbox " + (checked1 ? "checked" : "")}> {checked1 ? <i class="fas fa-check"></i> : <i class="fas fa-times"></i>} </div>
                                <p>Use of bad language</p>
                            </div>

                            <div className="report-check">
                                <div onClick={() => {
                                    if (checked2) {
                                        setChecked2(!checked2)
                                    } else {
                                        setChecked2(!checked2)
                                    }
                                }} className={"report-checkbox " + (checked2 ? "checked" : "")}>{checked2 ? <i class="fas fa-check"></i> : <i class="fas fa-times"></i>}</div>
                                <p>Advertising</p>
                            </div>

                            <div className="report-check">
                                <div onClick={() => {
                                    if (checked3) {
                                        setChecked3(!checked3)
                                    } else {
                                        setChecked3(!checked3)
                                    }
                                }} className={"report-checkbox " + (checked3 ? "checked" : "")}>{checked3 ? <i class="fas fa-check"></i> : <i class="fas fa-times"></i>}</div>
                                <p>Use of unwholesome content</p>
                            </div>

                            <div className="report-check">
                                <div onClick={() => {
                                    if (checked4) {
                                        setChecked4(!checked4)
                                    } else {
                                        setChecked4(!checked4)
                                    }
                                }} className={"report-checkbox " + (checked4 ? "checked" : "")}>{checked4 ? <i class="fas fa-check"></i> : <i class="fas fa-times"></i>}</div>
                                <p>Using the wrong channel for support</p>
                            </div>

                            <div className="report-check">
                                <div onClick={() => {
                                    if (checked5) {
                                        setChecked5(!checked5)
                                    } else {
                                        setChecked5(!checked5)
                                    }
                                }} className={"report-checkbox " + (checked5 ? "checked" : "")}>{checked5 ? <i class="fas fa-check"></i> : <i class="fas fa-times"></i>}</div>
                                <p>Harrassment or toxic behavior</p>
                            </div>

                            <div className="report-check">
                                <div onClick={() => {
                                    if (checked6) {
                                        setChecked6(!checked6)
                                    } else {
                                        setChecked6(!checked6)
                                    }
                                }} className={"report-checkbox " + (checked6 ? "checked" : "")}>{checked6 ? <i class="fas fa-check"></i> : <i class="fas fa-times"></i>}</div>
                                <p>Sharing sexually explicit or other disturbing kinds of content</p>
                            </div>

                            <div className="report-check">
                                <div onClick={() => {
                                    if (checked7) {
                                        setChecked7(!checked7)
                                    } else {
                                        setChecked7(!checked7)
                                    }
                                }} className={"report-checkbox " + (checked7 ? "checked" : "")}>{checked7 ? <i class="fas fa-check"></i> : <i class="fas fa-times"></i>}</div>
                                <p>Inproper use of voice channels</p>
                            </div>

                            <div className="report-check">
                                <div onClick={() => {
                                    if (checked8) {
                                        setChecked8(!checked8)
                                    } else {
                                        setChecked8(!checked8)
                                    }
                                }} className={"report-checkbox " + (checked8 ? "checked" : "")}>{checked8 ? <i class="fas fa-check"></i> : <i class="fas fa-times"></i>}</div>
                                <p>Breaking Discord ToS</p>
                            </div>

                            <div className="report-check">
                                <div onClick={() => {
                                    if (checked9) {
                                        setChecked9(!checked9)
                                    } else {
                                        setChecked9(!checked9)
                                    }
                                }} className={"report-checkbox " + (checked9 ? "checked" : "")}>{checked9 ? <i class="fas fa-check"></i> : <i class="fas fa-times"></i>}</div>
                                <p>Inporoper use of spoilers</p>
                            </div>

                            <div className="report-check">
                                <div onClick={() => {
                                    if (checked10) {
                                        setChecked10(!checked10)
                                    } else {
                                        setChecked10(!checked10)
                                    }
                                }} className={"report-checkbox " + (checked10 ? "checked" : "")}>{checked10 ? <i class="fas fa-check"></i> : <i class="fas fa-times"></i>}</div>
                                <p>Mini modding</p>
                            </div>

                            <div className="report-check">
                                <div onClick={() => {
                                    if (checked11) {
                                        setChecked11(!checked11)
                                    } else {
                                        setChecked11(!checked11)
                                    }
                                }} className={"report-checkbox " + (checked11 ? "checked" : "")}>{checked11 ? <i class="fas fa-check"></i> : <i class="fas fa-times"></i>}</div>
                                <p>Use of Racist or Homophobic content</p>
                            </div>

                            <div className="report-check">
                                <div onClick={() => {
                                    if (checked12) {
                                        setChecked12(!checked12)
                                    } else {
                                        setChecked12(!checked12)
                                    }
                                }} className={"report-checkbox " + (checked12 ? "checked" : "")}>{checked12 ? <i class="fas fa-check"></i> : <i class="fas fa-times"></i>}</div>
                                <p>Inappropriate profile picture or username</p>
                            </div>

                            <div className="report-check">
                                <div onClick={() => {
                                    if (checked13) {
                                        setChecked13(!checked13)
                                    } else {
                                        setChecked13(!checked13)
                                    }
                                }} className={"report-checkbox " + (checked13 ? "checked" : "")}>{checked13 ? <i class="fas fa-check"></i> : <i class="fas fa-times"></i>}</div>
                                <p>Other</p>
                            </div>

                        </div>

                        <div className="report-reason">
                            <h2 className="report-header">Write your report below.</h2>
                            <div className="grow-wrap">
                                <textarea className="report-textarea" name="report-textarea" onChange={e => setReason(e.target.value)}></textarea>
                            </div>
                        </div>
                        <div className="submit-container">
                            <button className="submit" onClick={submitHandler}>Submit</button>
                            <Link to="/"><button className="cancel">Cancel</button></Link>
                        </div>
                    </div>

                </div>
            </div>

            <div className="footer-container-main">

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
    );
}
