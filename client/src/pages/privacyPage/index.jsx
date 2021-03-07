import React from "react";
import './style.css'
import { Link } from 'react-router-dom'

export function PrivacyPage(props) {
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

            <div className="privacy-box-container">
                <div className="privacy-box">
                    <h2>Simplify Development Privacy Policy</h2>
                    <p>
                        As you may know we do store some data to our database for our website and bot to work as it should, tho this data is stored we do not share it with anyone and
                        we will never do so, bellow you will see a detailed list of the data we store to our database, if you have any questions feel free to join our
                        <a className="discord-a-privacy"> Discord</a>
                    </p>
                </div>
            </div>
            <div className="privacy-container">
                <div className="privacy">
                    <p>
                        1. We do store user data like user ID's, usernames and discriminators, this is used for our login system here on this website, and for our bot,
                        the bot store this for it's warn command, suggestion command and the thanks system.
                    </p>
                </div>
                <div className="privacy">
                    <p>
                        2. We store coockies/sessions to keep track of who is logged in on the website, this is required for the dashboard and stuff like that to work as it should,
                        we store this so we can check if you are logged in when you enter pages you need to be logged in for.
                    </p>
                </div>
                <div className="privacy">
                    <p>
                        3. We store all active applications so we can accept/decline them, the reason we store them is so our system can remember the applications when it is time
                        to decline/accept a application.
                    </p>
                </div>
            </div>
            
            <div className="footer-container-main">
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
                                <Link to="/"><li><a >Home</a></li></Link>
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