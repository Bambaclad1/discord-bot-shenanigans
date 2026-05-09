const { SlashCommandBuilder, codeBlock } = require('discord.js');
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

module.exports = {
  data: new SlashCommandBuilder()
    .setName('neofetch')
    .setDescription('Shows system info'),

  async execute(interaction) {
    await interaction.deferReply();

    try {
      const { stdout } = await execAsync('neofetch --stdout');
      await interaction.editReply(codeBlock('bash', stdout));
    } catch (err) {
      await interaction.editReply('Failed to run neofetch.');
    }
  }
};