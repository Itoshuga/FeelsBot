const { Client } = require('discord.js');
const mongoose = require('mongoose');
const config = require('../../config.json');

module.exports = {
    name: "ready",
    once: true,
    async execute(client) {
        await mongoose.connect(config.mongodb || '');

        if (mongoose.connect) {
            console.log("successfully connected to mongodb");
        }
        console.log(`${client.user.username} is now online.`);
    }
}