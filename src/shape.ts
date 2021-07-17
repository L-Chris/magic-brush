import { isNumber, isArray, isDefined } from './utils';

function createCirclePath(ctx: CanvasRenderingContext2D, shape: CircleShape) {
  ctx.arc(shape.cx, shape.cy, shape.r, 0, 2 * Math.PI);
  return ctx;
}

function createRectPath(ctx: CanvasRenderingContext2D, shape: RectShape) {
  let { x, y, width, height, r } = shape;
  if (!r) {
    ctx.rect(x, y, width, height);
  } else {
    let r1 = 0;
    let r2 = 0;
    let r3 = 0;
    let r4 = 0;
    if (isNumber(r)) {
      r1 = r2 = r3 = r4 = r;
    } else if (isArray(r)) {
      r1 = r[0];
      r2 = isDefined(r[1]) ? r[1] : r1;
      r3 = isDefined(r[2]) ? r[2] : r1;
      r4 = isDefined(r[3]) ? r[3] : r2;
    }

    ctx.moveTo(x + r1, y);
    ctx.lineTo(x + width - r2, y);
    r2 !== 0 && ctx.arc(x + width - r2, y + r2, r2, -Math.PI / 2, 0);
    ctx.lineTo(x + width, y + height - r3);
    r3 !== 0 && ctx.arc(x + width - r3, y + height - r3, r3, 0, Math.PI / 2);
    ctx.lineTo(x + r4, y + height);
    r4 !== 0 && ctx.arc(x + r4, y + height - r4, r4, Math.PI / 2, Math.PI);
    ctx.lineTo(x, y + r1);
    r1 !== 0 && ctx.arc(x + r1, y + r1, r1, Math.PI, Math.PI * 1.5);
  }
}

export const createPath = (ctx: CanvasRenderingContext2D, shape: Shape) => {
  if (shape.type === 'circle') {
    createCirclePath(ctx, shape);
  } else if (shape.type === 'rect') {
    createRectPath(ctx, shape);
  }
  ctx.clip();
};
