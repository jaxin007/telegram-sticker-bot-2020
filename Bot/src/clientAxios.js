// const rax = require('retry-axios');
const axios = require('axios');
const retry = require('retry');

function axiosClient(TIME, url) {
	setInterval(() => {
		const operation = retry.operation({
			retries: 30,
			factor: 2,
			minTimeout: 100,
			randomize: false
		});

		operation.attempt(async (currentAttempt) => {
			try {
				const res = await axios.get(url);
				console.clear();
				console.log(`status:\n ${res.status}`, res.data);
			} catch (error) {
				if (operation.retry(error)) {
					console.clear();
					console.error('Error: ', error.message, currentAttempt);
				}
			}
		});
	}, TIME);
}

module.exports = { axiosClient };
