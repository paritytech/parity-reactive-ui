import React from 'react';
import { ReactiveComponent } from 'oo7-react';
import { bonds } from 'oo7-parity';
import { Bond, TransformBond } from 'oo7';
import { Spoiler, InputBond } from '../';

import { TxTrace, StateDiff, VmTrace, Instruction, Instructions, Slider, Stack, Memory, Storage, get_info } from './';

import { List, Segment } from 'semantic-ui-react';

export default class Debugger extends ReactiveComponent {
  constructor () {
    super(['txBond']);
    this.currentIndex = new Bond();
  }

  componentWillMount () {
    super.componentWillMount();
    // initialize
    this.props.txBond.tie(obj => {
      this.currentIndex.changed(0);
    });
    // stack, memory and storage details
    this.vmTrace = new TransformBond(x => processVMTrace(x.vmTrace), [this.props.txBond], []).subscriptable(2);
    this.currentStep = new TransformBond((i, vmTrace) => ({id:i, op:vmTrace.ops[i], info: Instructions[vmTrace.code[vmTrace.ops[i].pc]]}), [this.currentIndex, this.vmTrace], []);
  }

  render () {
    return (
      <Segment padded>
        {this.state && this.state.txBond ?
        <div>
          <Spoiler content='Transaction' disabled={!this.state.txBond.trace}>
            <TxTrace txTrace={this.state.txBond.trace} />
          </Spoiler>
          <Slider currentIndex={this.currentIndex} max={this.vmTrace.ops.length.map(v => v -1)} label='Step'/>
          <Spoiler content='Instructions' disabled={!this.state.txBond}>
            <Instruction vmTrace={this.vmTrace} currentIndex={this.currentIndex} />
          </Spoiler>
          <Spoiler content='Step Detail' disabled={!this.state.txBond}>
            <VmTrace currentStep={this.currentStep}/>
          </Spoiler>
          <Spoiler content='Stack' disabled={!this.state.txBond}>
            <Stack currentStep={this.currentStep}/>
          </Spoiler>
          <Spoiler content='Memory' disabled={!this.state.txBond}>
            <Memory currentStep={this.currentStep}/>
          </Spoiler>
          <Spoiler content='Storage' disabled={!this.state.txBond}>
            <Storage currentStep={this.currentStep} />
          </Spoiler>
          <Spoiler content="StateDiff" disabled={!this.state.txBond.stateDiff}>
            <StateDiff stateDiff={this.state.txBond.stateDiff}/>
          </Spoiler>
        </div>
        : null}
      </Segment>
    )
  }
}

Debugger.defaultProps = {
  defaultStep: 0,
}

Array.prototype.spliceArray = function(index, n, array) {
	return Array.prototype.splice.apply(this, [index, n].concat(array));
}

function preProcess(code) {
  var r = [];
  var c = code.slice(2);
  // convert hex-string to separated array of decimal values
  for (var i=0;i<c.length;i=i+2) {
    r.push(parseInt(c.slice(i,i+2), 16));
  }
  return r;
}

export function processVMTrace(trace) {
  trace.code = preProcess(trace.code);
	var c = trace.code;
	var stack = [];
	var memory = [];
	var storage = {};
	trace.ops = trace.ops.map(function(o) {
		var i = get_info(c[o.pc]);
    if (i) {
      o.pop = stack.splice(-i.args, i.args);
      o.stack = stack.slice();
  		if (o.ex !== null) {
  			o.ex.push.forEach(function(x){ stack.push(x); });
  			if (o.ex.mem !== null) {
  				memory = memory.slice();
  				memory.spliceArray(o.ex.mem.off, o.ex.mem.data.length, o.ex.mem.data);
  			}
  			if (o.ex.store !== null) {
  				storage = Object.assign({}, storage);
  				storage[o.ex.store.key] = o.ex.store.val;
  			}
  		}
  		o.memory = memory;
  		o.storage = storage;
  		return o;
    } else {
      return o;
    }
	});
	return trace;
}
