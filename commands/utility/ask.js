// src/commands/utility/ask.js
const { SlashCommandBuilder } = require('discord.js');

const GROQ_API_KEY = process.env.GROQ_API_KEY;

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ask')
    .setDescription('Ask the AI something')
    .addStringOption(option =>
      option.setName('question')
        .setDescription('What do you want to ask?')
        .setRequired(true)
    ),

  async execute(interaction) {
    await interaction.deferReply();

    const question = interaction.options.getString('question');

    try {
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'llama3-8b-8192',
          messages: [
            { role: 'system', content: 'Be concise. Keep responses short and to the point.' },
            { role: 'user', content: question }
          ],
          max_tokens: 300
        })
      });

      const data = await res.json();
      console.log(JSON.stringify(data, null, 2));

      const answer = data.choices?.[0]?.message?.content;

      if (!answer) {
        await interaction.editReply('no response from groq, check console.');
        return;
      }

      const chunks = answer.match(/[\s\S]{1,2000}/g);
      await interaction.editReply(chunks[0]);
      for (let i = 1; i < chunks.length; i++) {
        await interaction.channel.send(chunks[i]);
      }

    } catch (err) {
      await interaction.editReply('something went wrong mate.');
      console.error(err);
    }
  }
};