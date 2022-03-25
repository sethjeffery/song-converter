function toArray(collection: HTMLCollectionBase | NodeList) {
  return Array.prototype.slice.call(collection)
}

const childNodesByTagName = (parentNode: Node, tagName: string) => (
  toArray(parentNode.childNodes).filter(node => node.nodeType === Node.ELEMENT_NODE && node.tagName.toLowerCase() === tagName.toLowerCase())
)

const extractLines = (node: Node): string[] => (
  toArray(node.childNodes).filter(node => node.nodeType === Node.TEXT_NODE).map(node => node.nodeValue)
)

function parseOpenLyrics(content: string) {
  const xmlParser = new DOMParser()
  const xmlDoc = xmlParser.parseFromString(content,"text/xml")
  const parsed = {
    title: xmlDoc.getElementsByTagName('title')[0].childNodes[0].nodeValue,
    authors: toArray(xmlDoc.getElementsByTagName('author')).map(author => author.childNodes[0].nodeValue),
    lyrics: toArray(xmlDoc.getElementsByTagName('verse')).map(verse => (
      {
        name: verse.getAttribute('name'),
        lines: extractLines(childNodesByTagName(verse, 'lines')[0]),
        tags: toArray(verse.getElementsByTagName('tag')).map(tag => (
          {
            name: tag.getAttribute('name'),
            lines: extractLines(tag)
          }
        ))
      }
    ))
  }
  console.log(xmlDoc)
  window['parsed'] = [xmlDoc, parsed]

  return parsed
}

export function parser(content: string) {
  if(content.includes('openlyrics.info')) {
    return parseOpenLyrics(content)
  }
}
