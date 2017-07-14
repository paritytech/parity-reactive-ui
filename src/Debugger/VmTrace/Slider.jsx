import React from 'react';
import ReactDOM from 'react-dom';
import { ReactiveComponent } from 'oo7-react';

import { Segment, Label, Button } from 'semantic-ui-react';

export default class Slider extends ReactiveComponent {
  constructor () {
    super(['currentIndex', 'min', 'max']);
  }

  handleChange (event) {
    this.props.currentIndex.changed(+event.target.value);
  }

  render () {
    return (
      <Segment padded>
        <Label content={this.props.label}  />
        <input type="range" min={this.state.min} max={this.state.max} value={this.state.currentIndex} id="fader" onChange={this.handleChange.bind(this)}/>
        <Button onClick={() => this.state.currentIndex > this.state.min ? this.props.currentIndex.changed(this.state.currentIndex-1) : null} icon='chevron left' />
        <Button onClick={() => this.state.currentIndex < this.state.max ? this.props.currentIndex.changed(this.state.currentIndex+1) : null} icon='chevron right' />
      </Segment>
    )
  }
}

Slider.defaultProps = {
  min: 0,
  max: 0,
}
