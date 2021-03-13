import React from "react";
import './style.css';
import { Link } from 'react-router-dom'
import axios from 'axios'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { getUserDetails } from '../../utils/api'

export function ReviewPage({
    history,
    match,
}) {
    const [content, setContent] = React.useState([])
    const [requirements, setRequirements] = React.useState('')

    function getApplication() {
        return axios.get(`https://simplify-code.com/api/apps/${match.params.id}`)
    }

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

    React.useEffect(() => {
        getUserDetails()
            .then(({ data }) => {
                if (data.whitelisted === false) {
                    window.location.href = "/"
                }

                getApplication().then(({ data }) => {
                    setContent(data)
                    if (data.reqs === false) setRequirements('No')
                    if (data.reqs === true) setRequirements('Yes')
                }).catch(err => {
                    console.log(err)
                    history.push("/404")
                })
            }).catch(() => {
                window.location.href = "/"
            })
    }, [])

    return (
        <body>
            <div className="nav">

                <div className="page-cont">
                    <ul className="nav-links">
                        <Link><li><a className="aa" onClick={() => {
                            window.open("https://discord.com/invite/96MAcmwA", "_blank")
                        }}>Discord</a></li></Link>
                        <Link to="/faq"><li><a className="ab" >Faq</a></li></Link>
                        <Link to="/rules"><li><a className="ac" >Rules</a></li></Link>
                        <Link to="/"><li><a className="ad" >Home</a></li></Link>
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
                        <a class="login-btn-logo"><i class="fas fa-address-book"></i></a>
                    </button>
                </Link>
            </div>

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
                            <li><a onClick={() => window.open("https://discord.com/invite/96MAcmwA", "_blank")}><i class="fab fa-discord"></i></a></li>
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
                                <li><a onClick={() => window.open("https://discord.com/invite/96MAcmwA", "_blank")}>Support</a></li>
                                <li><a onClick={() => window.open("https://discord.com/invite/96MAcmwA", "_blank")}>Contact</a></li>
                            </ul>
                        </div>
                    </div>
                </footer>
            </div>
        </body>
    )
}