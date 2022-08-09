//Driver.js
//Driver code to run the Binary Search Tree script

const Tree = require("./BinarySearchTree");

const randomiser = (num = -50) => {
    const length = Math.floor(Math.random() * 16) + 5;
    return new Array(length).fill(num).map(e => +e + Math.floor(Math.random() * 101));
};

const random = randomiser();
console.log("The initial array is:", random);
const tree = new Tree(random);
console.log("Is the tree balanced:", tree.isBalanced);
console.log("In Order Print:", tree.inorder());
console.log("Pre Order Print:", tree.preOrder);
console.log("Post Order Print:", tree.postOrder);
const unbalancing = randomiser(100);
unbalancing.forEach(e => tree.insert(e));
console.dir(tree, {depth: null});
console.log("Checking for disbalance:", tree.isBalanced());
tree.reBalance();
console.log("Is the tree balanced again:", tree.isBalanced());
console.log("In Order Pring:", tree.inorder());
console.log("Pre Order Print:", tree.preOrder());
console.log("Post Order Print:", tree.postOrder());