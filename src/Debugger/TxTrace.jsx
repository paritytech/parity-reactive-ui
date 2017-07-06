import React from 'react';
import { ReactiveComponent } from 'oo7-react';
import { InlineAccount, InlineBalance } from 'parity-reactive-ui';

import { Segment, List } from 'semantic-ui-react';


const txToList = tx => Object.keys(tx).map((key,i) => /^to|from$/.test(key)
                                                        ? ({key:i, children:<InlineAccount address={tx[key]} />})
                                                        : key === 'value'
                                                          ? ({key:i, children:<InlineBalance value={tx[key]} />})
                                                          :({ key:i, content: `${key}: ${tx[key]}`}));

export class TxTrace extends ReactiveComponent {
  constructor () {
    super(['txTrace']);
  }

  render () {
    return (
      <Segment padded>
        {this.props.txTrace ? <List items={txToList(this.state.txTrace[0].action)} /> : null}
      </Segment>
    )
  }
}
