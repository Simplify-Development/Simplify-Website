import React from "react";
import Typist from 'react-typist';
import "./style.css"
import modmail from "./img/modmail.png";
import utils from "./img/utils.png";
//import Accordion from "../../components/Accordion";
import './footer.css'

import { Link } from "react-router-dom"
//import { Team } from "discord.js";


export function MainPage(props) {
    //const login = () => window.location.href = 'http://localhost:5000/api/auth/discord'

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
                        <li><a className="aa" onClick={() => {
                            window.open("https://discord.com/invite/96MAcmwA", "_blank")
                        }}>Discord</a></li>
                        <li><a className="ab" >Faq</a></li>
                        <li><a className="ac" >Rules</a></li>
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
                        <a class="login-btn-logo"><i class="fab fa-discord"></i></a>
                    Dashboard
                </button>
                </Link>

            </div>


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
                            Simplify code is a great coding community for everyone to join from a beginner to a software
                            developer, we have everything you would need to get started. So join now!
                        </p>
                    </Typist>
                    <button className="discord_btn" onClick={() => {
                        window.open("https://discord.com/invite/96MAcmwA", "_blank")
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
                            Simplify Utilities manages Wordfilters, Logs, anti spam, verification and other critical aspects./
                        </p>
                        <img src={utils} height="324.75px" width="auto" className="card-img" />
                    </div>
                </div>
            </div>

            <div className="footer-container">
                <footer>
                    <div className="container">
                        <div className="about">
                            <h2>About</h2>
                            <p>Simplify Code is a coding community for everyone to join, we are growing more every day so why not join.</p>
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
                                <li><a >Rules</a></li>
                                <li><a >Privacy Policy</a></li>
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
    );
}
