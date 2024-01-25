//This is part of the code which filters the bot's responses for multiple reasons

//Remove pings
//Can't outright remove as that has the issue of messages like `@eve@everyoneryone`, as well as just looking terrible
//This may not remove multiple pings, but I haven't encountered that so will find out if it happens.
//Doesn't matter too much though cause Maxbot shouldn't have ping perms in most servers
var response = response.replace(/@everyone/mig, '@_everyone');
var response = response.replace(/@here/mig, '@_here');

//Don't send messages it shouldn't send for obvious reasons
var response = response.replace(/insert_slur_here/mig, '`[Text manually removed by admin]`');

//Remove some things for legal reasons
var response = response.replace(/insert_felony_here/mig, '`[Text manually removed by admin for legal reasons]`');

//Please stop giving children my IP address
//https://cdn.discordapp.com/attachments/730156029987520694/1116660043476123758/image.png
	//Code removed cause I realized that I don't care

//Don't respond if response would contain any of these words
if (uncensoredResponse.toLowerCase().includes('example_slur')) {
	var selfFlagOutput = 1;
}



//Literally 1984
//(The bot gets a lot of strange messages, so add censorship)
if (messageInput.toLowerCase().includes('make') || String(ocrText).toLowerCase().includes('make') || uncensoredResponse.toLowerCase().includes('make') || messageInput.toLowerCase().includes('build') || uncensoredResponse.toLowerCase().includes('build') || messageInput.toLowerCase().includes('create') || uncensoredResponse.toLowerCase().includes('create')) {
	//People don't need to be taught how to make chloroform without the context of 3D printing. (Even then, maybe not)
	if (messageInput.toLowerCase().includes('chloroform') || String(ocrText).toLowerCase().includes('chloroform') || uncensoredResponse.toLowerCase().includes('chloroform')) {
		var response = "```This message has been manually removed for legal and safety reasons.\nA report may have been sent to the bot owner.```";
		var selfFlagInput = 1;
	}
	//I think it should be obvious why people shouldn't be making this.
	//It's amazing how many times this bot has already violated the Geneva conventions in its few years of existence.
	if (messageInput.toLowerCase().includes('napalm') || String(ocrText).toLowerCase().includes('napalm') || uncensoredResponse.toLowerCase().includes('napalm')) {
		var response = "```This message has been manually removed for legal and safety reasons.\nA report may have been sent to the bot owner.```";
		var selfFlagInput = 1;
	}
	if (messageInput.toLowerCase().includes('bomb') || String(ocrText).toLowerCase().includes('bomb') || uncensoredResponse.toLowerCase().includes('bomb')) {
		var response = "```This message has been manually removed for legal and safety reasons.\nA report may have been sent to the bot owner.```";
		var selfFlagInput = 1;
	}
	if (messageInput.toLowerCase().includes('gun') || String(ocrText).toLowerCase().includes('gun') || uncensoredResponse.toLowerCase().includes('gun')) {
		var response = "```This message has been manually removed for legal and safety reasons.\nA report may have been sent to the bot owner.```";
		var selfFlagInput = 1;
	}
	if (messageInput.toLowerCase().includes('cocaine') || String(ocrText).toLowerCase().includes('cocaine') || uncensoredResponse.toLowerCase().includes('cocaine')) {
		var response = "```This message has been manually removed for legal and safety reasons.\nA report may have been sent to the bot owner.```";
		var selfFlagInput = 1;
	}
}

//Don't teach people how to steal vehicles, even if it may be fun
if (messageInput.toLowerCase().includes('hotwire') || String(ocrText).toLowerCase().includes('hotwire') || uncensoredResponse.toLowerCase().includes('hotwire')) {
	if (messageInput.toLowerCase().includes('car') || String(ocrText).toLowerCase().includes('car') || uncensoredResponse.toLowerCase().includes('car')) {
		var response = "```This message has been manually removed for legal reasons.\nA report may have been sent to the bot owner.```";
		var selfFlagInput = 1;
	}
	if (messageInput.toLowerCase().includes('truck') || String(ocrText).toLowerCase().includes('truck') || uncensoredResponse.toLowerCase().includes('truck')) {
		var response = "```This message has been manually removed for legal reasons.\nA report may have been sent to the bot owner.```";
		var selfFlagInput = 1;
	}
	if (messageInput.toLowerCase().includes('van') || String(ocrText).toLowerCase().includes('van') || uncensoredResponse.toLowerCase().includes('van')) {
		var response = "```This message has been manually removed for legal reasons.\nA report may have been sent to the bot owner.```";
		var selfFlagInput = 1;
	}
}

