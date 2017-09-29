import React from 'react';
import { ReactiveComponent } from 'oo7-react';
import { Label, Button } from 'semantic-ui-react';

export class AddressLabel extends ReactiveComponent {
	constructor(){
		super(['address']);
		this.state = {
			isHashHovered:false,
			isCopyHovered:false
		};
	}

	onCopyAddress(text = 'hello'){
		console.log('copied');
		var textArea = document.createElement("textarea");

		textArea.style.position = 'fixed';
		textArea.style.top = 0;
		textArea.style.left = 0;
		// Ensure it has a small width and height. Setting to 1px / 1em
		// doesn't work as this gives a negative w/h on some browsers.
		textArea.style.width = '2em';
		textArea.style.height = '2em';
		// We don't need padding, reducing the size if it does flash render.
		textArea.style.padding = 0;
		// Clean up any borders.
		textArea.style.border = 'none';
		textArea.style.outline = 'none';
		textArea.style.boxShadow = 'none';
		// Avoid flash of white box if rendered for any reason.
		textArea.style.background = 'transparent';

		textArea.value = text;

		document.body.appendChild(textArea);

		textArea.select();

		try {
			var successful = document.execCommand('copy');
			var msg = successful ? 'successful' : 'unsuccessful';
			console.log('Copying text command was ' + msg);
		} catch (err) {
			console.log('Oops, unable to copy');
		}

		document.body.removeChild(textArea);
	}

	handleHashHover(){
		this.setState({
			isHashHovered: !this.state.isHashHovered
		})
	}

	handleCopyHover(){
		this.setState({
			isCopyHovered: !this.state.isCopyHovered
		})
	}

	render(){
		const { address, isHashHovered, isCopyHovered } = this.state;
		console.log('addy', address, isHashHovered);
		if(typeof this.state.address == 'undefined') return(<div></div>);
		return(
			<div>
				<Button.Group>
					<Button
						basic={!isCopyHovered}
						icon="clone"
						color='blue'
						onClick={this.onCopyAddress.bind(this,this.state.address)}
						onMouseEnter={this.handleCopyHover.bind(this)}
						onMouseLeave={this.handleCopyHover.bind(this)}>
					</Button>
					<Button
						basic={!isHashHovered}
						color='blue'
						onMouseEnter={this.handleHashHover.bind(this)}
						onMouseLeave={this.handleHashHover.bind(this)} >{this.state.address.substr(0,7)}...{this.state.address.substr(-5)}
					</Button>
				</Button.Group>
			</div>
		)
	}
}
