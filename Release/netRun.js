//This takes the message input from Discord and formats it in the way that the neural net expects, then genarates output using that

var currentDate = new Date();

if (channelID in bot.directMessages) {
	var netInput = "currentTime: " + currentDate.getHours() + ":" + currentDate.getMinutes() + ", channelName: " + user.trimLeft().trimRight() + ", userName: " + user.trimLeft().trimRight() + ", messageContent: " + message;
	var netInputNameless = "currentTime: " + currentDate.getHours() + ":" + currentDate.getMinutes() + ", channelName: " + user.trimLeft().trimRight() + ", messageContent: " + message;
} else {
	var netInput = "currentTime: " + currentDate.getHours() + ":" + currentDate.getMinutes() + ", channelName: " + bot.channels[channelID].name.trimLeft().trimRight() + ", userName: " + user.trimLeft().trimRight() + ", messageContent: " + message;
	var netInputNameless = "currentTime: " + currentDate.getHours() + ":" + currentDate.getMinutes() + ", channelName: " + bot.channels[channelID].name.trimLeft().trimRight() + ", messageContent: " + message;
}

var response = net.run(netInput);

//"Temporary" fix for a bug where the bot doesn't respond to people with certain usernames
//This should probably be a fixed value int, but oh well, it works well enough right now so I'll probably not change it until there's a decent reason to
if (response.length < user.length) {
	console.log("Name bug response: " + response);
	var response = net.run(netInputNameless);
}