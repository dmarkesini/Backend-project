const devData = require(`./development-data/index`);
const testData = require(`./test-data/index`);

const ENV = process.env.NODE_ENV || "development";

const data = { development: devData, test: testData };

module.exports = data[ENV];
