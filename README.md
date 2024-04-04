# Fingertree JavaScript Implementation

This repository contains a JavaScript implementation of Fingertree, a versatile data structure that supports various operations such as concatenation, splitting, and insertion efficiently. Alongside the implementation of Fingertree, there's also an implementation of a simple text editor, `editingSystem.js`, utilizing Fingertree for efficient text manipulation.

## Getting Started

To use the Fingertree implementation in your project, follow these steps:

1. Clone this repository to your local machine or download the source code.
   
   ```
   git clone https://github.com/your-username/fingertree-js.git
   ```

2. Navigate to the repository directory.

   ```
   cd fingertree-js
   ```

3. Require the `fingertree.js` file in your JavaScript code using:

   ```javascript
   const Fingertree = require('./fingertree.js');
   ```

   Now, you can use the `Fingertree` object in your code to create and manipulate fingertrees.

## Contents

- **fingertree.js**: The core implementation of Fingertree data structure.
- **editingSystem.js**: Implementation of a simple text editor using Fingertree.
- **benchmark.js**: Sample file for benchmarking the performance of Fingertree operations.

## Usage

### Example Usage of Fingertree

```javascript
const Fingertree = require('./fingertree.js');

// Example: Creating a Fingertree with some elements
let tree = Fingertree.fromArray([1, 2, 3, 4, 5]);

// Perform operations on the tree
tree = tree.addLast(6); // Pushing a new element to the end
console.log(tree.peekLast()); // Output: 6

// Perform more operations...
```

### Example Usage of Editing System

```javascript
const FingerTreeEditingSystem = require('./editingSystem.js');

const editor = new FingerTreeEditingSystem();
  editor.insertCharacter({ char: 'H', position: 0 });
  editor.insertCharacter({ char: 'e', position: 1 });
  editor.insertCharacter({ char: 'l', position: 2 });
  editor.insertCharacter({ char: 'l', position: 3 });
  editor.insertCharacter({ char: 'o', position: 4 });
  editor.displayDocument(); // Output: Document: Hello, Cursor Position: 5
//   editor.moveCursorLeft();
  editor.deleteCharacter();
  editor.displayDocument(); // Output: Document: Hell, Cursor Position: 4

// Perform more operations...
```

## Benchmarking

You can use `benchmark.js` to evaluate the performance of Fingertree operations under various scenarios. Refer to the comments within the file for instructions on usage.

## Contribution

Contributions are welcome! Feel free to submit issues or pull requests for bug fixes, improvements, or new features.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.