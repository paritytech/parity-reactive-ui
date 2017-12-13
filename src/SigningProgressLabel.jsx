const React = require('react');
const { ReactiveComponent } = require('oo7-react');
const { Label, Icon } = require('semantic-ui-react');

function styleStatus (value) {
	return (
		value.requested ? { text: 'authorising', icon: 'key', color: 'orange', basic: true }
			: value.signed ? { text: 'signed', icon: 'check', color: 'green', basic: false }
				: value.failed ? { text: 'rejected', icon: 'x', color: 'grey', basic: true }
					: null
	);
}

class SigningProgressLabel extends ReactiveComponent {
	constructor () {
		super(['value']);
	}
	render () {
		if (!this.state.value) {
			return (<span />);
		}
		const status = styleStatus(this.state.value);

		return (
			<Label
				pointing={ this.props.pointing }
				icon={ this.props.showIcon ? (
					<Icon
						name={ status.icon }
						loading={ status.loading }
					/>) : null }
				color={ this.props.color || status.color }
				basic={ this.props.basic == null ? status.basic : this.props.basic }
				content={ this.props.showContent ? status.text : null }
			/>
		);
	}
}
SigningProgressLabel.defaultProps = {
	showContent: true,
	showIcon: true,
	basic: null
};

module.exports = { styleStatus, SigningProgressLabel };
