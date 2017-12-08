const React = require('react');
const { ReactiveComponent } = require('oo7-react');
const { Button } = require('semantic-ui-react');
const { CopyToClipboard } = require('react-copy-to-clipboard');

class AddressLabel extends ReactiveComponent {
	constructor () {
		super(['address']);
		this.state = {
			isCopyHovered: false
		};
		this.handleCopyHover = this.handleCopyHover.bind(this);
	}

	handleCopyHover () {
		this.setState({
			isCopyHovered: !this.state.isCopyHovered
		});
	}

	render () {
		const { address, isCopyHovered } = this.state;

		if (typeof this.state.address === 'undefined') { return (<div />); }
		return (
			<div>
				<Button.Group>
					<CopyToClipboard
						text={ this.state.address }
					>
						<Button
							basic={ !isCopyHovered }
							icon='clone'
							color='blue'
							onMouseEnter={ this.handleCopyHover }
							onMouseLeave={ this.handleCopyHover }
						/>
					</CopyToClipboard>
					<Button color='blue' basic style={ { cursor: 'default' } }>
						{address.substr(0, 7)}...{address.substr(-5)}
					</Button>
				</Button.Group>
			</div>
		);
	}
}

//onClick={ this.onCopyAddress.bind(this, address) }


module.exports = { AddressLabel };
