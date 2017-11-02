const React = require('react');
const {bonds, isNullData, toChecksumAddress} = require('oo7-parity');
const {ReactiveComponent, Rimg} = require('oo7-react');
const {Icon} = require('semantic-ui-react');
const {AccountIcon} = require('./AccountIcon');

class InlineAccount extends ReactiveComponent {
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

class InlineAccountAux extends ReactiveComponent {
	constructor () {
		super(['names', 'badges']);
	}
	render () {
		let badges = this.ready()
			? this.state.badges.map((b, i) => (
				<Rimg key={i} alt={b.caption} src={bonds.githubhint.entries(b.img)[0]} style={{height: '1em', verticalAlign: 'text-bottom'}}/>
			))
			: [];

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
					borderBottom: this.ready() && this.state.names.owned ? '2px solid #FBBD08' : '0',
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
					{(this.ready() && (this.state.names.owned || this.state.names.registry)) ||
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

module.exports = { InlineAccount };
