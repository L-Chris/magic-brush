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

interface BaseElementOption {
  type: string;
  x: number;
  y: number;
  shape?: Shape
}

interface TextElementOption extends BaseElementOption {
  type: 'text';
  content: string;
  fontSize?: number;
  fontFamily?: string;
  color?: string;
}

interface ImageElementOption extends BaseElementOption {
  type: 'image';
  url: string;
}

interface QrcodeElementOption extends BaseElementOption {
  type: 'qrcode';
  url: string;
}

type ElementOption = TextElementOption | ImageElementOption | QrcodeElementOption
