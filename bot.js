const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + "Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

 //require("http").createServer(async (req,res) => { res.statusCode = 200; res.write("ok"); res.end(); }).listen(3000, () => console.log("Now listening on port 3000"));

const fs = require('fs')
const Discord = require("discord.js");
const bot = new Discord.Client();
const cron = require('cron');
const config = require("./config.json");
const client = new Discord.Client();
const Enmap = require("enmap");

const moment = require("moment-timezone");
    moment.locale('pt-BR')

var data = moment().format('l'); 
var hora = moment.tz("America/Sao_Paulo").format('LTS');


bot.commands = new Discord.Collection();
const db = require("quick.db");


fs.readdir('./commands/', (err, files) => {

  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("Couldn't find commands")
    return;
  }
    setTimeout(function(){ 
    console.log("Beginning startup"); 
}, 0);
  
  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`)
    console.log(`${f} loaded`);
    bot.commands.set(props.help.name, props);
  });

    setTimeout(function(){ 
    console.log("Building color pallete... Done!"); 
}, 1000)
});

bot.commands = new Enmap();

fs.readdir("./commands/admin/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/admin/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Module "${commandName}" ready`);
    bot.commands.set(commandName, props);
  });
});

bot.commands = new Enmap();

fs.readdir("./commands/rainbowrole/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/rainbowrole/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Module "${commandName}" ready`);
    bot.commands.set(commandName, props);
  });
});



bot.on("ready", () => {
  
  bot.user.setActivity(`%rainbow 🖌️`, {type: 'STREAMING'});
  
  });



//==================================================================================================================


bot.on("message", async message => {
  

  
//==================================================================================================================
  
  let prefix = process.env.PREFIX;
  let messageArray = message.content.split(" ");
  let command = messageArray[0];
  let args = messageArray.slice(1);
  let commandfile = bot.commands.get(command.slice(prefix.length));
  if (!message.content.startsWith(prefix)) return;
  if(commandfile) commandfile.run(bot,message,args);
  var author = message.author;
  
  
})

bot.login(process.env.TOKEN);
