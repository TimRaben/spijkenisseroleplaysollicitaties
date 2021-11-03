const discord = require('discord.js');
const client = new discord.Client();
const enmap = require('enmap');
const {token, prefix} = require('./config.json');
const fs = require("fs");

client.on("ready", async () => {

    console.log(`${client.user.username} is online.`);

    setInterval(() => {
        const statuses = [
            `🎫 - Sollicitaties`,
            `💬 - Berichten`,
            `📌 - Hulpdiensten`,
            `🔰 - 14 Staffleden`,
            `👥 - 921 Leden`,
        ]
    
        const status = statuses[Math.floor(Math.random() * statuses.length)]
        client.user.setActivity(status, { type: "WATCHING"}) // Can Be WATCHING, STREAMING, LISTENING
    }, 4500) // Second You Want to Change Status, This Cahnges Every 2 Seconds

});

const settings = new enmap({
    name: "settings",
    autoFetch: true,
    cloneLevel: "deep",
    fetchAll: true
});

client.on('message', async message => {

    if(message.author.bot) return;
    if(message.content.toLowerCase() === 'spn/meldkamer-open') {
        
        message.channel.send(':white_check_mark: **|** Meldkamer meldingen succesvol geopend!');
        let filter = m => !m.author.bot;
        let collector = new discord.MessageCollector(message.channel, filter);
        let destination = client.channels.get('866337104975626270');
        collector.on('collect', (m, col) => {
            console.log("Melding: " + m.content);
            if(destination) {
                if(m.content.toLowerCase() === 'spn/meldkamer-open' && (message.author.id === m.author.id)) {
                    console.log(":white_check_mark: **|** Meldkamer meldingen succesvol gesloten!");
                    collector.stop();
                }
                else {
                    let embed = new discord.RichEmbed()
                        .setTitle("112 Melding")
                        .setDescription(m.content)
                        .setTimestamp()
                        .setAuthor(m.author.tag, m.author.displayAvatarURL)
                        .setColor('RED')
                    destination.send(embed);
                }
            }
        });
        collector.on('end', collected => {
            console.log("Meldingen: " + collected.size);
        }); 
    }
});
