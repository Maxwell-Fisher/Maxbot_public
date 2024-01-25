//A section of the code meant to log mesasges sent by `Max#4029` in servers shared by Maxbot in order to collect training data
//Doesn't currently work, gonna rewrite it eventually

//Output example:
//	{ input: 'currentTime: 12:34, channelName: Maxbot testing, userName: Maxbot, messageContent: Hello', output: 'Hello!'},

var timeSinceLastMessage = Math.floor((Date.now() / 1000) - lastSentMessageTime[channelID]);
var currentDate = new Date();
var currentHour = currentDate.getHours().toString().padStart(2, "0");
var currentMinute = currentDate.getMinutes().toString().padStart(2, "0");

if (Math.floor(Date.now() / 1000) - lastSentMessageTime[channelID] < (60 + Math.floor(Math.sqrt(message.length)))) {
	if (userID === "524813260525142047") {
		if (lastMessageUserID[channelID] !== "524813260525142047") {
			if (typeof lastMessage[channelID] !==	'undefined') {
				if (message !== "") {
					if (lastMessage[channelID] !== "") {

						//Meant for once Discord allows bots to be added to group chats, currently unused unless DM is sent to the bot itself and line 45 is removed,
						if (channelID in bot.directMessages) {
							console.log("{ input: 'currentTime: " + currentHour + ":" + currentMinute +
							", channelName: " + lastMessageUsername[channelID] +
							", userName: " + lastMessageUsername[channelID] +
							", messageContent: " + IOsanitize(lastMessage[channelID]) +
							"', output: '" + IOsanitize(message) + "'},");
						}

						//Main IO logger
						if (!(channelID in bot.directMessages)) {
							if (Math.floor(Date.now() / 1000) - lastSentMessageTime[channelID] < (15 + Math.floor(Math.sqrt(message.length)))) {
							console.log("{ input: 'currentTime: " + currentHour + ":" + currentMinute +
								", channelName: " + IOsanitize(bot.channels[channelID].name) +
								", userName: " + lastMessageUsername[channelID] +
								", messageContent: " + IOsanitize(lastMessage[channelID]) +
								"', output: '" + IOsanitize(message) + "'},");
							}
						}
					}
				}
			}
		}
	}
}

if (userID !== "524813260525142047") { /* Don't log responses to self */
	//if (userID !== "730125432703418419") { /* Don't log responses to Maxbot release */
		//if (userID !== "999057147604246538") { /* Don't log responses to Maxbot beta */
			if (userID !== "742275903987384361") { /* Don't log responses to Maxbot alpha */
				lastSentMessageTime[channelID] = Math.floor(Date.now() / 1000);
				lastMessage[channelID] = message;
				lastMessageUserID[channelID] = userID;
				lastMessageUsername[channelID] = IOsanitize(user);
			}
		//}
	//}
}

function IOsanitize(input) {
	return input.replace(/\\/mig, "\\\\").replace(/'/mig, '\\\'').replace(/\n/mig, ' ').trimLeft().trimRight()
}
