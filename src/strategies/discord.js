// Imports and Node Packages
const passport = require('passport')
const DiscordStrategy = require('passport-discord');
const userSchema = require('../database/schemas/User-Schema')
const OAuth2Credentials = require('../database/schemas/OAuth2Credentials');
const router = require('express').Router()
const { encrypt, decrypt } = require('../utils/api')

// Serializing/Desirialzing of users
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

// Createing the Stategy for passport to run
passport.use(new DiscordStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CLIENT_REDIRECT,
    scope: ["identify", "guilds"]
}, async (accessToken, refreshToken, profile, done) => {
    const encryptedAccessToken = encrypt(accessToken).toString();
    const encryptedRefreshToken = encrypt(refreshToken).toString()

    const { id, username, discriminator } = profile;
    // Error Handling
    try {
        const findUser = await userSchema.findOneAndUpdate({ discordId: profile.id}, {
            tag: `${profile.discriminator}`,
            username: profile.username,
            avatar: `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.webp`,
        }, { new: true } 
        );
        
        const findCredentials = await OAuth2Credentials.findOneAndUpdate({ discordId: id }, {
            accessToken: encryptedAccessToken,
            refreshToken: encryptedRefreshToken
        })
        if (findUser) {
            if (!findCredentials) {
                const newCredentials = await OAuth2Credentials.create({
                    accessToken: encryptedAccessToken,
                    refreshToken: encryptedRefreshToken,
                    discordId: id
                });
            }
            console.log('User was found');
            return done( null, findUser );
        } else {
            const newUser = await userSchema.create({
                discordId: profile.id,
                username: `${profile.username}`,
                tag: `${profile.discriminator}`,
                avatar: `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.webp`
            });
            const newCredentials = await OAuth2Credentials.create({
                accessToken: encryptedAccessToken,
                refreshToken: encryptedRefreshToken,
                discordId: id
            }) ;

            return done( null, newUser )
        }

    } catch (err) {
        console.log(err)
        return done(err, null)
    }
})
)