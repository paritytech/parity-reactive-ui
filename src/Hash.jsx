import React from 'react';
import copyToClipboard from 'copy-to-clipboard';
import { ReactiveComponent } from 'oo7-react';
import { Icon, Popup } from 'semantic-ui-react';

export class Hash extends ReactiveComponent {
  constructor () {
		super(['value', 'className', 'style']);
	}

	render () {
		let v = this.state.value;
		let d = typeof(v) === 'string' && v.startsWith('0x') && v.length >= 18
			? v.substr(0, 8) + '…' + v.substr(v.length - 4)
			: v;
		return (
			<span>
        <CopyIcon hash={v} />
        <span
  				className={this.state.className}
  				style={this.state.style}
  				title={this.state.value}
  				name={this.props.name}
  			>{d}</span>
      </span>
		);
	}
}
Hash.defaultProps = {
	className: '_hash'
};


class CopyIcon extends React.Component {
  constructor () {
    super();
    this.state = {hover: false};
    this.toggleHover = this.toggleHover.bind(this);
  }

  toggleHover () {
    this.setState({hover: !this.state.hover});
  }

  copy () {
    copyToClipboard(this.props.hash);
    this.setState({ copied: true });
    setTimeout(() => this.setState({ copied: false }), 1000);
  }

  render () {
    var linkStyle;
    if (this.state.hover) {
      linkStyle = {transform: 'scale(1.5, 1.5)',
                   opacity: 1}
    } else {
      linkStyle = {transform: 'scale(1,1)',
                   opacity: 0.5}
    }
    return(
      <Popup
        key={name}
        mouseEnterDelay={1000}
        inverted
        closeOnTriggerClick={false}
        closeOnRootNodeClick={false}
        closeOnDocumentClick={false}
        style={{ width: '8em', textAlign: 'center' }}
        size='mini'
        position='top center'
        content={this.state.copied ? 'Copied!' : 'Click to copy'}
        trigger={(
          <Icon name='clone' style={linkStyle} onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover} onClick={this.copy.bind(this)} />
        )}
      />
    )
  }
}
