const generateTag = (name: string, field: string) => (
  field ? `{${name}: ${field}}` : ''
)

const convertSectionName = (name: string) => {
  switch(name.toLowerCase().trim()) {
    case 'v': return 'Verse'
    case 'v1': return 'Verse 1'
    case 'v2': return 'Verse 2'
    case 'v3': return 'Verse 3'
    case 'v4': return 'Verse 4'
    case 'c': return 'Chorus'
    case 'c1': return 'Chorus 1'
    case 'c2': return 'Chorus 2'
    case 'b': return 'Bridge'
    case 'b1': return 'Bridge 1'
    case 'b2': return 'Bridge 2'
    case 'p': return 'Pre-Chorus'
    case 'e': return 'Ending'
    case 'i': return 'Intro'
    default: return name
  }
}

const generateLyrics = (song: any) => (
  song.lyrics.map((lyric: { name: string, lines: string[]}) => (
    `\n{c: ${convertSectionName(lyric.name)}}\n${lyric.lines.join("\n")}`
  ))
)

export default function convertChordPro(song: any): string {
  return [
    generateTag('title', song.title),
    generateTag('subtitle', song.subtitle),
    generateTag('artist', song.authors),
    generateTag('key', song.key),
    generateTag('tempo', song.tempo),
    ...generateLyrics(song)
  ].filter(item => item).join("\n")
}
