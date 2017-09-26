// (C) Copyright 2016-2017 Parity Technologies (UK) Ltd.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//         http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/* eslint-disable no-return-assign */

import React from 'react';
import {Bond} from 'oo7';
import {ReactiveComponent} from 'oo7-react';
import {Button, Label, Statistic} from 'semantic-ui-react';

export class BondedForm extends ReactiveComponent {
	constructor (object, bondableProps) {
		super(bondableProps);
		this.object = object;
	}
	render () {
		let p = {};
		Object.keys(this.props)
			.filter(k => !(Bond.instanceOf(this.props[k])))
			.forEach(k => p[k] = this.props[k]);
		Object.assign(p, this.state);
		return React.createElement(this.object, p);
	}
}

export let BButton = () => new BondedForm(Button, ['label', 'content', 'disabled']);
export let BStatistic = () => new BondedForm(Statistic, ['label', 'value', 'color']);
export let BStatisticLabel = () => new BondedForm(Statistic.Label, ['children']);
export let BStatisticValue = () => new BondedForm(Statistic.Value, ['children']);
export let BLabel = () => new BondedForm(Label, ['content', 'detail']);
export let BLabelDetail = () => new BondedForm(Label.Detail, ['content']);
