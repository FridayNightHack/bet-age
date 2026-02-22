export default function truncate(str, max = 14) {
  return str.length > max ? `${str.slice(0, max)}...` : str;
}
