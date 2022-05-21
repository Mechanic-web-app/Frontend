import { HubConnectionBuilder, LogLevel } from "@aspnet/signalr";

export default {
	install(Vue) {
		const connection = new HubConnectionBuilder()
			.withUrl("https://localhost:44385/hubs/chat")
			.configureLogging(LogLevel.Information)
			.build();

		const chatHub = new Vue();

		Vue.prototype.$chatHub = chatHub;

		connection.on("RefreshMessagesList", (messages) => {
			chatHub.$emit("messages-received", messages);
		});
		connection.on("ConnectMessage", (content, type) => {
			chatHub.$emit("connection-message-received", { content, type });
		});
		connection.on("RefreshCallersList", (callersList) => {
			chatHub.$emit("caller-list-received", callersList);
		});
		connection.on("PushNotification", (userName, userLastname) => {
			chatHub.$emit("push-notification", userName, userLastname);
		});

		Vue.prototype.$connection = connection;
		let startedPromise = null;

		Vue.prototype.connect = () => {
			startedPromise = connection.start().catch(() => {
				return new Promise((resolve, reject) =>
					setTimeout(
						() =>
							Vue.prototype.connect().then(resolve).catch(reject),
						5000,
					),
				);
			});
			return startedPromise;
		};
	},
};
