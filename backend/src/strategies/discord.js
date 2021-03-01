const passport = require('passport')
const DiscordStrategy = require('passport-discord');
const userSchema = require('../database/schemas/User-Schema')

passport.serializeUser( (user, done) => {
    done(null, user.discordId)
});

passport.deserializeUser(async (discordId, done) => {
    try {
        const user = await userSchema.findOne( {discordId} );
        return user ? done( null, user ) : done(null, null);
    } catch (err) {
        console.log(err);
        done(err, null)
    }
});
passport.use(new DiscordStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CLIENT_REDIRECT,
    scope: ["identify", "guilds"]
}, async (accessToken, refreshToken, profile, done) => {
    console.log(profile.username)
    try {
        const findUser = await userSchema.findOneAndUpdate({ discordId: profile.id}, {
            discordTag: `${profile.username}#${profile.discriminator}`
        }, { new: true } );
    
        if (findUser) {
            console.log('User was found');
            return done( null, findUser );
        } else {
            const newUser = await userSchema.create({
                discordId: profile.id,
                discordTag: `${profile.username}#${profile.discriminator}`
            });
            return done( null, newUser )
        }
    } catch (err) {
        console.log(err)
        return done(err, null)
    }
})
)