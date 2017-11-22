const React = require('React');
const { ReactiveComponent } = require('oo7-react');
const { AddressBond } = require('./AddressBond');
const { HashBond } = require('./HashBond');
const { InputBond } = require('./InputBond');

class MultiInputBond extends ReactiveComponent {
	constructor () {
		super(['type', 'defaultValue', 'disabled', 'enabled']);
	}

	readyRender () {
		return this.state.type === 'address'
			? (
				<AddressBond
					bond={ this.props.bond }
					placeholder={ this.props.placeholder }
					defaultValue={ this.state.defaultValue }
					action={ this.props.action }
					disabled={ this.state.disabled || !this.state.enabled }
				/>)
			: this.state.type === 'hash'
				? (
					<HashBond
						bond={ this.props.bond }
						placeholder={ this.props.placeholder }
						defaultValue={ this.state.defaultValue }
						action={ this.props.action }
						disabled={ this.state.disabled || !this.state.enabled }
					/>)
				: this.state.type === 'string' ? (
					<InputBond
						bond={ this.props.bond }
						placeholder={ this.props.placeholder }
						defaultValue={ this.state.defaultValue }
						action={ this.props.action }
						disabled={ this.state.disabled || !this.state.enabled }
					/>) : (<span />);
	}
}
MultiInputBond.defaultProps = {
	defaultValue: '',
	disabled: false,
	enabled: true
};

module.exports = { MultiInputBond };
