//This takes the message input from Discord and formats it in the way that the neural net expects, then genarates output using that




//Sets the current time as ~~2~~ ~~*3*~~ *4* integers,
//but the integers are actually strings instead.
//	What
//	Why
var currentDate = new Date();
var currentHour = currentDate.getHours().toString().padStart(2, "0");
var currentMinute = currentDate.getMinutes().toString().padStart(2, "0");
var currentTime = currentHour + ":" + currentMinute;

//Turns pings into pings
var messageInput = messageInput.replace("<@" + client.user.id + ">", '@Maxbot');
var messageInput = messageInput.replace(client.user.id, 'Maxbot');
var messageInput = messageInput.replace(/\n/mig, ' ');

//Set neural net input with message context and other fun stuff
if (message.channel.type === 'DM' || message.guild == null) {
	var netInput = "currentTime: " + currentTime + ", channelName: " + message.member.toString() + ", userName: " + message.member.toString() + ", messageContent: " + messageInput;
	var netInputNameless = "currentTime: " + currentTime + ", channelName: " + message.member.toString() + ", messageContent: " + messageInput;
} else {
	var netInput = "currentTime: " + currentTime + ", channelName: " + message.channel + ", userName: " + message.member.toString() + ", messageContent: " + messageInput;
	var netInputNameless = "currentTime: " + currentTime + ", channelName: " + message.channel + ", messageContent: " + messageInput;
}

///Get text from images
if (message.attachments.size > 0) {
	//Get URL of first attachment in message
	//Doesn't matter if it's an image,
	//just hope that it is
	//and break everything if it isn't
	var imageURL = message.attachments.size > 0 ? message.attachments.first()?.url : null;
	//This code has issues but only breaks sometimes so that's good enough for now
	var netInput = netInput + await ocr.recognize(imageURL, 'eng').then(({ data: { text } }) => {return text;});
	var netInputNameless = netInputNameless + await ocr.recognize(imageURL, 'eng').then(({ data: { text } }) => {return text;});
	var ocrText = "" + await ocr.recognize(imageURL, 'eng').then(({ data: { text } }) => {return text;});
} else {
	//Do nothing, it's better than nothing
}

//Prevents crashes via time travel due to variables always being undefined
//Don't worry about it. I really don't know why it works, but it does so it stays
await setTimeout(() => {}, "-500");

//Generate response based on input
var response = net.run(netInput);

//"Temporary" fix for a bug where the bot doesn't respond to people with certain usernames
if (response.length < 3) {
	var response = net.run(netInputNameless);
}

//In case the bot still is acting dumb
if (response.length < 3) {
	var response = net.run("messageContent: " + messageInput);
}

//Return if bot still hasn't come up with a response
if (response == null || response == undefined || response === '') {
	return;
}
