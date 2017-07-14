import React from 'react';
import { ReactiveComponent } from 'oo7-react';
import { Recognizer } from '../../';

import { Segment, List } from 'semantic-ui-react';

export default class Stack extends ReactiveComponent {
  constructor () {
    super(['currentStep']);
  }

  render () {
    return (
      <Segment>
        {this.state.currentStep ?
        <List items={this.state.currentStep.op.stack.reverse().map((v,i) => <div key={i}>
            {`${i}: `} <Recognizer value={v} />
        </div>)} />
        : null}
      </Segment>
    )
  }
}
