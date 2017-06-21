import React from 'react';
import {Dropdown} from 'semantic-ui-react';
import {Bond} from 'oo7';
import {ReactiveComponent} from 'oo7-react';

export class DropdownBond extends ReactiveComponent {
	constructor () {
		super(['disabled', 'enabled']);
	}
	componentWillMount() {
		this.setState({options: this.props.options});
		this.handleChange(null, {value: this.props.defaultValue || this.props.options[0].value});
	}

	handleAddition (e, { value }) {
		this.setState({
			options: [{ text: `${value} - Custom value`, value }, ...this.props.options],
		})
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

	render () {
		const { currentValue } = this.state

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
				style={this.props.style}
				disabled={this.state.disabled || !this.state.enabled}
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
	defaultValue: '',
	disabled: false,
	options: [{text: 'Unknown', value: ''}]
}
