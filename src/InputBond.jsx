import React from 'react';
import {Input} from 'semantic-ui-react';
import {Bond} from 'oo7';

export class InputBond extends React.Component {
	constructor () {
		super();
		this.state = { value: '', validity: false };
	}

	fixValue(v) {
		let f = function (b) {
			if (typeof(b) === 'string') {
				b = { corrected: b, value: b, ok: true };
			}
			else if (b === null) {
				b = { value: null, ok: false };
			}
			else if (b === false) {
				b = { value: undefined, ok: false };
			}
			else if (b === true) {
				b = { value: v, ok: true };
			}
			else if (typeof(b) !== 'object') {
				throw 'Invalid value returned from validity function';
			}
			this.setState({ value: b.hasOwnProperty('corrected') ? b.corrected : v, validity: b });
			if (this.props.bond instanceof Bond) {
				if (b.ok) {
					console.log(`InputBond: changed(${b.value})`);
					this.props.bond.changed(b.value);
				} else if (b.value !== undefined) {
					console.log(`InputBond: changed(null)`);
					this.props.bond.changed(b.value);
				} else {
					console.log(`InputBond: reset`);
					this.props.bond.reset();
				}
			}
		}.bind(this);

		this.setState({ value: v, validity: { value: v, ok: this.state.validity.ok } });

		if (typeof(this.props.validator) !== 'function') {
			f(true);
		} else {
			let a = v !== undefined && this.props.validator(v);
			if (a instanceof Promise || a instanceof Bond) {
				a.then(f);
			} else {
				f(a);
			}
		}
	}

	componentWillMount() { this.fixValue(this.state.value); }

	render () {
		return (<Input
			className={this.props.className}
			style={this.props.style}
			name={this.props.name}
			type='text'
			placeholder={this.props.placeholder}
			value={this.state.value}
			error={!this.state.validity.ok}
			onChange={(e, v) => this.fixValue(v.value, v)}
		/>);
	}
}
InputBond.defaultProps = {
	placeholder: ''
};
