const Discord = module.require("discord.js");

module.exports.run = async (client, message, args) => {
    await message.channel.send(`:rocket: ${Date.now() - message.createdTimestamp}pc/s`);
}

module.exports.help = {
    name: "rrping"
}