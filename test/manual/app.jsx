import React from 'react';

import {Bond, TimeBond} from 'oo7';
import {Rspan} from 'oo7-react';
import { AccountDropdown, AddressBond, AccountLabel, Example } from '../../src';

import {
	Button
} from 'semantic-ui-react'

export class App extends React.Component {
	constructor() {
		super();
		this.bond = new Bond
	}

	render() {
		return (
			<div>
				<Example />
			</div>
		);
	}
}
