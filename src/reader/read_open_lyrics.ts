import type { Song } from '../../types/song'

function toArray(collection: HTMLCollectionBase | NodeList) {
  return Array.prototype.slice.call(collection)
}

const extractLines = (node: Node): string[] => (
  node && toArray(node.childNodes)
    .filter(node => node.nodeType === Node.TEXT_NODE)
    .map(node => node.nodeValue)
)

const extractTags = (doc: Document): { [key:string]: { open: string, close: string } } => (
  Object.fromEntries(toArray(doc.querySelectorAll('tags > tag'))
    .map(tag => [tag.getAttribute('name'), {
      open: tag.querySelector(':scope > open').textContent,
      close: tag.querySelector(':scope > close').textContent
    }])
  )
)

const extractTitle = (doc: Document): string => (
  doc.querySelectorAll('title')[0].innerHTML
)

const extractSubtitle = (doc: Document): string | undefined => (
  doc.querySelectorAll('title')[1]?.innerHTML
)

const extractAuthors = (doc: Document): string[] => (
  toArray(doc.querySelectorAll('author'))
    .map(author => author.textContent)
)

const extractLyrics = (doc: Document) => (
  toArray(doc.querySelectorAll('verse')).map(verse => (
    {
      name: verse.getAttribute('name') as string,
      lines: extractLines(verse.querySelector(':scope > lines')),
      en: extractLines(verse.querySelector(':scope > lines > tag[name=en]')),
      fr: extractLines(verse.querySelector(':scope > lines > tag[name=fr]')),
      es: extractLines(verse.querySelector(':scope > lines > tag[name=es]'))
    }
  ))
)

const extractVerseOrder = (doc: Document): string | undefined => (
  doc.querySelector('verseOrder')?.innerHTML
)

export default function readOpenLyrics(content: string): Song {
  const xmlParser = new DOMParser()
  const xmlDoc = xmlParser.parseFromString(content,"text/xml")
  const parsed = {
    title: extractTitle(xmlDoc),
    subtitle: extractSubtitle(xmlDoc),
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
