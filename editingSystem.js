var FingerTree = require('./fingertree.js');

class FingerTreeEditingSystem {
    constructor() {
      // Assume ft is an instance of FingerTree with appropriate methods
    //   this.documentFingerTree = new FingerTree();
      this.documentFingerTree = FingerTree.fromArray([]);
      this.cursorPosition = 0;
    }
  
    // Insert character at cursor position
insertCharacter(char) {
    // Split the finger tree at the cursor position
    var [left, right] = this.documentFingerTree.split((item) => {
      return item.position >= this.cursorPosition;
    });
    
    // Increment position of characters in the right part
    // right.forEach(item => item.position++);
  
    // Add the new character to the left part
    left = left.addLast({ char, position: this.cursorPosition });
  
    // Rejoin the finger tree
    this.documentFingerTree = left.concat(right);
    
    // Move cursor position
    this.cursorPosition++;
  
    // Notify other users about the insertion
    this.syncDocument();
  }
  
  // Delete character at cursor position
  deleteCharacter() {
    if (this.cursorPosition > 0) {
      // Split the finger tree at the cursor position
      var [left, right] = this.documentFingerTree.split((item) => {
        return item.position >= this.cursorPosition;
      });
      
      // Remove the character at cursor position from the left part
      left = left.removeLast();
  
      // Decrement position of characters in the right part
    //   right.forEach(item => item.position--);
  
      // Rejoin the finger tree
      this.documentFingerTree = left.concat(right);
      
      // Move cursor position
      this.cursorPosition--;
  
      // Notify other users about the deletion
      this.syncDocument();
    }
  }
  
    // Move cursor left
    moveCursorLeft() {
      if (this.cursorPosition > 0) { 
        this.cursorPosition--;
      }
    }
  
    // Move cursor right
    moveCursorRight() {
      if (this.cursorPosition < this.documentFingerTree.measure()) {
        this.cursorPosition++;
      }
    }
  
    // Synchronize document changes with other users
    syncDocument() {
      // Send document state to server or other users
    //   console.log("Document synchronized:", this.documentFingerTree.toJSON());
    }
  
    // Display document content
    displayDocument() {
    //   console.log("Document:", this.documentFingerTree.toJSON());
      console.log(this.documentFingerTree.peekFirst());
      console.log(this.documentFingerTree.peekLast());
      console.log("Cursor Position:", this.cursorPosition);
    }
  }
  
  // Example usage
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