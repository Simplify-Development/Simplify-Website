// Config
require("dotenv").config();
require('./src/strategies/discord');

// Inports and Node Packages
const express = require("express");
const app = express();
const port = process.env.PORT || 5001;
const routes = require('./src/routes');
const passport = require('passport')
const mongoose = require('mongoose')
const session = require('express-session');
const MongoStore = require('connect-mongo').default;
const cors = require('cors');
const path = require('path')

// Ensures that the client is on the https server
app.use((req, res, next) => {
    if (process.env.NODE_ENV === 'production') {
        // Redirects if the client is on the heorku server
        if (req.headers.host === 'simplify-website.herokuapp.com')
            return res.redirect(301, 'https://simplify-code.com');
        if (req.headers['x-forwarded-proto'] !== 'https')
            return res.redirect('https://' + req.headers.host + req.url);
        else
            return next();
    } else
        return next();
});



// Connecting to MongoDB
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

// Connection to the frontend with cors
app.use(cors({
    origin: ['https://simplify-code.com'],
    credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Creating the coockie for the discord login
app.use(session({
    secret: 'secret',
    cookie: {
        maxAge: 60000 * 60 * 24
    },
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL
    })
}))

// Starting passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api', routes);

/* const total = require('./src/database/schemas/total-schema')
const creatTotal = () => {
    const newData = new total({
        total: 0,
        id: 756195742741430352
    })
    newData.save()
    
}
creatTotal()*/

// Starting the discord bot
const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = '-';
const applicationSchema = require('./src/database/schemas/App-Schema')

client.on("ready", () => {
    console.log("Bot is ready")
})

client.on("message", async message => {
    if (!message.content.startsWith(prefix) || message.author.bot || message.channel.type === 'dm' || !message.member.hasPermission('MANAGE_GUILD')) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'accept') {
        if (!message.member.hasPermission('MANAGE_GUILD')) return message.reply('Sorry but you can\'t use this command')
        if (!args[0]) {
            return message.reply("Please include the application ID")
        }
        const applicationId = args[0]
        applicationSchema.findOne({ applicationId: applicationId, status: 'Pending' }, async (err, data) => {
            if (err) throw err
            if (data) {
                const channel = client.channels.cache.find(ch => ch.id === '818890518922002462')
                channel.send(`> <@${data.discordId}>'s \`\`${data.appType}\`\` has been accepted by <@${message.author.id}>\n\n> You should expect instructions soon`)
                await applicationSchema.findOneAndUpdate({
                    applicationId: applicationId
                }, {
                    status: 'Accepted'
                }, {
                    upsert: true
                })
                return message.delete()
            } else if (!data) {
                return message.reply("That is not a application")
            }
        })
    } else if (command === 'deny') {
        if (!message.member.hasPermission('MANAGE_GUILD')) return message.reply('Sorry but you can\'t use this command')
        if (!args[0]) {
            return message.reply("Please include the application ID")
        }

        if (!args[1]) return message.reply("Please state a reason for why you are declining this application")

        let reason = args.join(" ").slice(args[0].length)

        const applicationId = args[0]
        applicationSchema.findOne({ applicationId: applicationId, status: 'Pending' }, async (err, data) => {
            if (err) throw err
            if (data) {
                const channel = client.channels.cache.find(ch => ch.id === '818890518922002462')
                channel.send(`> <@${data.discordId}>'s \`\`${data.appType}\`\` has been denied by <@${message.author.id}>\n\n> Stated reason : ${reason}\n\n> If you want to talk to staff about this then contact our modmail`)
                await applicationSchema.findOneAndUpdate({
                    applicationId: applicationId
                }, {
                    status: 'Declined'
                }, {
                    upsert: true
                })
                return message.delete()
            } else if (!data) {
                return message.reply("That is not a application")
            }
        })
    } else if (command === 'whitelist') {
        const user = message.mentions.members.first()
        if (!user) {
            return message.reply('Sorry but I can\'t find that user')
        }
        if (!message.member.roles.cache.has('756195815197769840')) return message.reply('Sorry but you can\'t use this command')

        const users = require('./src/database/schemas/User-Schema')
        users.findOne({ discordId: user.id }, async (err, data) => {
            if (err) return message.reply('Could not find that user')
            if (!data) return message.reply('Could not find that user')
            if (data) {
                let wListOrBlist;
                let trueOrFalse;

                if (data.whitelisted === false) {
                    trueOrFalse = true;
                    wListOrBlist = 'Whitelisted'
                }
                if (data.whitelisted === true) {
                    trueOrFalse = false;
                    wListOrBlist = 'Blacklisted'
                }

                await users.findOneAndUpdate({
                    discordId: user.id
                }, {
                    whitelisted: trueOrFalse
                }, {
                    upsert: true,
                    new: true
                }).then(() => {
                    message.reply(`You ${wListOrBlist} <@${user.id}>`)
                    message.delete()
                    return
                })
            }
        })
    }
})

client.login(process.env.token);

// Serve Static assests if in production
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
  }


// Starting Express
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})