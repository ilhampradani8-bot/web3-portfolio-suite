export type ContractType = "ERC20_TOKEN" | "NFT_COLLECTION" | "STAKING_VAULT" | "CUSTOM_BYTECODE";

export interface ContractDeployParams {
  contractType: ContractType;
  name: string;
  symbol: string;
  initialSupply?: number;
  customBytecode?: string;
  network: "Sepolia" | "Ethereum" | "Polygon";
}

export interface DeployedContractResult {
  contractAddress: string;
  transactionHash: string;
  blockNumber: number;
  contractType: ContractType;
  name: string;
  symbol: string;
  explorerUrl: string;
  timestamp: string;
}
