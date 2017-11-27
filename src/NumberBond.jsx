const { InputBond } = require('./InputBond');

class NumberBond extends InputBond {
	constructor () {
		super(['minimum', 'maximum']);
	}
}

NumberBond.defaultProps = {
	placeholder: '123...',
	validator: (v, s) => {
		let m = Number.parseInt(v);

		if (Number.isFinite(m) && m >= s.minimum && m <= s.maximum) {
			return {
				internal: v,
				external: m,
				corrected: '' + m
			};
		}
		return null;
	},
	minimum: 0,
	maximum: 1e99,
	defaultValue: ''
};

module.exports = { NumberBond };
