const Discord = require('discord.js')
const db = require('../../database/schemas/warns');
const random = require('randomstring');
const dateFormat = require('dateformat');
const moment = require("moment")


/**
 * 
 * @param {Discord.Client} client 
 */

module.exports = async (client, req, res) => {
    const guild = client.guilds.cache.get("756195742741430352");
    const staff = guild.roles.cache.get("756606234706051072");
    const mod = guild.roles.cache.get("810255716429987880");

    const moderator = req.body.moderator;
    const modMember = guild.members.cache.get(moderator);

    if (modMember) {
        if (modMember.roles.highest.position < staff.position) {
            return modMember.send("Sorry but you can't use any of our moderation functions")
        } else {
            const type = req.body.type;
            const reason = req.body.reason;
            const user = req.body.user;
            const target = guild.members.cache.get(user);
            const logChannel = guild.channels.cache.get('756212353263206572')

            if (!target) return modMember.send("I can't seem to find that user in the server")
            if (modMember.roles.highest.comparePositionTo(target.roles.highest) <= 0) return modMember.send(`You cannot moderate <@${target.id}>`)
            const warnId = random.generate(8);
            const now = new Date()

            if (type === "ban") {
                if (modMember.roles.highest.position < mod.position) {
                    return modMember.send("Sorry but you can't use the `ban` function")
                }
                if (reason.length < 1) {
                    return modMember.send("We require that you fill out a reason")
                }

                new db({
                    guildID: '756195742741430352',
                    userID: user,
                    moderator: moderator,
                    reason: reason,
                    punishmentId: warnId,
                    type: 'ban',
                    date: dateFormat(now, "mm/dd/yyyy")
                }).save();

                let infoEmbed = new Discord.MessageEmbed()
                    .setAuthor(`[Banned] ${target.user.username}#${target.user.discriminator}`, banUser.user.displayAvatarURL())
                    .setDescription(`Hey, it would seem you have been banned from **Simplify Code**, feel free to send use a [ban appeal](https://simplify-code.com/applications) and we will look into it.`)
                    .addField('» Reason', reason)
                    .setFooter(`ID: ${warnId}`)
                    .setTimestamp()
                    .setColor('#e7509e');

                target.send(infoEmbed)
                target.ban({
                    reason: `${reason}`
                }).then(() => {

                    let logEmbed = new Discord.MessageEmbed()
                        .setAuthor(`[Banned] ${target.user.username}#${target.user.discriminator}`, target.user.displayAvatarURL())
                        .addField('» Banned By', modMember.user.username)
                        .addField('» Reason', reason)
                        .setFooter(`ID: ${target.user.id}`)
                        .setTimestamp()
                        .setColor('#e7509e');
                    logChannel.send(logEmbed)

                    modMember.send(`You have **Banned** <@${target.user.id}> from **Simplify Code**`)
                    return
                })
            }
            else if (type === "kick") {

                if (reason.length < 1) {
                    return modMember.send("We require that you fill out a reason")
                }

                new db({
                    guildID: '756195742741430352',
                    userID: user,
                    moderator: moderator,
                    reason: reason,
                    punishmentId: warnId,
                    type: 'kick',
                    date: dateFormat(now, "mm/dd/yyyy")
                }).save();

                let infoEmbed = new Discord.MessageEmbed()
                    .setAuthor(`[Kicked] ${target.user.username}#${target.user.discriminator}`, target.user.displayAvatarURL())
                    .setDescription(`Hey, it would seem you have been kicked from **Simplify Code**, feel free to [join](https://simplify-code.com/discord) again.`)
                    .addField('» Reason', reason)
                    .setFooter(`ID: ${warnId}`)
                    .setTimestamp()
                    .setColor('#e7509e');
                target.send(infoEmbed)

                target.kick(`${reason}`).then(() => {
                    let logEmbed = new Discord.MessageEmbed()
                        .setAuthor(`[Kicked] ${target.user.username}#${target.user.discriminator}`, target.user.displayAvatarURL())
                        .addField('» Kicked By', modMember.user.username)
                        .addField('» Reason', reason)
                        .setFooter(`ID: ${target.user.id}`)
                        .setTimestamp()
                        .setColor('#e7509e');
                    logChannel.send(logEmbed)

                    modMember.send(`You have **Kicked** <@${target.user.id}> from **Simplify Code**`)
                    return
                });
            }
            else if (type === "warn") {
                if (reason.length < 1) {
                    return modMember.send("We require that you fill out a reason")
                }

                new db({
                    guildID: '756195742741430352',
                    userID: user,
                    moderator: moderator,
                    reason: reason,
                    punishmentId: warnId,
                    type: 'warn',
                    date: dateFormat(now, "mm/dd/yyyy")
                }).save();

                let embed = new Discord.MessageEmbed()
                    .setAuthor(`[Warned] ${target.user.username}#${target.user.discriminator}`, target.user.displayAvatarURL())
                    .addField('» Warned by', modMember.user.id)
                    .addField('» Reason', reason)
                    .addField('» ID', `\`${warnId}\``)
                    .setTimestamp()
                    .setColor('#e7509e');
                target.send(embed)

                let logEmbed = new Discord.MessageEmbed()
                    .setAuthor(`[Warned] ${target.user.username}#${target.user.discriminator}`, target.user.displayAvatarURL())
                    .addField('» Warned By', modMember.user.username)
                    .addField('» Reason', reason)
                    .setFooter(`ID: ${target.user.id}`)
                    .setTimestamp()
                    .setColor('#e7509e');
                logChannel.send(logEmbed)

                modMember.send(`You have **Warned** <@${target.user.id}> in **Simplify Code**`)
                return;
            }
            else if (type === "mute") {
                if (reason.length < 1) {
                    return modMember.send("We require that you fill out a reason")
                }
                const time = req.body.time;
                if (time < 1) {
                    return modMember.send("Please state how long the mute should last")
                }
                const ms = require('ms');
                let duration = ms(time)
                const mutes = require('../../database/schemas/mutes');
                const prevMutes = await mutes.find({ userId: user });
                if (prevMutes.length) return modMember.send(`<@${target.user.id}> is already muted`);
                if (!duration) return modMember.send("Please provide a valid time, example: `2h`");
                if (duration < 1000 * 60) return modMember.send("Make sure to provide a time above 1 minute");

                const mutedRole = guild.roles.cache.get("756208491462656031")
                const mainRole = guild.roles.cache.get("756196997022744656")

                new db({
                    guildID: '756195742741430352',
                    userID: user,
                    moderator: moderator,
                    reason: reason,
                    punishmentId: warnId,
                    type: 'mute',
                    date: dateFormat(now, "mm/dd/yyyy")
                }).save();
                const expires = new Date()
                expires.setMilliseconds(expires.getMilliseconds() + duration);

                target.roles.add(mutedRole);
                target.roles.remove(mainRole);

                await new mutes({
                    userId: user,
                    expires,
                    current: true
                }).save()

                let logEmbed = new Discord.MessageEmbed()
                    .setAuthor(`${person.user.username}`, person.user.displayAvatarURL())
                    .setDescription(`<:mutemic:798565116886253589> <@${target.user.id}> has been muted\n\n**Moderator**\n<@${modMember.user.id}>`)
                    .addField('Will be unmuted', `${moment(expires).fromNow()}`)
                    .setColor('#e7509e');
                logChannel.send(logEmbed)

                let embed = new Discord.MessageEmbed()
                    .setAuthor(`[Muted] ${target.user.username}#${target.user.discriminator}`, target.user.displayAvatarURL())
                    .addField('» Muted by', modMember.user.id)
                    .addField('» Reason', reason)
                    .addField('Will be unmuted', `${moment(expires).fromNow()}`)
                    .addField('» ID', `\`${warnId}\``)
                    .setTimestamp()
                    .setColor('#e7509e');
                target.send(embed)

                modMember.user(`You have **Muted** <@${target.user.id}> in **Simplify Code**`)
                return;
            } else {
                return modMember.send("You need to fill out what type of moderation action you want to take, example: `ban`")
            }
        }


    } else {
        return res.send("Incorrect Permissions")
    }
}
