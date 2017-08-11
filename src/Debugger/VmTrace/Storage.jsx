import React from 'react';
import { ReactiveComponent } from 'oo7-react';
import { Recognizer } from '../../';

import { Segment, List } from 'semantic-ui-react';

export default class Storage extends ReactiveComponent {
  constructor () {
    super(['currentStep']);
  }

  render () {
    return (
      <Segment>
        {this.state.currentStep ?
        <List items={Object.keys(this.state.currentStep.op.storage).map(i => <div key={i}>
            <Recognizer value={i} /> {`: `}
            <Recognizer value={this.state.currentStep.op.storage[i]} />
        </div>)} />
        : null}
      </Segment>
    )
  }
}
