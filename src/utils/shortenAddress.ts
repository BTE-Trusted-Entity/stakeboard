export function ShortenAddress(address: string) {
  return `${address.substr(0, 3)}...${address.slice(-3)}`
}
