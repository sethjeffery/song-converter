const extractTag = (content: string, tag: string) => {
  const matcher = content.match(new RegExp(`{${tag}:\s*([^\n}]+?)\s*}`))
  return matcher && matcher[1]
}

const extractLyrics = (content: string) => {
  const regex = /{(c|chorus|start_of_chorus|soc|start_of_verse|sov):\s*([^\n}]+?)\s*}([^${}]+)/g
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

export default function parseChordPro(content: string) {
  const parsed = {
    title: extractTag(content, 'title'),
    subtitle: extractTag(content, 'subtitle'),
    authors: extractTag(content, 'artist')?.split(/,\s*/),
    key: extractTag(content, 'key'),
    tempo: extractTag(content, 'tempo'),
    lyrics: extractLyrics(content)
  }

  if(process.env.NODE_ENV !== 'production') {
    console.log(parsed)
  }

  return parsed
}
