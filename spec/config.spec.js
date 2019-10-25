const config = require('../config');
const helpers = require('./helpers');


const str = [
	config.rootDir,
	config.pugFolder,
	config.pugFiles,
	config.pugMain,
];

const num = [
	config.port,
]

describe("Config file testing >", () => {
	/** check @filesPath if string */
	str.forEach((el) => {
		helpers.isString(el)
	})

	/** check the @path is not null */
	Object.values(config).forEach((val) => {
		helpers.notNull(val)
	})

	/** check @variables if number */
	num.forEach((el) => {
		helpers.isNumber(el)
	})

	helpers.isFile(config.pugMain)
});
