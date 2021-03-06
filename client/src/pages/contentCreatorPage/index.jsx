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
export function ContentCreatorPage(props) {
    const [text, setText] = useState('')
    const [checked, setCheck] = useState(false)
    const [user, setUser] = React.useState( null );
    const [loading, setLoading ] = React.useState( true )

    React.useEffect( () => {
        getUserDetails()
        .then( ( { data } ) => {
            setUser( data );
            console.log(data)
            setLoading(false);
        }).catch( (err) => {
            console.error(err)
            window.location.href = `https://simplify-code.com/api/auth/discord`
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

        if (text.length > 1) {

            getUserDetails().then(async result => {
                const content = {
                    app: text,
                    reqs: checked,
                    id: result.data.discordId,
                    user: result.data.username,
                    tag: result.data.tag,
                    appType: 'Content Creator Application'
                }

                function getApplications() {
                    return axios.get(`https://simplify-code.com/api/apps/check/${result.data.discordId}`)

                }

                getApplications().then(async data => {
                    if (data.data.discordId) {
                        return toast.error('Sorry, but you currently have a pending application, talk to our management team to get it removed.')
                    } if (data.data.msg) {

                        await axios.post('https://simplify-code.com/api/newapp', content).then(res => {
                            setText('')
                            window.location.href = "/dashboard"
                        }).catch(async () => {
                            return toast.error('Could not send the application to the database.')
                        })
                    }
                })
            })
        } else {
            toast.error('You need to fill out the application first')
        }

        //console.log(content)
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
                    <h1 className="app-type">Content Creator</h1>
                    <h2 className="app-title" >Requirements</h2>
                    <div className="app-recs-list">
                        <p>- Must be 13 years old</p> <br />
                        <p>- Has been in the server for 2 weeks or more</p> <br />
                        <p>- Has consistent view counts</p> <br />
                        <p>- Their content is about programming</p> <br />
                    </div>
                    <div className="recs-check">
                        <input type="checkbox" onClick={
                            checkHandler
                        } />
                        <p className="check-tag">I have read the requirements and confirm that I meet them.</p>
                    </div>
                    <h2 className="app-title" >APPLICATION</h2>
                    <CKEditor
                        className="editor"
                        data={`
                        <p>Discord Name and Identifier :</p><br/>
                        <p>How old are you? (minimum 13) :</p><br/>
                        <p>What platform do you post your content on? :</p><br/>
                        <p>What is your content about? :</p><br/>
                        <p>How many followers do you have? :</p><br/>
                        <p>Provide us with a link to your channel :</p><br/>
                        `}

                        editor={ClassicEditor}
                        onChange={(even, editor) => {
                            const data = editor.getData()
                            setText(data)
                        }}
                    />
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