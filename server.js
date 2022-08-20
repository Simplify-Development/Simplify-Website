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
            return res.redirect(301, 'http://localhost:5001');
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
    origin: ['http://localhost:3000'],
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

/*const total = require('./src/database/schemas/total-schema')
const creatTotal = () => {
    const newData = new total({
        total: 43,
        id: 892751160182730772
    })
    newData.save()
    
}
creatTotal()*/

/*const applications = require('./src/database/schemas/App-Schema')
const creatTotal = () => {
    const newData = new applications({
        appType: "staff",
        content: ["test"],
        discordId: "test",
        reqs: false,
        applicationId: "1235",
        user: "100",
        tag: "#111",
        date: "01010",
        status: "Pending"
    })
    newData.save()
    
}
creatTotal()*/

// Starting the discord bot
const Discord = require('discord.js');
const client = new Discord.Client({
    intents: [Discord.Intents.ALL],
    displayEveryone: true,
    partials: ["MESSAGE", "CHANNEL", "REACTION"]
});
const prefix = '-';
const applicationSchema = require('./src/database/schemas/App-Schema')

client.on("ready", () => {
    console.log("Bot is ready")
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
        Hello <@${discordId}>, Your \`\`${req.body.appType}\`\` with the id \`${applicationId}\` has been submitted.\nYou are now awaiting a response from our management team.`
        )

        const logChannel = client.channels.cache.get("862792270032928778")
        logChannel.send(`> <@${discordId}> just submitted a \`${req.body.appType}\` with id \`(${applicationId})\``)
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

app.get('/discord', (req, res) => {
    res.redirect('https://discord.com/invite/XveJX7Z')
})

app.get("/api/staff", (req, res) => {
    const quotes = require('./src/database/schemas/quote-schema')
    const guild = client.guilds.cache.get("756195742741430352");
    const role = guild.roles.cache.get("756606234706051072")
    const result = guild.members.cache.filter(member => member.user.bot == false && member.roles.highest.position >= role.position)
    let staff = []
    result.forEach(async member => {
        staff.push({
            username: member.user.username,
            avatar: member.user.displayAvatarURL({ format: 'png' }),
            role: guild.members.cache.get(member.user.id).roles.highest.name,
        })
    })

    res.send(staff)
})

app.post("/api/applications/decline", async (req, res) => {
    const id = req.body.id;
    const moderator = req.body.moderator;

    const applications = require('./src/database/schemas/App-Schema');

    applications.findOne({ applicationId: id }, async (err, data) => {
        if (err || !data) return;
        else if (data) {
            const channel = client.channels.cache.find(ch => ch.id === '818890518922002462')
            channel.send(`> <@${data.discordId}> Your \`\`${data.appType}\`\` has been denied by <@${moderator}>\n\n> *Have a issue with this? Contact our modmail*`)
            await applicationSchema.findOneAndUpdate({
                applicationId: id
            }, {
                status: 'Declined'
            }, {
                upsert: true
            }).then(() => {
                res.send("done")
            })
        }
    })
})
app.post("/api/applications/accept", async (req, res) => {
    const id = req.body.id;
    const moderator = req.body.moderator;

    const applications = require('./src/database/schemas/App-Schema');

    applications.findOne({ applicationId: id, status: 'Pending' }, async (err, data) => {
        if (err || !data) return;
        else if (data) {
            const channel = client.channels.cache.find(ch => ch.id === '818890518922002462')
            channel.send(`> <@${data.discordId}> congratulations! Your \`\`${data.appType}\`\` has been accepted by <@${moderator}>\n> \n> You should expect instructions soon`)
            await applicationSchema.findOneAndUpdate({
                applicationId: id
            }, {
                status: 'Accepted'
            }, {
                upsert: true
            }).then(() => {
                res.send("done")
            })
        }
    })
})

app.get("/api/users", (req, res) => {
    const guild = client.guilds.cache.get("756195742741430352")
    let count = guild.memberCount
    res.send(`${count}`)
})

app.get("/api/panel/users", (req, res) => {
    return require('./src/routes/panel/users')(client, req, res);
})
app.get("/api/panel/users/:id", (req, res) => {
    return require('./src/routes/panel/user')(client, req, res);
})
app.get("/api/panel/perms/:id", (req, res) => {
    return require('./src/routes/panel/perms')(client, req, res);
})
app.post("/api/panel/moderation", (req, res) => {
    return require('./src/routes/panel/modertaion')(client, req, res);
})

app.post("/api/newreport", (req, res) => {
    const userId = req.body.userId;
    const reported = req.body.reportedId;
    const checked = req.body.checked;
    const reason = req.body.reason;

    const user = client.users.cache.get(userId)
    const reportedUser = client.users.cache.get(reported)
    if (!user) return;
    if (!reportedUser) {
        return user.send(`I can't find a user in the server with the id \`${reported}\`, make sure to provide a valid id next time`)
    }

    const logChannel = client.channels.cache.get("756212353263206572")
    
    const embed = new Discord.MessageEmbed()
    .setTitle('User Report')
    .setDescription('A new user reported has been created')
    .addFields([
        {name: 'By', value: `<@${user.id}>`},
        {name: 'Reported', value: `<@${reportedUser.id}>`},
        {name: 'Broken Rules', value: checked.join(", ")},
        {name: 'Reason', value: reason}
    ])
    .setTimestamp()
    .setFooter(user.id)
    logChannel.send(embed).then(() => {
        user.send("You have created a report, there is a chanse we will contact you about this to get more information.")
        res.send("Completed")
    })
})
app.post("/api/logout", async (req, res) => {
    const userId = req.body.id;
    const users = require('./src/database/schemas/User-Schema');
    await users.findOneAndDelete({ discordId: userId }).then(() => res.send("Complete"))
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

client.login(process.env.token);