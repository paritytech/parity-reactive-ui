oo7-react
=========

A small library to provide oo7 (Joint Asynchronous Mapping Expression System)
`Bond`-based Reactive components for Ethereum and Parity.

The reactive components provided are:
#### Account
- `AccountIcon` (an identicon image for a given account); <br />
![Showcase AccountIcon](https://github.com/paritytech/parity-reactive-ui/blob/showcases/showcases/Account/AccountIcon.png "Showcase AccountIcon")
- `AccountLabel` (a full Semantic UI label for a given account); <br />
![Showcase AccountLabel](https://github.com/paritytech/parity-reactive-ui/blob/showcases/showcases/Account/AccountLabel.png "Showcase AccountLabel")
- `InlineAccount` (a simple display component for an account designed to flow in text); <br />
![Showcase InlineAccount](https://github.com/paritytech/parity-reactive-ui/blob/showcases/showcases/Account/InlineAccount.png "Showcase InlineAccount")
- `InlineBalance` (a simple display component for a given accounts balance to flow in text);
#### Transaction
- `SigningButton` (a button which completes a message-signing operation when clicked and displays the progress to the user); <br />
![Showcase SigningButton](https://github.com/paritytech/parity-reactive-ui/blob/showcases/showcases/Transaction/SigningButton.png "Showcase SigningButton")
- `SigningProgressLabel` (a full Semantic UI label for displaying the progress of a signing a message); <br />
![Showcase SigningProgressLabel](https://github.com/paritytech/parity-reactive-ui/blob/showcases/showcases/Transaction/SigningProgressLabel.png "Showcase SigningProgressLabel")
- `TransactButton` (a button which posts a transaction when clicked and displays the progress to the user); <br />
![Showcase TransactButton](https://github.com/paritytech/parity-reactive-ui/blob/showcases/showcases/Transaction/TransactButton/authorising.png "Showcase TransactButton")
- `TransactionProgressLabel` (a full Semantic UI label for displaying the progress of a transaction); <br />
![Showcase TransactButton](https://github.com/paritytech/parity-reactive-ui/blob/showcases/showcases/Transaction/TransactionProgressLabel/finalising.png "Showcase TransactButton")
- `Transaction` (a simple display of a given transaction with chosen properties); <br />
![Showcase Transaction](https://github.com/paritytech/parity-reactive-ui/blob/showcases/showcases/Transaction/Transaction.png "Showcase Transaction")
#### Input
- `BButton` (a Semantic UI derived `Button` that accepts Bonds for certain props); <br />
![Showcase BButton](https://github.com/paritytech/parity-reactive-ui/blob/showcases/showcases/Input/BButton.png "Showcase BButton")
- `InputBond` (a Semantic UI derived `Input` component that accepts a Bond for its output); <br />
![Showcase InputBond](https://github.com/paritytech/parity-reactive-ui/blob/showcases/showcases/Input/InputBond.png "Showcase InputBond")
- `AddressBond` (an `InputBond`-like component for addresses); <br />
![Showcase AddressBond](https://github.com/paritytech/parity-reactive-ui/blob/showcases/showcases/Input/AddressBond.png "Showcase AddressBond")
- `HashBond` (an `InputBond`-like component for 32 byte hashes); <br />
![Showcase HashBond](https://github.com/paritytech/parity-reactive-ui/blob/showcases/showcases/Input/HashBond.png "Showcase HashBond")
- `URLBond` (an `InputBond`-like component for URLs); <br />
![Showcase URLBond](https://github.com/paritytech/parity-reactive-ui/blob/showcases/showcases/Input/URLBond.png "Showcase URLBond")
- `MultiInputBond` (an `InputBond`-like component supporting hashes, URLs or string as input type);
- `DropdownBond` (an expendable Semantic UI dropdown search selection with bond support);
- `BalanceBond` (an `InputBond`-like component for balances); <br />
![Showcase BalanceBond](https://github.com/paritytech/parity-reactive-ui/blob/showcases/showcases/Input/BalanceBond.png "Showcase BalanceBond")
#### Others
- `Block` (a simple display of a given block with chosen properties); <br />
![Showcase Block](https://github.com/paritytech/parity-reactive-ui/blob/showcases/showcases/Input/Block.png "Showcase Block")


## Installation

```sh
  npm install parity-reactive-ui --save
```

## Usage

```javascript
  // Assume React is already required.
  var pru = require('parity-reactive-ui'),
      InlineAccount = pru.InlineAccount,
	  oo7parity = require('oo7-parity'),
	  setupBonds = oo7parity.setupBonds;

  // We assume parity has been polluted into the global namespace.
  parity.bonds = setupBonds(parity.api);

  class App extends React.Component {
	  render() {
		  return (<div>
			  Your current address is <InlineAccount address={parity.bonds.me} />.
			</div>);
	  }
  }
```

Further examples as example React Component [here](https://github.com/paritytech/parity-reactive-ui/blob/showcases/test/manual/example.jsx) .
![Showcase Components](https://github.com/paritytech/parity-reactive-ui/blob/showcases/showcases/ExampleComponents.png "Showcase Components")



## Hacking

There are two hacking environment available in this repo:

<details>
	<summary> `npm run watch:dev` # works in the parity dapp environment, no hot reload.</summary>

	Before running the main command, this setup requires exposing the `public` directory as a local dapp:

	`ln -s $PWD/public /path/to/parity/dapps/pruit`

	`Restart parity` and head over to the PRUIT app. This environment is suitable to test any component that interact with the Parity DApp API

</details>

<details>
	<summary> `npm run dev` # works in localhost, has hot reload </summary>

	Go to `localhost:9999`

	This environment is suitable to quick test any parity-reactive-ui components that does not directly interact with the Parity dapp API.

</details>

## Tests

```sh
  npm test
```

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

## Release History

* 0.1.2 Fix issue with Balance.
* 0.1.1 Initial release
