/**
 * Instructs the browser to save a plain text file from a string in memory
 * @param filename - The filename to provide for the file
 * @param text - The string text to save in the file
 */
export default function download(filename: string, text: string) {
  var element = document.createElement('a')
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
  element.setAttribute('download', filename)

  element.style.display = 'none'
  document.body.appendChild(element)

  element.click()

  document.body.removeChild(element)
}
