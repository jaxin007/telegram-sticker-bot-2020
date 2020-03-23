const wakeUpTimer = (TIME) => {
	setInterval(() => {
		const date = Date().toString();
		console.log(`WAKE UP DYNO\n${date}`);
	}, TIME);
};

module.exports = {
	wakeUpTimer
};
