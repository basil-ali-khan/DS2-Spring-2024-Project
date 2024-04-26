var FingerTree = require('./fingertree');

// Implementation of Rope for a text editor using a finger tree. Functionality of adding and deleting at cursor.

class Rope {

    constructor() {
        this.tree = FingerTree.fromArray([]);
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
        if (this.cursor === 0) {
            this.tree = this.tree.addFirst(character);
        }
        else if (this.cursor === this.tree.measure()) {
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
        if (this.cursor === 0) {
            return;
        }
        else if (this.cursor === 1) {
            this.tree = this.tree.removeFirst();
        }
        else if (this.cursor === this.tree.measure()) {
            this.tree = this.tree.removeLast();
        }
        else {
            var [left, right] = this.tree.split((m) => m > this.cursor);
            left = left.removeLast();
            this.tree = left.concat(right);
        }
        this.cursor--;
    }
    
    printDocument() {
        var result = "";
        var newTree = FingerTree.fromArray([this.tree.peekFirst()]);
        while (this.tree.measure() != 0)
        {
            let item = this.tree.peekFirst();
            this.tree = this.tree.removeFirst();
            // console.log(item, ", ");
            result += item + ", ";
            newTree = newTree.addLast(item);
        }
        this.tree = newTree;
        console.log(result);
    }

};

var rope = new Rope();

rope.insertCharacter('h');
rope.decrementCursor();
rope.insertCharacter('e');
rope.insertCharacter('l');
rope.insertCharacter('1');
rope.insertCharacter('o');

rope.printDocument(); // hel1o