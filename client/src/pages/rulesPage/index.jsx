import React, { useState } from "react";
import { Link } from 'react-router-dom';
import "./style.css";
import logo from "../img/utils.png";


export function RulesPage(props) {

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

    const openNav = () => {
        setOpen(!open)
    }

    return (
        <body>
            <div className="nav">
                <div className="logo-container">
                    <img src={logo} alt="" className="logo" />
                    <h1 className="logo-title">Simplify Code</h1>
                </div>

                <div className="links-container">
                    <div className="nav-links">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/faq">FAQ</Link></li>
                        <li><Link to="/team">Team</Link></li>
                        <li><Link to="/dashboard">Dashboard</Link></li>
                    </div>
                    <div className={"nav-menu " + (open ? "open" : "")}>
                        <Link to="/">Home</Link>
                        <Link to="/faq">FAQ</Link>
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
                        <span className="bold">1.</span> Do not swear in Chats or VCs, meaning you should never use bad language. You  should also never try to bypass our swear filter,
                        this means that you should not try to change up your words to avoid the filter as this would allow you to use bad language.
                        You should also not try to get someone to use a bad word or joke around as you are still breaking rules. If you quote, influence, or copy those that break
                        the rules you may receive the same punishment.
                    </p>
                </div>
                <div className="rule">
                    <p>
                        <span className="bold">2.</span> All advertising is not allowed on the server and will cause a harsh punishment, this also goes for the dm's of our users.
                        If you are found breaking this rule in dm's or in the server we will take quick action. If you are dm advertising we will report you to discord as
                        it is against Discord ToS. We do also have filters for this so there is no reason you should attempt to break it.
                    </p>
                </div>
                <div className="rule">
                    <p>
                        <span className="bold">3.</span> All NSFW, NSFL, and unwholesome content has no place in our server and will result in a permenant ban if broken, this also goes for
                        viruses and other malware, this could also result in a ban from discord as some of this counts as violation of the Discord ToS.
                    </p>
                </div>
                <div className="rule">
                    <p>
                        <span className="bold">4.</span> The category channels are there for a reason, meaning if you need help with JavaScript do not type in the
                        <span className="discord-color-span"> #python</span> channel or any other channel than JavaScript, we also see many users that need help with
                        discord.js so if you do need help with discord.js then make sure to use the <span className="discord-color-span">#discord-js</span> channel, this rule
                        does also go for other channels for example should bot commands only be used in the <span className="discord-color-span">#bot-commands</span> channel.
                    </p>
                </div>
                <div className="rule">
                    <p>
                        <span className="bold">5.</span> We all want our server to be a place for eveyone to join, this means that you as a member should not try to harass other users
                        or be toxic against them, everyone has a bad day from time to time but this does not mean you should take your anger out on others.
                    </p>
                </div>
                <div className="rule">
                    <p>
                        <span className="bold">6.</span> You must at all times remember that some users may be at the younger ages so please make sure the all topics are friendly
                        for all users, meaning no NSFW, sexually explicit, relating to substamce abuse or disturbing content should be streamed or shared, you must also make sure that your
                        username and profile picture follor this rule.
                    </p>
                </div>
                <div className="rule">
                    <p>
                        <span className="bold">7.</span> While in a voice channel you should never try to annoy other users with stuff like mic spam or voice changers. You should also make sure to warn users about
                        loud sounds/audio in a video.
                    </p>
                </div>
                <div className="rule">
                    <p>
                        <span className="bold">8.</span> You should not use the music bots in the server to play music with exesive swearing or loud audio as some users may not like this. The song can also not
                        break any other rules.
                    </p>
                </div>
                <div className="rule">
                    <p>
                        <span className="bold">9.</span> You should not use spoilers to make it look like you are typing a bad word like "n<span className="spoiler-span">ugget</span>" as this could seem like you
                        just used the N Word.
                    </p>
                </div>
                <div className="rule">
                    <p>
                        <span className="bold">10.</span> No interfering with moderator's duties, this could mean that you are calling them for no reason in chat or wasting their time with fake/forged evidence or
                        simply trolling. You should also not try to mini mod, this means that you are acting like a staff member, this is something we do not want anyone to do and
                        will cause a harsh punishment.
                    </p>
                </div>
                <div className="rule">
                    <p>
                        <span className="bold">11.</span> As we hope you know racist or homophobic content or jokes is not ok at all, and therefore we do not want that in our server, if this rule is broken
                        it will result in a permenant ban, there is nothing you can say against this to get your ban revoked.
                    </p>
                </div>
                <div className="rule">
                    <p>
                        <span className="bold">12.</span> Your Username/Nickname should always be following our rules, it should also be a name that is possible to mention using a normal keyboard. If this
                        rule is to be broken your name will get changed
                    </p>
                </div>
                <div className="rule">
                    <p>
                        <span className="bold">13.</span> You should not expect that we add your bot to our server, it could have hidden commands and functions that could destroy the server, for this
                        reason are we not adding any unverified bots to our server. If the bot is verified we can consider adding it.
                    </p>
                </div>
                <div className="rule">
                    <p>
                        <span className="bold">14.</span> You should never accuse anyone for something you cannot prove, this does not only go for reports. Because we like to go by the saying
                        "you are innocent until proven guilty".
                    </p>
                </div>
                <div className="bottom-rules">
                    <p>If you have any questions about our rules or would like to report someone, then please contact us on <a className="faq-bottom" onClick={() => window.open("https://discord.gg/XveJX7Z", "_blank")}>discord</a>.</p>
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