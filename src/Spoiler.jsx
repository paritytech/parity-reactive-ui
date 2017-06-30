import React from 'react';
import { ReactiveComponent, Rdiv } from 'oo7-react';
import { BButton } from 'parity-reactive-ui';

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
