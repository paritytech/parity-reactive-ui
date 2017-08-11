import React from 'react';
import { ReactiveComponent } from 'oo7-react';
import { AccountLabel, Recognizer } from '../';

import { Segment, List } from 'semantic-ui-react';

const stateToList = s => Object.keys(s).map((key, i) => ({ key:i, content: <div>
                                                                            <AccountLabel address={key} />
                                                                            {propDiff(s[key])}
                                                                           </div> }));
const propDiff = p => <div>{Object.keys(p).map((key, i) => {
  if (typeof(p[key]) === 'object') {
    return  (<span key={i}>
      <Recognizer value={key} /> {`: `} {propDiff(p[key])}
    </span>);
  } else {
    return (<div key={i}>
        <Recognizer value={key} /> {`: `}<Recognizer value={p[key]} />
      </div>
    );
  }
})}</div>;


export default class StateDiff extends ReactiveComponent {
  constructor () {
    super(['stateDiff']);
  }

  render () {
    return (
      <Segment padded>
        {this.state.stateDiff ? <List items={stateToList(this.state.stateDiff)} /> : null}
      </Segment>
    )
  }

}
