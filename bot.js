const { 
  Client, 
  GatewayIntentBits, 
  SlashCommandBuilder, 
  REST,
  Routes
} = require('discord.js');

const token = "MTQ4MTA2NDg1Mjc1NDY2MTU1Nw.GNB0I_.6j4Atvpqsd8HgVASr6cHXyh6H8tm1WCRdpFr2M";
const clientId = "1481064852754661557";
const guildId = "1420444628729069570";

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

const commands = [

  new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Cek apakah bot aktif'),

  new SlashCommandBuilder()
    .setName('halo')
    .setDescription('Menyapa bot'),

  new SlashCommandBuilder()
    .setName('hai')
    .setDescription('Welcome to Official Discord Server H3Y Studio'),

].map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
  try {
    console.log('Register slash command...');

    await rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      { body: commands }
    );

    console.log('Slash command berhasil dibuat.');
  } catch (error) {
    console.error(error);
  }
})();

client.on('interactionCreate', async interaction => {

  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong! 🏓 Bot aktif.');
  }

  if (interaction.commandName === 'halo') {
    await interaction.reply(`Halo ${interaction.user.username}! 👋`);
  }

  if (interaction.commandName === 'hai') {
    await interaction.reply(`Hai ${interaction.user.username}! Welcome to Official Discord Server H3Y Studio`);
  }

});

client.once('ready', () => {
  console.log(`Bot aktif sebagai ${client.user.tag}`);
});

client.login(process.env.TOKEN);