import crypto from "crypto";

interface BlockShape {
    hash: string;
    prevHash: string;
    height: number;
    data: string;
}

class Block implements BlockShape {
    public hash: string;
    constructor(
        public prevHash: string,
        public height: number,
        public data: string
    ) {
        this.hash = Block.calculateHash(prevHash, height, data);
    }

    static calculateHash(prevHash: string, height: number, data: string) {
        const key = `${prevHash}${height}${data}}`
        return crypto.createHash("sha256").update(key).digest("hex")
    }
}

class BlockChain {
    private blocks: Block[];
    constructor() {
        this.blocks = [];
    }
    private getPrevHash() {
        if (this.blocks.length === 0) return "";
        return this.blocks[this.blocks.length - 1].hash;
    }
    public addBlock(data: string) {
        const block = new Block(
            this.getPrevHash(), 
            this.blocks.length + 1, 
            data);
        this.blocks.push(block)
    }
    public getBlocks() {
        return [...this.blocks];
    }
}

const blockchain = new BlockChain();

blockchain.addBlock("first")
blockchain.addBlock("second")
blockchain.addBlock("third")

console.log(blockchain.getBlocks());