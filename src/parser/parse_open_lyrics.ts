function toArray(collection: HTMLCollectionBase | NodeList) {
  return Array.prototype.slice.call(collection)
}

const extractLines = (node: Node): string[] => (
  node && toArray(node.childNodes)
    .filter(node => node.nodeType === Node.TEXT_NODE)
    .map(node => node.nodeValue)
)

const extractTags = (doc: Document) => (
  Object.fromEntries(toArray(doc.querySelectorAll('tags > tag'))
    .map(tag => [tag.getAttribute('name'), {
      open: tag.querySelector(':scope > open').textContent,
      close: tag.querySelector(':scope > close').textContent
    }])
  )
)

const extractTitle = (doc: Document) => (
  doc.querySelector('title')?.textContent
)

const extractAuthors = (doc: Document) => (
  toArray(doc.querySelectorAll('author'))
    .map(author => author.textContent)
)

const extractLyrics = (doc: Document) => (
  toArray(doc.querySelectorAll('verse')).map(verse => (
    {
      name: verse.getAttribute('name'),
      lines: extractLines(verse.querySelector(':scope > lines')),
      en: extractLines(verse.querySelector(':scope > lines > tag[name=en]')),
      fr: extractLines(verse.querySelector(':scope > lines > tag[name=fr]')),
      es: extractLines(verse.querySelector(':scope > lines > tag[name=es]'))
    }
  ))
)

const extractVerseOrder = (doc: Document) => (
  doc.querySelector('verseOrder')?.textContent
)

export default function parseOpenLyrics(content: string) {
  const xmlParser = new DOMParser()
  const xmlDoc = xmlParser.parseFromString(content,"text/xml")
  const parsed = {
    title: extractTitle(xmlDoc),
    authors: extractAuthors(xmlDoc),
    tags: extractTags(xmlDoc),
    lyrics: extractLyrics(xmlDoc),
    order: extractVerseOrder(xmlDoc),
  }

  if(process.env.NODE_ENV !== 'production') {
    (window as any)['parsed'] = [xmlDoc, parsed]
    console.log(xmlDoc)
  }

  return parsed
}
