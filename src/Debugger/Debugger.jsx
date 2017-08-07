import React from 'react';
import { ReactiveComponent } from 'oo7-react';
import { bonds } from 'oo7-parity';
import { Bond, TransformBond } from 'oo7';
import { Spoiler } from '../';

import { TraceDisplay, TraceSelection } from './';

import { List, Segment, Tab } from 'semantic-ui-react';

export default class Debugger extends ReactiveComponent {
  constructor () {
    super(['contracts']);
    this.state = {
      trace: new Bond()
    }
  }

  render () {
    return (
      <Segment padded>
        {this.state && this.state.contracts ?
          <Tab panes={ [ { menuItem: 'TraceSelection', render: () => <TraceSelection contracts={this.state.contracts} trace={this.state.trace} /> },
                         { menuItem: 'TraceDisplay', render: () => <TraceDisplay txBond={ this.state.trace } /> } ] }
          />
        : null}
      </Segment>
    )
  }
}
