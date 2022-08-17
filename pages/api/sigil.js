const { sigil, stringRenderer } = require("@tlon/sigil-js");
const { createCanvas, loadImage, Image } = require("canvas");

const foregroundFromBackground = (background) => {
  const rgb = {
    r: parseInt(background.slice(1, 3), 16),
    g: parseInt(background.slice(3, 5), 16),
    b: parseInt(background.slice(5, 7), 16),
  };
  const brightness = (299 * rgb.r + 587 * rgb.g + 114 * rgb.b) / 1000;
  const whiteBrightness = 255;

  return whiteBrightness - brightness < 50 ? "black" : "white";
};

const Sigil = ({ patp, size, color = "#24201E", icon }) => {
  if (patp.length > 14) {
    return <div />;
  }
  const foreground = foregroundFromBackground(color);
  return (
    <div
      className={icon ? "p-1" : ""}
      style={{ backgroundColor: icon ? color || "black" : "transparent" }}
    >
      {sigil({
        patp: patp,
        renderer: stringRenderer,
        size: icon ? size / 2 : size,
        colors: [color, foreground],
        icon: icon || false,
      })}
    </div>
  );
};

export default (req, res) => {
  const foreground = foregroundFromBackground(
    `#${req.query.color || "24201E"}`
  );
  const svg = sigil({
    patp: req.query.patp,
    renderer: stringRenderer,
    size: 1024,
    colors: [`#${req.query.color || "24201E"}`, foreground],
    icon: false,
  });
  const svgDataString = "data:image/svg+xml," + svg;
  const canvas = createCanvas(1024, 1024);
  const ctx = canvas.getContext("2d");
  const canvasImage = new Image();
  canvasImage.src = svgDataString;
  ctx.drawImage(canvasImage, 0, 0);
  const buffer = canvas.toBuffer();
  res.writeHead(200, {
    "Content-Type": "image/png",
    "Content-Length": buffer.length,
  });
  res.end(buffer, "binary");
};
