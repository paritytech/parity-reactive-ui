import React from 'react';
import PropTypes from 'prop-types';
import {Bond} from 'oo7';
import { ReactiveComponent, Rdiv } from 'oo7-react';
import { BButton } from './';

export class Spoiler extends ReactiveComponent {
  constructor () {
    super(['active', 'children']);
  }

  render () {
    return (<div>
      <BButton onClick={() => this.setState({active: !this.state.active})} content={this.props.content} label={this.props.label} disabled={this.props.disabled}/>
      {this.state.active ? <Rdiv>{this.state.children}</Rdiv> : null}
    </div>)
  }
}

Spoiler.defaultProps = {
  active: false,
}

Spoiler.propTypes = {
  active: PropTypes.bool || PropTypes.instanceof(Bond),
  children: PropTypes.node || Proptypes.instanceof(Bond),
  content: PropTypes.node,
  label: PropTypes.node,
  disabled: PropTypes.bool
}
