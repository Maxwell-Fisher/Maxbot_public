//This is part of the flag system to decide whether or not Maxbot should respond to any given message, though there are some other factors as well which are used later on.

//Note: bot commands follow the flag system, meaning they will only work in the same cases as the bot.
//This usually works well, but can be annoying at times to have to ping the bot in a separate message before using commands.
//I may make them not follow this, but the syntax is simple enough that they could accidentally be used,
//so instead I'll probably just add slash commands as an alternative (while keeping the current system as well to allow both).

var check = 0;

	//Prevent responses to other bots
	if (typeof bot.users[userID] !== 'undefined') {
		if (!(bot.users[userID].discriminator === "0000")) {
			if (bot.users[userID].bot) {
				return;
			}
		}
	}
	
	//Prevent responses to self, even if not running on bot account
	if (userID === bot.id) {
		return;
	}

	//Special checks ##########################################################################################

	if (message.includes(bot.username)) {
		var check = 1;
	}

	if (message.includes(bot.id)) {
		var check = 1;
	}

	if (message.toLowerCase().includes('maxbot')){
		var check = 1;
	}

	//Always respond when DMed
	if (channelID in bot.directMessages) {
		var check = 1;
	}

	//Last channel used
	if (channelID == currentChannel) {
		if (Math.floor(Date.now() / 1000) - timeLastMentioned[channelID] < 60) {
			var check = 1;
		}
	}

	if (check === 1) {
		timeLastMentioned[channelID] = Math.floor(Date.now() / 1000);
	}

	//If messaged recently
	if (Math.floor(Date.now() / 1000) - timeLastMentioned[channelID] < 30) {
		var check = 1;
		timeLastMentioned[channelID] = Math.floor(Date.now() / 1000);
	}

	//Whitelist channels below ################################################################################

	//Maxbot v.3 # whitelist
	if (channelID == 1091156149178470463) {
		var check = 1;
	}

	//Blacklist channels below ################################################################################

	//Maxbot v.3 # blacklist
	if (channelID == 1091156211686178888) {
		var check = 0;
	}

	//Server blacklists #######################################################################################
	
	if (!(channelID in bot.directMessages)) {
		//Example server blacklist for entire server except one channel
		if (bot.channels[channelID].guild_id === "1091155787751104614") {
			if (channelID !== "1091155789617573960") {
				var check = 0;
			}
		}
	}



// ...



//Stop bot from getting into loops with other bots/people testing it
if (message === lastMessageSent[channelID]) {
	if (timeSinceLastMessage < 30) {
		return;
	}
}



// ...



//Stop bot from saying the same thing on repeat
if (response === lastMessageSent[channelID]) {
	if (timeSinceLastMessage < 30) {
		return;
	}
}



// ...



if (response === "Bye!") {
	lastSentMessageTime[channelID] = lastSentMessageTime[channelID] - 45;
}

if (response === "Goodbye!") {
	lastSentMessageTime[channelID] = lastSentMessageTime[channelID] - 45;
}

if (response === "Goodbye") {
	lastSentMessageTime[channelID] = lastSentMessageTime[channelID] - 45;
}
