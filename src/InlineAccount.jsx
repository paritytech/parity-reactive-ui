import React from 'react';
import {ReactiveComponent, Rimg} from 'oo7-react';
import {AccountIcon} from './AccountIcon';

export class InlineAccount extends ReactiveComponent {
	constructor () {
		super(['address']);
	}
	readyRender () {
		let a = parity.api.util.toChecksumAddress(this.state.address);
		return (<InlineAccountAux
			address={a}
			names={parity.bonds.namesOf(a)}
			badges={parity.bonds.badgesOf(a)}
		/>);
	}
}

export class InlineAccountAux extends ReactiveComponent {
	constructor () {
		super(['names', 'badges']);
	}
	readyRender () {
		let badges = this.state.badges.map((b, i) => (
			<Rimg key={i} alt={b.caption} src={parity.bonds.githubhint.entries(b.img)[0]} style={{height: '1em', verticalAlign: 'text-bottom'}}/>
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
					color: (this.state.names.owned ? '#e7ae07' : '#1e7bc0'),
					borderBottom: '2px solid #' + (this.state.names.owned ? 'FBBD08' : '2185D0'),
					whiteSpace: 'nowrap'
				}}
			>
		    	<AccountIcon
					address={this.props.address}
					style={{
						borderRadius: '50%',
						width: '1.2em',
						verticalAlign: 'text-top',
						marginRight: '0.35ex',
						position: 'relative',
						top: '-0.03em'
					}}
				/>{this.state.names.owned || this.state.names.registry ||
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
		    </span>
		);
	}
}
