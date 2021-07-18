interface RectShape {
  type: 'rect'
  r?: number[] | number
  x: number
  y: number
  width: number
  height: number
}

interface CircleShape {
  type: 'circle'
  cx: number
  cy: number
  r: number
}

type Shape = RectShape | CircleShape

interface BaseElement {
  type: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
}

interface TextElement extends BaseElement {
  type: 'text';
  data: string;
  fontSize?: number;
  fontFamily?: string;
  textAlign?: CanvasTextAlign;
  textBaseline?: CanvasTextBaseline;
  color?: string;
}

interface ImageElement extends BaseElement {
  type: 'image';
  data: string;
  shape?: Shape
}

interface QrcodeElement extends BaseElement {
  type: 'qrcode';
  data: string;
  shape?: Shape
}

type ElementOption = TextElement | ImageElement | QrcodeElement | Shape

interface MagicBrushPlugin {}