export const fetchImage = (url: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    const img = new Image()

    fetch(url).then(res => res.blob()).then(blob => {
      reader.readAsDataURL(blob)
      reader.onloadend = function() {
        img.src = <string>reader.result
      }

      img.onload = function() {
        resolve(img)
      }
      img.onerror = function(err) {
        reject(err)
      }
    })
  })
}

export const isNumber = (input: any): input is Number => typeof input === 'number'
export const isArray = (input: any): input is Array<any> => input instanceof Array
export const isDefined = (input: any) => input !== undefined && input !== null