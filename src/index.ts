import { createPath } from './shape'
import { fetchImage } from './utils'

interface DrawOptions {
  width: number;
  height: number;
  data: ElementOption[];
}

const createTask = (ctx: CanvasRenderingContext2D, option: ElementOption): Promise<CanvasRenderingContext2D> => {
  return new Promise(resolve => {
    if (option.type === 'text') {
      const textAlign = option.textAlign || 'start'
      const textBaseline = option.textBaseline || 'alphabetic'
      const fontSize = option.fontSize || 12
      const fontFamily = option.fontFamily || 'serif'
      const color = option.color || '#000'

      ctx.font = `${fontSize}px ${fontFamily}`
      ctx.textAlign = textAlign
      ctx.textBaseline = textBaseline
      ctx.fillStyle = color
      ctx.fillText(option.data, option.x, option.y,)
      ctx.textAlign

      return resolve(ctx)
    }
    if (option.type === 'image') {
      fetchImage(option.data).then(img => {
        option.shape && createPath(ctx, option.shape)
        ctx.drawImage(img, option.x, option.y)
        resolve(ctx)
      })
      return
    }
    if (option.type === 'circle') {
      createPath(ctx, option)
      return resolve(ctx)
    }
    if (option.type === 'rect') {
      createPath(ctx, option)
      return resolve(ctx)
    }
  })
}

const draw = (options: DrawOptions) => {
  const canvas = document.createElement('canvas')
  const width = options.width
  const height = options.height
  const dpr = window.devicePixelRatio || 1;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`

  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('[Magic-Brush] create canvas context error')

  const taskPromise = options.data.reduce((pre, cur) => pre.then((context) => createTask(context, cur)), Promise.resolve(ctx))

  return taskPromise.then((context) => ({
    toImageElement(type?: string, quality?: any) {
      const img = new Image()
      img.src = canvas.toDataURL(type, quality)
      return img
    },
    toBlob() {
      return new Promise((resolve, reject) => {
        canvas.toBlob(blob => blob === null ? reject(blob) : resolve(blob))
      })
    },
    toImageData: context.getImageData.bind(context),
    toDataURL: canvas.toDataURL.bind(canvas)
  }))
}

const use = (plugin: MagicBrushPlugin) => {
}

export {
  draw,
  use
}
