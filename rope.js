const LEAF_LEN = 1;

class RopeNode {
    constructor(str = "", left = null, right = null, weight = 0) { ///assign null
        this.str = str;
        this.left = left;
        this.right = right;
        this.weight = weight;
    }

    // Function to split the rope into two ropes at a given index
    // splitRope(index) {
    //     if (index === 0) {      
    //         return [null, this];   //left node empty   
    //     } else if (index >= this.weight) {
    //         return [this, null];  // right node empty 
    //     } else {
    //         const splitNode = this._splitNodeAt(index);
    //         return [splitNode.left, splitNode.right];
    //     }
    // }
    splitRope(index) {
        if (this === null) {
            // If the current node is null, return two null nodes
            return [null, null];
        } else if (index === 0) {      
            return [null, this];   // Left node empty   
        } else if (index >= this.weight) {
            return [this, null];  // Right node empty 
        } else {
            const splitNode = this._splitNodeAt(index);
            return [splitNode.left, splitNode.right];
        }
    }
    
    // Function to concatenate two ropes
    concatenateRopes(rope2) {
        if (this === null) {
            return rope2; //if one is null then return the other on 
        }
        if (rope2 === null) { 
            return this;
        }
        const weight = this.weight + rope2.weight;
        return new RopeNode("", this, rope2, weight); // new rope ,, current as the left child 
    }

    // Function to insert a character into a rope at a specified index
    insertCharacter(index, char) {
        const [leftRope, rightRope] = this.splitRope(index);
        const charRope = new RopeNode(char);
        return leftRope.concatenateRopes(charRope).concatenateRopes(rightRope);
    }

    // Function to delete a character from a rope at a specified index
    // deleteCharacter(index) {
    //     const [leftRope, rightRope] = this.splitRope(index);
    //     const [charRope, remainingRope] = rightRope.splitRope(1);
    //     return leftRope.concatenateRopes(remainingRope);
    // }
    
    deleteLastCharacter() {
        // If the rope is a leaf node, delete the character directly
        if (this.left == null && this.right == null) {
            // If the rope has only one character, return an empty rope
            if (this.str.length === 1) {
                return null;
            }
            // Otherwise, remove the last character
            this.str = this.str.slice(0, -1);
            return this;
        }
    
        // If the rope is not a leaf node, recursively delete the last character
        if (this.right != null) {
            this.right = this.right.deleteLastCharacter();
        } else if (this.left != null) {
            this.left = this.left.deleteLastCharacter();
        }
    
        // Return the updated rope
        return this;
    }
    // Helper function to split a node at a given index and return the resulting two nodes
    _splitNodeAt(index) {
        if (index === 0) {
            return new RopeNode("", null, this, 0);
        } else if (index >= this.weight) {
            return new RopeNode("", this, null, this.weight);
        } else if (this.left && index < this.left.weight) {
            const [leftChildLeft, leftChildRight] = this.left.splitRope(index);
            return new RopeNode("", leftChildLeft, new RopeNode("", leftChildRight, this.right, this.right.weight), index);
        } else if (this.right) {
            const [rightChildLeft, rightChildRight] = this.right.splitRope(index - (this.left ? this.left.weight : 0));
            return new RopeNode("", new RopeNode("", this.left, rightChildLeft, index), rightChildRight, this.right.weight);
        } else {
            return new RopeNode("", this, null, this.weight);
        }
    }
}

// Function to create a rope structure from a string
function createRope(str) {
    if (str.length <= LEAF_LEN) {
        return new RopeNode(str);
    } else {
        const mid = Math.floor(str.length / 2);
        const leftStr = str.substring(0, mid);
        const rightStr = str.substring(mid);
        const leftNode = createRope(leftStr);
        const rightNode = createRope(rightStr);
        return new RopeNode("", leftNode, rightNode, leftStr.length);
    }
}

// Function to print the string stored in the rope
function printRope(rope) {
    let result = "";
    function traverse(node) {
        if (node === null) {
            return;
        }
        if (node.left === null && node.right === null) {
            result += node.str;
        } else {
            traverse(node.left);
            traverse(node.right);
        }
    }
    traverse(rope);
    console.log(result);
}

// const inputString = "Welcome to Ad-Duha. We make the best thobes.";
// let rope = createRope(inputString);
// console.log("Original Rope:");
// printRope(rope);

// const indexToInsert = 9; // Index to insert the character
// const charToInsert = 'd'; // Character to insert
// rope = rope.insertCharacter(indexToInsert, charToInsert);
// console.log("Rope after insertion:");
// printRope(rope);

// const indexToDelete = 10; // Index to delete the character
// rope = rope.deleteCharacter(indexToDelete);
// console.log("Rope after deletion:");
// printRope(rope);

var rope = createRope("");
var index = 1;
rope = rope.insertCharacter(index, "h");
index++;
rope = rope.insertCharacter(index, "e");
index++;
rope = rope.insertCharacter(index, "l");
index++;
rope = rope.insertCharacter(index, "l");
index++;

// deletion
index=index-1;

rope = rope.deleteCharacter(index);


printRope(rope);
