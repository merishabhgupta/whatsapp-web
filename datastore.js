
let user = {
	id: 0,
	name: "Rishabh",
	number: "+91 98765 43219",
	pic: "images/asdsd12f34ASd231.png"
};

let contactList = [
	{
		id: 0,
		name: "Rishabh",
		number: "+91 98765 43219",
		pic: "images/asdsd12f34ASd231.png",
		// lastSeen: "Jan 18 2020 17:58:02"
	},
	{
		id: 1,
		name: "Vikash",
		number: "+91 98232 37261",
		pic: "images/Ass09123asdj9dk0qw.jpg",
		// lastSeen: "Jan 18 2020 22:18:21"
	},
	{
		id: 2,
		name: "Sachin",
		number: "+91 72631 2937",
		pic: "images/asd1232ASdas123a.png",
		// lastSeen: "Jan 18 2020 19:23:16"
	},
	{
		id: 3,
		name: "Nishant",
		number: "+91 98232 63547",
		pic: "images/Alsdk120asdj913jk.jpg",
		// lastSeen: "Jan 18 2020 11:16:42"
	},
	{
		id: 4,
		name: "Harsh",
		number: "+91 72781 38213",
		pic: "images/dsaad212312aGEA12ew.png",
		// lastSeen: "Jan 18 2020 17:28:10"
	}
];

let groupList = [
	{
		id: 1,
		name: "Programmers",
		members: [0, 1, 3],
		pic: "images/0923102932_aPRkoW.jpg"
	},
	{
		id: 2,
		name: "Web Developers",
		members: [0, 2],
		pic: "images/1921231232_Ag1asE.png"
	},
	{
		id: 3,
		name: "notes",
		members: [0],
		pic: "images/8230192232_asdEWq2.png"
	}
];

// message status - 0:sent, 1:delivered, 2:read

let messages = [
	{
		id: 0,
		sender: 2,
		body: "where are you, buddy?",
		status: 2,
		recvId: 0,
		recvIsGroup: false
	},
	{
		id: 1,
		sender: 0,
		body: "at home",
		status: 2,
		recvId: 2,
		recvIsGroup: false
	},
	{
		id: 2,
		sender: 0,
		body: "how you doin'?",
		status: 2,
		recvId: 3,
		recvIsGroup: false
	},
	{
		id: 3,
		sender: 3,
		body: "i'm fine...wat abt u?",
		status: 2,
		recvId: 0,
		recvIsGroup: false
	},
	{
		id: 4,
		sender: 0,
		body: "i'm good too",
		status: 1,
		recvId: 3,
		recvIsGroup: false
	},
	{
		id: 5,
		sender: 3,
		body: "anyone online?",
		status: 0,
		recvId: 1,
		recvIsGroup: true
	},
	{
		id: 6,
		sender: 1,
		body: "have you seen infinity war?",
		status: 1,
		recvId: 0,
		recvIsGroup: false
	},
	{
		id: 7,
		sender: 0,
		body: "are you going to the party tonight?",
		status: 2,
		recvId: 2,
		recvIsGroup: false
	},
	{
		id: 8,
		sender: 2,
		body: "no, i've some work to do..are you?",
		status: 2,
		recvId: 0,
		recvIsGroup: false
	},
	{
		id: 9,
		sender: 0,
		body: "yup",
		status: 1,
		recvId: 2,
		recvIsGroup: false
	},
	{
		id: 10,
		sender: 0,
		body: "if you go to the movie, then give me a call",
		status: 2,
		recvId: 4,
		recvIsGroup: false
	},
	{
		id: 11,
		sender: 1,
		body: "yeah, i'm online",
		status: 0,
		recvId: 1,
		recvIsGroup: true
	}
];

let MessageUtils = {
	getMessages: () => {
		return messages;
	},
	addMessage: (msg) => {
		msg.id = messages.length + 1;
		messages.push(msg);
	}
};