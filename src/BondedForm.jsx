const React = require('react');
const { Bond } = require('oo7');
const { ReactiveComponent } = require('oo7-react');
const { Button, Label, Statistic } = require('semantic-ui-react');

class BondedForm extends ReactiveComponent {
	constructor (object, bondableProps) {
		super(bondableProps);
		this.object = object;
	}
	render () {
		let p = {};

		Object.keys(this.props)
			.filter(k => !Bond.instanceOf(this.props[k]))
			.forEach(k => p[k] = this.props[k]);
		Object.assign(p, this.state);
		return React.createElement(this.object, p);
	}
}

let BButton = () => new BondedForm(Button, ['label', 'content', 'disabled']);
let BStatistic = () => new BondedForm(Statistic, ['label', 'value', 'color']);
let BStatisticLabel = () => new BondedForm(Statistic.Label, ['children']);
let BStatisticValue = () => new BondedForm(Statistic.Value, ['children']);
let BLabel = () => new BondedForm(Label, ['content', 'detail']);
let BLabelDetail = () => new BondedForm(Label.Detail, ['content']);

module.exports = { BondedForm, BButton, BStatistic, BStatisticLabel, BStatisticValue, BLabel, BLabelDetail };
