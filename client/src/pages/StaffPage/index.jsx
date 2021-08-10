import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import './style.css';
import 'react-toastify/dist/ReactToastify.css'
import { getUserDetails } from '../../utils/api';
import { toast } from 'react-toastify';
import logo from "../img/utils.png";

toast.configure()
export function StaffPage(props) {
    const [text, setText] = useState('')
    const [checked, setCheck] = useState(false)
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true)

    const [question1, setQuestion1] = React.useState({ question: "What is your reagion", answer: "" })
    const [question2, setQuestion2] = React.useState({ question: "What time zone are you in", answer: "" })
    const [question3, setQuestion3] = React.useState({ question: "How old are you (Minimum 16)", answer: "" })
    const [question4, setQuestion4] = React.useState({ question: "Why do you want to be a part of our staff team", answer: "" })
    const [question5, setQuestion5] = React.useState({ question: "What do you believe the goal of a staff team is", answer: "" })
    const [question6, setQuestion6] = React.useState({ question: "What are the three strengths and weaknesses you have", answer: "" })
    const [question7, setQuestion7] = React.useState({ question: "Why should we choose you over other applications", answer: "" })

    React.useEffect(() => {
        getUserDetails()
            .then(({ data }) => {
                setUser(data);
                console.log(data)
                setLoading(false);
            }).catch((err) => {
                console.error(err)
                window.location.href = `https://simplify-code.com/api/auth/discord`
                setLoading(false)
            })
    }, [])

    async function checkHandler() {
        if (checked === true) {
            await setCheck(false)
        } else if (checked === false) {
            await setCheck(true)
        }
    }

    function submitHandler(event) {

        getUserDetails().then(async result => {
            const content = {
                app: [question1, question2, question3, question4, question5, question6, question7],
                reqs: checked,
                id: result.data.discordId,
                user: result.data.username,
                tag: result.data.tag,
                appType: 'Staff Application'
            }

            if (question1.answer.split(" ").join("").length < 1 || question2.answer.split(" ").join("").length < 1 || question3.answer.split(" ").join("").length < 1) {
                return toast.error('Make sure you fill out all the questions')
            }

            if (question4.answer.split(" ").join("").length < 60) {
                return toast.error(`Question 4 requires a answer of 60 characters, you are currently at ${question4.answer.split(" ").join("").length}`)
            }

            if (question5.answer.split(" ").join("").length < 60) {
                return toast.error(`Question 5 requires a answer of 60 characters, you are currently at ${question5.answer.split(" ").join("").length}`)
            }

            if (question6.answer.split(" ").join("").length < 80) {
                return toast.error(`Question 6 requires a answer of 80 characters, you are currently at ${question6.answer.split(" ").join("").length}`)
            }

            if (question7.answer.split(" ").join("").length < 80) {
                return toast.error(`Question 7 requires a answer of 100 characters, you are currently at ${question7.answer.split(" ").join("").length}`)
            }

            function getApplications() {
                return axios.get(`https://simplify-code.com/api/apps/check/${result.data.discordId}`)
            }

            getApplications().then(async data => {
                if (data.data.discordId) {
                    return toast.error('Sorry, but you currently have a pending application, talk to our management team to get it removed.')
                } if (data.data.msg) {

                    await axios.post('https://simplify-code.com/api/newapp', content).then(res => {
                        window.location.href = "/dashboard"
                    }).catch(async () => {
                        return toast.error('Could not send the application to the database.')
                    })
                }
            })
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
                    <h1 className="app-type">Staff Application</h1>
                    <h2 className="app-title" >Requirements</h2>
                    <div className="app-recs-list">
                        <p>- Must be 16 years old</p> <br />
                        <p>- Has been in the server for 2 weeks or more</p> <br />
                        <p>- Wants to help others</p> <br />
                        <p>- Knows how to operate discord well</p> <br />
                        <p>- Knows how to use bots and other tools</p> <br />
                        <p>- Knows our rules well</p> <br />
                        <p>- Has a great english vocabulary</p> <br />
                        <p>- Has 2 step auth activated on discord</p> <br />
                    </div>
                    <div className="recs-check">
                        <input type="checkbox" onClick={
                            checkHandler
                        } />
                        <p className="check-tag">I have read the requirements and confirm that I meet them.</p>
                    </div>
                    <div className="space"></div>

                    <div className="input-container">
                        <h3 className="app-input-header">What is your region</h3>
                        <input className="app-input" type="text" onChange={e => setQuestion1({ question: "What is your reagion", answer: e.target.value })} />
                    </div>

                    <div className="input-container">
                        <h3 className="app-input-header">What time zone are you in</h3>
                        <input className="app-input" type="text" onChange={e => setQuestion2({ question: "What time zone are you in", answer: e.target.value })} />
                    </div>

                    <div className="input-container">
                        <h3 className="app-input-header">How old are you (Minumum 16)</h3>
                        <input className="app-input" type="text" onChange={e => setQuestion3({ question: "How old are you (Minumum 16)", answer: e.target.value })} />
                    </div>

                    <div className="input-container">
                        <h3 className="app-input-header">Why do you want to be a part of our staff team</h3>
                        <textarea className="app-textarea" name="app-textarea"
                            onChange={e => setQuestion4({ question: "Why do you want to be a part of our staff team", answer: e.target.value })}></textarea>
                    </div>

                    <div className="input-container">
                        <h3 className="app-input-header">What do you believe the goal of a staff team is</h3>
                        <textarea className="app-textarea" name="app-textarea"
                            onChange={e => setQuestion5({ question: "What do you believe the goal of a staff team is", answer: e.target.value })}></textarea>
                    </div>

                    <div className="input-container">
                        <h3 className="app-input-header">What are the three strengths and weaknesses you have</h3>
                        <textarea className="app-textarea" name="app-textarea"
                            onChange={e => setQuestion6({ question: "What are the three strengths and weaknesses you have", answer: e.target.value })}></textarea>
                    </div>

                    <div className="input-container">
                        <h3 className="app-input-header">Why should we choose you over other applications</h3>
                        <textarea className="app-textarea" name="app-textarea"
                            onChange={e => setQuestion7({ question: "Why should we choose you over other applications", answer: e.target.value })}></textarea>
                    </div>

                    {/*<CKEditor
                        className="editor"
                        data={`
                        <p>Discord Name and Identifier :</p><br/>
                        <p>What is your region? (NA, EU, AU) :</p><br/>
                        <p>What Time Zone are you in? :</p><br/>
                        <p>How old are you? (minimum 16) :</p><br/>
                        <p>Why do you want to be a part of our staff team? (60-word minimum):</p><br/>
                        <p>What do you believe the goal of a staff team is? (60-word minimum):</p><br/>
                        <p>What are the three strengths and weaknesses you have? (80-word minimum):</p><br/>
                        <p>Why should we choose you over other applications? (100-word minimum): <br/><br/> </p>`}

                        editor={ClassicEditor}
                        onChange={(even, editor) => {
                            const data = editor.getData()
                            setText(data)
                        }}
                    />*/}
                </div>
                <div className="app-buttons">
                    <Link to="/applications"><button className="cancel-btn">Cancel</button></Link>
                    <button className="apply-btn" onClick={
                        submitHandler
                    }>Apply</button>
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