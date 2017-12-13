const React = require('react');
const { BigNumber } = require('bignumber.js');
const { ReactiveComponent } = require('oo7-react');
const { splitValue, denominations } = require('oo7-parity');

const usableDenoms = denominations.filter(x => x[0] === x[0].toLowerCase());

class InlineBalance extends ReactiveComponent {
	constructor () {
		super(['value']);
		this.state = {
			precise: null,
			denom: null
		};
	}

	precise () {
		const s = this.state;

		return s.precise === null ? this.props.precise : s.precise;
	}

	togglePrecise () {
		const s = this.state;

		s.precise = !s.precise;
		this.setState(s);
	}

	denom () {
		const s = this.state;

		return s.denom === null ? usableDenoms.indexOf(this.props.units) : s.denom;
	}

	cycleDenom () {
		const denom = (this.denom() + 2) % (usableDenoms.length + 1) - 1;

		this.setState({ denom });
	}

	readyRender () {
		let v = new BigNumber(this.state.value || 0);
		let isNeg = v.lt(0);
		let s;
		let sd = this.denom();

		if (sd === -1) {
			s = splitValue(v.mul(isNeg ? -1 : 1));
		} else {
			let dd = denominations.indexOf(usableDenoms[sd]);

			s = {
				base: v.div(new BigNumber(1000).pow(dd)),
				denom: dd
			};
		}
		let same = true;
		let units = s.base;

		if (!this.precise()) {
			units = units.mul(1000).round().div(1000);
			same = units.eq(s.base);
		}
		units = units.toString();
		let m = units.match(/(.*)(\.[0-9]+)$/);
		let decimals = '';

		if (m) {
			units = m[1];
			decimals = m[2];
		}
		units = units.replace(/(\d)(?=(\d{3})+$)/g, '$1,');

		const d = denominations[s.denom];
		const c = '32, 32, 32';
		// const fore = `rgb(${c})`;
		const back = `rgba(${c}, 0.15)`;

		return (
			<span style={ {
				borderRadius: '0.2em',
				border: `0.05em solid ${back}`,
				whiteSpace: 'nowrap'
			} }
			>
				<span
					style={ {
						paddingLeft: '0.3em',
						paddingRight: '0.3em',
						borderRadius: '0.2em',
						borderTopRightRadius: 0,
						borderBottomRightRadius: 0,
						fontWeight: 'bold',
						cursor: 'pointer'
					} }
					onClick={ () => this.props.inert ? null : this.togglePrecise() }
				>
					{isNeg ? '-' : this.props.forceSign ? '+' : ''}
					{units}
					{
						<span style={ { fontSize: '85%', opacity: 0.66 } }>
							{decimals}
						</span>
					}
					{same ? '' : '…'}
				</span>
				<span
					style={ {
						paddingLeft: '0.3em',
						paddingRight: '0.4em',
						backgroundColor: back,
						cursor: 'pointer'
					} }
					onClick={ () => this.props.inert ? null : this.cycleDenom() }
				>
					<span style={ {
						borderRadius: '0.2em',
						borderTopLeftRadius: 0,
						borderBottomLeftRadius: 0,
						borderLeft: 0,
						color: 'fore',
						fontSize: '85%',
						verticalAlign: 'baseline',
						fontWeight: sd === -1 ? 'normal' : 'bold'
					} }
					>
						{d}
					</span>
				</span>
			</span>
		);
	}
}

module.exports = { InlineBalance };
