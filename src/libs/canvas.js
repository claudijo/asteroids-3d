export const trace = (ctx, polygon) => {
  ctx.beginPath();
  ctx.moveTo(polygon[0][0], polygon[0][1]);
  for (let i = 1; i < polygon.length; i++) {
    ctx.lineTo(polygon[i][0], polygon[i][1]);
  }
  ctx.closePath();
}

export const shade = (ctx, appearance) => {
  const shadowProps = ['shadowBlur', 'shadowColor', 'shadowOffsetX', 'shadowOffsetY'];
  shadowProps.forEach(prop => {
    if (prop in appearance) {
      ctx[prop] = appearance[prop];
    }
  })
}

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
}

export const toPixels = (width, height, localWidth, localHeight) => (x, y) => {
  return [width/2 + width * x / localWidth, height/2 - height * y / localHeight];
}