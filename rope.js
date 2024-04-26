// var FingerTree = require('./fingertree'); // commneted for use in index.html

// Implementation of Rope for a text editor using a finger tree. Functionality of adding and deleting at cursor.

class Rope {

    constructor() {
        this.tree = FingerTree.fromArray([]);
        // this.rightTree = FingerTree.fromArray([]);
        this.cursor = 0;
    }

    incrementCursor() {
        this.cursor++;
    }

    decrementCursor() {
        if (this.cursor === 0) {
        return;
        }
        this.cursor--;
    }
    
    insertCharacter(character) {
        // if (this.cursor === 0) {
        //     this.tree = this.tree.addFirst(character);
        // }
        // else 
        if (this.cursor === this.tree.measure()) {
            this.tree = this.tree.addLast(character);
        }
        else {
            var [left, right] = this.tree.split((m) => m > this.cursor);
            left = left.addLast(character);
            this.tree = left.concat(right);
        }
        this.cursor++;
    }
    
    deleteCharacter() {
        var removedChar;
        if (this.cursor === 0) {
            return;
        }
        else if (this.cursor === 1) {
            removedChar = this.tree.peekFirst();
            this.tree = this.tree.removeFirst();
        }
        else if (this.cursor === this.tree.measure()) {
            removedChar = this.tree.peekLast();
            this.tree = this.tree.removeLast();
        }
        else {
            var [left, right] = this.tree.split((m) => m > this.cursor);
            removedChar = left.peekLast();
            left = left.removeLast();
            this.tree = left.concat(right);
        }
        this.cursor--;
        return removedChar;
    }
    
    printRope() {
        var result = "";
        var newTree = FingerTree.fromArray([]);
        while (this.tree.measure() != 0)
        {
            let item = this.tree.peekFirst();
            this.tree = this.tree.removeFirst();
            // console.log(item, ", ");
            result += item;
            newTree = newTree.addLast(item);
        }
        this.tree = newTree;
        console.log(result);
        return result;
    }

};

// var rope = new Rope();

// rope.insertCharacter('h');
// rope.decrementCursor();
// rope.insertCharacter('e');
// rope.printRope(); // hel1o
// rope.insertCharacter('l');
// rope.printRope(); // hel1o

// rope.incrementCursor();
// rope.insertCharacter('1');
// rope.printRope(); // hel1o
// rope.insertCharacter('o');

// rope.printRope(); // hel1o
