const {
  Client,
  GatewayIntentBits,
  SlashCommandBuilder,
  REST,
  Routes,
  PermissionFlagsBits
} = require('discord.js');

const token = process.env.TOKEN;
const clientId = "1481064852754661557";
const guildId = "1420444628729069570";

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

const commands = [

  new SlashCommandBuilder()
    .setName('p')
    .setDescription('Cek apakah bot aktif'),

  new SlashCommandBuilder()
    .setName('halo')
    .setDescription('Menyapa bot'),

  new SlashCommandBuilder()
    .setName('welcome')
    .setDescription('Welcome to Official Discord Server H3Y Studio'),

  new SlashCommandBuilder()
    .setName('announce')
    .setDescription('Announce Open Map'),

  // BAN
  new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Ban member dari server')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('User yang ingin diban')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('reason')
        .setDescription('Alasan ban')
        .setRequired(false))
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

  // KICK
  new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Kick member dari server')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('User yang ingin dikick')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('reason')
        .setDescription('Alasan kick')
        .setRequired(false))
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

  // TIMEOUT
  new SlashCommandBuilder()
    .setName('timeout')
    .setDescription('Timeout member')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('User yang ingin ditimeout')
        .setRequired(true))
    .addIntegerOption(option =>
      option.setName('durasi')
        .setDescription('Durasi timeout dalam menit')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('reason')
        .setDescription('Alasan timeout')
        .setRequired(false))
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

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

  if (interaction.commandName === 'p') {
    await interaction.reply('Pong! 🏓 Bot aktif.');
  }

  if (interaction.commandName === 'halo') {
    await interaction.reply(`Halo ${interaction.user.username}! 👋`);
  }

  if (interaction.commandName === 'welcome') {
    await interaction.reply(`welcome ${interaction.user.username}! Welcome to Official Discord Server H3Y Studio`);
  }

  if (interaction.commandName === 'announce') {
    await interaction.reply(`announce ${interaction.user.username}! Lesgo Ather Open Seperti Biasa.
      FREE VVIP ON LIVE TT : https://www.tiktok.com/@h3ystudioo?_r=1&_t=ZS-91POHDPTYoS
      
      JOIN NOW! : https://www.roblox.com/share?code=_5baole11rlxjiwsf3ucecxo3xqn4suwprds6ti2ime7e1r20r&type=ExperienceInvite`);
  }

  // BAN COMMAND
  if (interaction.commandName === 'ban') {

    const user = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason') || 'Tidak ada alasan';

    const member = await interaction.guild.members.fetch(user.id);

    await member.ban({ reason });

    await interaction.reply(`🚫 ${user.tag} telah diban.\nAlasan: ${reason}`);
  }

  // KICK COMMAND
  if (interaction.commandName === 'kick') {

    const user = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason') || 'Tidak ada alasan';

    const member = await interaction.guild.members.fetch(user.id);

    await member.kick(reason);

    await interaction.reply(`😝 ${user.tag} telah dikick.\nAlasan: ${reason}`);
  }

  // TIMEOUT COMMAND
  if (interaction.commandName === 'timeout') {

    const user = interaction.options.getUser('user');
    const minutes = interaction.options.getInteger('durasi');
    const reason = interaction.options.getString('reason') || 'Tidak ada alasan';

    const member = await interaction.guild.members.fetch(user.id);

    await member.timeout(minutes * 60 * 1000, reason);

    await interaction.reply(`⏳ ${user.tag} ditimeout selama ${minutes} menit.\nAlasan: ${reason}`);
  }

});

client.once('ready', () => {
  console.log(`Bot aktif sebagai ${client.user.tag}`);
});

client.login(token);