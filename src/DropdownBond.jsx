const React = require('react');
const {Dropdown} = require('semantic-ui-react');
const {Bond} = require('oo7');
const {ReactiveComponent} = require('oo7-react');

class DropdownBond extends ReactiveComponent {
	constructor () {
		super(['disabled', 'enabled']);
	}
	componentWillMount() {
		super.componentWillMount();
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
		if (Bond.instanceOf(this.props.bond)) {
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
				disabled={!!this.state.disabled || !this.state.enabled}
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
	enabled: true,
	options: [{text: 'Unknown', value: ''}]
}

module.exports = { DropdownBond };
