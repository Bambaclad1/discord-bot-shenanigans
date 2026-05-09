const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('crazy_yap')
    .setDescription('/yap but spammy and bigger limit.'),

  async execute(interaction) {
    await interaction.reply('get ready for my big yap...');

    const messages = await interaction.channel.messages.fetch({ limit: 100 });
    const messageArray = [...messages.values()].filter(m => !m.author.bot && m.content);

    if (messageArray.length === 0) {
      return interaction.editReply('no messages to yap from.');
    }

    const interval = setInterval(async () => {
      const random = messageArray[Math.floor(Math.random() * messageArray.length)];
      await interaction.channel.send(random.content);
    }, 1000);

    setTimeout(() => clearInterval(interval), 100000);
  }
};