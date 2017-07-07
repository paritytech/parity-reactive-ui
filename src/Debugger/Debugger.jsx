import React from 'react';
import { ReactiveComponent } from 'oo7-react';
import { bonds } from 'oo7-parity';
import { Bond } from 'oo7';
import { Spoiler } from '../Spoiler';

import { TxTrace, VmTrace, Recorder, StateDiff, Editor } from './';

import { List, Segment } from 'semantic-ui-react';

export default class Debugger extends ReactiveComponent {
  constructor () {
    super();
    this.state = {
      txBond: new Bond().subscriptable(),
    }
    this.state.txBond.tie(_ => {
      console.log('setState');
      this.setState({txObj: _});
    });

  }

  // Test purpose
  componentWillReceiveProps () {
    console.log('receiveProps');
    super.componentWillReceiveProps();
    this.state.txBond.changed(this.props.txObj);
  }

  render () {
    console.log('TXOBJ');
    console.log(this.props.txObj);
    return (
      <div>
        <Spoiler content='Editor' active>
          <Segment>
            <Editor trace={this.state.txBond} />
          </Segment>
        </Spoiler>
        <Spoiler content='Recorder'>
          <Segment padded>
            <Recorder trace={this.state.txBond}/>
          </Segment>
        </Spoiler>
        <Spoiler content='Transaction' disabled={!(this.state.txBond.isReady() && this.state.txBond.trace)}>
          <TxTrace txTrace={this.state.txBond.trace} />
        </Spoiler>
        <Spoiler content='VmTrace' disabled={!(this.state.txBond.isReady() && this.state.txBond.vmTrace)}>
          <VmTrace vmTrace={this.state.txBond.vmTrace}/>
        </Spoiler>
        <Spoiler content="StateDiff" disabled={!(this.state.txBond.isReady() && this.state.txBond.stateDiff)}>
          <StateDiff stateDiff={this.state.txBond.stateDiff}/>
        </Spoiler>
      </div>

    )
  }
}

Debugger.defaultProps = {
  defaultStep: 0,
}
