import React from 'react';
import {ReactiveComponent} from 'oo7-react';
import {bonds} from 'oo7-parity';
import {Button} from 'semantic-ui-react';
import {TransactionProgressLabel, styleStatus} from './TransactionProgressLabel';

export class TransactButton extends ReactiveComponent {
	constructor () {
		super(['content', 'disabled', 'enabled', 'positive', 'negative', 'active']);
		this.state = { status: null };
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick () {
		let s = this.state;
		if (s.status) {
			s.status = null;
		} else {
			s.status = typeof(this.props.tx) === 'function'
				? this.props.tx()
				: bonds.post(this.props.tx);
		}
		this.setState(s);
	}
	render () {
		if (!this.props.tx) {
			return (<span/>);
		}
		return <TransactButtonAux
			icon={this.props.icon}
			size={this.props.size}
			positive={this.state.positive}
			negative={this.state.negative}
			floated={this.props.floated}
			compact={this.props.compact}
			circular={this.props.circular}
			basic={this.props.basic}
			attached={this.props.attached}
			active={this.state.active}
			fluid={this.props.fluid}
			primary={this.props.primary}
			secondary={this.props.secondary}
			content={this.state.content}
			color={this.props.color}
			status={this.state.status}
			onClick={this.handleClick}
			statusText={this.props.statusText}
			statusIcon={this.props.statusIcon}
			colorPolicy={this.props.colorPolicy}
			disabled={this.state.disabled || !this.state.enabled}
		/>
	}//
}
TransactButton.defaultProps = {
	statusText: false,
	statusIcon: true,
	colorPolicy: 'button',
	enabled: true
};

class TransactButtonAux extends ReactiveComponent {
	constructor() {
		super(['status']);
	}
	render() {
		let specialColor = this.props.primary || this.props.secondary;
		let clickable = !this.state.status || this.state.status.confirmed || this.state.status.failed;
		let status = this.state.status && styleStatus(this.state.status);
		let statusColor = status ? status.color : null;
		let labelColor = (this.props.colorPolicy === 'button' && !specialColor ? this.props.color : null) || statusColor || this.props.color;
		let buttonColor = (this.props.colorPolicy === 'status' ? statusColor : this.props.color) || this.props.color || statusColor;
		return (<Button
			icon={this.state.status === null || !clickable ? this.props.icon : 'check'}
			size={this.props.size}
			positive={this.props.positive}
			negative={this.props.negative}
			floated={this.props.floated}
			compact={this.props.compact}
			circular={this.props.circular}
			basic={this.props.basic}
			attached={this.props.attached}
			active={this.props.active}
			fluid={this.props.fluid}
			primary={this.props.primary}
			secondary={this.props.secondary}
			content={this.state.status === null || !clickable ? this.props.content : 'OK'}
			color={buttonColor}
			onClick={this.props.onClick}
			label={this.state.status ? (<TransactionProgressLabel
				value={this.state.status}
				showContent={this.props.statusText}
				showIcon={this.props.statusIcon}
				color={labelColor}
				basic={labelColor == buttonColor && !specialColor ? undefined : false}
			/>) : null}
			disabled={this.props.disabled || !clickable}
		/>);
	}
}
