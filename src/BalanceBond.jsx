const React = require('react');
const { interpretRender, formatValueNoDenom, combineValue, defDenom, denominations } = require('oo7-parity');
const { Dropdown } = require('semantic-ui-react');
const { InputBond } = require('./InputBond');

class BalanceBond extends InputBond {
	getUnits () {
		return this.state.ok ? denominations[this.state.internal ? this.state.internal.denom : 6] : null;
	}

	setUnits (v) {
		let s = this.state.internal;
		let d = denominations.indexOf(v);

		s.denom = d;
		this.state.internal = s;
		this.handleEdit(this.state.display);
	}

	handleBlur () {
		let s = this.state;

		if (typeof (s.corrected) === 'string') {
			s.display = s.corrected;
			delete s.corrected;
			this.setState(s);
		}
	}

	makeAction (p) {
		return p ? 'right' : (
			<Dropdown
				onChange={ (_, v) => this.setUnits(v.value) }
				value={ this.getUnits() }
				options={ denominations
					.filter(x => x[0] === x[0].toLowerCase())
					.map(d => ({ key: d, value: d, text: d }))
				}
			/>);
	}
}
BalanceBond.defaultProps = {
	placeholder: '0',
	defaultValue: '0',
	validator: (u, s) => {
		let q = u === '' ? { denom: 6, units: '0', decimals: '', origNum: '', origDenom: '' } : interpretRender(u, null);
		let d = q && q.denom !== null ? q.origNum : undefined;

		if (q) {
			defDenom(q, s.internal ? s.internal.denom : 6);
		}
		return q ? {
			internal: q,
			display: d,
			corrected: formatValueNoDenom(q),
			external: combineValue(q),
			ok: true
		} : null;
	}
};

module.exports = { BalanceBond };
