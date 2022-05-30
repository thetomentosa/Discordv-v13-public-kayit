const Discord = require("discord.js")
const client = new Discord.Client()
const ayarlar = require("./ayarlar.json")
const moment = require("moment")
const fs = require("fs")
const db = require("quick.db")
const chalk = require("chalk")
require('./util/Loader.js')(client)

client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()
fs.readdir('./commands/', (err, files) => { 
  if (err) console.error(err);               
  console.log(`[ TheTomenTosa Dev. Komutlar ] ${files.length} komut yüklenecek.`)
  files.forEach(f => {                    
    let props = require(`./commands/${f}`)
    console.log(`[ TheTomenTosa Dev. Komutlar ] ${props.config.name} komutu yüklendi.`)
    client.commands.set(props.config.name, props)
    props.config.aliases.forEach(alias => {       
      client.aliases.set(alias, props.config.name)
    });
  });
})

client.on('message', async message => {
  
  if(message.content === '.tag') {
    message.channel.send(`\`${ayarlar.tag}\``)
  }
  })

client.on("ready", () => {
    console.log(chalk.redBright(`Register Bot Aktif!`))
})

client.on("guildMemberAdd", member => {
    require("moment-duration-format")
      var üyesayısı = member.guild.members.cache.size.toString().replace(/ /g, "    ")
      var üs = üyesayısı.match(/([0-9])/g)
      üyesayısı = üyesayısı.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
      if(üs) {
        üyesayısı = üyesayısı.replace(/([0-9])/g, d => {
          return {
            '0': `<a:rk0:974756413089910784>`,
            '1': `<a:rk1:974755563072270387>`,
            '2': `<a:rk2:974755622392320090>`,
            '3': `<a:rk3:974755650263482438>`,
            '4': `<a:rk4:974755751400722522>`, 
            '5': `<a:rk5:974756312401465415>`,
            '6': `<a:rk6:974756332295049277>`,
            '7': `<a:rk7:974756352712900660>`,
            '8': `<a:rk8:974756372044460063>`,
            '9': `<a:rk9:974756392995004476>`}[d];})}
    const kanal = member.guild.channels.cache.find(r => r.id === (ayarlar.hosgeldinKanal)); 
    let user = client.users.cache.get(member.id);
    require("moment-duration-format");
      const kurulus = new Date().getTime() - user.createdAt.getTime();  
     const gecen = moment.duration(kurulus).format(` YY **[Yıl]** DD **[Gün]** HH **[Saat]** mm **[Dakika,]**`) 
    var kontrol;
  if (kurulus < 1296000000) kontrol = `Ve senin hesabın sunucumuza kayıt olmak için daha çok genç! <:report:870564958566502410> `
  if (kurulus > 1296000000) kontrol = `Ve senin hesabın sunucumuza kayıt olmak için tüm şartları karşılıyor! :ballot_box_with_check: `
    moment.locale("tr");
  
member.roles.add(ayarlar.kayıtsızRol)
member.roles.add(ayarlar.kayıtsızRol)
member.roles.add(ayarlar.kayıtsızRol)
  
    kanal.send(`
> **Sunucumuza hoş geldin, <@`+ member + `>! Seninle sunucumuz **`+üyesayısı+`** kişi.**
>     
> <a:ring:974120176893177876> **Sunucumuza kayıt olmak için soldaki ses kanalına girmelisin! <@&862315152745300008> seninle ilgilenecektir.**
> 
> <a:alert:974120179372019762> **Ayrıca hesabın 15 günden fazla bir süredir Discord'da bulunmalı.**
> 
> <a:eyesshaking:974117161738043432> **`+kontrol+`**
>     
> <a:pin:974120179539804211> **Ceza işlemlerin <#870747209124184064> kanalını okuduğun varsayılarak uygulanır.**`)});

client.on("ready", () => {
  client.channels.cache.get(ayarlar.botSesKanal).join();
  });

//----------------------------------------------------- TAG ROL ------------------------------------------------\\

client.on("userUpdate", async function(oldUser, newUser) { 
    const guildID = (ayarlar.SunucuID)
    const roleID = (ayarlar.tagRol)
    const tag = (ayarlar.tag)
    const chat = (ayarlar.sohbetKanal)
    const taglog = (ayarlar.tagLog)
  
    const guild = client.guilds.cache.get(guildID)
    const role = guild.roles.cache.find(roleInfo => roleInfo.id === roleID)
    const member = guild.members.cache.get(newUser.id)
    const embed = new Discord.MessageEmbed().setAuthor(member.displayName, member.user.avatarURL({ dynamic: true })).setColor('#ff0010').setTimestamp().setFooter('BoranGkdn was here!');
    if (newUser.username !== oldUser.username) {
        if (oldUser.username.includes(tag) && !newUser.username.includes(tag)) {
            member.roles.remove(roleID)
            client.channels.cache.get(taglog).send(embed.setDescription(`${newUser} Kullanıcısı tagımızı çıkardığı için taglı rolü alındı!`))
        } else if (!oldUser.username.includes(tag) && newUser.username.includes(tag)) {
            member.roles.add(roleID)
            client.channels.cache.get(chat).send(`**Mükemmel! ${newUser} Tagımızı alarak ailemize katıldı!**`)
            client.channels.cache.get(taglog).send(embed.setDescription(`${newUser} Kullanıcısı tagımızı aldığı için taglı rolü verildi!`))
        }
    }
   if (newUser.discriminator !== oldUser.discriminator) {
        if (oldUser.discriminator == (ayarlar.etikettag) && newUser.discriminator !== (ayarlar.etikettag)) {
            member.roles.remove(roleID)
            client.channels.cache.get(taglog).send(embed.setDescription(`${newUser} Kullanıcısı etiket tagımızı çıkardığı için taglı rolü alındı!`))
        } else if (oldUser.discriminator !== (ayarlar.etikettag) && newUser.discriminator == (ayarlar.etikettag)) {
            member.roles.add(roleID)-
            client.channels.cache.get(taglog).send(embed.setDescription(`${newUser} Kullanıcısı etiket tagımızı aldığı için taglı rolü verildi!`))
            client.channels.cache.get(chat).send(`**Mükemmel! ${newUser} Etiket tagımızı alarak ailemize katıldı!**`)
        }
    }
  
  })

//----------------------------------------------------- TAG ROL ------------------------------------------------\\

//----------------------------------------------------- GİRİŞ ------------------------------------------------\\

client.login(process.env.TOKEN)

//----------------------------------------------------- GİRİŞ ------------------------------------------------\\