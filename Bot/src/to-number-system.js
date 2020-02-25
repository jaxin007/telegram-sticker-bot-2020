function to_system(number, system) {
	let result = '';
	let remainder = 0;
	while (number != 0) {
		remainder = number % system;
		number = Math.floor(number / system);
		result = remainder + result;
	}
	return result;
}

module.exports = { to_system };
