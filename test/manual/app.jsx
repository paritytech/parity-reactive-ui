import React from 'react';

import {Bond, TimeBond} from 'oo7';
import {Rspan} from 'oo7-react';
import { AccountDropdown, AddressBond, AccountLabel } from '../../src';

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
			<div style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					height: '90vh'
				}}>
				<div style={{
						width:'450px'
					}}>
					<Button content='Send Transaction' inverted color='green' fluid icon='right arrow' labelPosition='right'/>

					<br />

					<AddressBond fluid bond={this.bond} defaultValue='0x00D4cD27DC890b058c49Ca8D29D6678014214B48'/>

					<br />

					<AccountLabel fluid address={this.bond}/>
				</div>
			</div>
		);
	}
}
