
let getById = (id, parent) => parent ? parent.getElementById(id) : getById(id, document);
let getByClass = (className, parent) => parent ? parent.getElementsByClassName(className) : getByClass(className, document);

const DOM =  {
	chatListArea: getById("chat-list-area"),
	messageArea: getById("message-area"),
	inputArea: getById("input-area"),
	chatList: getById("chat-list"),
	messages: getById("messages"),
	chatListItem: getByClass("chat-list-item"),
	messageAreaName: getById("name", this.messageArea),
	messageAreaPic: getById("pic", this.messageArea),
	messageAreaNavbar: getById("navbar", this.messageArea),
	messageAreaDetails: getById("details", this.messageAreaNavbar),
	messageAreaOverlay: getByClass("overlay", this.messageArea)[0],
	messageInput: getById("input"),
	profileSettings: getById("profile-settings"),
	inputName: getById("input-name"),
	username: getById("username"),
};

let mClassList = (element) => {
	return {
		add: (className) => {
			element.classList.add(className);
			return mClassList(element);
		},
		remove: (className) => {
			element.classList.remove(className);
			return mClassList(element);
		},
		contains: (className, callback) => {
			if (element.classList.contains(className))
				callback(mClassList(element));
		}
	};
};

// 'areaSwapped' is used to keep track of the swapping
// of the main area between chatListArea and messageArea
// in mobile-view
let areaSwapped = false;

// 'chat' is used to store the current chat
// which is being opened in the message area
let chat = null;

// this will contain all the chats that is to be viewed
// in the chatListArea
let chatList = [];

// this will be used to store the date of the last message
// in the message area
let lastDate = "";

// 'populateChatList' will generate the chat list
// based on the 'messages' in the datastore
let populateChatList = () => {
	chatList = [];

	// 'present' will keep track of the chats
	// that are already included in chatList
	// in short, 'present' is a Map DS
	let present = {};

	MessageUtils.getMessages()
	.forEach((msg) => {
		let chat = {};
		
		chat.isGroup = msg.recvIsGroup;
		chat.msg = msg;

		if (msg.recvIsGroup) {
			chat.group = groupList.find((group) => (group.id === msg.recvId));
			chat.name = chat.group.name;
		} else {
			chat.contact = contactList.find((contact) => (msg.sender !== user.id) ? (contact.id === msg.sender) : (contact.id === msg.recvId));
			chat.name = chat.contact.name;
		}


		if (present[chat.name] !== undefined) {
			chatList[present[chat.name]].msg = msg;
			chatList[present[chat.name]].unread += chat.unread;
		} else {
			present[chat.name] = chatList.length;
			chatList.push(chat);
		}
	});
};

let viewChatList = () => {
	DOM.chatList.innerHTML = "";
	chatList
	.forEach((elem, index) => {
		let statusClass = elem.msg.status < 2 ? "far" : "fas";
		let unreadClass = elem.unread ? "unread" : "";
		DOM.chatList.innerHTML += `
		<div class="chat-list-item d-flex flex-row w-100 p-2 border-bottom ${unreadClass}" onclick="generateMessageArea(this, ${index})">
		<img src="${elem.isGroup ? elem.group.pic : elem.contact.pic}" alt="Profile Photo" class="img-fluid rounded-circle mr-2" style="height:50px;">	
		<div class="w-50">
				<div class="name">${elem.name}</div>
			</div>
			
		</div>
		`;
	});
};

let generateChatList = () => {
	populateChatList();
	viewChatList();
};


let addMessageToMessageArea = (msg) => {


	let sendStatus = `<i class="${msg.status < 2 ? "far" : "fas"} fa-check-circle"></i>`;

	DOM.messages.innerHTML += `
	<div class="align-self-${msg.sender === user.id ? "end self" : "start"} p-1 my-1 mx-3 rounded bg-white shadow-sm message-item">
		<div class="options">
			<a href="#"><i class="fas fa-angle-down text-muted px-2"></i></a>
		</div>
		
		<div class="d-flex flex-row">
			<div class="body m-1 mr-2">${msg.body}</div>
			<div class="time ml-auto small text-right flex-shrink-0 align-self-end text-muted" style="width:75px;">
			
				${(msg.sender === user.id) ? sendStatus : ""}
			</div>
		</div>
	</div>
	`;

	DOM.messages.scrollTo(0, DOM.messages.scrollHeight);
};

let generateMessageArea = (elem, chatIndex) => {
	chat = chatList[chatIndex];

	mClassList(DOM.inputArea).contains("d-none", (elem) => elem.remove("d-none").add("d-flex"));
	mClassList(DOM.messageAreaOverlay).add("d-none");

	[...DOM.chatListItem].forEach((elem) => mClassList(elem).remove("active"));


	if (window.innerWidth <= 575) {
		mClassList(DOM.chatListArea).remove("d-flex").add("d-none");
		mClassList(DOM.messageArea).remove("d-none").add("d-flex");
		areaSwapped = true;
	} else {
		mClassList(elem).add("active");
	}

	DOM.messageAreaName.innerHTML = chat.name;

	DOM.messages.innerHTML = "";

	lastDate = "";
};


let sendMessage = () => {
	let value = DOM.messageInput.value;
	DOM.messageInput.value = "";
	if (value === "") return;

	let msg = {
		sender: user.id,
		body: value,
		status: 1,
		recvId: chat.isGroup ? chat.group.id : chat.contact.id,
		recvIsGroup: chat.isGroup
	};

	addMessageToMessageArea(msg);
	MessageUtils.addMessage(msg);
	generateChatList();
};


let init = () => {
	DOM.username.innerHTML = user.name;
	DOM.inputName.addEventListener("blur", (e) => user.name = e.target.value);
	generateChatList();

};

init();