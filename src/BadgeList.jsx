const React = require('react');
const { ReactiveComponent, Rimg } = require('oo7-react');

const { bonds } = require('oo7-parity');

class BadgeList extends ReactiveComponent {
	constructor () {
		super(['badges', 'className']);
	}
	render () {
		if (typeof this.state.badges === 'undefined') {
			return (<div className={ this.state.className || '' } />);
		}

		const badges = this.state.badges.map((badge, index) => {
			const src = bonds.githubhint.entries(badge.img)[0] || '';

			return (
				<Rimg
					key={ index }
					alt={ badge.name }
					src={ src }
					style={ {
						width: '20px',
						height: '20px'
					} }
				/>
			);
		});

		return (
			<div className={ this.state.className || '' }>
				{badges}
			</div>);
	}
}

module.exports = { BadgeList };
