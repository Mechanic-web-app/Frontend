<template>
  <div>
    <top-navbar></top-navbar>
    <b-jumbotron
      style="width: 80%; margin: auto; margin-top: 10vh; height: 80vh; padding: 0"
      bg-variant="primary"
      text-variant="white"
    >
      <div v-if="isLogged && !chatStarted" class="chatEntry">
        <h1>
          Witaj {{ this.userName }} {{ this.userLastname }} naciśnij start, jeśli chcesz
          zacząć rozmowę
        </h1>
        <br />
        <b-button variant="light" style="margin-top: 1em" @click="startChat(true)">
          Rozpocznij rozmowę
        </b-button>
      </div>
      <div v-if="!isLogged && !chatStarted" class="chatEntry">
        <h1>
          Witaj, podaj swoje imię i nazwisko, poczym naciśnij start, jeśli chcesz zacząć
          rozmowę
        </h1>
        <el-form
          :model="chatForm"
          status-icon
          :rules="rules"
          ref="chatForm"
          label-width="120px"
          class="demo-ruleForm"
        >
          <el-form-item label="Imię" prop="name">
            <el-input type="text" v-model="chatForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Nazwisko" prop="lastname">
            <el-input type="text" v-model="chatForm.lastname" autocomplete="off">
            </el-input>
          </el-form-item>
        </el-form>
        <b-button variant="light" style="margin-top: 1em" @click="startChat(false)">
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
              <img src="../../assets/chat.svg" style="width: 30vh" alt="" />
            </b-col>
            <b-col cols="8">
              <div class="chatBox">
                <p class="message" v-for="message in messages" :key="message.messageTime">
                  {{ message.userName }}
                  {{ message.userLastname }}: {{ message.messageContext }} -
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
                  v-if="isLogged"
                  variant="light"
                  class="sendBtn"
                  @click="sendMessage(true)"
                >
                  Wyślij
                </b-button>
                <b-button
                  v-else
                  variant="light"
                  class="sendBtn"
                  @click="sendMessage(false)"
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
import { uuid } from "vue-uuid";
import topNavbar from "../../components/Navbar/topNavbar.vue";
export default {
  data() {
    var validateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Wprowadź imię!"));
      } else {
        callback();
      }
    };
    var validateLastname = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Wprowadź nazwisko!"));
      } else {
        callback();
      }
    };
    return {
      unloggedUserId: "",
      chatStarted: false,
      chatMessage: "",
      messages: [],
      chatForm: {
        name: "",
        lastname: "",
      },
      rules: {
        name: [{ validator: validateName, trigger: "blur" }],
        lastname: [{ validator: validateLastname, trigger: "blur" }],
      },
      uuid: uuid.v1(),
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
          this.unloggedUserId = this.uuid;
          let isValidForm = await this.$refs.chatForm.validate();
          if (isValidForm) {
            await this.$connection.invoke(
              "ConnectToChatRoom",
              {
                Room_id: this.unloggedUserId,
                RoomName: this.chatForm.name + " " + this.chatForm.lastname,
              },
              {
                CallerId: this.unloggedUserId,
                CallerName: this.chatForm.name,
                CallerLastname: this.chatForm.lastname,
              }
            );
            this.chatStarted = true;
          } else {
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
              }
            );
            this.chatStarted = true;
          }
        }
      }
    },
    async sendMessage(logged) {
      if (this.$connection.connection.connectionState === 1) {
        if (logged === true) {
          await this.$connection.invoke("SendMessage", {
            Room_id: this.userId,
            MessageSender: this.userId,
            MessageReceiver: "46bccddb-c0ed-47f5-093f-08da36743cbf",
            UserName: this.userName,
            UserLastname: this.userLastname,
            MessageContext: this.chatMessage,
          });
        } else {
          await this.$connection.invoke("SendMessage", {
            Room_id: this.unloggedUserId,
            MessageSender: this.unloggedUserId,
            MessageReceiver: "46bccddb-c0ed-47f5-093f-08da36743cbf",
            UserName: this.chatForm.name,
            UserLastname: this.chatForm.lastname,
            MessageContext: this.chatMessage,
          });
        }
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
.chatEntry .el-form-item {
  margin-bottom: 22px;
  width: 30% !important;
  margin: 5vh auto 2vh auto;
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
