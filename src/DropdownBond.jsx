import React from 'react';
import {Dropdown} from 'semantic-ui-react';
import {Bond} from 'oo7';
import {ReactiveComponent} from 'oo7-react';
import {AccountIcon} from './';

export class DropdownBond extends ReactiveComponent {
	constructor () {
		super(['disabled', 'enabled']);
		this.state = {
			ok: true,
		}
	}

	componentWillMount() {
		super.componentWillMount();
		this.setState({options: this.props.options.map(option => ({label:this.makeIcon(option.value), ...option}))});

		let value = this.props.defaultValue || this.props.options[0].value;
		if (this.props.multiple) {
			this.handleChange(null, {value: [value]});
		} else {
			this.handleChange(null, {value});
		}
	}

	handleAddition (e, { value }) {
		if (this.validateInput(value, this.props.validatorType)) {
			this.setState({
				options: [{ text: `${value} - Custom value`, value }, ...this.props.options],
			})
		} else {
			let that = this;
			setTimeout(() => that.setState({ ok: true }), 1000);
		}
	}

	handleInputChange (e, value) {
		if (this.validateInput(value, this.props.validatorType)) {
			this.setState({
				ok: true,
			});
		} else {
			this.setState({
				ok: false,
			});
		}
	}

	handleChange (e, { value }) {
		this.setState({ currentValue: value });
		if (this.props.bond instanceof Bond) {
			if (value === null) {
				this.props.bond.reset();
			} else {
				this.props.bond.changed(value);
			}
		}
	}

	makeIcon (address) {
		return this.validateInput(address, 'address')
				? <AccountIcon address={address} />
				: undefined;
	}

	// TODO: Import validator functions from oo7-parity when on npm
	validateInput (value, validationType) {
		if (validationType === 'address') {
			return /^(0x)?([a-fA-F0-9]{40})$/.test(value);
		}
		if (validationType === 'hash') {
			return /^(0x)?([a-fA-F0-9]{64})$/.test(value);
		}
		return true;
	}

	render () {
		const { currentValue } = this.state;

		return (
			<Dropdown
				options={this.state.options}
				placeholder={this.props.placeholder}
				additionLabel={<i>Custom Key: </i>}
				search={this.props.search}
				selection={this.props.selection}
				allowAdditions={this.props.allowAdditions}
				value={currentValue}
				onAddItem={this.handleAddition.bind(this)}
				onChange={this.handleChange.bind(this)}
				onSearchChange={this.handleInputChange.bind(this)}
				error={!this.state.ok}
				style={this.props.style}
				disabled={this.state.disabled || !this.state.enabled}
				fluid={this.props.fluid}
				multiple={this.props.multiple}
			/>
		)
	}
}
DropdownBond.defaultProps = {
	placeholder: '',
	additionLabel: 'Custom',
	search: true,
	selection: true,
	allowAdditions: true,
	validatorType: 'string',
	defaultValue: '',
	disabled: false,
	enabled: true,
	options: [{text: 'Unknown', value: ''}],
	fluid: false,
	multiple: false,
};
