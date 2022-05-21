<template>
	<div>
		<top-navbar></top-navbar>
		<b-container fluid style="margin-top: 50px">
			<b-card-header
				style="max-width: 110rem; margin: auto"
				class="mb-2"
				header-tag="nav"
			>
				<b-navbar toggleable="lg" card-header pills>
					<b-navbar-toggle target="employeeNav"></b-navbar-toggle>
					<b-collapse id="employeeNav" is-nav>
						<b-navbar-nav>
							<b-nav-item to="/employee/menu">
								Panel główny
							</b-nav-item>
							<b-nav-item to="/employee/confirm-user">
								Zatwierdź użytkowników
							</b-nav-item>
							<b-nav-item to="/employee/add-car">
								Dodaj samochód do użytkownika
							</b-nav-item>
							<b-nav-item to="/employee/add-repair">
								Dodaj naprawę
							</b-nav-item>
							<b-nav-item to="/employee/chat" active>
								Czat
							</b-nav-item>
						</b-navbar-nav>
					</b-collapse>
				</b-navbar>
			</b-card-header>
			<b-container class="chatContainer">
				<div class="chatSidebar flex-column d-flex align-items-center">
					<b-button
						variant="primary"
						v-for="chatRoom in chatRooms"
						:key="chatRoom.roomName"
						class="chatRoom"
						@click="pickRoom(chatRoom.room_id, chatRoom.roomName)"
					>
						<p class="chatroomBtn">{{ chatRoom.roomName }}</p>
					</b-button>
				</div>
				<div class="chat">
					<div class="chatMessages">
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
					<div class="chatBar">
						<b-form-textarea
							v-model="chatMessage"
							placeholder="Wprowadź wiadomość"
							class="messageBox"
						>
						</b-form-textarea>
						<b-button
							variant="light"
							class="sendBtn"
							@click="sendMessage()"
						>
							Wyślij
						</b-button>
					</div>
				</div>
			</b-container>
		</b-container>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import topNavbar from "../../components/Navbar/topNavbar.vue";

export default {
	components: { topNavbar },
	data() {
		return {
			chatMessage: "",
			chatRooms: [],
			roomId: "",
			roomName: "",
			messages: [],
		};
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
		async getChatRooms() {
			console.log("1");
			const result = await this.$chatroom.getChatRooms();
			console.log(result);
			if (result.status === true) {
				this.chatRooms = result.data;
				console.log(result);
				console.log(this.chatRooms);
			}
		},
		async pickRoom(roomId, roomName) {
			this.roomId = roomId;
			this.roomName = roomName;
			if (this.$connection.connection.connectionState === 1) {
				console.log(this.$connection.connection);
				await this.$connection.invoke(
					"ConnectToChatRoom",
					{
						Room_id: roomId,
						RoomName: roomName,
					},
					{
						CallerId: this.userId,
						CallerName: this.userName,
						CallerLastname: this.userLastname,
					},
				);
			}
			console.log(roomId);
		},
		async sendMessage() {
			if (this.$connection.connection.connectionState === 1) {
				await this.$connection.invoke("SendMessage", {
					Room_id: this.roomId,
					MessageSender: this.userId,
					MessageReceiver: this.roomId,
					UserName: this.userName,
					UserLastname: this.userLastname,
					MessageContext: this.chatMessage,
				});
				console.log("Send");
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
		this.getChatRooms();
		this.connect();
		this.$chatHub.$on("messages-received", (messages) => {
			this.messages = messages;
			this.sortedMessages();
		});
	},
};
</script>

<style>
.chatSidebar {
	width: 25%;
	height: 80vh;
	background: rgb(86, 86, 86);
	border-radius: 0.3rem 0 0 0.3rem;
	float: left;
	padding: 1vh 0 1vh 0;
	overflow-y: auto;
	overflow-x: hidden;
}
.chatroomBtn {
	font-size: 2vh;
}
.chat {
	width: 75%;
	height: 70vh;
	float: left;
	padding: 0;
	margin: 0;
}
.chatRoom {
	width: 90%;
	min-height: 5vh;
}
.chatBar {
	width: 100%;
	height: 15vh;
}
.chatMessages {
	padding-left: 1%;
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
	margin-top: 1vh;
	color: black;
	word-break: break-word;
}
.chatContainer {
	width: 80%;
	height: 80vh;
	margin: auto;
	padding: 0;
	background: #0d6efd;
	border-radius: 0.3rem;
}
.card-header .navbar-toggler {
	border-color: #0d6efd;
}

@media only screen and (max-width: 800px) {
	.chatSidebar {
		width: 30%;
		height: 80vh;
		background: rgb(86, 86, 86);
		border-radius: 0.3rem 0 0 0.3rem;
		float: left;
		padding: 1vh 0 1vh 0;
		overflow-y: auto;
		overflow-x: hidden;
	}
}
@media only screen and (max-width: 800px) {
	.chat {
		width: 70%;
		height: 70vh;
		float: left;
		padding: 0;
		margin: 0;
	}
}
@media only screen and (max-width: 800px) {
	.chatContainer {
		width: 100%;
		height: 80vh;
		margin: auto;
		padding: 0;
		background: #0d6efd;
		border-radius: 0.3rem;
	}
}
@media only screen and (max-width: 800px) {
	.messageBox {
		width: 75%;
		min-height: 15vh;
		float: left;
	}
}

@media only screen and (min-width: 801px) and (max-width: 1400px) {
	.messageBox {
		width: 85%;
		min-height: 15vh;
		float: left;
	}
}
@media only screen and (min-width: 1401px) {
	.messageBox {
		width: 80%;
		min-height: 15vh;
		float: left;
	}
}
@media only screen and (min-width: 1401px) {
	.sendBtn {
		min-height: 15vh;
		width: 20%;
		float: left;
	}
}
@media only screen and (max-width: 1400px) {
	.sendBtn {
		min-height: 15vh;
		width: 15%;
		float: left;
	}
}
@media only screen and (max-width: 800px) {
	.sendBtn {
		min-height: 15vh;
		width: 25%;
		float: left;
	}
}
</style>
