import React from 'react';
import {bonds, toChecksumAddress} from 'oo7-parity';
import {ReactiveComponent, Rimg} from 'oo7-react';
import {isNullData} from 'oo7-parity';
import {Label, Icon} from 'semantic-ui-react';
import {AccountIcon} from './AccountIcon';

export class AccountLabel extends ReactiveComponent {
	constructor () {
		super(['address']);
	}
	render () {
		if (this.state.address === null) {
			return (<Label
				as='a'
				basic={false}
				image
				color='red'
				basic={true}
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
				basic={true}
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
