import Color from "colorjs.io";

const colors = {
  brand: "#f97316",
  surface: "#fafafa",
  ink: "#171717",
  brand10: "#f973161a",
  brand20: "#f9731633",
};

for (const [name, hex] of Object.entries(colors)) {
  const c = new Color(hex);
  const oklch = c.to("oklch");
  const alpha = oklch.alpha !== undefined && oklch.alpha !== 1 ? ` / ${oklch.alpha}` : "";
  console.log(`${name}: oklch(${oklch.coords[0].toFixed(3)} ${oklch.coords[1].toFixed(3)} ${oklch.coords[2].toFixed(3)}${alpha});`);
}
