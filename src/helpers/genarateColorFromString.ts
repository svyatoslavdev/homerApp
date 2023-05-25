export const convertHslToRgb = (
  hue: number,
  saturation: number,
  lightness: number,
) => {
  lightness /= 100;
  const a = (saturation * Math.min(lightness, 1 - lightness)) / 100;

  const f = (n: number) => {
    const k = (n + hue / 30) % 12;
    const color = lightness - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
};

export const converTextToHue = (string: string): number => {
  let hash = 0;

  string.split('').forEach((_, index) => {
    hash = string.charCodeAt(index) + ((hash << 5) - hash);
  });

  const hue = hash % 360;
  return hue;
};

export const generateColorFromString = (
  string: string,
  additionalSaturation: number = 50,
  additionalLightness: number = 30,
): string =>
  convertHslToRgb(
    converTextToHue(string),
    additionalSaturation,
    additionalLightness,
  );
