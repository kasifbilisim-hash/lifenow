const L = ["0001101", "0011001", "0010011", "0111101", "0100011", "0110001", "0101111", "0111011", "0110111", "0001011"];
const G = ["0100111", "0110011", "0011011", "0100001", "0011101", "0111001", "0000101", "0010001", "0001001", "0010111"];
const R = ["1110010", "1100110", "1101100", "1000010", "1011100", "1001110", "1010000", "1000100", "1001000", "1110100"];
const PARITY = ["LLLLLL", "LLGLGG", "LLGGLG", "LLGGGL", "LGLLGG", "LGGLLG", "LGGGLL", "LGLGLG", "LGLGGL", "LGGLGL"];

/** EAN-13 sağlama basamağı geçerli mi? */
export function isValidEan13(code: string) {
  if (!/^\d{13}$/.test(code)) return false;
  const d = code.split("").map(Number);
  const sum = d.slice(0, 12).reduce((a, n, i) => a + n * (i % 2 ? 3 : 1), 0);
  return (10 - (sum % 10)) % 10 === d[12];
}

function modules(code: string) {
  const d = code.split("").map(Number);
  const par = PARITY[d[0]];
  let bits = "101";
  for (let i = 0; i < 6; i++) bits += (par[i] === "L" ? L : G)[d[i + 1]];
  bits += "01010";
  for (let i = 0; i < 6; i++) bits += R[d[i + 7]];
  return bits + "101";
}

/** Gerçek EAN-13 barkodu (SVG). Geçersiz kodda hiçbir şey çizmez. */
export default function Barcode({ code, label }: { code: string; label?: string }) {
  if (!isValidEan13(code)) return null;
  const bits = modules(code);
  const quiet = 9;
  const W = bits.length + quiet * 2;
  const H = 70;
  const guard = (i: number) => i < 3 || (i >= 45 && i < 50) || i >= 92;
  const bars: React.ReactNode[] = [];
  for (let i = 0; i < bits.length; ) {
    if (bits[i] === "1") {
      let j = i;
      while (j < bits.length && bits[j] === "1" && guard(j) === guard(i)) j++;
      bars.push(<rect key={i} x={quiet + i} y={0} width={j - i} height={guard(i) ? H + 5 : H} />);
      i = j;
    } else i++;
  }
  return (
    <svg viewBox={`0 0 ${W} ${H + 14}`} role="img" aria-label={`${label ?? "EAN-13"} ${code}`} className="h-auto w-full max-w-[240px]">
      <rect width={W} height={H + 14} fill="#fff" />
      <g fill="#111">{bars}</g>
      <g fontSize="9" fontFamily="ui-monospace, Menlo, Consolas, monospace" fill="#111" textAnchor="middle">
        <text x={quiet - 4} y={H + 11}>{code[0]}</text>
        <text x={quiet + 3 + 21} y={H + 11} letterSpacing="1.2">{code.slice(1, 7)}</text>
        <text x={quiet + 50 + 21} y={H + 11} letterSpacing="1.2">{code.slice(7)}</text>
      </g>
    </svg>
  );
}
