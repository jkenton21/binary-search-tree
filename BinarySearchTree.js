//BinarySearchTree.js
// Binary Search Tree Data structure practice

class Node {
    constructor(data = null, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

class Tree {
    constructor(array) {
        this.root = this.buildTree(array);
    }

    //Functions for building the balanced Tree
    buildTree = (array, start, end) => {
        if (start > end) {
            return null;
        }
        var mid = parseInt((start + end) / 2);
        var node = new Node(array[mid]);
        node.left = buildTree(array, start, mid - 1);
        node.right = buildTree(array, mid + 1, end);
        return node;
    }

    insert = (value) => {
        const newNode = new Node(value);
        if (this.root === null) {
            this.root = newNode;
        } else {
            let base = this.root;
            while (base !== null) {
                if (base.data > value) {
                    if (base.left === null) {
                        base.left = newNode;
                        return;
                    }
                    base = base.left;
                } else {
                    if (base.right === null) {
                        base.right = newNode;
                        return;
                    }
                    base = base.right;
                }
            }
        }
    }

    delete = (value) => {
        if (this.root === null) throw new Error("This Binary Tree is empty");
        if (this.root.left === null && this.root.right === null) {
            if (!(this.root.data === value)) {
                throw new Error("No element with such a value was found");
            }
            this.root = null;
            return;
        }

        let parent = null;
        let node = this.root;

        while (node !== null && node.data !== value) {
            parent = node;
            node = node.data > value ? node.left : node.right;
        }
        if (node === null) {
            throw new Error("No element with such a value was found.");
        }
        if (node.left === null && node.right === null) {
            if (node === parent.left) {
                parent.left = null;
            } else {
                parent.right = null;
            }
        }
        if (node.left === null || node.right === null) {
            if (parent === null) {
                this.root = this.root.left || this.root.right;
                return;
            }
            if (node === parent.left) {
                parent.left = node.left || node.right;
            } else {
                parent.right = node.left || node.right;
            }
        }
        if (node.left && node.right) {
            let parentOfSuc = node;
            let suc = node.right;
            while (suc.left !== null) {
                parentOfSuc = suc;
                suc = suc.left;
            }
            if (suc === parentOfSuc.left) {
                parentOfSuc.left = suc.right;
            } else {
                parentOfSuc.right = suc.right;
            }
            node.data = suc.data;
        }
    }

    find = (value) => {
        if (this.root === null) throw new Error("This Binary tree is empty");
        let base = this.root;
        while (base !== null && base.data !== value) {
            base = value < base.data ? base.left : base.right;
        }
        return base;
    }

    levelOrder = (operate) => {
        if (this.root === null) throw new Error("This Binary tree is empty");
        const queue = [this.root];
        while (queue.length > 0) {
            const node = queue.shift();
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
            operate(node);
        }
    }

    inorder = (operate) => {
        const result = [];
        if (this.root === null) throw new Error("This Binary tree is empty");
        const queue = [];
        let base = this.root;
        while (base !== null || queue.length > 0) {
            if (base !== null) {
                queue.push(base);
                base = base.left;
            } else {
                base = queue.pop();
                if (operate) operate(base);
                result.push(base.data);
                base = base.right;
            }
        }
        if (!operate) return result;
    }

    preOrder = (operate) => {
        const result = [];
        if (this.root === null) throw new Error("This Binary tree is empty");
        const queue = [this.root];
        while (queue.length > 0) {
            const base = queue.pop();
            if (operate) operate(base);
            result.push(base.data);
            if (base.left) {
                queue.push(base.left);
            }
            if (base.right) {
                queue.push(base.right);
            }
        }
        if (!operate) return result;
    }

    postOrder = (operate) => {
        const result = [];
        if (this.root === null) throw new Error("This Binary tree is empty");
        const queue = [this.root];
        while (queue.length > 0) {
            const base = queue.pop();
            if (base.left) {
                queue.push(base.left);
            }
            if (base.right) {
                queue.push(base.right);
            }
            if (operate) operate(base);
            result.unshift(base.data);
        }
        if (!operate) return result;
    }

    height = (node) => {
        if (this.root === null) return -1;
        const findNode = this.find(node);
        return this.wholeHeight(findNode) -1;
    }

    wholeHeight = (node) => {
        if (node === null) return 0;
        const queue = [node];
        let h = 0;
        for (;;) {
            let level = queue.length;
            if (level === 0) return h;
            h++;
            while (level > 0) {
                const newNode = queue.shift();
                if (newNode.left !== null) queue.push(newNode.left);
                if (newNode.right !== null) queue.push(newNode.right);
                level --;
            }
        }
    }

    depth = (node) => {
        if (this.root === null) return -1;
        let base = this.root;
        let depth = 0;
        while (base !== node || base === null) {
            base = node.data < base.data ? base.left : base.right;
            depth++;
        }
        return base === node ? depth : -1;
    }

    isBalanced = () => {
        if (this.root === null) return true;
        const array = new Array(this.inorder().length);
        let i = 0;
        this.levelOrder(node => {
            const lsub = this.wholeHeight(node.left);
            const rsub = this.wholeHeight(node.right);
            array[i] = Math.abs(lsub - rsub) <= 1;
            i++;
        });
        return array.reduce((p, n) => p && n);
    }

    reBalance() {
        if (this.root === null) return;
        const arr = [...new Set(this.inorder().sort((a, b) => a - b))];
        this.root = this.buildTree(arr);
    }
};