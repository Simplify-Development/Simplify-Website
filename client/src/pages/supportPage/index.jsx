import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import './style.css';
import 'react-toastify/dist/ReactToastify.css'
import { getUserDetails } from '../../utils/api';
import { toast } from 'react-toastify';

toast.configure()
export function SupportPage(props) {
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


    const navSlide = () => {
        const burger = document.querySelector('.burger');
        const nav = document.querySelector('.nav-links')
        const navLinks = document.querySelectorAll('.nav-links a')

        // Toggle Links
        nav.classList.toggle('nav-active')


        //Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = ''
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 5 + 0.5}s`
            }
        })

        //Burger Animation
        burger.classList.toggle('toggle')
    }

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
                    appType: 'Support Application'
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
                            return toast.success('Application was submited, you are now awaiting a response from our management team.')
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

    return !loading && (
        <body>
            <div className="nav">

                <div className="page-cont">
                    <ul className="nav-links">
                        <Link><li><a className="aa" onClick={() => {
                            window.open("https://discord.gg/XveJX7Z", "_blank")
                        }}>Discord</a></li></Link>
                        <Link to="/faq"><li><a className="ab" >Faq</a></li></Link>
                        <Link to="/rules"><li><a className="ac" >Rules</a></li></Link>
                        <Link to="/team"><li><a className="ad" >Team</a></li></Link>
                    </ul>

                    <div className="burger" onClick={navSlide}>
                        <div className="line1"></div>
                        <div className="line2"></div>
                        <div className="line3"></div>
                    </div>
                </div>

                <Link to="/dashboard">
                    <button className="login-btn">
                        Dashboard
                    </button>
                </Link>
            </div>

            <div className="app-background">
                <div className="editor-container">
                    <h1 className="app-type">Support Team Application</h1>
                    <h2 className="app-title" >Requirements</h2>
                    <div className="app-recs-list">
                        <p>- Must be 14 years old</p> <br />
                        <p>- Has been in the server for 2 weeks or more</p> <br />
                        <p>- Wants to help others</p> <br />
                        <p>- Knows how to operate discord like a pro</p> <br />
                        <p>- Knows some basic programming</p> <br />
                        <p>- Has a great english vocabulary</p> <br />
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
                        <p>What is your region? (NA, EU, AU) :</p><br/>
                        <p>What Time Zone are you in? :</p><br/>
                        <p>How old are you? (minimum 14) :</p><br/>
                        <p>Why do you want to be a part of our support team? (60-word minimum):</p><br/>
                        <p>What do you believe the goal of a support team is? (60-word minimum):</p><br/>
                        <p>Do you have any programming experience, if so please explain? (40-word minimum):</p><br/>
                        <p>Why should we choose you over other applications? (80-word minimum): <br/><br/> </p>`}

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