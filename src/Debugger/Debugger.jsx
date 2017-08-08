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
    this.trace = new Bond();
  }

  render () {
    const compiled = this.state && this.state.contracts && isCompiled(this.state.contracts);
    const contractName = new Bond();

    console.log(this.state.contracts);
    return (
      <Segment padded>
        {compiled ?
          <Tab panes={ [ { menuItem: 'TraceSelection', render: () => <TraceSelection contracts={this.state.contracts} trace={this.trace} disabled={!compiled} contractName={contractName}/> },
                         { menuItem: 'TraceDisplay', render: () => <TraceDisplay txBond={ this.trace } /> } ] }
          />
        : <i>Please compile the contracts first.</i>}
      </Segment>
    )
  }
}

function isCompiled (contracts) {
  return Object.keys(contracts).map(n => contracts[n]).filter(c => c.bytecode && c.interface).length >= 1;
}
