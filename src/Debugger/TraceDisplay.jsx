import React from 'react';
import { ReactiveComponent } from 'oo7-react';
import { bonds } from 'oo7-parity';
import { Bond, TransformBond } from 'oo7';
import { Spoiler, InputBond } from '../';

import { TxTrace, StateDiff, VmTrace, Instruction, Instructions, Slider, Stack, Memory, Storage, get_info } from './';

import { List, Segment } from 'semantic-ui-react';

export default class TraceDisplay extends ReactiveComponent {
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
    this.vmTrace = new TransformBond(x => {
      console.log('txBond returns', x);
      return processVMTrace(x.vmTrace)
    }, [this.props.txBond], []).subscriptable(2);
    this.currentStep = new TransformBond((i, vmTrace) => {
      console.log('vmTrace', vmTrace, 'index', i);
      return vmTrace ? ({id:i, op:vmTrace.ops[i], info: Instructions[vmTrace.code[vmTrace.ops[i].pc]]}) : null
    }, [this.currentIndex, this.vmTrace], []);
  }

  render () {
    console.log('vmTraceRender', this.vmTrace);
    console.log('vmTraceOps', this.vmTrace.ops);
    return (
      <Segment padded>
        {this.state && this.state.txBond ?
        <div>
          {!this.state.txBond.trace ? <i> You did not use the 'trace' option.</i> : null}
          <Spoiler content='Transaction' disabled={!this.state.txBond.trace}>
            <TxTrace txTrace={this.state.txBond.trace} />
          </Spoiler>
          <Slider currentIndex={this.currentIndex} max={this.vmTrace.map(v => v ? v.ops.length -1 : this.currentIndex)} label='Step'/>
          {!this.state.txBond.vmTrace ? <i> You did not use the 'vmTrace' option.</i> : null}
          <Spoiler content='Instructions' disabled={!this.state.txBond.vmTrace}>
            <Instruction vmTrace={this.vmTrace} currentIndex={this.currentIndex} />
          </Spoiler>
          <Spoiler content='Step Detail' disabled={!this.state.txBond.vmTrace}>
            <VmTrace currentStep={this.currentStep}/>
          </Spoiler>
          <Spoiler content='Stack' disabled={!this.state.txBond.vmTrace}>
            <Stack currentStep={this.currentStep}/>
          </Spoiler>
          <Spoiler content='Memory' disabled={!this.state.txBond.vmTrace}>
            <Memory currentStep={this.currentStep}/>
          </Spoiler>
          <Spoiler content='Storage' disabled={!this.state.txBond.vmTrace}>
            <Storage currentStep={this.currentStep} />
          </Spoiler>
          {!this.state.txBond.vmTrace ? <i> You did not use the 'stateDiff' option.</i> : null}
          <Spoiler content="StateDiff" disabled={!this.state.txBond.stateDiff}>
            <StateDiff stateDiff={this.state.txBond.stateDiff}/>
          </Spoiler>
        </div>
        : <i>Trace a contract function.</i>}
      </Segment>
    )
  }
}

TraceDisplay.defaultProps = {
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
  if (trace) {
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
  }
	return trace;
}
