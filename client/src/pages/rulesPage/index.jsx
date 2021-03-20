import React from "react";

import { Link } from 'react-router-dom';

import "./style.css";


export function rulesPage(props) {

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
                            window.open("https://discord.gg/XveJX7Z", "_blank")
                        }}>Discord</a></li></Link>
                        <Link to="/faq"><li><a className="ab" >Faq</a></li></Link>
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
            </div>

            <div className="rules-box-container">
                <div className="rules-box">
                    <h2>Official Server Rules</h2>
                    <p>
                        These are the offical server rules for our discord server Simplify Code,
                        these should be followed at all times while in our server, if you feel you have any problem with these rules
                    then feel free to join our server and dm our bot <span className="discord-color-span">@Simplify Utilities#8736</span>
                    </p>

                    <br />
                    <h4>Extra Notes:</h4>
                    <p>
                        For moderation purposes, this server is <span className="bold">English only</span>, meaning you should not use any other language then english, this also goes
                    for morse code or any made up language
                </p>
                    <br />
                    <p>
                        Make sure that you are also following Discord's <a onClick={() => {
                            window.open("https://discord.com/terms", "_blank")
                        }}><span className="bold-a">Terms of Serivce</span></a> and <a onClick={() => {
                            window.open("https://discord.com/guidelines", "_blank")
                        }}><span className="bold-a">Community Guidelines</span></a>
                    </p>
                </div>
            </div>

            <div className="rules-container">
                <div className="rule">
                    <p>
                        1. Do not swear in Chats or VCs, meaning you should never use bad language. You  should also never try to bypass our swear filter,
                        this means that you should not try to change up your words to avoid the filter as this would allow you to use bad language.
                        You should also not try to get someone to use a bad word or joke around as you are still breaking rules. If you quote, influence, or copy those that break
                        the rules you may receive the same punishment.
                    </p>
                </div>
                <div className="rule">
                    <p>
                        2. All advertising is not allowed on the server and will cause a harsh punishment, this also goes for the dm's of our users.
                        If you are found breaking this rule in dm's or in the server we will take quick action, we do have filters for this so there is no reason you should
                        attempt to break it.
                    </p>
                </div>
                <div className="rule">
                    <p>
                        3. All NSFW, NSFL, and unwholesome content has no place in our server and will result in a permenant ban if broken, this also goes for
                        viruses and other walware, this could also result in a ban from discord as some of this counts as violation of the Discord ToS.
                    </p>
                </div>
                <div className="rule">
                    <p>
                        4. The category channels are there for a reason, meaning if you need help with JavaScript do not type in the
                            <span className="discord-color-span"> #python</span> channel or any other channel than JavaScript, we also see many users that need help with
                            discord.js so if you do need help with discord.js then make sure to use the <span className="discord-color-span">#discord-js</span> channel, this rule
                            does also go for other channels for example should bot commands only be used in the <span className="discord-color-span">#bot-commands</span> channel.
                        </p>
                </div>
                <div className="rule">
                    <p>
                        5. We all want our server to be a place for eveyone to join, this means that you as a member should not try to harass other users
                        or be toxic against them, everyone has a bad day from time to time but this does not mean you should take your anger out on others.
                    </p>
                </div>
                <div className="rule">
                    <p>
                        6. You must at all times remember that some users may be at the younger ages so please make sure the all topics are friendly
                        for all users, meaning no NSFW, sexually explicit, relating to substamce abuse or disturbing content should be streamed or shared, you must also make sure that your
                        username and profile picture follor this rule.
                    </p>
                </div>
                <div className="rule">
                    <p>
                        7. While in a voice channel you should never try to annoy other users with stuff like mic spam or voice changers. You should also make sure to warn users about
                        loud sounds/audio in a video.
                    </p>
                </div>
                <div className="rule">
                    <p>
                        8. You should not use the music bots in the server to play music with exesive swearing or loud audio as some users may not like this. The song can also not
                        break any other rules.
                    </p>
                </div>
                <div className="rule">
                    <p>
                        9. You should not use spoilers to make it look like you are typing a bad word like "n<span className="spoiler-span">ugget</span>" as this could seem like you
                        just used the N Word.
                    </p>
                </div>
                <div className="rule">
                    <p>
                        10. No interfering with moderator's duties, this could mean that you are calling them for no reason in chat or wasting their time with fake/forged evidence or
                        simply trolling. You should also not try to mini mod, this means that you are acting like a staff member, this is something we do not want anyone to do and
                        will cause a harsh punishment.
                    </p>
                </div>
                <div className="rule">
                    <p>
                        11. As we hope you know racist or homophobic content or jokes is not ok at all, and therefore we do not want that in our server, if this rule is broken
                        it will result in a permenant ban, there is nothing you can say against this to get your ban revoked.
                    </p>
                </div>
                <div className="bottom-rules">
                    <p>If you have any questions about our rules or would like to report someone, then please contact us on discord.</p>
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