//Murder isn't really acceptable in most situations, so don't do that I think
if (
	messageInput.toLowerCase().includes('kill') || String(ocrText).toLowerCase().includes('kill') || uncensoredResponse.toLowerCase().includes('kill') ||
	messageInput.toLowerCase().includes('murder') || String(ocrText).toLowerCase().includes('murder') || uncensoredResponse.toLowerCase().includes('murder') ||
	messageInput.toLowerCase().includes('shoot') || String(ocrText).toLowerCase().includes('shoot') || uncensoredResponse.toLowerCase().includes('shoot')
) {
	if (messageInput.toLowerCase().includes('kill') || String(ocrText).toLowerCase().includes('yourself') || uncensoredResponse.toLowerCase().includes('yourself')) {
		var response = "```This message has been manually removed for legal and safety reasons.\nA report may have been sent to the bot owner.```";
		var selfFlagInput = 1;
	}
	if (messageInput.toLowerCase().includes('someone') || String(ocrText).toLowerCase().includes('someone') || uncensoredResponse.toLowerCase().includes('someone')) {
		var response = "```This message has been manually removed for legal and safety reasons.\nA report may have been sent to the bot owner.```";
		var selfFlagInput = 1;
	}
	if (messageInput.toLowerCase().includes('people') || String(ocrText).toLowerCase().includes('people') || uncensoredResponse.toLowerCase().includes('people')) {
		var response = "```This message has been manually removed for legal and safety reasons.\nA report may have been sent to the bot owner.```";
		var selfFlagInput = 1;
	}
	if (messageInput.toLowerCase().includes('them') || String(ocrText).toLowerCase().includes('them') || uncensoredResponse.toLowerCase().includes('them')) {
		var response = "```This message has been manually removed for legal and safety reasons.\nA report may have been sent to the bot owner.```";
		var selfFlagInput = 1;
	}
}

//I finally added image support to the bot, so check images for text as well
//Check image
if (
	String(ocrText).toLowerCase().includes('example_crime')
) {
	var response = "```This message has been manually removed for (add code that gives reason here 👍) reasons.\nA report may have been sent to the bot owner.```";
	var selfFlagInput = 1
}


// ...


//Patched out happiness in response to the existence of Ohio
if (messageInput.toLowerCase().includes('ohio')) {
	if (response.includes(':thumbsup:')) {
		var response = response.replace('thumbsup', 'thumbsdown');
	}
}

//Quickly tell me when there's an emergency so that I can fix it eventually
if (selfFlagInput == 1 || selfFlagOutput == 1) {
		client.channels.cache.get("channel").send("New self report: \nChannel ID: " + message.channel.id + "\nChannel: <#" + message.channel.id + ">\nUser ID: " + message.author + "\nUser: <@" + message.author.id + ">\nInput: [` " + messageInput + " `]\nMessage content: [` "  + uncensoredResponse + " `]\n" + (String(ocrText) !== "undefined" ? ("Image content: [` "  + String(ocrText).replace(/\r?\n|\r/g, " ") + " `]\n") : "") + "Time: <t:" + Math.floor(Date.now() / 1000) + ":R>\nInput flag: " + selfFlagInput + "\nOutput flag: " + selfFlagOutput + "\n");
}

//If message contains name of an image the bot knows, then send that image
for (let i = 0; i < imageList.length; i++ ) {
	if (response.toLowerCase().includes(imageList[i].slice(0, -4))) {
		var imageOutput = 'images/' + imageList[i];
		break;
	}
}


// ...


//Send message, but with a delay for suspense (and to make it seem more realistic (and to fix an issue setting variables asynchronously because my code is bad))
setTimeout(() => {
	var messageOutTime = Math.floor(Date.now() / 1000);
	if (response !== null && response !== '') {
		//Send as a reply if previous message was sent recently
		if (timeSinceLastMessage < 3 || String(response).length > (timeSinceLastMessage * 5) || messageOutTime - messageInTime > 5 ) {
			//Include image if there is one
			if (imageOutput !== undefined && message.guild.members.me.permissionsIn(message.channel).has.has(PermissionsBitField.Flags.AttachFiles)) {
				message.reply({ content: response, files: [{attachment: imageOutput}]});
			} else {
				message.reply({ content: response});
			}
		} else {
			//Otherwise send as a standard message (with image maybe)
			if (imageOutput !== undefined && message.guild.members.me.permissionsIn(message.channel).has(PermissionsBitField.Flags.AttachFiles)) {
				client.channels.cache.get(message.channel.id).send({ content: response, files: [{attachment: imageOutput}]});
			} else {
				client.channels.cache.get(message.channel.id).send({ content: response});
			}
		}
	}
}, (String(response).length * 75) + 500);
