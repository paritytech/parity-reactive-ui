import React from 'react';
import { Bond } from 'oo7';
import { bonds } from 'oo7-parity';
import { Rspan } from 'oo7-react';
import { AccountCard, AccountIcon, AccountLabel, AddressBond, BalanceBond, Block, InlineAccount, SigningButton, SigningProgressLabel, TransactButton, TransactionProgressLabel,
 				 Transaction, BButton, InputBond, HashBond, URLBond, MultiInputBond, DropdownBond, InlineBalance, Hash, Spoiler, Recognizer} from '../';
import { Button, Divider, Card, Table } from 'semantic-ui-react';


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
    this.recognize = new Bond();

    // Output
    this.me = bonds.me;
    this.txn = bonds.transaction('2310525', 0);
    this.block = bonds.blocks['2310525'];
    this.balance = bonds.balance(this.me);
    this.accName = bonds.accountsInfo;

    this.state = {
      tnx: null,
      sign: null,
    }
  }

  render () {
    return (
      <div>
        <i>Note: The components are based on semantic-ui-react and thus support many properties of them. Detailed documentation can be found <a href='https://react.semantic-ui.com/'>here</a>.</i>
        <h1> # Accounts </h1>
        <Spoiler content='Accounts'>
          <Card.Group itemsPerRow={3}>
            <Card>
             <Card.Content>
               <Card.Header>
                 AccountCard
               </Card.Header>
               <Card.Meta>
                 A full semantic UI card to display a given account.
               </Card.Meta>
               <Card.Description>
                 <h1>Props</h1>
                 {renderTable([{name:'account',type:'Bond | Object', description:'The account `address, meta, name and uuid` object to display the AccountCard for.'},
                               {name:'className',type:'Bond | String', description:'Additional classes.'},
                               {name:'hideName',type:'Bond | Boolean', description:'True if no registered name should be shown.', default:'false'},
                               {name:'disabled',type:'Bond | Boolean', description:'True if disabled.', default:'false'}])}
                 {/* <script src="https://gist.github.com/kaikun213/1a58c054fd2b54a104d20024dc53778d.js"></script> */}
               </Card.Description>
             </Card.Content>
             <Card.Content extra>
               <h1>Example</h1>
               <AccountCard account={{address:'0x00DF5816530400f292CA8d99D2e183C2EF8607c9',
     																 meta:{description:"description", passwordHint: "parity", timestamp:1496745328574, tags:['Tag1', 'Tag2']},
     															 	 name:'kaikun213',
     															 	 uuid:'f59f6ae4-a2ef-8fd2-81d5-00aff205c53c'}} />
             </Card.Content>
            </Card>

            <Card>
             <Card.Content>
               <Card.Header>
                 AccountIcon
               </Card.Header>
               <Card.Meta>
                 An identicon image for a given account
               </Card.Meta>
               <Card.Description>
                 <h1>Props</h1>
                 {renderTable([{name:'address',type:'Bond | String', description:'The `address` to display the Icon for.'},
                               {name:'className',type:'Bond | String', description:'Additional classes.', default:'_accountIcon'},
                               {name:'style',type:'Bond | Object', description:'JSX-Style object'},
                               {name:'disabled',type:'Bond | Boolean', description:'True if disabled.'}])}
               </Card.Description>
             </Card.Content>
             <Card.Content extra>
               <h1>Example</h1>
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
                  <h1>Props</h1>
                  {renderTable([{name:'address',type:'Bond | String', description:'The `address` to display the Label for.'},
                                {name:'noicon',type:'Boolean', description:'If `true` the account-icon will be displayed.'}])}
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <h1>Example</h1>
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
                 <h1>Props</h1>
                 {renderTable([{name:'address',type:'Bond | String', description:'The `address` to display the Icon for.'}])}
               </Card.Description>
             </Card.Content>
             <Card.Content extra>
               <h1>Example</h1>
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
                  <h1>Props</h1>
                  {renderTable([{name:'value',type:'Bond | String', description:'The `value` in wei to display.'},
                                {name:'forceSign',type:'Boolean', description:'Force a sign (+|-) for the value.'}])}
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <h1>Example</h1>
                <InlineBalance value={this.balance} />
              </Card.Content>
            </Card>
          </Card.Group>
        </Spoiler>

        <Divider />

        <h1> # Transactions </h1>
        <Spoiler content='Transactions' active={this.state.tnx || this.state.sign}>
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
                 <h1>Props</h1>
                 {renderTable([{name:'icon',type:'Node', description:'Add an Icon by name or props object.'},
                               {name:'primary',type:'Boolean', description:'A button can be formatted to show different levels of emphasis.'},
                               {name:'secondary',type:'Boolean', description:'A button can be formatted to show different levels of emphasis.'},
                               {name:'content',type:'Node', description:'Shorthand for primary content.'},
                               {name:'color',type:'String', description:'A button can have different colors (semantic-ui)'},
                               {name:'onSigned',type:'Func', description:'Called after users signing.'},
                               {name:'statusText',type:'Boolean', description:'StatusText for SigningProgressLabel', default:'false'},
                               {name:'statusIcon',type:'Boolean', description:'StatusIcon for SigningProgressLabel', default:'true'},
                               {name:'colorPolicy',type:'String', description:'SigningProgressLabel color - `button` or `status`', default:'button'},
                               {name:'disabled',type:'Boolean', description:'If `true` the Button is disabled.'}])}
               </Card.Description>
             </Card.Content>
             <Card.Content extra>
               <h1>Example</h1>
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
                  <h1>Props</h1>
                  {renderTable([{name:'value',type:'Bond | Object', description:'Status of the Signing Process. (signing, authorising..)'},
                                {name:'pointing',type:'Boolean', description:'A label can point to content next to it.'},
                                {name:'showIcon',type:'Boolean', description:'Show label icon for the status.', default:'true'},
                                {name:'basic',type:'Boolean', description:'A label can reduce its complexity.'},
                                {name:'color',type:'String', description:'A label can have different colors (semantic-ui)'},
                                {name:'showContent',type:'Boolean', description:'Show text content for status.', default:'true'}])}
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <h1>Example</h1>
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
                 <h1>Props</h1>
                 {renderTable([{name:'tx',type:'Bond | Object', description:'Transaction-Object. Simplest `{to:"0x..", value:100}`'},
                               {name:'content',type:'Bond | Node', description:'Shorthand for primary content.'},
                               {name:'disabled',type:'Bond | Boolean', description:'If `true` the Button is disabled.'},
                               {name:'enabled',type:'Bond | Boolean', description:'If `true` the Button is enabled.'},
                               {name:'positive',type:'Bond | Boolean', description:'A button can hint towards a positive consequence.'},
                               {name:'negative',type:'Bond | Boolean', description:'A button can hint towards a negative consequence.'},
                               {name:'active',type:'Bond | Boolean', description:'A button can show it is currently the active user selection.'},
                               {name:'icon',type:'Node', description:'Add an Icon by name or props object.'},
                               {name:'size',type:'String', description:'A button can have different sizes. (see semantic)'},
                               {name:'floated',type:'String', description:'A button can be aligned to the `left` or `right` of its container.'},
                               {name:'compact',type:'Boolean', description:'A button can reduce its padding to fit into tighter spaces.'},
                               {name:'circular',type:'Boolean', description:'A button can be circular.'},
                               {name:'basic',type:'Boolean', description:'A button can reduce its complexity.'},
                               {name:'attached',type:'string', description:'A button can be attached to the top or bottom of other content. E.g. `left`'},
                               {name:'fluid',type:'Boolean', description:'A button can take the width of its container.'},
                               {name:'primary',type:'Boolean', description:'A button can be formatted to show different levels of emphasis.'},
                               {name:'secondary',type:'Boolean', description:'A button can be formatted to show different levels of emphasis.'},
                               {name:'color',type:'String', description:'A button can have different colors (semantic-ui)'},
                               {name:'statusText',type:'Boolean', description:'StatusText for TransactionProgressLabel', default:'false'},
                               {name:'statusIcon',type:'Boolean', description:'StatusIcon for TransactionProgressLabel', default:'true'},
                               {name:'colorPolicy',type:'String', description:'TransactionProgressLabel color - `button` or `status`', default:'button'}])}
               </Card.Description>
             </Card.Content>
             <Card.Content extra>
               <h1>Example</h1>
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
                <h1>Props</h1>
                {renderTable([{name:'value',type:'Bond | Object', description:'Status of the Signing Process. (signing, authorising..)'},
                              {name:'pointing',type:'Boolean', description:'A label can point to content next to it.'},
                              {name:'showIcon',type:'Boolean', description:'Show label icon for the status.', default:'true'},
                              {name:'basic',type:'Boolean', description:'A label can reduce its complexity.'},
                              {name:'color',type:'String', description:'A label can have different colors (semantic-ui)'},
                              {name:'total',type:'Number', description:'Total steps to complete progress for label details.'},
                              {name:'current',type:'Number', description:'Current step in progress for label details.'},
                              {name:'showContent',type:'Boolean', description:'Show text content for status.', default:'true'}])}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <h1>Example</h1>
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
               {renderTable([{name:'transaction',type:'Bond | Object', description:'The Transaction-Object to display.'},
                             {name:'transactionIndex',type:'Boolean', description:'If `true` displays the property'},
                             {name:'raw',type:'Boolean', description:'If `true` displays the property'},
                             {name:'signature',type:'Boolean', description:'If `true` displays the property'},
                             {name:'publicKey',type:'Boolean', description:'If `true` displays the property'},
                             {name:'nonce',type:'Boolean', description:'If `true` displays the property'},
                             {name:'networkId',type:'Boolean', description:'If `true` displays the property'},
                             {name:'input',type:'Boolean', description:'If `true` displays the property'},
                             {name:'gasPrice',type:'Boolean', description:'If `true` displays the property'},
                             {name:'gas',type:'Boolean', description:'If `true` displays the property'},
                             {name:'creates',type:'Boolean', description:'If `true` displays the property'},
                             {name:'condition',type:'Boolean', description:'If `true` displays the property'},
                             {name:'ether',type:'Boolean', description:'If `true` displays the property'},
                             {name:'to',type:'Boolean', description:'If `true` displays the property'},
                             {name:'from',type:'Boolean', description:'If `true` displays the property'},
                             {name:'txHash',type:'Boolean', description:'If `true` displays the property'},
                             {name:'blockHash',type:'Boolean', description:'If `true` displays the property'},
                             {name:'blockNumber',type:'Boolean', description:'If `true` displays the property'}])}
             </Card.Description>
           </Card.Content>
           <Card.Content extra>
             <h1>Example</h1>
             <Transaction transaction={this.txn} />
           </Card.Content>
         </Card>
        </Card.Group>
      </Spoiler>

      <Divider />

      <h1> # Input</h1>
      <Spoiler content='Input'>
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
               <h1>Props</h1>
               {renderTable([{name:'bond',type:'Bond', description:'Bond which will trigger on input.'},
                             {name:'validator',type:'Func', description:'Validator function. Only if it returns `true` the input is considered valid.'},
                             {name:'disabled',type:'Bond | Boolean', description:'If `true` the Button is disabled.'},
                             {name:'className',type:'Bond | String', description:'Additional classes.'},
                             {name:'style',type:'Bond | Object', description:'JSX-Style object'},
                             {name:'children',type:'Node', description:'Primary content.'},
                             {name:'placeholder',type:'String', description:'Placeholder for the input.'},
                             {name:'fluid',type:'Boolean', description:'An Input can take the width of its container.'},
                             {name:'size',type:'String', description:'An Input can vary in size.. (see semantic)'},
                             {name:'inverted',type:'Boolean', description:'Format to appear on dark backgrounds.'},
                             {name:'loading',type:'Boolean', description:'An Icon Input field can show that it is currently loading data.'},
                             {name:'transparent',type:'Boolean', description:'Transparent Input has no background.'},
                             {name:'defaultValue',type:'String', description:'Default value for initialization.'},
                             {name:'action',type:'String', description:'An Input can be formatted to alert the user to an action they may perform.'},
                             {name:'label',type:'Boolean', description:'Optional Label to display along side the Input.'},
                             {name:'labelPosition',type:'Boolean', description:'A Label can appear outside an Input on the left or right. (semantic-ui)'},
                             {name:'icon',type:'Node', description:'Add an Icon by name or props object.'},
                             {name:'iconPosition',type:'Node', description:'An Icon can appear inside an Input on the `left` or `right`.'}])}
           </Card.Description>
           </Card.Content>
           <Card.Content extra>
             <h1>Example</h1>
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
               <h1>Props</h1>
               {renderTable([{name:'label',type:'Bond | Object', description:'Label for the Button'},
                             {name:'content',type:'Bond | Node', description:'Primary Content.'},
                             {name:'disabled',type:'Bond | Boolean', description:'If `true` disabled.'}])}
            </Card.Description>
           </Card.Content>
           <Card.Content extra>
             <h1>Example</h1>
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
                <h1>Props</h1>
                {renderTable([{name:'bond',type:'Bond', description:'Bond which will trigger on input.'},
                              {name:'validator',type:'Func', description:'Validator function. Only if it returns `true` the input is considered valid.', default:'Address Validation Function'},
                              {name:'labelZIndex',type:'Number', description:'Z-index of label.'},
                              {name:'disabled',type:'Bond | Boolean', description:'If `true` the Button is disabled.'},
                              {name:'className',type:'Bond | String', description:'Additional classes.'},
                              {name:'style',type:'Bond | Object', description:'JSX-Style object'},
                              {name:'children',type:'Node', description:'Primary content.'},
                              {name:'placeholder',type:'String', description:'Placeholder for the input.', default:'0xAddress, name or e-mail'},
                              {name:'fluid',type:'Boolean', description:'An Input can take the width of its container.'},
                              {name:'size',type:'String', description:'An Input can vary in size.. (see semantic)'},
                              {name:'inverted',type:'Boolean', description:'Format to appear on dark backgrounds.'},
                              {name:'loading',type:'Boolean', description:'An Icon Input field can show that it is currently loading data.'},
                              {name:'transparent',type:'Boolean', description:'Transparent Input has no background.'},
                              {name:'defaultValue',type:'String', description:'Default value for initialization.'},
                              {name:'action',type:'String', description:'An Input can be formatted to alert the user to an action they may perform.'},
                              {name:'label',type:'Boolean', description:'Optional Label to display along side the Input.'},
                              {name:'labelPosition',type:'Boolean', description:'A Label can appear outside an Input on the left or right. (semantic-ui)'},
                              {name:'icon',type:'Node', description:'Add an Icon by name or props object.'},
                              {name:'iconPosition',type:'Node', description:'An Icon can appear inside an Input on the `left` or `right`.'}])}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <h1>Example</h1>
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
               <h1>Props</h1>
               {renderTable([{name:'bond',type:'Bond', description:'Bond which will trigger on input.'},
                             {name:'validator',type:'Func', description:'Validator function. Only if it returns `true` the input is considered valid.', default:'Hash Validation Function'},
                             {name:'disabled',type:'Bond | Boolean', description:'If `true` the Button is disabled.'},
                             {name:'className',type:'Bond | String', description:'Additional classes.'},
                             {name:'style',type:'Bond | Object', description:'JSX-Style object'},
                             {name:'children',type:'Node', description:'Primary content.'},
                             {name:'placeholder',type:'String', description:'Placeholder for the input.', default:'0x...'},
                             {name:'fluid',type:'Boolean', description:'An Input can take the width of its container.'},
                             {name:'size',type:'String', description:'An Input can vary in size.. (see semantic)'},
                             {name:'inverted',type:'Boolean', description:'Format to appear on dark backgrounds.'},
                             {name:'loading',type:'Boolean', description:'An Icon Input field can show that it is currently loading data.'},
                             {name:'transparent',type:'Boolean', description:'Transparent Input has no background.'},
                             {name:'defaultValue',type:'String', description:'Default value for initialization.'},
                             {name:'action',type:'String', description:'An Input can be formatted to alert the user to an action they may perform.'},
                             {name:'label',type:'Boolean', description:'Optional Label to display along side the Input.'},
                             {name:'labelPosition',type:'Boolean', description:'A Label can appear outside an Input on the left or right. (semantic-ui)'},
                             {name:'icon',type:'Node', description:'Add an Icon by name or props object.'},
                             {name:'iconPosition',type:'Node', description:'An Icon can appear inside an Input on the `left` or `right`.'}])}
           </Card.Description>
           </Card.Content>
           <Card.Content extra>
             <h1>Example</h1>
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
                <h1>Props</h1>
                {renderTable([{name:'bond',type:'Bond', description:'Bond which will trigger on input.'},
                              {name:'validator',type:'Func', description:'Validator function. Only if it returns `true` the input is considered valid.', default:'URL Validation Function'},
                              {name:'disabled',type:'Bond | Boolean', description:'If `true` the Button is disabled.'},
                              {name:'className',type:'Bond | String', description:'Additional classes.'},
                              {name:'style',type:'Bond | Object', description:'JSX-Style object'},
                              {name:'children',type:'Node', description:'Primary content.'},
                              {name:'placeholder',type:'String', description:'Placeholder for the input.', default:'https://...'},
                              {name:'fluid',type:'Boolean', description:'An Input can take the width of its container.'},
                              {name:'size',type:'String', description:'An Input can vary in size.. (see semantic)'},
                              {name:'inverted',type:'Boolean', description:'Format to appear on dark backgrounds.'},
                              {name:'loading',type:'Boolean', description:'An Icon Input field can show that it is currently loading data.'},
                              {name:'transparent',type:'Boolean', description:'Transparent Input has no background.'},
                              {name:'defaultValue',type:'String', description:'Default value for initialization.'},
                              {name:'action',type:'String', description:'An Input can be formatted to alert the user to an action they may perform.'},
                              {name:'label',type:'Boolean', description:'Optional Label to display along side the Input.'},
                              {name:'labelPosition',type:'Boolean', description:'A Label can appear outside an Input on the left or right. (semantic-ui)'},
                              {name:'icon',type:'Node', description:'Add an Icon by name or props object.'},
                              {name:'iconPosition',type:'Node', description:'An Icon can appear inside an Input on the `left` or `right`.'}])}
            </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <h1>Example</h1>
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
               <h1>Props</h1>
               {renderTable([{name:'bond',type:'Bond', description:'Bond which will trigger on input.'},
                             {name:'type',type:'Bond | String', description:'Type `address`, `hash` or `string` of Input validation.'},
                             {name:'defaultValue',type:'Bond | String', description:'Default value for initialization.'},
                             {name:'disabled',type:'Bond | Boolean', description:'If `true` the Button is disabled.'},
                             {name:'enabled',type:'Bond | Boolean', description:'If `true` the Button is enabled.'},
                             {name:'action',type:'Custom', description:'An Input can be formatted to alert the user to an action they may perform.'},
                             {name:'placeholder',type:'String', description:'Bond which will trigger on input.'}])}
             </Card.Description>
           </Card.Content>
           <Card.Content extra>
             <h1>Example</h1>
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
                <h1>Props</h1>
                {renderTable([{name:'options',type:'Bond | Array', description:'Options for the dropdown-menu.'},
                              {name:'disabled',type:'Bond | Boolean', description:'If `true` the selection is disabled.'},
                              {name:'enabled',type:'Bond | Boolean', description:'If `true` the selection is enabled.'},
                              {name:'additionLabel',type:'Node | String', description:'Label prefixed to an option added by a user.'},
                              {name:'search',type:'Boolean | Func', description:'A selection dropdown can allow a user to search through a large list of choices.Pass a function here to replace the default search.'},
                              {name:'selection',type:'Boolean', description:'A dropdown can be used to select between choices in a form.'},
                              {name:'allowAdditions',type:'Boolean', description:'Allow user additions to the list of options (boolean). Requires the use of `selection`, `options` and `search`.'},
                              {name:'validatorType',type:'String', description:' Type `string`, `address` or `hash` to validate additions.'},
                              {name:'fluid',type:'Boolean', description:'A dropdown can take the full width of its parent'},
                              {name:'multiple',type:'Boolean', description:'A selection dropdown can allow multiple selections.'},
                              {name:'defaultValue',type:'String', description:'Default value on initialization.'}])}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <h1>Example</h1>
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
               <h1>Props</h1>
               {renderTable([{name:'bond',type:'Bond', description:'Bond which will trigger on input.'},
                             {name:'validator',type:'Func', description:'Validator function. Only if it returns `true` the input is considered valid.', default:'Validation function for an ether balance'},
                             {name:'disabled',type:'Bond | Boolean', description:'If `true` the Button is disabled.'},
                             {name:'className',type:'Bond | String', description:'Additional classes.'},
                             {name:'style',type:'Bond | Object', description:'JSX-Style object'},
                             {name:'children',type:'Node', description:'Primary content.'},
                             {name:'placeholder',type:'String', description:'Placeholder for the input.', default:'0'},
                             {name:'fluid',type:'Boolean', description:'An Input can take the width of its container.'},
                             {name:'size',type:'String', description:'An Input can vary in size.. (see semantic)'},
                             {name:'inverted',type:'Boolean', description:'Format to appear on dark backgrounds.'},
                             {name:'loading',type:'Boolean', description:'An Icon Input field can show that it is currently loading data.'},
                             {name:'transparent',type:'Boolean', description:'Transparent Input has no background.'},
                             {name:'defaultValue',type:'String', description:'Default value for initialization.', default:'0'},
                             {name:'action',type:'String', description:'An Input can be formatted to alert the user to an action they may perform.'},
                             {name:'label',type:'Boolean', description:'Optional Label to display along side the Input.'},
                             {name:'labelPosition',type:'Boolean', description:'A Label can appear outside an Input on the left or right. (semantic-ui)'},
                             {name:'icon',type:'Node', description:'Add an Icon by name or props object.'},
                             {name:'iconPosition',type:'Node', description:'An Icon can appear inside an Input on the `left` or `right`.'}])}
             </Card.Description>
           </Card.Content>
           <Card.Content extra>
             <h1>Example</h1>
             <BalanceBond bond={this.balance} />
           </Card.Content>
         </Card>
        </Card.Group>
      </Spoiler>

      <Divider />
      <h1> # Others</h1>
      <Spoiler content='Others'>
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
               <h1>Props</h1>
               {renderTable([{name:'block',type:'Bond | Object', description:'The Block-Object to display.'},
                             {name:'extraData',type:'Boolean', description:'If `true` displays the property'},
                             {name:'gasUsed',type:'Boolean', description:'If `true` displays the property'},
                             {name:'gasLimit',type:'Boolean', description:'If `true` displays the property'},
                             {name:'size',type:'Boolean', description:'If `true` displays the property'},
                             {name:'totalDifficulty',type:'Boolean', description:'If `true` displays the property'},
                             {name:'difficulty',type:'Boolean', description:'If `true` displays the property'},
                             {name:'minerRegistry',type:'Boolean', description:'If `true` displays the property'},
                             {name:'author',type:'Boolean', description:'If `true` displays the property'},
                             {name:'miner',type:'Boolean', description:'If `true` displays the property'},
                             {name:'sha3Uncles',type:'Boolean', description:'If `true` displays the property'},
                             {name:'parentHash',type:'Boolean', description:'If `true` displays the property'},
                             {name:'hash',type:'Boolean', description:'If `true` displays the property'},
                             {name:'transactions',type:'Boolean', description:'If `true` displays the property'},
                             {name:'timestamp',type:'Boolean', description:'If `true` displays the property'},
                             {name:'blockNumber',type:'Boolean', description:'If `true` displays the property'}])}
             </Card.Description>
           </Card.Content>
           <Card.Content extra>
             <h1>Example</h1>
             <Block block={this.block} />
           </Card.Content>
         </Card>
         <Card>
          <Card.Content>
            <Card.Header>
              Spoiler
            </Card.Header>
            <Card.Meta>
              A simple spoiler accepting bonds as children
            </Card.Meta>
            <Card.Description>
              <h1>Props</h1>
              {renderTable([{name:'active',type:'Bond | Boolean', description:'If `true` the children of the spoiler are displayed.'},
                            {name:'children',type:'Bond | Node', description:'Children nodes of the spoiler.'},
                            {name:'content',type:'Node | String', description:'Content of the Spoiler-Button.'},
                            {name:'label',type:'Node | String', description:'Optional label'},
                            {name:'disabled',type:'Boolean', description:'If `true` the spoiler button is disabled.'}])}
          </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <h1>Example</h1>
            <Spoiler content='Spoiler'>{this.block.subscriptable().timestamp.map(t => `Date: ${new Date(t)}`)}</Spoiler>
          </Card.Content>
        </Card>
        <Card>
         <Card.Content>
           <Card.Header>
             Recognizer
           </Card.Header>
           <Card.Meta>
             A component given a hex-value trying to interpret and display it correctly. <br />
             On-click will display the original hex value. <br />
             Interpretation (short): decimal, ether value, timestamp address, hash, unkown.  <br />
           </Card.Meta>
           <Card.Description>
             <h1>Props</h1>
             {renderTable([{name:'value',type:'Bond | String', description:'If `true` the children of the spoiler are displayed.'},
                           {name:'detailedView',type:'Boolean', description:'If `true` the value is displayed in full detail. (original)'},
                           {name:'basic',type:'Boolean', description:'The show-button can have reduced complexity.'},
                           {name:'button',type:'Boolean', description:'If `true` the display will be a styled button.'},
                           {name:'iconButton',type:'Boolean', description:'If `true` the display will be a label of a styled icon button, showing the state of value conversion.'},
                           {name:'size',type:'String', description:'Size of the button. `mini`, ..  `large` (semantic-ui)'},
                           {name:'color',type:'String', description:'A button can have several color types. (semantic-ui)'},
                           {name:'hints',type:'Array', description:'Array to give hints for value interpretation. To interpret a timestamp a hint property must be given in the format of hint=[`timestamp`].Otherwise it is interpreted as decimal or ether.'}])}
         </Card.Description>
         </Card.Content>
         <Card.Content extra>
           <h1>Example</h1>
           <InputBond bond={this.recognize} />
           <Recognizer value={this.recognize.ready() ? this.recognize : '0x81230efeadfb21312213'} />
         </Card.Content>
       </Card>
        </Card.Group>
      </Spoiler>
  </div>
    )
  }
}

function renderTable (props) {
  return <Table compact>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Default</Table.HeaderCell>
        <Table.HeaderCell>Type</Table.HeaderCell>
        <Table.HeaderCell>Description</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {props.map((p,i) => <Table.Row key={i}>
        <Table.Cell>{p.name}</Table.Cell>
        <Table.Cell>{p.default}</Table.Cell>
        <Table.Cell>{p.type}</Table.Cell>
        <Table.Cell>{p.description}</Table.Cell>
      </Table.Row>)}
    </Table.Body>
  </Table>
}
