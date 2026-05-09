const { SlashCommandBuilder, codeBlock } = require('discord.js');
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ci')
    .setDescription('yes. ci on fucking discord bot. pulls latest code and redeploys commands.'),

  async execute(interaction) {
    await interaction.deferReply();

    try {
      const { stdout: pullOut } = await execAsync('git pull', { cwd: '/home/bambas/discord-bot-shenanigans' });
      const { stdout: deployOut } = await execAsync('node deploy-commands.js', { cwd: '/home/bambas/discord-bot-shenanigans' });

      await interaction.editReply(
        codeBlock('bash', `$ git pull\n${pullOut}\n$ node deploy-commands.js\n${deployOut}`)
      );
    } catch (err) {
      await interaction.editReply(codeBlock('bash', `error:\n${err.message}`));
    }
  }
};