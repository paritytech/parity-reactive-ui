oo7-react
=========

A small library to provide oo7 (Joint Asynchronous Mapping Expression System)
`Bond`-based Reactive components for Ethereum and Parity.

The reactive components provided are:
#### Account
- `AccountIcon` (an identicon image for a given account);
- `AccountLabel` (a full Semantic UI label for a given account);
- `AccountCard` (a full semantic UI card to display a given account);
- `InlineAccount` (a simple display component for an account designed to flow in text);
- `InlineBalance` (a simple display component for a given accounts balance to flow in text);
#### Transaction
- `SigningButton` (a button which completes a message-signing operation when clicked and displays the progress to the user);
- `SigningProgressLabel` (a full Semantic UI label for displaying the progress of a signing a message);
- `TransactButton` (a button which posts a transaction when clicked and displays the progress to the user);
- `TransactionProgressLabel` (a full Semantic UI label for displaying the progress of a transaction);
- `Transaction` (a simple display of a given transaction with chosen properties);
#### Input
- `BButton` (a Semantic UI derived `Button` that accepts Bonds for certain props);
- `InputBond` (a Semantic UI derived `Input` component that accepts a Bond for its output);
- `AddressBond` (an `InputBond`-like component for addresses);
- `HashBond` (an `InputBond`-like component for 32 byte hashes);
- `URLBond` (an `InputBond`-like component for URLs);
- `MultiInputBond` (an `InputBond`-like component supporting hashes, URLs or string as input type);
- `DropdownBond` (an expendable Semantic UI dropdown search selection with bond support);
- `BalanceBond` (an `InputBond`-like component for balances);
#### Others
- `Block` (a simple display of a given block with chosen properties);
- `QrCode` (a component generating a QrCode for a given value (e.g. AccountAddress))
- `Recognizer` (a component which tries to interpret the given hex-value (decimal, ether value, timestamp address, hash, unkown))
- `Spoiler` (a component to hide/show child components)


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

Further examples as a react component can be found [here](https://github.com/paritytech/parity-reactive-ui/blob/showcases/test/manual/example.jsx) .
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
