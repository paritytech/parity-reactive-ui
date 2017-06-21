import React from 'react';

import {Bond, TimeBond} from 'oo7';
import {Rspan} from 'oo7-react';
import {InputBond} from '../../src';

export class App extends React.Component {
	constructor() {
		super();
		this.bond = new Bond
		this.time = new TimeBond
	}

	render() {
		return (
			<div>
				<InputBond defaultValue={'HELLO WORLD'} bond={this.bond} />
				<Rspan>
					{Bond.all([this.time, this.bond])}
				</Rspan>
			</div>
		);
	}
}
