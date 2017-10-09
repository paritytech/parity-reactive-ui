import {ReactiveComponent} from 'oo7-react';
import {bonds} from 'oo7-parity';
import {Popup, Image} from 'semantic-ui-react';
import React from 'react';

export class CoinList extends ReactiveComponent{
  constructor(){
    super(['tokens']);
  }
  render(){
    if(typeof this.state.tokens == "undefined" || this.state.tokens.length == 0) return <span>-</span>
    return (<div style={{display: 'inline-block', backgroundColor:'#e2e2e2',padding:'10px',borderRadius: '10px'}}>
      {this.state.tokens.map((elem)=>{
        return (<CoinIcon
          key={elem.name}
          src={bonds.githubhint.entries(elem.img).map((imgObj)=>{
            console.log(imgObj[0]);
            return imgObj[0]
          })}
          balance={elem.balance.toString()}
          tla={elem.tla}
          name={elem.name}
         />);
      })}
    </div>);
  }
}

class CoinIcon extends ReactiveComponent{
  constructor(){
    super(['balance','src','tla','name'])
  }
  render(){
    const { src, tla, name, balance } = this.state;
    return (<div style={{display: 'inline-block'}}>
      <Popup
        key={tla}
        trigger={<Image
          style={{width: '40px',height:'40px'}}
          src={src}>
          </Image>}
        header={name}
        content={balance}
      />
    </div>);
  }
}
