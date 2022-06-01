export const tracePolygon = (ctx, polygon) => {
  ctx.beginPath();
  ctx.moveTo(polygon[0][0], polygon[0][1]);
  for (let i = 1; i < polygon.length; i++) {
    ctx.lineTo(polygon[i][0], polygon[i][1]);
  }
  ctx.closePath();
};

export const traceLine = (ctx, start, end) => {
  ctx.beginPath();
  ctx.moveTo(start[0], start[1]);
  ctx.lineTo(end[0], end[1]);
};

export const traceCircle = (ctx, position, radius) => {
  ctx.beginPath();
  ctx.arc(position[0], position[1], radius, 0, 2 * Math.PI);
}

export const tracePolyLines = (ctx, polyLines) => {
  ctx.beginPath();
  polyLines.forEach(polyLine => {
    ctx.moveTo(polyLine[0][0], polyLine[0][1]);
    for (let i = 1; i < polyLine.length; i++) {
      ctx.lineTo(polyLine[i][0], polyLine[i][1]);
    }
  });
};

export const shade = (ctx, appearance) => {
  const shadowProps = ['shadowBlur', 'shadowColor', 'shadowOffsetX', 'shadowOffsetY'];
  shadowProps.forEach(prop => {
    if (prop in appearance) {
      ctx[prop] = appearance[prop];
    }
  });
};

export const fillAndStroke = (ctx, appearance) => {
  const { fillStyle, strokeStyle, lineWidth } = appearance;

  if (fillStyle) {
    ctx.fillStyle = fillStyle;
    ctx.fill();
  }

  if (strokeStyle && lineWidth) {
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
  }
};

export const toPixels = (width, height, localWidth, localHeight) => (x, y) => {
  return [width / 2 + width * x / localWidth, height / 2 - height * y / localHeight];
};