const { InputBond } = require('./InputBond');

class HashBond extends InputBond {}
HashBond.defaultProps = {
	placeholder: '0x...',
	validator: v => {
		let m = v.match(/(0x)?([a-fA-F0-9]{64})/);

		return m ? {
			internal: '0x' + m[2]
		} : null;
	}
};

module.exports = { HashBond };
