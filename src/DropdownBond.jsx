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

import React from 'react';
import {Dropdown} from 'semantic-ui-react';
import {Bond} from 'oo7';
import {ReactiveComponent} from 'oo7-react';

export class DropdownBond extends ReactiveComponent {
	constructor () {
		super(['disabled', 'enabled']);
	}

	componentWillMount () {
		super.componentWillMount();
		this.setState({options: this.props.options});
		this.handleChange(null, {value: this.props.defaultValue || this.props.options[0].value});
	}

	handleAddition = (e, { value }) => {
		this.setState({
			options: [{ text: `${value} - Custom value`, value }, ...this.props.options]
		});
	}

	handleChange = (e, { value }) => {
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
				onAddItem={this.handleAddition}
				onChange={this.handleChange}
				style={this.props.style}
				disabled={!!this.state.disabled || !this.state.enabled}
			/>
		);
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
};
