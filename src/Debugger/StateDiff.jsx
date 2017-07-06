import React from 'react';
import { ReactiveComponent } from 'oo7-react';
import { AccountLabel } from '../';

import { Segment, List } from 'semantic-ui-react';

const stateToList = s => Object.keys(s).map((key, i) => ({ key:i, content: <div>
                                                                            <AccountLabel address={key} />
                                                                            {propDiff(s[key])}
                                                                           </div> }));
const propDiff = p => <List items={Object.keys(p).map((key, i) => ({key: i, content: `${key}: ${JSON.stringify(p[key])}`}))} />


export class StateDiff extends ReactiveComponent {
  constructor () {
    super(['stateDiff']);
  }

  render () {
    return (
      <Segment padded>
        {this.props.stateDiff ? <List items={stateToList(this.state.stateDiff)} /> : null}
      </Segment>
    )
  }

}
