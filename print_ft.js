// Example usage:
const FingerTree = require('./fingertree.js'); // Adjust the path as needed

// function to print fingertree, 
// runs in O(n) as peekFirst, removeFirst, addLast are all O(1) and being performed n number of times
function printTree (tree)
{
    var result = "";
    var newTree = FingerTree.fromArray([tree.peekFirst()]);
    while (tree.measure() != 0)
    {
        let item = tree.peekFirst();
        tree = tree.removeFirst();
        // console.log(item, ", ");
        result += item + ", ";
        newTree = newTree.addLast(item);
    }
    tree = newTree;
    console.log(result);
} 

var tree = FingerTree.fromArray([]);
printTree(tree); // empty

tree = tree.addFirst('h');
tree = tree.addLast('e');
tree = tree.addLast('l');
tree = tree.addLast('l');
tree = tree.addLast('o');
printTree(tree); // a, b
