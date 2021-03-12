import React from "react";
import { Link } from 'react-router-dom';
import famOyan from './img/famOyan.png'
import Zofux from './img/Zofux.png'

import "./style.css";


export function TeamPage(props) {
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

            <div className="discord-container-team">
                <div className="discord-team" id="discord-page">
                    <h1><span className="s1">Simp</span><span className="s2">lify</span> <span className="s3">Develo</span><span className="s4">pment</span></h1>
                    <p>
                    The developers of Simplify wants to make things easy.
                    We put in the little extra touch, to make our users satisfied.
                    
                    </p>
                </div>
            </div>

            <div className="card-holder-team">
                {/* Card #1 || Zofux*/}
                <div className="card-container">
                    <div className="card-team">
                        <div className="top-half">
                            <img className="logo-team" src={Zofux} alt="zofux" height="auto" width="128px"/> 
                            <div className="top-half1">
                            <h1 className="name-team">Zofux</h1>
                            <p className="desc-team">
                                Hey, my name is Zofux, I am a fullstack developer focusing for the most part in 
                                JavaScript and Java for my projects. I am the head developer here at simplify development, 
                                I hope to see you around!
                            </p>
                            <p className="role-team">
                            <br/>
                                <span className="owner-team">Owner</span>
                                <span className="management-team">Management</span>
                                <span className="dev-team">Developer</span>
                            </p>
                            </div>
                        </div>

                        <div className="bottom-half-zofux">
                            <h2 className="social-team">Socials</h2>
                            <p className="social-p-team">
                                <a className="social-a-team" onClick={() => window.open("https://www.youtube.com/channel/UC8kYYf-rv1hEw-Rph257AQg", "_blank")}><i class="fab fa-youtube"></i> Zofux</a>
                                </p>
                                <p className="social-p-team">
                                <a className="social-a-team" onClick={() => window.open("https://github.com/Zofux", "_blank")}><i class="fab fa-github"></i> Zofux</a>
                            </p>
                        </div>
                    </div>
                    </div>
                

                {/* Card #2 || famOyan*/}
                <div className="card-container">
                    <div className="card-team">
                        
                        <div className="top-half">
                            <img className="logo-team" src={famOyan} alt="famoyan" height="auto" width="128px"/>
                            <div className="top-half1">
                            <h1 className="name-team">famOyan</h1>
                            <p className="desc-team">
                                Hello, my name is famOyan, and I'm 15 years old. <br/>
                                🔥Front-end <span>(Html, CSS, React.js)</span> <br/>
                                💧Learning Back-end <span>(Express.js)</span> <br/>
                                💾Learning Databases <span>(Firebase)</span><br/>
                                <br/>
                            </p>
                            <p className="role-team">
                                <span className="owner-team">Owner</span>
                                <span className="management-team">Management</span>
                                <span className="dev-team">Developer</span>
                            </p>
                            </div>
                        </div>

                        <div className="bottom-half-zofux">
                            <h2 className="social-team">Socials</h2>
                            <p className="social-p-team">
                                <a className="social-a-team" onClick={() => window.open("https://www.youtube.com/channel/UCxGV1nNFR2Hs1JeU710-MLQ", "_blank")}><i class="fab fa-youtube"></i> famOyan</a>
                            </p>
                            <p className="social-p-team">
                                <a className="social-a-team" onClick={() => window.open("https://github.com/famOyan", "_blank")}><i class="fab fa-github"></i> famOyan</a>
                            </p>
                        </div>
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