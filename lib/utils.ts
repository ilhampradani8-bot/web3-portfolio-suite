import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format wallet address e.g. 0x71C765...d897
export function shortenAddress(address: string, chars = 4): string {
  if (!address) return "";
  return `${address.substring(0, chars + 2)}...${address.substring(address.length - chars)}`;
}

// Format Currency USD
export function formatUSD(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: amount > 1000 ? 0 : 2,
  }).format(amount);
}

// Format ETH / Token Amounts
export function formatCrypto(amount: number, symbol = "ETH", decimals = 4): string {
  return `${new Intl.NumberFormat("en-US", {
    maximumFractionDigits: decimals,
  }).format(amount)} ${symbol}`;
}

// Generate deterministic avatar gradient from address
export function getAddressColor(address: string): string {
  if (!address) return "from-purple-500 to-indigo-500";
  const hash = address.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const gradients = [
    "from-purple-600 via-indigo-600 to-blue-600",
    "from-emerald-500 via-teal-600 to-cyan-600",
    "from-amber-500 via-orange-600 to-red-600",
    "from-pink-500 via-rose-600 to-purple-600",
    "from-cyan-500 via-blue-600 to-indigo-600",
  ];
  return gradients[hash % gradients.length];
}
