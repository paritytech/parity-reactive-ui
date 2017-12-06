const React = require('react');

const { ReactiveComponent } = require('oo7-react');
const { bonds } = require('oo7-parity');
const { Popup, Image } = require('semantic-ui-react');

const unknownIcon = require('./assets/unknown-64x64.png');

class TokenList extends ReactiveComponent {
	constructor () {
		super(['tokens']);
	}

		style: {
			display: 'inline-block',
			backgroundColor: '#e2e2e2',
			padding: '10px',
			borderRadius: '10px',
			overflow: 'hidden'
		}

		render () {
			let { tokens } = this.state;

			if (typeof tokens === 'undefined' || tokens.length === 0) {
				return <span>-</span>;
			}

			return (<div style={ this.style }>
				{ tokens.map((elem) => {
					return (
						<TokenIcon
							key={ elem.name }
							src={ bonds.githubhint.entries(elem.img).map((imgObj) => {
								return imgObj[0];
							}) }
							balance={ elem.balance.toString() }
							tla={ elem.tla }
							name={ elem.name }
						/>);
				}) }

			</div>);
		}
}

class TokenIcon extends ReactiveComponent {
	constructor () {
		super(['balance', 'src', 'tla', 'name']);
	}

		style: {
			width: '40px',
			height: '40px',
			margin: '10px',
			flexBasis: '25%'
		}

		render () {
			const { src, tla, name, balance } = this.state;

			return (<div style={ { display: 'inline-block' } }>
				<Popup
					key={ tla }
					trigger={
						<Image
							style={ this.style }
							src={ src || unknownIcon }
							alt=''
						/> }
					header={ name }
					content={ balance }
				/>
			</div>
			);
		}
}

module.exports = { TokenList };
