import React from 'react';
import {bonds, isNullData, toChecksumAddress} from 'oo7-parity';
import {ReactiveComponent, Rimg} from 'oo7-react';
import {Icon} from 'semantic-ui-react';
import {AccountIcon} from './AccountIcon';

export class InlineAccount extends ReactiveComponent {
	constructor () {
		super(['address']);
	}
	readyRender () {
		let a = toChecksumAddress(this.state.address);
		return (<InlineAccountAux
			address={a}
			names={bonds.namesOf(a)}
			badges={this.props.badges ? bonds.badgesOf(a) : []}
		/>);
	}
}
InlineAccount.defaultProps = {
	badges: true
};

export class InlineAccountAux extends ReactiveComponent {
	constructor () {
		super(['names', 'badges']);
	}
	readyRender () {
		let badges = this.state.badges.map((b, i) => (
			<Rimg key={i} alt={b.caption} src={bonds.githubhint.entries(b.img)[0]} style={{height: '1em', verticalAlign: 'text-bottom'}}/>
		));

		return (
			<span
				style={{
					marginLeft: '4px',
					paddingRight: '4px',
					borderTopLeftRadius: '0.6em',
					borderBottomLeftRadius: '0.6em',
					paddingTop: '0.1em',
					paddingBottom: '0.1em',
					fontWeight: '900',
					borderBottom: this.state.names.owned ? '2px solid #FBBD08' : '0',
					whiteSpace: 'nowrap'
				}}
			>
				{isNullData(this.props.address)
					? (<span><Icon name='ban' style={{height: '100%'}} /> Null</span>)
					: (<span><AccountIcon
						address={this.props.address}
						style={{
							borderRadius: '50%',
							width: '1.2em',
							verticalAlign: 'text-top',
							marginRight: '0.35ex',
							position: 'relative',
							top: '-0.03em'
						}}
					/>
					{this.state.names.owned || this.state.names.registry ||
						(<span><span style={{
							fontSize: 'small',
							fontWeight: '100,lighter,light'
						}}>0x</span>{
							this.props.address.substr(2, 8)}…{this.props.address.slice(-4)
						}</span>)
					}
					{badges.length > 0 ? (
						<span style={{marginLeft: '0.5ex'}}>
							{badges}
						</span>
					) : ''}
				</span>)}
		    </span>
		);
	}
}
