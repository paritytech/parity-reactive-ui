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
import {bonds, toChecksumAddress} from 'oo7-parity';
import {ReactiveComponent, Rimg} from 'oo7-react';
import {Label, Icon} from 'semantic-ui-react';
import {AccountIcon} from './AccountIcon';
import {bonds, isNullData} from 'oo7-parity';

export class AccountLabel extends ReactiveComponent {
	constructor () {
		super(['address']);
	}
	render () {
		if (this.state.address === null) {
			return (<Label
				as='a'
				image
				color='red'
				basic
				style={{
					borderTopLeftRadius: '16px',
					borderBottomLeftRadius: '16px'
				}}
			>
				<Icon name='warning circle' style={{height: '100%'}} />
				undefined
			</Label>);
		} else if (isNullData(this.state.address)) {
			return (<Label
				as='a'
				color={'black'}
				image
				basic
				style={{
					borderTopLeftRadius: '16px',
					borderBottomLeftRadius: '16px'
				}}
			>
				<Icon name='ban' style={{height: '100%'}} />
				Null
			</Label>);
		} else {
			let a = toChecksumAddress(this.state.address);
			return (<AccountLabelAux
				address={a}
				names={bonds.namesOf(a)}
				badges={bonds.badgesOf(a)}
				noicon={this.props.noicon}
			/>);
		}
	}
}

class AccountLabelAux extends ReactiveComponent {
	constructor () {
		super(['names', 'badges']);
	}
	readyRender () {
		let badges = this.state.badges.map((b, i) => (
			<Rimg
				key={i}
				alt={b.caption}
				src={bonds.githubhint.entries(b.img)[0]}
				style={{
					marginLeft: '0.25em',
					marginRight: '0.25em',
					border: '6px solid transparent'
				}}
			/>
		));

		return (
			<Label
				as='a'
				color={this.state.names.owned ? 'yellow' : 'blue'}
				image
				basic={!(this.state.names.owned || this.state.names.registry)}
				style={{
					borderTopLeftRadius: this.props.noicon ? 'default' : '16px',
					borderBottomLeftRadius: this.props.noicon ? 'default' : '16px',
					overflow: 'hidden',
					verticalAlign: 'sub'
				}}
			>
				{this.props.noicon ? '' : (<AccountIcon
					address={this.props.address}
					style={{
						borderRadius: '50%',
						border: '2px solid transparent'
					}}
				/>)}
				{this.state.names.owned || this.state.names.registry || (
					<span>
						<span style={{
							fontSize: 'x-small',
							fontWeight: 'lighter'
						}}>
							0x
						</span>
						{this.props.address.substr(2, 8)}…{this.props.address.slice(-4)}
					</span>
				)}
				{(badges.length > 0 || this.state.names.owned || this.state.names.registry) ? (
					<Label.Detail style={{paddingLeft: 0, paddingRight: 0}}>
						{badges}
					</Label.Detail>
				) : ''}
			</Label>
		);
	}
}
