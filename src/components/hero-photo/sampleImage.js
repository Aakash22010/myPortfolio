// Samples an image into a cols×rows grid of brightness values (0–1), or null where the
// pixel is transparent. Brightness is stretched to the photo's own range so the
// portrait keeps contrast regardless of lighting.
export async function sampleImage(src, cols, rows) {
  const img = new Image();
  img.src = src;
  await img.decode();

  const canvas = document.createElement("canvas");
  canvas.width = cols;
  canvas.height = rows;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  ctx.drawImage(img, 0, 0, cols, rows);
  const { data } = ctx.getImageData(0, 0, cols, rows);

  const raw = [];
  let min = 1, max = 0;
  for (let i = 0; i < cols * rows; i++) {
    const [r, g, b, a] = data.slice(i * 4, i * 4 + 4);
    if (a < 40) { raw.push(null); continue; }
    const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
    raw.push(lum);
    min = Math.min(min, lum);
    max = Math.max(max, lum);
  }
  const span = max - min || 1;
  return raw.map((v) => (v === null ? null : Math.pow((v - min) / span, 0.9)));
}

export const PHOTO = "/profile.png";
export const PHOTO_ASPECT = 435 / 377; // height / width
