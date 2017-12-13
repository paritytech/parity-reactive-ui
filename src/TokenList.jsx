const React = require('react');

const { ReactiveComponent } = require('oo7-react');
const { bonds, formatToExponential } = require('oo7-parity');
const { Dropdown, Header } = require('semantic-ui-react');

const unknownIcon = require('./assets/unknown-64x64.png');

class TokenList extends ReactiveComponent {
	constructor () {
		super(['tokens']);
	}

	render () {
		const { tokens } = this.state;

		if (typeof tokens === 'undefined' || tokens.length === 0) {
			return <div />;
		}

		return (
			<Dropdown text={ `Tokens (${tokens.length})` } basic scrolling labeled button icon='ticket' className='icon'>
				<Dropdown.Menu>
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
				</Dropdown.Menu>
			</Dropdown>
		);
	}
}

class TokenIcon extends ReactiveComponent {
	constructor () {
		super(['balance', 'src', 'tla', 'name']);
	}

	render () {
		const { src, tla, name, balance } = this.state;

		balance = balance || 0;

		return (
			<Dropdown.Item
				content={
					<Header
						image={ src || unknownIcon }
						content={ name }
						subheader={ `${formatToExponential(balance || 0)} ${tla}` }
					/> }
			/>
		);
	}
}

module.exports = { TokenList };
