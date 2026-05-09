const { SlashCommandBuilder } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder().setName('crinhe').setDescription('im crinhe!'),
	async execute(interaction) {
		await interaction.reply('im crinhe 🤮🤢💀☠️');
	},
};