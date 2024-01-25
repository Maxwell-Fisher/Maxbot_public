//This is part of the flag system to decide whether or not Maxbot should respond to any given message, though there are some other factors as well which are used later on.

var check = 0;

//Prevent responses to other bots
if (message.author.bot) {
	return;
}

//Prevent responses to self, even if not running on bot account.
//Currently not in use as this always runs on one of the 3 bot users,
//but may become needed if webhooks are ever used or if I decide to
//make the bot source code fully public and someone decides to selfbot.
	//(There was code here at one point)

//Prevent responses in channels without message permissions
if (!(message.guild.members.me.permissionsIn(message.channel).has(PermissionsBitField.Flags.SendMessages))) {
	return;
}

//Respond to DMs
if (message.channel.type === 'DM' || message.guild == null) {
	var check = 1;
} else {
	//Respond in channels containing the word Maxbot (only if not a DM (cause that's redundant))
	if (message.channel.name.toLowerCase().includes('maxbot')) {
		var check = 1;
	}
}

//Respond to pings (only check for bots ID, not if the ID is a real ping. Can cause issues but I prefer this method.)
if (messageInput.includes(client.user.id)) {
	var check = 1;
}

//Respond to messages which are directly replying to the bot
	if (message.mentions.repliedUser?.toString().includes(client.user.id)) {
		var check = 1;
	}

//Respond to its name (without an actual ping) in bot related channels
	//I removed the code here because it was annoying me

	//Respond if messaged recently in the current channel
	if (Math.floor(Date.now() / 1000) - timeLastMentioned[message.channel.id] < 15 || Math.floor(Date.now() / 1000) - timeLastMentioned[message.channel.id] < (messageInput.length / 2)) {
		var check = 1;
	}


// ...


//Below code gives reasons to not respond to a certain message:
if (!(message.channel.type === 'DM' || message.guild == null)) {

	//Don't respond in serious channels
	if (!(message.channel.name.toLowerCase().includes('unserious'))) {
		if (message.channel.name.toLowerCase().includes('serious')) {
			var check = 0;
		}
	}

	//Don't respond in venting channels
	if (!(message.channel.name.toLowerCase().includes('invent'))) {
		if (!(message.channel.name.toLowerCase().includes('advent'))) {
			if (message.channel.name.toLowerCase().includes('vent')) {
				var check = 0;
			}
		}
	}

	//Don't respond in NSFW channels
	if (message.channel.name.toLowerCase().includes('nsfw')) {
		var check = 0;
	}

	//Don't respond if kicked using `.mb kick` recently (within 30 seconds)
	if (Math.floor(Date.now() / 1000) - timeLastKicked[message.channel.id] < 30) {
		var check = 0;
	}

}

if (check === 1) {
	timeLastMentioned[message.channel.id] = (Math.floor(Date.now() / 1000) + (Math.floor(Date.now() / 1000) - timeLastMentioned[message.channel.id]) / 60);
}


// ...


//Stop bot from getting into loops with other bots/people testing it
if (messageInput.toLowerCase() === String(lastMessageSent[message.channel.id]).toLowerCase()) {
	if (timeSinceLastMessage < 30) {
		return;
	}
}

//Stop bot from saying the same thing twice in a row within 30 seconds
if (response.toLowerCase === String(lastMessageSent[message.channel.id]).toLowerCase()) {
	if (timeSinceLastMessage < 30) {
		return;
	}
}


// ...


//Stop talking if it should (without needing to wait as long or use `.mb kick`)
if (
	response.toLowerCase().includes('goodbye') || messageInput.toLowerCase().includes('goodbye') ||
	response.toLowerCase().includes('go away') || messageInput.toLowerCase().includes('go away') ||
	response.toLowerCase().includes('shut up') || messageInput.toLowerCase().includes('shut up') ||
	response.toLowerCase().includes('stop') || messageInput.toLowerCase().includes('stop') ||
	response.toLowerCase().includes('kick') || messageInput.toLowerCase().includes('kick')
) {
	lastMessageSentTime[message.channel.id] = lastMessageSentTime[message.channel.id] - 10;
}
