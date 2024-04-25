// // javascript program to concatenate two strings using
// // rope data structure.

// // Maximum no. of characters to be put in leaf nodes
// const LEAF_LEN = 2;

// // Rope structure
// class Rope
// {
// 	constructor(){
// 		this.left = null;
// 		this.right = null;
// 		this.parent = null;
// 		this.str = new Array();
// 		this.lCount = 0;
// 	}
// }

// // Function that creates a Rope structure.
// // node --> Reference to pointer of current root node
// // l --> Left index of current substring (initially 0)
// // r --> Right index of current substring (initially n-1)
// // par --> Parent of current node (Initially NULL)
// function createRopeStructure(node, par, a, l, r)
// {
// 	let tmp = new Rope();
// 	tmp.left = tmp.right = null;

// 	// We put half nodes in left subtree
// 	tmp.parent = par;

// 	// If string length is more
// 	if ((r-l) > LEAF_LEN)
// 	{
// 		tmp.str = null;
// 		tmp.lCount = Math.floor((r-l)/2);
// 		node = tmp;
// 		let m = Math.floor((l + r)/2);
// 		createRopeStructure(node.left, node, a, l, m);
// 		createRopeStructure(node.right, node, a, m+1, r);
// 	}
// 	else
// 	{
// 		node = tmp;
// 		tmp.lCount = (r-l);
// 		let j = 0;
// 		// tmp.str = new Array(LEAF_LEN);
// 		for (let i=l; i<=r; i++){
// 			document.write(a[i]);
// 			tmp.str[j++] = a[i];
// 		}
// 		document.write("\n");
// 	}
	
// 	return node;
// }

// // Function that prints the string (leaf nodes)
// function printstring(r)
// {
// 	if (r==null)
// 		return;
// 	if (r.left==null && r.right==null){
// 		// console.log(r.str);	 
// 	}

// 	printstring(r.left);
// 	printstring(r.right);
// }

// // Function that efficiently concatenates two strings
// // with roots root1 and root2 respectively. n1 is size of
// // string represented by root1.
// // root3 is going to store root of concatenated Rope.
// function concatenate(root3, root1, root2, n1)
// {
// 	// Create a new Rope node, and make root1 
// 	// and root2 as children of tmp.
// 	let tmp = new Rope();
// 	tmp.left = root1;
// 	tmp.right = root2;
// 	root1.parent = tmp;
// 	root2.parent = tmp;
// 	tmp.lCount = n1;

// 	// Make string of tmp empty and update 
// 	// reference r
// 	tmp.str = null;
// 	root3 = tmp;
	
// 	return root3;
// }

// // Driver code
// // Create a Rope tree for first string
// let root1 = null;
// let a = "Hi This is geeksforgeeks. ";
// let n1 = a.length;
// root1 = createRopeStructure(root1, null, a, 0, n1-1);

// // Create a Rope tree for second string
// let root2 = null;
// let b = "You are welcome here.";
// let n2 = b.length;
// root2 = createRopeStructure(root2, null, b, 0, n2-1);

// // Concatenate the two strings in root3.
// let root3 = null;
// root3 = concatenate(root3, root1, root2, n1);

// // Print the new concatenated string
// printstring(root3);
// console.log();

// // The code is contributed by Nidhi goel.

// JavaScript program to concatenate two strings using rope data structure.

// Maximum no. of characters to be put in leaf nodes
const LEAF_LEN = 2;

// Rope structure
class Rope {
    constructor() {
        this.left = null;
        this.right = null;
        this.parent = null;
        this.str = [];
        this.lCount = 0;
    }
}

// Function that creates a Rope structure.
function createRopeStructure(node, par, a, l, r) {
    let tmp = new Rope();
    tmp.left = tmp.right = null;
    tmp.parent = par;

    // If string length is more than LEAF_LEN
    if ((r - l) > LEAF_LEN) {
        tmp.str = null;
        tmp.lCount = Math.floor((r - l) / 2);
        node = tmp;
        let m = Math.floor((l + r) / 2);
        createRopeStructure(node.left, node, a, l, m);
        createRopeStructure(node.right, node, a, m + 1, r);
    } else {
        node = tmp;
        tmp.lCount = (r - l);
        let j = 0;
        for (let i = l; i <= r; i++) {
            // Use console.log() instead of document.write()
            console.log(a[i]);
            tmp.str[j++] = a[i];
        }
        console.log(""); // Print a newline
    }
    return node;
}

// Function that prints the string (leaf nodes)
function printString(r) {
    if (r == null)
        return '';

    if (r.left == null && r.right == null && r.str !== null) {
        // If r is a leaf node and r.str is not null, return the concatenated string
        return r.str.join('');
    }
    
    // Recursively concatenate strings for left and right children
    const leftStr = printString(r.left);
    const rightStr = printString(r.right);

    // Concatenate the strings from left and right children
    return (leftStr + rightStr);
}

// Function that efficiently concatenates two strings
function concatenate(root3, root1, root2, n1) {
    let tmp = new Rope();
    tmp.left = root1;
    tmp.right = root2;
    root1.parent = tmp;
    root2.parent = tmp;
    tmp.lCount = n1;
    tmp.str = null;
    root3 = tmp;
    return root3;
}

// Driver code
// Create a Rope tree for first string
let root1 = null;
let a = "Welcome to Ad-Duha Clothing.";
let n1 = a.length;
root1 = createRopeStructure(root1, null, a, 0, n1 - 1);

// Create a Rope tree for second string
let root2 = null;
let b = "We make the best thobes.";
let n2 = b.length;
root2 = createRopeStructure(root2, null, b, 0, n2 - 1);

// // Concatenate the two strings into root3
let root3 = null;
root3 = concatenate(root3, root1, root1, n1);

// Print the concatenated string
printString(root3);
