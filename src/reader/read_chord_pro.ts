import type { Song } from "../../types/song"

const extractTag = (content: string, tag: string) => {
  const matcher = content.match(new RegExp(`{${tag}:\\s*([^\\n}]+?)\\s*}`))
  if (matcher && matcher[1]) return matcher[1]
}

const extractLyrics = (content: string) => {
  const regex = /{(?:c|chorus|start_of_chorus|soc|start_of_verse|sov):\s*([^\n}]+?)\s*}([^${}]+)/g
  let match: RegExpExecArray | null
  const output = []
  while(match = regex.exec(content)) {
    output.push({
      name: match[1] as string,
      lines: match[2].split(/\n/).map(line => line.trim()).filter(line => line)
    })
  }
  return output
}

export default function readChordPro(content: string): Song {
  const parsed = {
    title: extractTag(content, 'title') as string,
    subtitle: extractTag(content, 'subtitle'),
    authors: extractTag(content, 'artist')?.split(/\s*[&,]\s*/) || [],
    key: extractTag(content, 'key'),
    tempo: extractTag(content, 'tempo'),
    lyrics: extractLyrics(content)
  }

  if(process.env.NODE_ENV !== 'production') {
    (window as any)['parsed'] = parsed
    console.log(parsed)
  }

  return parsed
}
