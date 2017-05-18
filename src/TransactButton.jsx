import React from 'react';
import {ReactiveComponent} from 'oo7-react';
import {Button} from 'semantic-ui-react';
import {TransactionProgressLabel, styleStatus} from './TransactionProgressLabel';

export class TransactButton extends React.Component {
	constructor () {
		super();
		this.state = { status: null };
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick () {
		let s = this.state;
		s.status = parity.bonds.post(this.props.tx);
		this.setState(s);
	}
	render () {
		if (!this.props.tx) {
			return (<span/>);
		}
		return <TransactButtonAux
			icon={this.props.icon}
			primary={this.props.primary}
			secondary={this.props.secondary}
			content={this.props.content}
			color={this.props.color}
			status={this.state.status}
			onClick={this.handleClick}
			statusText={this.props.statusText}
			statusIcon={this.props.statusIcon}
			colorPolicy={this.props.colorPolicy}
			disabled={this.props.disabled}
		/>
	}//
}
TransactButton.defaultProps = {
	statusText: false,
	statusIcon: true,
	colorPolicy: 'button'
};

class TransactButtonAux extends ReactiveComponent {
	constructor() {
		super(['status']);
	}
	render() {
		let clickable = !this.state.status || this.state.status.confirmed || this.state.status.failed;
		let status = this.state.status && styleStatus(this.state.status);
		let statusColor = status ? status.color : null;
		let labelColor = (this.props.colorPolicy === 'button' ? this.props.color : null) || statusColor || this.props.color;
		let buttonColor = (this.props.colorPolicy === 'status' ? statusColor : this.props.color) || this.props.color || statusColor;
		return (<Button
			icon={this.props.icon}
			primary={this.props.primary}
			secondary={this.props.secondary}
			content={this.props.content}
			color={buttonColor}
			onClick={this.props.onClick}
			label={this.state.status ? (<TransactionProgressLabel
				value={this.state.status}
				showContent={this.props.statusText}
				showIcon={this.props.statusIcon}
				color={labelColor}
				basic={labelColor == buttonColor ? null : false}
			/>) : null}
			disabled={this.props.disabled || !clickable}
		/>);
	}
}
