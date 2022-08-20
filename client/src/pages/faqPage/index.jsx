import React, { useState } from "react";
import { Link } from 'react-router-dom';
import FAQ from './FAQ';
import './style.css'
import logo from "../img/utils.png";

export function FaqPage(props) {

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

    const [faqs, setfaqs] = useState([
        {
            question: 'How do I become a moderator ?',
            answer: 'If you would like to become a part of our staff team then feel free to submit an application over on the dashboard page, we also announce when staff applications open.',
            open: false
        },
        {
            question: 'How do I get in contact with the staff team ?',
            answer: 'We have a very simple system for you to contact staff or support, all you need to do is to dm our bot "Simplify Utilities#8736", then a staff member will contact you from there.',
            open: false
        },
        {
            question: 'Why did my username get moderated ?',
            answer: 'The reason for this is because your username is against our rules and therefore your name was changed if you change your username you can contact staff and get it changed again.',
            open: false
        },
        {
            question: 'How do I report a staff member ?',
            answer: 'This is very simple, all you need to do is to dm our bot, "Simplify Utilities#8736" and say you want to report a staff member, then wait until a member of the management team contacts you, until then you should wait.',
            open: false
        },
        {
            question: 'Why are some links filtered ?',
            answer: 'We have filtered all links that could be bad for our users and could include malware or stuff like Ip loggers.',
            open: false
        },
        {
            question: 'How can I add Simplify Utilities to my server ?',
            answer: `We are sorry but Simplify Utilities is a private bot developed by Simplify Development and will never be given to the public, tho there are many other great bots out there.`,
            open: false
        },
        {
            question: 'Why is slow-mode on in some chats ?',
            answer: 'Slow-mode is on in some chats to ensure that our moderators can do their job better, tho slow-mode does not get used as often and we try to use it only when we need to.',
            open: false
        },
        {
            question: 'Why is swearing against the rules ?',
            answer: 'The reason we do not like that people swear in our server is simply that it\'s a bad thing to do, we have a lot of young members and we just feel that swearing is not something we want in our server.',
            open: false
        },
        {
            question: 'When is the next giveaway & how do I host one ?',
            answer: 'We don\'t plan our giveaways months before but we will be sure to give you a notification when we do. When it comes to hosting one all you need to do is to dm our bot and a staff member will lead you from there.',
            open: false
        },
        {
            question: 'Why do I need to log into discord to apply for stuff ?',
            answer: 'The reason you need to log into our website is simple, we need your discord info for you to apply so we can later review that application and know for sure who submitted it.',
            open: false
        }
    ]);

    const toggleFAQ = index => {
        setfaqs(faqs.map((faq, i) => {
            if (i === index) {
                faq.open = !faq.open
            } else {
                faq.open = false;
            }

            return faq;
        }))
    }

    const openNav = () => {
        setOpen(!open)
    }

    return (
        <body>

            {/*<div className="nav">

                <div className="page-cont">
                    <ul className="nav-links">
                    <Link><li><a className="aa" onClick={() => {
                            window.open("https://discord.gg/XveJX7Z", "_blank")
                        }}>Discord</a></li></Link>
                        <Link to="/rules"><li><a className="ab" >Rules</a></li></Link>
                        <Link to="/team"><li><a className="ac" >Team</a></li></Link>
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
                    </button>
                </Link>
            </div>*/}

            <div className="nav">
                <div className="logo-container">
                    <img src={logo} alt="" className="logo" />
                    <h1 className="logo-title">Simplify Code</h1>
                </div>

                <div className="links-container">
                    <div className="nav-links">
                        <li><Link to="/rules">Rules</Link></li>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/team">Team</Link></li>
                        <li><Link to="/dashboard">Dashboard</Link></li>
                    </div>
                    <div className={"nav-menu " + (open ? "open" : "")}>
                        <Link to="/rules">Rules</Link>
                        <Link to="/">Home</Link>
                        <Link to="/team">Team</Link>
                        <Link to="/dashboard">Dashboard</Link>
                    </div>

                    <div className="burger" onClick={openNav}>
                        <div className="line1"></div>
                        <div className="line2"></div>
                        <div className="line3"></div>
                    </div>
                </div>

            </div>

            <div className="top"></div>

            <div className="faqs">
                {faqs.map((faq, i) => (
                    <FAQ faq={faq} index={i} toggleFAQ={toggleFAQ} />
                ))}
            </div>
            <div className="bottom-faq">
                <p>If you did not find a answer to your question then please let us know in <a className="faq-bottom" onClick={() => window.open("https://discord.gg/XveJX7Z", "_blank")}>discord</a>.</p>
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