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

		console.log('rerender tokenlist');

		// if (tokens && tokens.length === 0) {
		// 	return <div />;
		// }

		return (
			<Dropdown text={ tokens ? 'Tokens (' + tokens.length + ')' : 'Loading...' } basic scrolling labeled button icon='ticket' className='icon'>
				<Dropdown.Menu>
					{tokens && tokens.map((elem) => {
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
		let { src, tla, name, balance } = this.state;
		console.log('rerender tokenicon')
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
