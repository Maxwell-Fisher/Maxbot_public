//This takes the message input from Discord and formats it in the way that the neural net expects, then genarates output using that

var currentDate = new Date();

if (channelID in bot.directMessages) {
	var netInput = "currentTime: " + currentDate.getHours() + ":" + currentDate.getMinutes() + ", channelName: " + user.trimLeft().trimRight() + ", userName: " + user.trimLeft().trimRight() + ", messageContent: " + message;
}
if (!(channelID in bot.directMessages)) {
	var netInput = "currentTime: " + currentDate.getHours() + ":" + currentDate.getMinutes() + ", channelName: " + bot.channels[channelID].name.trimLeft().trimRight() + ", userName: " + user.trimLeft().trimRight() + ", messageContent: " + message;
}

var response = net.run(netInput).trimLeft.trimRight;