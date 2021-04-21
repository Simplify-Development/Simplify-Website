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
        if (!message.member.roles.cache.has("825434877133848636")) return message.reply('Sorry but you can\'t use this command')
        if (!args[0]) {
            return message.reply("Please include the application ID")
        }
        const applicationId = args[0]
        applicationSchema.findOne({ applicationId: applicationId, status: 'Pending' }, async (err, data) => {
            if (err) throw err
            if (data) {
                const channel = client.channels.cache.find(ch => ch.id === '818890518922002462')

                channel.send(`> <@${data.discordId}> congratulations! Your \`\`${data.appType}\`\` has been accepted by <@${message.author.id}>\n> \n> You should expect instructions soon`)
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
        if (!message.member.roles.cache.has("825434877133848636")) return message.reply('Sorry but you can\'t use this command')
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
                channel.send(`> <@${data.discordId}> Your \`\`${data.appType}\`\` has been denied by <@${message.author.id}>\n> \n> Reason: **${reason}**\n\n> *Have a issue with this? Contact our modmail*`)
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
    } else if (command === 'status') {
        if (!args[0]) {
            let embed = new Discord.MessageEmbed()
                .setAuthor(`${message.author.username}`, message.author.displayAvatarURL())
                .setDescription(`<:cross:767340003935256596> You are missing some arguments, expected usage:\n\`\`-status <application id>\`\`\n\nArguments:\n\`\`application id\`\`: The id of the application`)
                .setColor('#f03211');
            let msg = await message.channel.send(embed);
            message.delete()
            msg.delete({ timeout: 8000 })
            return;
        }
        const applications = require('./src/database/schemas/App-Schema');
        applications.findOne({ applicationId: args[0] }, (err, res) => {
            if (err) return;
            if (!res) {
                let embed = new Discord.MessageEmbed()
                    .setAuthor(`${message.author.username}`, message.author.displayAvatarURL())
                    .setDescription(`<:cross:767340003935256596> Could not find a application with that id`)
                    .setColor('#f03211');
                let msg = await message.channel.send(embed);
                message.delete()
                msg.delete({ timeout: 8000 })
                return;
            } else if (res) {
                let color;
                if (res.status === "Pending") color = "#fcdb03";
                if (res.status === "Declined") color = "#e60526";
                if (res.status === "Accepted") color = "#05e666";

                let embed = new Discord.MessageEmbed()
                    .setDescription(`This is one of <@${res.discordId}>'s applications`)
                    .addField("Type", res.type)
                    .addField("Status", res.status)
                    .addField("Applied on", res.date)
                    .setColor(color)
                    .setTimestamp()
                message.channel.send(embed);
            }
        })
    }
})

const schema = require('./src/database/schemas/App-Schema')
const totalSchema = require('./src/database/schemas/total-schema')
const random = require('randomstring')
const dateFormat = require("dateformat")
const now = new Date();


app.post("/api/newapp", async (req, res) => {
    const content = req.body.app
    const reqs = req.body.reqs
    const discordId = req.body.id
    const user = req.body.user
    const tag = req.body.tag
    let applicationId = random.generate(6)

    res.send("test")

    const newData = new schema({
        appType: req.body.appType,
        user,
        content,
        reqs,
        discordId,
        applicationId,
        tag,
        date: dateFormat(now, "mm/dd/yyyy"),
        status: 'Pending'
    })
    newData.save().then(() => {
        client.users.cache.get(discordId).send(`
        Hello <@${discordId}>, Your \`\`${req.body.appType}\`\` has been submitted.\nYou are now awaiting a response from our management team.`
        )
    })

    await totalSchema.findOneAndUpdate({
        id: "756195742741430400"
    }, {
        $inc: {
            total: 1
        }
    }, {
        upsert: true,
        new: true
    })
})

client.login(process.env.token);

app.get('/discord', (req, res) => {
    res.redirect('https://discord.com/invite/XveJX7Z')
})

app.get("/api/staff", (req, res) => {
    const guild = client.guilds.cache.get("756195742741430352");
    const role = guild.roles.cache.get("756606234706051072")
    const result = guild.members.cache.filter(member => member.user.bot == false && member.roles.highest.position >= role.position).map(member => [
        {
            username: member.user.username,
            avatar: member.user.avatarURL(),
        }
    ])
    res.send(result)
})

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