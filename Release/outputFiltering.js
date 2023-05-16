//This is part of the code which filters the bot's responses for multiple reasons

//Replace name variable
var response = response.replace('$%userName%', user);

//Remove pings
//Can't outright remove as that has the issue of messages like `@eve@everyoneryone`, as well as just looking terrible
var response = response.replace(/@everyone/mig, '@_everyone');
var response = response.replace(/@here/mig, '@_here');

//Don't send messages it shouldn't send for obvious reasons
var response = response.replace(/insert_slur_here/mig, '`[Text manually removed by admin]`');

//Remove some things for legal reasons
var response = response.replace(/insert_felony_here/mig, '`[Text manually removed by admin for legal reasons]`');

//Please stop giving children my IP address
var response = response.replace('24.119.42.3', '`[Text manually removed by admin]`');

if (message.toLowerCase().includes('make')) {
	//People don't need to be taught how to make chloroform without the context of 3D printing.
	if (message.toLowerCase().includes('chloroform')) {
		var response = "```This message has been manually removed for legal and safety reasons```";
	}
	
	//I think it should be obvious why people shouldn't be making this.
	//It's amazing how many times this bot has already violated the Geneva conventions in its few years of existence.
	if (message.toLowerCase().includes('napalm')) {
		var response = "```This message has been manually removed for legal and safety reasons```";
	}
}

if (message.toLowerCase().includes('hotwire')) {
	//HOW DID THE BOT LEARN THIS
	if (message.toLowerCase().includes('car')) {
		var response = "```This message has been manually removed for legal reasons```";
	}
}

//I think this code explains itself well enough
if (message.toLowerCase().includes('ohio')) {
	if (response.includes(':thumbsup:')) {
		var response = response.replace('thumbsup', 'thumbsdown');
	}
}