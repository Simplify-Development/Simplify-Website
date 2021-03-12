import React, { useState } from "react";
import { Link } from 'react-router-dom';
import FAQ from './FAQ';
import './style.css'

export function FaqPage(props) {

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

    const [faqs, setfaqs] = useState([
        {
            question: 'How do I become staff ?',
            answer: 'If you would like to become a part of our staff team then feel free to submit a application over on the dashboard page, we also announce when staff applications open.',
            open: false
        },
        {
            question: 'How do I become a part of the Development Team',
            answer: 'Well, becoming a part of our development team is a bit more conplicated then becoming staff, If you feel you should be a part of our development team then feel free to submit a application wich can be found in the dashboard page.',
            open: false
        },
        {
            question: 'How do I get in contact with the staff team ?',
            answer: 'We have a very simple system for you to contact staff or support, all you need to do is to dm our botn "Simplify Utilities#8736", then a staff member will contact you from there.',
            open: false
        },
        {
            question: 'Why did my username get moderated ?',
            answer: 'The reason for this is because your username is against our rules and therefore your name was changed, if you change your username you can contact staff and get it changed again.',
            open: false
        },
        {
            question: 'How do I report a staff member ?',
            answer: 'This is very simple, all you need to do is to dm our bot, "Simplify Utilities#8736" and say you want to report a staff member, then wait until a member of the management team contacts you, until then you should wait.',
            open: false
        },
        {
            question: 'Why are some links filterd ?',
            answer: 'We have filterd all links that could be bad for our users and could include malware or stuff like Ip loggers.',
            open: false
        },
        {
            question: 'How can I add Simplify Utilities to my server ?',
            answer: `We are sorry but Simplify Utilities is a private bot developed by Simplify Development and will never be given to the public, tho there are many other great bots out there.`,
            open: false
        },
        {
            question: 'Why is slowmode on in some chats ?',
            answer: 'Slowmode is on in some chats to ensure that our moderators can do their job better, tho slowmode does not get used as often and we try to use it only when we need to.',
            open: false
        },
        {
            question: 'Why is swearing against the rules ?',
            answer: 'The reason we do not like that people swear in our server is simply because it\'s a bad thing to do, we have a lot of young members and we just feel that swearing is not something we want in our server.',
            open: false
        },
        {
            question: 'When is the next giveaway & how do I host one ?',
            answer: 'We don\'t plan our giveaways months before but we will be sure to give you a notification when we do. When it comes to hosting one all you need to do is to dm our bot and a staff member will lead you from there.',
            open: false
        },
        {
            question: 'Why do I need to log into discord to apply for stuff ?',
            answer: 'The reason for this is because we need to be able to send you a message when we accept/decline you application, therefore we need to save your user ID to our database',
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


    return (
        <body>

            <div className="nav">

                <div className="page-cont">
                    <ul className="nav-links">
                    <Link><li><a className="aa" onClick={() => {
                            window.open("https://discord.com/invite/96MAcmwA", "_blank")
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
         <a class="login-btn-logo"><i class="fas fa-address-book"></i></a>
                    </button>
                </Link>
            </div>

            <div className="faqs">
                {faqs.map((faq, i) => (
                    <FAQ faq={faq} index={i} toggleFAQ={toggleFAQ} />
                ))}
            </div>
            <div className="bottom-faq">
                <p>If you did not find a answer to your question then please let us know in <a className="faq-bottom" onClick={() => window.open("https://discord.com/invite/96MAcmwA", "_blank")}>discord</a>.</p>
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