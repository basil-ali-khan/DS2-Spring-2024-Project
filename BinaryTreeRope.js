// Maximum number of characters to be put in leaf nodes
const LEAF_LEN = 5;

// Rope node structure
class RopeNode {
    constructor(str = "", left = null, right = null, weight = 0) {
        this.str = str; // String stored in the node
        this.left = left; // Left child node
        this.right = right; // Right child node
        this.weight = weight; // Weight of the left child (number of characters in the left child)
    }
}

// Function to create a rope structure from a string
function createRope(str) {
    if (str.length <= LEAF_LEN) {
        // If the length of the string is less than or equal to LEAF_LEN, create a leaf node
        return new RopeNode(str);
    } else {
        // Otherwise, split the string into two parts and recursively create rope nodes for each part
        const mid = Math.floor(str.length / 2);
        const leftStr = String(str).substring(0, mid);
        const rightStr = String(str).substring(mid);
        const leftNode = createRope(leftStr);
        const rightNode = createRope(rightStr);
        return new RopeNode("", leftNode, rightNode, leftStr.length);
    }
}
// Function to print the string stored in the rope
function printRope(rope) {
    let result = ""; // Initialize an empty string to accumulate the result

    // Helper function to traverse the rope and concatenate strings from leaf nodes
    function traverse(node) {
        if (node === null) {
            return;
        }

        if (node.left === null && node.right === null) {
            // If the node is a leaf node, append its string to the result
            result += node.str;
        } else {
            // Otherwise, recursively traverse its children
            traverse(node.left);
            traverse(node.right);
        }
    }

    // Start traversal from the root of the rope
    traverse(rope);

    // Print the accumulated result
    console.log(result);
}

// Function to split the rope into two ropes at a given index
function splitRope(rope, index) {
    if (index === 0) {
        // If the index is at the beginning, simply return the original rope and an empty rope
        return [null, rope];
    } else if (index >= rope.weight) {
        // If the index is at or beyond the end of the rope, return the original rope and an empty rope
        return [rope, null];
    } else {
        // If the index is within the rope, split it recursively
        const splitNode = splitNodeAt(rope, index);
        return [splitNode.left, splitNode.right];
    }
}

// Helper function to split a node at a given index and return the resulting two nodes
function splitNodeAt(node, index) {
    if (index === 0) {
        // If the index is at the beginning, return an empty node and the original node
        return new RopeNode("", null, node, 0);
    } else if (index >= node.weight) {
        // If the index is at or beyond the end, return the original node and an empty node
        return new RopeNode("", node, null, node.weight);
    } else if (node.left && index < node.left.weight) {
        // If the left child exists and the index is within the left child, recursively split the left child
        const [leftChildLeft, leftChildRight] = splitRope(node.left, index);
        return new RopeNode("", leftChildLeft, new RopeNode("", leftChildRight, node.right, node.right.weight), index);
    } else if (node.right) {
        // If the right child exists and the index is within the right child, recursively split the right child
        const [rightChildLeft, rightChildRight] = splitRope(node.right, index - (node.left ? node.left.weight : 0));
        return new RopeNode("", new RopeNode("", node.left, rightChildLeft, index), rightChildRight, node.right.weight);
    } else {
        // Handle cases where either node.left or node.right is null
        return new RopeNode("", node, null, node.weight);
    }
}

function concatenateRopes(rope1, rope2) {
    // If one of the ropes is empty, return the other rope
    if (rope1 === null) {
        return rope2;
    }
    if (rope2 === null) {
        return rope1;
    }

    // Concatenate the two ropes by creating a new parent node
    const weight = rope1.weight + rope2.weight;
    return new RopeNode("", rope1, rope2, weight);
}

function insertCharacter(rope, index, char) {
    // Split the Rope at the specified index
    const [leftRope, rightRope] = splitRope(rope, index);

    // Create a new Rope for the character to be inserted
    const charRope = new RopeNode(char);

    // Concatenate the left Rope, the Rope containing the character, and the right Rope
    const newRope = concatenateRopes(concatenateRopes(leftRope, charRope), rightRope);

    return newRope;
}

function deleteCharacter(rope, index) {
    // Split the Rope at the specified index
    const [leftRope, rightRope] = splitRope(rope, index);

    // Split the right Rope again to separate the character to be deleted
    const [charRope, remainingRope] = splitRope(rightRope, 1);

    // Concatenate the left Rope and the remaining Rope to remove the character
    const newRope = concatenateRopes(leftRope, remainingRope);

    return newRope;
}


// Example usage:
const inputString = "Welcome to Ad-Duha. We make the best thobes.";
const rope = createRope(inputString);
// console.log(rope); // Print the rope structure

printRope(rope); // rope is the root of the rope structure created earlier

const index = 6; // Example split index
const [rope1, rope2] = splitRope(rope, index);
console.log("Rope 1:");
printRope(rope1);
console.log("Rope 2:");
printRope(rope2);



// Example usage:
// Assuming 'rope1' and 'rope2' are the roots of the two rope structures
const rope_to_concat1 = createRope("Buy our Emirati Maroon thobe at 15% discount today.")
const rope_to_concat2 = createRope("Limited time offer! Order now.");
const rope_concatted = concatenateRopes(rope_to_concat1, rope_to_concat2);
console.log("Concatenated Rope:");
printRope(rope_concatted);

// Example usage for insertion
const indexToInsert = 15; // Index to insert the character
const charToInsert = ' do not'; // Character to insert
rope_after_insert = insertCharacter(rope, indexToInsert, charToInsert);
console.log("Rope after insertion:");
printRope(rope_after_insert); // Print the rope after insertion

const indexToDelete = 10; // Index to delete the character
rope_after_delete = deleteCharacter(rope, indexToDelete);
console.log("Rope after deletion:");
printRope(rope_after_delete); // Print the rope after deletion
