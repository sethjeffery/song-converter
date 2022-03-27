import type { FileDetails } from "../types/file_details"
import readChordPro from "./reader/read_chord_pro"
import readOpenLyrics from "./reader/read_open_lyrics"
import filterPresence from "./filter_presence"

export default function readFile(content: string) {
  if(content.includes('openlyrics.info')) {
    return readOpenLyrics(content)
  }
  if(content.match(/{title: [^\n}]+}/)) {
    return readChordPro(content)
  }
}

function typeFilter<T, R extends T>(a: T[], f: (e: T) => e is R): R[] {
  const r: R[] = []
  a.forEach(e => { if (f(e)) r.push(e) })
  return r
}

export async function readAllFiles(files: File[]) {
  const promises = []

  for(const file of files) {
    promises.push(new Promise<FileDetails | undefined>((resolve) => {
      const reader = new FileReader()
      reader.onload = function () {
        const details = reader.result as string
        const content = readFile(details)
        resolve(content && { name: file.name, content })
      }
      reader.readAsText(file)
    }))
  }

  // return all successful reads
  const allFiles = await Promise.all(promises)
  return filterPresence<FileDetails>(allFiles)
}
