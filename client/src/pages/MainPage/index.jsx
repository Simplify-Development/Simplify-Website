import React from "react";
import Typist from 'react-typist';
import "./style.css"
import modmail from "../img/modmail.png";
import utils from "../img/utils.png";
//import Accordion from "../../components/Accordion";
import './footer.css'
import '../nav.css'

import { Link } from "react-router-dom"


export function MainPage(props) {
    const [open, setOpen] = React.useState(false)
    //const login = () => window.location.href = 'http://localhost:5000/api/auth/discord'

    const navSlide = () => {
        /*const burger = document.querySelector('.burger');
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
        burger.classList.toggle('toggle')*/

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

    return (
        <body>
            {/*<div className="nav">

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
            </div>*/}

            <nav>
                <div className={
                    "nav-bar " + (open ? 'open' : '')
                }>
                    <img src={utils} alt="" className="logo" onClick={openWindowDiscord} />
                    <ul className="navLinks">
                        <li><Link to="/faq" className="aa">FAQ</Link></li>
                        <li><Link to="/rules" className="ab">Rules</Link></li>
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

            <div className="discord-container">
                <div className="discord" id="discord-page">
                    <Typist avgTypingDelay={55} cursor={{
                        show: false,
                    }}>
                        <h1>
                            <span className="s1">Simp</span><span className="s2">lify</span> <span className="s3">Co</span><span className="s4">de</span>
                        </h1>
                        <h3>Learn code, Chat with friends, Have fun.</h3>
                        <Typist.Delay ms={200} />
                        <p>
                            Simplify code is a great coding community for everyone, from a beginner to a software
                            developer, we have everything you would need to get started. So join now!
                        </p>
                    </Typist>
                    <button className="discord_btn" onClick={() => {
                        window.open("https://discord.gg/XveJX7Z", "_blank")
                    }}>Join Now</button>

                </div>
            </div>

            <div className="discord-container1">
                <div className="space">
                    <div className="card">
                        <h2>ModMail</h2>
                        <p>
                            Our Modmail is <span className="bold">custom</span> made and has many advantages over other systems.
                            One of these advantages are that you get faster and easier support.
                        </p>
                        <img src={modmail} height="324.75px" width="auto" className="card-img" />
                    </div>
                </div>

                <div className="space">
                    <div className="card">
                        <h2>Custom Bot</h2>
                        <p>
                            We dont use bots like Dyno and MEE6 to manage our server, instead we use Simplify Utilities.
                            Simplify Utilities manages Wordfilters, Logs, anti spam, verification and other critical aspects.
                        </p>
                        <img src={utils} height="324.75px" width="auto" className="card-img" />
                    </div>
                </div>
            </div>




            {/*<div className="youtube">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#eef1f5" fill-opacity="1" d="M0,192L48,202.7C96,213,192,235,288,224C384,213,480,171,576,170.7C672,171,768,213,864,229.3C960,245,1056,235,1152,218.7C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
                <div className="pinkbox">
                    <div className="youtube-text-container">
                        <div className="text-youtube-container">
                            <h1><span className="s1">Want</span> <span className="s2">to</span> <span className="s3">know</span> <span className="s4">more?</span></h1>
                            <p>Our YouTube channel is a great place to learn code. We have tons of tutorials showing you how to start your next project, so why not check it out?</p>
                            <button className="youtube-button">Youtube</button>
                        </div>

                    <div className="youtube-icons">
                        <a onClick={() => window.open("https://www.youtube.com/channel/UCkCQKpugToFwY_EWkI0GlWw", "_blank")}><i class="fab fa-youtube"></i></a>
                        <a className="youtube-icons-discord" onClick={() => window.open("https://discord.gg/XveJX7Z", "_blank")}><i class="fab fa-discord"></i></a>
                    </div>
                    </div>
                </div>
            </div>*/}

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
