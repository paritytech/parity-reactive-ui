import React from 'react';
import { Bond } from 'oo7';
import { bonds } from 'oo7-parity';
import { Rspan } from 'oo7-react';
import { AccountDropdown, AddressBond, AccountIcon, AccountLabel, InlineAccount, SigningButton, SigningProgressLabel, TransactButton, TransactionProgressLabel,
 				 Transaction, BButton, InputBond, HashBond, URLBond, MultiInputBond, DropdownBond, BalanceBond, Block, InlineBalance, Hash} from '../../src';
import { Button, Divider, Card } from 'semantic-ui-react';


export class Example extends React.Component {
  constructor () {
    super();
    // Input
    this.address = new Bond();
    this.message = new Bond();
    this.hash = new Bond();
    this.url = new Bond();
    this.btnLabel = new Bond();
    this.multi = new Bond();
    this.options = new Bond();

    // Output
    this.me = bonds.me;
    this.txn = bonds.transaction('2310525', 0);
    this.block = bonds.blocks['2310525'];
    this.balance = bonds.balance(this.me);

    this.state = {
      tnx: null,
      sign: null,
    }
  }

  render () {
    return (
      <div>
        <h1> # Accounts </h1>
        <Card.Group itemsPerRow={3}>
          <Card>
           <Card.Content>
             <Card.Header>
               AccountIcon
             </Card.Header>
             <Card.Meta>
               An identicon image for a given account
             </Card.Meta>
             <Card.Description>
               {/* define props */}
             </Card.Description>
           </Card.Content>
           <Card.Content extra>
             <AccountIcon address={this.me} />
           </Card.Content>
         </Card>

           <Card>
            <Card.Content>
              <Card.Header>
                AccountLabel
              </Card.Header>
              <Card.Meta>
                A full Semantic UI label for a given account
              </Card.Meta>
              <Card.Description>
                {/* define props */}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <AccountLabel address={this.me} />
            </Card.Content>
          </Card>

          <Card>
           <Card.Content>
             <Card.Header>
               InlineAccount
             </Card.Header>
             <Card.Meta>
               A simple display component for an account designed to flow in text
             </Card.Meta>
             <Card.Description>
               {/* define props */}
             </Card.Description>
           </Card.Content>
           <Card.Content extra>
             <InlineAccount address={this.me} />
           </Card.Content>
         </Card>

         <Card>
          <Card.Content>
            <Card.Header>
              InlineBalance
            </Card.Header>
            <Card.Meta>
              A simple display component for a given accounts balance to flow in text
            </Card.Meta>
            <Card.Description>
              {/* define props */}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <InlineBalance value={this.balance} />
          </Card.Content>
        </Card>
        </Card.Group>

        <Divider />

        <h1> # Transactions </h1>
        <Card.Group itemsPerRow={3}>
          <Card>
           <Card.Content>
             <Card.Header>
               SigningButton
             </Card.Header>
             <Card.Meta>
               A button which completes a message-signing operation when clicked and displays the progress to the user
             </Card.Meta>
             <Card.Description>
               {/* define props */}
             </Card.Description>
           </Card.Content>
           <Card.Content extra>
             <SigningButton content='Sign' message='MessageToSign' from={bonds.me} onSigned={v => console.log(v)} />
           </Card.Content>
          </Card>

           <Card>
            <Card.Content>
              <Card.Header>
                SigningProgressLabel
              </Card.Header>
              <Card.Meta>
                A full Semantic UI label for displaying the progress of a signing a message
              </Card.Meta>
              <Card.Description>
                {/* define props */}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button
                  content='Show label'
                  onClick={() => this.setState({sign:bonds.sign('MessageToSign', bonds.me)})}
                  style={{marginRight:'15px'}} />
                <SigningProgressLabel value={this.state.sign}></SigningProgressLabel>
            </Card.Content>
          </Card>

          <Card>
           <Card.Content>
             <Card.Header>
               TransactButton
             </Card.Header>
             <Card.Meta>
               A button which posts a transaction when clicked and displays the progress to the user
             </Card.Meta>
             <Card.Description>
               {/* define props */}
             </Card.Description>
           </Card.Content>
           <Card.Content extra>
             <TransactButton content='Transact' tx={{to: this.address, value: 100 * 1e15}} />
           </Card.Content>
         </Card>

         <Card>
          <Card.Content>
            <Card.Header>
              TransactionProgressLabel
            </Card.Header>
            <Card.Meta>
              A full Semantic UI label for displaying the progress of a transaction
            </Card.Meta>
            <Card.Description>
              {/* define props */}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Button
              content='Show label'
              onClick={() => this.setState({tnx:bonds.post({to: this.address, value: 100 * 1e15})})}
              style={{marginRight:'15px'}}/>
            <TransactionProgressLabel value={this.state.tnx} />
          </Card.Content>
        </Card>

        <Card>
         <Card.Content>
           <Card.Header>
             Transaction
           </Card.Header>
           <Card.Meta>
             A simple display of a given transaction with chosen properties
           </Card.Meta>
           <Card.Description>
             {/* define props */}
           </Card.Description>
         </Card.Content>
         <Card.Content extra>
           <Transaction transaction={this.txn} />
         </Card.Content>
       </Card>
      </Card.Group>

      <Divider />

      <h1> # Input</h1>
      <Card.Group itemsPerRow={3}>
        <Card>
         <Card.Content>
           <Card.Header>
             InputBond
           </Card.Header>
           <Card.Meta>
             A Semantic UI derived `Input` component that accepts a Bond for its output
           </Card.Meta>
           <Card.Description>
             {/* define props */}
           </Card.Description>
         </Card.Content>
         <Card.Content extra>
           <InputBond bond={this.message} style={{marginRight:'15px'}} />
           <Rspan>{this.message}</Rspan>
         </Card.Content>
       </Card>

        <Card>
         <Card.Content>
           <Card.Header>
             BButton
           </Card.Header>
           <Card.Meta>
             A Semantic UI derived `Button` that accepts Bonds for certain props
           </Card.Meta>
           <Card.Description>
             {/* define props */}
           </Card.Description>
         </Card.Content>
         <Card.Content extra>
           <InputBond bond={this.btnLabel} placeholder='Buttons label' style={{marginRight:'15px'}} />
           <BButton label={this.btnLabel} content='BoundLabel'/>
         </Card.Content>
        </Card>

         <Card>
          <Card.Content>
            <Card.Header>
              AddressBond
            </Card.Header>
            <Card.Meta>
              An InputBond-like component for addresses
            </Card.Meta>
            <Card.Description>
              {/* define props */}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <AddressBond fluid
              bond={this.address}
              defaultValue='0x00498Cb0BfA2Eb0024fE7c1b93FfEf6bf6A22a0B'
              style={{marginRight:'15px'}} />
            <Rspan>{this.address}</Rspan>
          </Card.Content>
        </Card>

        <Card>
         <Card.Content>
           <Card.Header>
             HashBond
           </Card.Header>
           <Card.Meta>
             An InputBond-like component for hashes
           </Card.Meta>
           <Card.Description>
             {/* define props */}
           </Card.Description>
         </Card.Content>
         <Card.Content extra>
           <HashBond
             bond={this.hash}
             defaultValue='0xc1d39f83fdda25c23600fafa7f10cbed83ad0eea46229c19bf8b9b81a56f0ac8'
             style={{marginRight:'15px'}} />
           <Hash value={this.hash} />
         </Card.Content>
       </Card>

         <Card>
          <Card.Content>
            <Card.Header>
              URLBond
            </Card.Header>
            <Card.Meta>
              An InputBond-like component for URLs
            </Card.Meta>
            <Card.Description>
              {/* define props */}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <URLBond
              bond={this.url}
              defaultValue='https://parity.io/'
              style={{marginRight:'15px'}} />
            <Rspan>{this.url}</Rspan>
          </Card.Content>
        </Card>

        <Card>
         <Card.Content>
           <Card.Header>
             MultiInputBond
           </Card.Header>
           <Card.Meta>
             An `InputBond`-like component supporting hashes, URLs or string as input type
           </Card.Meta>
           <Card.Description>
             {/* define props */}
           </Card.Description>
         </Card.Content>
         <Card.Content extra>
           <MultiInputBond bond={this.multi} type='string' style={{marginRight:'15px'}} />
           <Rspan>{this.multi}</Rspan>
         </Card.Content>
       </Card>

         <Card>
          <Card.Content>
            <Card.Header>
              DropdownBond
            </Card.Header>
            <Card.Meta>
              An expendable Semantic UI dropdown search selection with bond support
            </Card.Meta>
            <Card.Description>
              {/* define props */}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <DropdownBond bond={this.options} options={[{text:'account1', value:'0x00DF5816530400f292CA8d99D2e183C2EF8607c9'},
                                                        {text:'account2', value:'0x00498Cb0BfA2Eb0024fE7c1b93FfEf6bf6A22a0B'}]} />
            <Rspan>{this.options}</Rspan>
          </Card.Content>
        </Card>

        <Card>
         <Card.Content>
           <Card.Header>
             BalanceBond
           </Card.Header>
           <Card.Meta>
             An `InputBond`-like component for balances
           </Card.Meta>
           <Card.Description>
             {/* define props */}
           </Card.Description>
         </Card.Content>
         <Card.Content extra>
           <BalanceBond bond={this.balance} />
         </Card.Content>
       </Card>
      </Card.Group>

      <Divider />
      <h1> # Others</h1>
      <Card.Group itemsPerRow={3}>
        <Card>
         <Card.Content>
           <Card.Header>
             Block
           </Card.Header>
           <Card.Meta>
             A simple display of a given block with chosen properties
           </Card.Meta>
           <Card.Description>
             {/* define props */}
           </Card.Description>
         </Card.Content>
         <Card.Content extra>
           <Block block={this.block} />
         </Card.Content>
       </Card>
      </Card.Group>
      </div>
    )
  }
}
