function HexToRgb(str: string) {
  str = str.replace('#', '');
  const hxs: any = str.match(/../g);
  for (let i = 0; i < 3; i++) hxs[i] = parseInt(hxs[i], 16);
  return hxs;
}

function RgbToHex(a: any, b: any, c: any) {
  const hexs = [a.toString(16), b.toString(16), c.toString(16)];
  for (let i = 0; i < 3; i++) if (hexs[i].length == 1) hexs[i] = '0' + hexs[i];
  return '#' + hexs.join('');
}

export function getDarkColor(color: string, level: number) {
  const rgbc = HexToRgb(color);
  for (let i = 0; i < 3; i++) rgbc[i] = Math.floor(rgbc[i] * (1 - level));
  return RgbToHex(rgbc[0], rgbc[1], rgbc[2]);
}

export function getLightColor(color: string, level: number) {
  const rgbc: any = HexToRgb(color);
  for (let i = 0; i < 3; i++)
    rgbc[i] = Math.floor((255 - rgbc[i]) * level + rgbc[i]);
  return RgbToHex(rgbc[0], rgbc[1], rgbc[2]);
}
