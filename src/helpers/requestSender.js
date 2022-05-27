import axios from "axios";

export default {
	async send(config, data = null) {
		try {
			console.log(config);
			console.log("work");
			const result = await axios({
				method: config.method,
				url: config.url,
				data,
				params: config.params,
			});
			console.log(result.url);
			return this.__responseWrapper(result);
		} catch (error) {
			return this.__responseWrapper(error, false);
		}
	},
	async sendForUsers(config, data = null) {
		try {
			const result = await axios({
				method: config.method,
				url: config.url,
				data,
				params: config.params,
			});
			return this.__userResponseWrapper(result);
		} catch (error) {
			return this.__userResponseWrapper(error, false);
		}
	},
	async sendClear(config, data = null) {
		try {
			const result = await axios({
				method: config.method,
				url: config.url,
				data,
				params: config.params,
				responseType: "blob",
			});
			return result;
		} catch (error) {
			return this.__responseWrapper(error, false);
		}
	},
	__responseWrapper(result, status = true) {
		const wrappedResponse = {
			status:
				result.status === result.data.Success
					? result.data.Success
					: result.data.success,
		};
		if (status) {
			wrappedResponse.data = result.data.data;
			Object.assign(wrappedResponse);
		} else {
			wrappedResponse.errors = {
				statusCode: result.status,
				message: result.data.Message,
			};
		}
		return wrappedResponse;
	},
	__userResponseWrapper(result, status = true) {
		const wrappedResponse = {
			status: result.status === 200,
		};
		if (status) {
			wrappedResponse.data = result.data;
			Object.assign(wrappedResponse);
		} else {
			wrappedResponse.errors = {
				statusCode: result.status,
				message: result.data.Message,
			};
		}
		return wrappedResponse;
	},
};
