import xmlAsPrettyString from "../xml_as_pretty_string"
import sectionNameShort from "./section_name_short"

function createLyrics(doc: Document, song: any): HTMLElement {
  const lyricsElem = doc.createElement('lyrics')

  song.lyrics.forEach((lyric: { name: string, lines: string[] }) => {
    const lyricElem = doc.createElement('verse')
    lyricElem.setAttribute('name', sectionNameShort(lyric.name))
    appendChildIf(lyricElem, createText(doc, 'lines', lyric.lines.join('<br/>')))
    appendChildIf(lyricsElem, lyricElem)
  })

  return lyricsElem
}

function createText(doc: Document, name: string, text?: string): HTMLElement | undefined {
  if (text) {
    const newElem = doc.createElement(name)
    newElem.innerHTML = text
    return newElem
  }
}

function createTitles(doc: Document, song: any): HTMLElement {
  const titlesElem = doc.createElement('titles')

  appendChildIf(titlesElem, createText(doc, 'title', song.title))
  appendChildIf(titlesElem, createText(doc, 'title', song.subtitle))

  return titlesElem
}

function createAuthors(doc: Document, song: any): HTMLElement | undefined {
  if(song.authors) {
    const authorsElem = doc.createElement('authors')

    song.authors.forEach((author: string) => {
      appendChildIf(authorsElem, createText(doc, 'author', author))
    })

    return authorsElem
  }
}

function createProperties(doc: Document, song: any): HTMLElement {
  const propertiesElem = doc.createElement('properties')

  appendChildIf(propertiesElem, createTitles(doc, song))
  appendChildIf(propertiesElem, createText(doc, 'verseOrder', song.order))
  appendChildIf(propertiesElem, createAuthors(doc, song))

  return propertiesElem
}

function appendChildIf(parent: HTMLElement, child?: HTMLElement) {
  child && parent.appendChild(child)
}

export default function writeOpenLyrics(song: any): string {
  const doc = document.implementation.createDocument('', '', null)
  const songElem = doc.createElement('song')
  songElem.setAttribute('xmlns', 'http://openlyrics.info/namespace/2009/song')
  songElem.setAttribute('version', '0.8')
  songElem.setAttribute('createdIn', 'https://songs.sethjeffery.com')

  appendChildIf(songElem, createProperties(doc, song))
  appendChildIf(songElem, createLyrics(doc, song))

  doc.appendChild(songElem)
  return `<?xml version='1.0' encoding='UTF-8'?>\n${xmlAsPrettyString(doc)}`
}
