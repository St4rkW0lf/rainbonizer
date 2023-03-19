const Discord = require("discord.js");
//const db = require("quick.db");

module.exports.run = async (bot, message, args) => {
  
  let rbrole = message.guild.roles.find(role => role.name === '[🌈] RR Voucher');
  let memberr = message.guild.members.get(message.author.id);
  let padd_logger = bot.channels.get('id_canal');
  
   if(!rbrole ||
      !memberr.roles.has(rbrole.id)){
     
     if (message.member.hasPermission("ADMINISTRATOR")){
       
     } else
     
     return message.channel.send(new Discord.RichEmbed()
                                                                            .setColor("#B3000C")
                                                                            .setTitle("<a:wrong:616414913488748584> Sorry, but you can't paint the town rainbow!")
                                                                            .setDescription("Check your **%flerken** and go to **%store** to get your voucher")
                                                                            ).then((msg)=>{
                setTimeout(function(){
                  msg.delete();
                 }, 5000); 
              });
   } 
  
  
  var randomColor = "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});
  
    
  var role = message.guild.roles.find(role => role.name === '🌈');
   role.setColor(randomColor);  
  console.log(`Role ${role.name} atualizado!`)
  
    /*setInterval(() => {
        role.edit({
            color: randomColor
        })
      //console.log(`Role ${role.name} atualizado!`)
    }, 5000);*/
  
  message.channel.send(new Discord.RichEmbed()
                      .setColor(randomColor)
                      .setDescription(`_**${message.author.tag}** uses the RR Voucher and it vanishes through space as it never existed..._`)).then((msg)=>{
                setTimeout(function(){
                  msg.delete();
                 }, 5000); 
              });
  
  padd_logger.send(new Discord.RichEmbed()
                        .setDescription(`🌈 Thanks to <@${message.author.id}>, now the Rainbow Role has a new color!`)
                        .setTimestamp()
                        .setColor(randomColor));
  
  memberr.removeRole(rbrole);
  
}

module.exports.help = {
  name: "rainbow"
}
