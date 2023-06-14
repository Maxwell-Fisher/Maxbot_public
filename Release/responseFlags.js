//This is part of the flag system to decide whether or not Maxbot should respond to any given message, though there are some other factors as well which are used later on.

//Note: bot commands follow the flag system, meaning they will only work in the same cases as the bot.
//This usually works well, but can be annoying at times to have to ping the bot in a separate message before using commands.
//I may make them not follow this, but the syntax is simple enough that they could accidentally be used,
//so instead I'll probably just add slash commands as an alternative (while keeping the current system as well to allow both).

var check = 0;

	//Prevent responses to other bots
	//Note to self: doesn't work
	if (typeof bot.users[userID] !== 'undefined') {
		//This is for the case of webhooks, which behave weirdly compared to normal bots & users
		//This just doesn't work with any bots which have the new pomelo username format. Oh well ¯\_(ツ)_/¯
		if (!(bot.users[userID].discriminator === "0000")) {
			if (bot.users[userID].bot) {
				return;
			}
		}
	}
	
	//Prevent responses to self, even if not running on bot account.
	//Currently redundant as this always runs on one of the 3 bot users,
	//but may become needed if webhooks are ever used or if I decide to
	//make the bot source code fully public and someone decided to selfbot.
	if (userID === bot.id) {
		return;
	}

	//Special checks ##########################################################################################

	//This may cause issues if the bot's username is changed
	//to a common phrase/word, but for now it works well
	if (message.includes(bot.username)) {
		var check = 1;
	}

	//Respond to pings
	if (message.includes(bot.id)) {
		var check = 1;
	}

	//Respond to the name `Maxbot`.
	//Can be annoying, may eventually add a channel specific
	//flag in order to let people turn it off
	if (message.toLowerCase().includes('maxbot')){
		var check = 1;
	}

	//Respond to DMs, and in group chats once Discord adds that.
	//Group chats may be an issue though,
	//should add a flag to disable that as well.
	if (channelID in bot.directMessages) {
		var check = 1;
	}

	//Last channel used
	if (channelID == currentChannel) {
		//This seems redundant but oh well, it works
		if (Math.floor(Date.now() / 1000) - timeLastMentioned[channelID] < 60) {
			var check = 1;
		}
	}

	//Update last message sent time because it should be updated.
	if (check === 1) {
		timeLastMentioned[channelID] = Math.floor(Date.now() / 1000);
	}

	//If messaged recently
	//Should add a message length variable to this like in the code to collect training data
	if (Math.floor(Date.now() / 1000) - timeLastMentioned[channelID] < 30) {
		var check = 1;
		//Why did I write it like this
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



//Stop bot from saying the same thing twice in a row within 30 seconds
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
