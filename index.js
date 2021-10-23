const discord = require('discord.js');
const client = new discord.Client({partials: ["MESSAGE", "USER", "REACTION"]});
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
    if(message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if(command == "sollicitatie-setup") {
        // ticket-setup #channel
    
        let channel = message.mentions.channels.first();
        if(!channel) return message.reply("Verkeerd Commando! Gebruik: `!sollicitatie-setup #channel`");
    
        let sent = channel.send(new discord.MessageEmbed()
            .setTitle("Spijkenisse Roleplay - Sollicitaties")
            .setDescription("\nKlik op een Emoji onder dit bericht om te Solliciteren voor een bepaald Staatsbedrijf! Bekijk hieronder wat welke Emoji inhoud!\n\n🚓 **-** Politie\n🚑 **-** Ambulance\n🚒 **- Brandweer**\n🐱‍👤 **Dienst Speciale Interventies (DSI)\n🔨 **-** ANWB (Rijkswaterstaat)\n\nSolliciteer gerust wellicht zien wij jou binnenkort bij een van deze bedrijven!")
            .setFooter("Spijkenisse Roleplay - Hulpdiensten - Sollicitaties")
            .setColor("00ff00")
        );
    
        sent.react('🚓');
        sent.react('🚑');
        sent.react('🚒');
        sent.react('🐱‍👤');
        sent.react('🔨')
        settings.set(`${message.guild.id}-sollicitatie`, sent.id);
    
        message.channel.send("Sollicitatie Setup succesvol!")
    }
    
    if(command == "close", "done") {
        if(!args[0]) return message.channel.send("Geef een reden op!")
        if(!message.channel.name.includes("politie-", "dsi-", "brandweer-", "anwb-", "ambulance-")) return message.channel.send("Je kan dit momenteel niet gebruiken!")
        message.channel.delete();
    }
    
    const supportrole = (791436006007767060)
    
    ('messageReactionAdd', async (reaction, user) => {
        if(user.partial) await user.fetch();
        if(reaction.partial) await reaction.fetch();
        if(reaction.message.partial) await reaction.message.fetch();
        
        if(user.bot) return;
        
        let ticketid = await settings.get(`${reaction.message.guild.id}-sollicitatie`);
        
        if(!ticketid) return;
        
        if(reaction.message.id == ticketid && reaction.emoji.name == '🚓') {
            reaction.users.remove(user);
        
            reaction.message.guild.channels.create(`politie-${user.username}`, {
                permissionOverwrites: [
                    {
                        id: user.id,
                        allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                    },
                    {
                        id: reaction.message.guild.roles.everyone,
                        deny: ["VIEW_CHANNEL"]
                    },
                    {
                        id: '866336900225957898',
                        allow: ["VIEW_CHANNEL", "SEND_MESSAGES"]
                    }
                ],
                type: 'text'
            }).then(async channel => {
                channel.send(`<@${user.id}> <@&866336900225957898>`, new discord.MessageEmbed()
                .setTitle(`Welkom ${user.tag}`)
                .setDescription(`Welkom bij de Sollicitatie Procedure van de Poltie vul het onderstaande formulier in en wellicht zien wij jou binnenkort terug bij de Politie!\n\n**Sollicitatie Formulier**\n**Naam:** *wat is jou naam?*\n**Leeftijd:** *wat is je leeftijd?*\n**PSN Naam:** *wat is je playstation naam?*\n**Discord Naam:** *wat is je discord naam + tag? bijvoorbeeld Jan#0001*\n\n**Motivatie:** *wat motiveert jou om politie te worden?*\n**Ervaring:** *wat was je ervaring in het politie werk?*\n**Speeltijd:** *hoevaak kan jij bij de roleplays zijn in 1 week? maximaal 14*\n**Wat vind je het leukste bij de Politie:** *wat vind je het leukste aan het vak*\n\n**Toevoegingen:** *wil je nog iets toevoegen? dit is niet verplicht*\n**Contact:** *via waar kunnen we je bereiken?*`)
                .setColor("BLUE"))
                .setTimestamp()
            })
        }
        
        if(reaction.message.id == ticketid && reaction.emoji.name == '🚑') {
            reaction.users.remove(user);
        
            reaction.message.guild.channels.create(`ambulance-${user.username}`, {
                permissionOverwrites: [
                    {
                        id: user.id,
                        allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                    },
                    {
                        id: reaction.message.guild.roles.everyone,
                        deny: ["VIEW_CHANNEL"]
                    },
                    {
                        id: '866336920543166504',
                        allow: ["VIEW_CHANNEL", "SEND_MESSAGES"]
                    }
                ],
                type: 'text'
            }).then(async channel => {
                channel.send(`<@${user.id}> <@&866336920543166504>`, new discord.MessageEmbed()
                .setTitle(`Welkom ${user.tag}`)
                .setDescription(`Welkom bij de Sollicitatie Procedure van de Ambulance vul het onderstaande formulier in en wellicht zien wij jou binnenkort terug bij de Ambulance!\n\n**Sollicitatie Formulier**\n**Naam:** *wat is jou naam?*\n**Leeftijd:** *wat is je leeftijd?*\n**PSN Naam:** *wat is je playstation naam?*\n**Discord Naam:** *wat is je discord naam + tag? bijvoorbeeld Jan#0001*\n\n**Motivatie:** *wat motiveert jou om ambulance te worden?*\n**Ervaring:** *wat was je ervaring in het ambulance werk?*\n**Speeltijd:** *hoevaak kan jij bij de roleplays zijn in 1 week? maximaal 14*\n**Wat vind je het leukste bij de Ambulance:** *wat vind je het leukste aan het vak*\n\n**Toevoegingen:** *wil je nog iets toevoegen? dit is niet verplicht*\n**Contact:** *via waar kunnen we je bereiken?*`)
                .setColor("ORANGE"))
            })
        }
        
        if(reaction.message.id == ticketid && reaction.emoji.name == '🚒') {
            reaction.users.remove(user);
        
            reaction.message.guild.channels.create(`brandweer-${user.username}`, {
                permissionOverwrites: [
                    {
                        id: user.id,
                        allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                    },
                    {
                        id: reaction.message.guild.roles.everyone,
                        deny: ["VIEW_CHANNEL"]
                    },
                    {
                        id: '866407317461270548',
                        allow: ["VIEW_CHANNEL", "SEND_MESSAGES"]
                    }
                ],
                type: 'text'
            }).then(async channel => {
                channel.send(`<@${user.id}> <@&866407317461270548>`, new discord.MessageEmbed()
                .setTitle(`Welkom ${user.tag}`)
                .setDescription(`Welkom bij de Sollicitatie Procedure van de Brandweer vul het onderstaande formulier in en wellicht zien wij jou binnenkort terug bij de Brandweer!\n\n**Sollicitatie Formulier**\n**Naam:** *wat is jou naam?*\n**Leeftijd:** *wat is je leeftijd?*\n**PSN Naam:** *wat is je playstation naam?*\n**Discord Naam:** *wat is je discord naam + tag? bijvoorbeeld Jan#0001*\n\n**Motivatie:** *wat motiveert jou om brandweer te worden?*\n**Ervaring:** *wat was je ervaring in het brandweer werk?*\n**Speeltijd:** *hoevaak kan jij bij de roleplays zijn in 1 week? maximaal 14*\n**Wat vind je het leukste bij de Brandweer:** *wat vind je het leukste aan het vak*\n\n**Toevoegingen:** *wil je nog iets toevoegen? dit is niet verplicht*\n**Contact:** *via waar kunnen we je bereiken?*`)
                .setColor("RED"))
            })
        }
        
        if(reaction.message.id == ticketid && reaction.emoji.name == '🐱‍👤') {
            reaction.users.remove(user);
            
            reaction.message.guild.channels.create(`dsi-${user.username}`, {
                permissionOverwrites: [
                    {
                        id: user.id,
                        allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                    },
                    {
                        id: reaction.message.guild.roles.everyone,
                        deny: ["VIEW_CHANNEL"]
                    },
                    {
                        id: '866407224661114940',
                        allow: ["VIEW_CHANNEL", "SEND_MESSAGES"]
                    }
                ],
                type: 'text'
            }).then(async channel => {
                channel.send(`<@${user.id}> <@&866407224661114940>`, new discord.MessageEmbed()
                .setTitle(`Welkom ${user.tag}`)
                .setDescription(`Welkom bij de Sollicitatie Procedure van de DSI vul het onderstaande formulier in en wellicht zien wij jou binnenkort terug bij de DSI!\n\n**Sollicitatie Formulier**\n**Naam:** *wat is jou naam?*\n**Leeftijd:** *wat is je leeftijd?*\n**PSN Naam:** *wat is je playstation naam?*\n**Discord Naam:** *wat is je discord naam + tag? bijvoorbeeld Jan#0001*\n\n**Motivatie:** *wat motiveert jou om dsi te worden?*\n**Ervaring:** *wat was je ervaring in het dsi werk?*\n**Speeltijd:** *hoevaak kan jij bij de roleplays zijn in 1 week? maximaal 14*\n**Wat vind je het leukste bij DSI:** *wat vind je het leukste aan het vak*\n\n**Toevoegingen:** *wil je nog iets toevoegen? dit is niet verplicht*\n**Contact:** *via waar kunnen we je bereiken?*`)
                .setColor("00ff00"))
            })
        }
        
            if(reaction.message.id == ticketid && reaction.emoji.name == '🔨') {
                reaction.users.remove(user);
        
                reaction.message.guild.channels.create(`anwb-${user.username}`, {
                    permissionOverwrites: [
                        {
                            id: user.id,
                            allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                        },
                        {
                            id: reaction.message.guild.roles.everyone,
                            deny: ["VIEW_CHANNEL"]
                        },
                        {
                            id: '866407377703665675',
                            allow: ["VIEW_CHANNEL", "SEND_MESSAGES"]
                        }
                    ],
                    type: 'text'
                }).then(async channel => {
                    channel.send(`<@${user.id}> <@&866407377703665675`, new discord.MessageEmbed()
                    .setTitle(`Welkom ${user.tag}`)
                    .setDescription(`Welkom bij de Sollicitatie Procedure van de ANWB vul het onderstaande formulier in en wellicht zien wij jou binnenkort terug bij de ANWB!\n\n**Sollicitatie Formulier**\n**Naam:** *wat is jou naam?*\n**Leeftijd:** *wat is je leeftijd?*\n**PSN Naam:** *wat is je playstation naam?*\n**Discord Naam:** *wat is je discord naam + tag? bijvoorbeeld Jan#0001*\n\n**Motivatie:** *wat motiveert jou om anwb te worden?*\n**Ervaring:** *wat was je ervaring in het anwb werk?*\n**Speeltijd:** *hoevaak kan jij bij de roleplays zijn in 1 week? maximaal 14*\n**Wat vind je het leukste bij ANWB:** *wat vind je het leukste aan het vak*\n\n**Toevoegingen:** *wil je nog iets toevoegen? dit is niet verplicht*\n**Contact:** *via waar kunnen we je bereiken?*`)
                    .setColor("00ff00"))
            })
            }
    })
    });

client.login(process.env.token);