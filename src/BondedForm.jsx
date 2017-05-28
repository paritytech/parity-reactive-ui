import React from 'react';
import {Bond} from 'oo7';
import {ReactiveComponent} from 'oo7-react';
import {Button} from 'semantic-ui-react';

export class BondedForm extends ReactiveComponent {
	constructor (object, bondableProps) {
		super(bondableProps);
		this.object = object;
	}
	render () {
		let p = {};
		Object.keys(this.props)
			.filter(k => !(this.props[k] instanceof Bond))
			.forEach(k => p[k] = this.props[k]);
		Object.assign(p, this.state);
		return React.createElement(this.object, p);
	}
}

export let BButton = () => new BondedForm(Button, ['label', 'content', 'disabled']);
export let BStatistic = () => new BondedForm(Statistic, ['label', 'content', 'color']);
export let BStatisticLabel = () => new BondedForm(Statistic.Label, ['children']);
export let BStatisticValue = () => new BondedForm(Statistic.Value, ['children']);
