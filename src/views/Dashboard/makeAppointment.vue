<template>
	<div>
		<top-navbar></top-navbar>
		<b-jumbotron
			style="
				width: 80%;
				margin: auto;
				margin-top: 10vh;
				height: 80vh;
				padding: 0;
			"
			bg-variant="primary"
			text-variant="white"
		>
			<div v-if="isLogged && !chatStarted" class="chatEntry">
				<h1>
					Witaj {{ this.userName }} {{ this.userLastname }} naciśnij
					start, jeśli chcesz zacząć rozmowę
				</h1>
				<br />
				<b-button
					variant="light"
					style="margin-top: 1em"
					@click="startChat(true)"
				>
					Rozpocznij rozmowę
				</b-button>
			</div>
			<div v-if="!isLogged && !chatStarted" class="chatEntry">
				<h1>
					Witaj, podaj swoje imię i nazwisko, poczym naciśnij start,
					jeśli chcesz zacząć rozmowę
				</h1>
				<b-form-input
					v-model="unloggedUserName"
					placeholder="Wprowadź swoje imię"
					class="chatEntryInput"
				></b-form-input>
				<b-form-input
					v-model="text"
					placeholder="Wprowadź swoje nazwisko"
					class="chatEntryInput"
				></b-form-input>
				<b-button
					variant="light"
					style="margin-top: 1em"
					@click="startChat(false)"
				>
					Rozpocznij rozmowę
				</b-button>
			</div>
			<div v-if="chatStarted" class="Chat">
				<b-container>
					<b-row style="height: 70vh">
						<b-col
							cols="4"
							class="d-flex align-items-center justify-content-center"
							style="border-right: 2px solid white"
						>
							<img
								src="../../assets/chat.svg"
								style="width: 30vh"
								alt=""
							/>
						</b-col>
						<b-col cols="8">
							<div class="chatBox">
								<p
									class="message"
									v-for="message in messages"
									:key="message.messageTime"
								>
									{{ message.userName }}
									{{ message.userLastname }}:
									{{ message.messageContext }} -
									{{ message.messageTime | formatDate }}
								</p>
							</div>
							<div style="width: 100%; height: 15vh">
								<b-form-textarea
									v-model="chatMessage"
									placeholder="Wprowadź wiadomość"
									class="messageBox"
								>
								</b-form-textarea>
								<b-button
									variant="light"
									class="sendBtn"
									@click="sendMessage"
								>
									Wyślij
								</b-button>
							</div>
						</b-col>
					</b-row>
				</b-container>
			</div>
		</b-jumbotron>
	</div>
</template>
<script>
import { mapGetters } from "vuex";
import topNavbar from "../../components/Navbar/topNavbar.vue";
export default {
	data() {
		return {
			unloggedUserName: "",
			unloggedUserLastname: "",
			unloggedUserId: "",
			chatStarted: false,
			chatMessage: "",
			messages: [],
		};
	},
	components: {
		topNavbar,
	},
	computed: {
		...mapGetters([
			"isAdmin",
			"isEmployee",
			"isUser",
			"isLogged",
			"userName",
			"userLastname",
			"userId",
			"userRole",
		]),
	},
	methods: {
		async startChat(logged) {
			if (this.$connection.connection.connectionState === 1) {
				if (logged === false) {
					console.log("unlogged");
				}
				console.log(this.$connection.connection);
				await this.$connection.invoke(
					"ConnectToChatRoom",
					{
						Room_id: this.userId,
						RoomName: this.userName + " " + this.userLastname,
					},
					{
						CallerId: this.userId,
						CallerName: this.userName,
						CallerLastname: this.userLastname,
					},
				);
				this.chatStarted = true;
				console.log(this.userId);
			}
		},
		async sendMessage() {
			if (this.$connection.connection.connectionState === 1) {
				await this.$connection.invoke("SendMessage", {
					Room_id: this.userId,
					MessageSender: this.userId,
					MessageReceiver: "46bccddb-c0ed-47f5-093f-08da36743cbf",
					UserName: this.userName,
					UserLastname: this.userLastname,
					MessageContext: this.chatMessage,
				});
				this.chatMessage = "";
				console.log(this.messages);
			}
		},
		sortedMessages() {
			this.messages.sort((a, b) => {
				return new Date(a.messageTime) - new Date(b.messageTime);
			});
			return this.messages;
		},
	},
	created() {
		this.connect();
		this.$chatHub.$on("messages-received", (messages) => {
			this.messages = messages;
			this.sortedMessages();
		});
	},
};
</script>

<style>
.nav {
	min-width: 100%;
}
* {
	padding: 0;
	margin: 0;
}
.chatEntry {
	margin: auto;
	text-align: center;
	padding-top: 25vh;
}
.chatEntryInput {
	width: 25%;
	margin: 1em auto 0 auto;
}
.chat {
	width: 100%;
	padding: 0.5em;
}
.chatBox {
	width: 100%;
	height: 65vh;
	overflow-y: auto;
	overflow-x: hidden;
}
.message {
	display: block;
	background: white;
	border-radius: 1vw;
	border: 1px solid black;
	max-width: 90%;
	padding: 1vh;
	margin: 0.5vh 0 0.5vh 0;
	color: black;
	word-break: break-word;
}
@media only screen and (max-width: 800px) {
	.messageBox {
		width: 50%;
		height: 100%;
		float: left;
	}
}
@media only screen and (max-width: 1400px) {
	.messageBox {
		width: 85%;
		height: 100%;
		float: left;
	}
}
@media only screen and (min-width: 1401px) {
	.messageBox {
		width: 80%;
		min-height: 100%;
		float: left;
	}
}
@media only screen and (min-width: 1401px) {
	.sendBtn {
		height: 100%;
		width: 15%;
		float: left;
	}
}
@media only screen and (max-width: 1400px) {
	.sendBtn {
		height: 80%;
		width: 15%;
		float: left;
	}
}
@media only screen and (max-width: 800px) {
	.sendBtn {
		height: 80%;
		width: 25%;
		float: left;
	}
}
chatEntry h1 {
	font-size: 1vw !important;
}
</style>
