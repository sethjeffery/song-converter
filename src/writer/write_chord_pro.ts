import type { Song } from "../../types/song"
import sectionNameLong from "./section_name_long"

const generateTag = (name: string, field?: string) => (
  field ? `{${name}: ${field}}` : ''
)

const generateLyrics = (song: Song) => (
  song.lyrics.map((lyric: { name: string, lines: string[] }) => (
    `\n{c: ${sectionNameLong(lyric.name)}}\n${lyric.lines.join("\n")}`
  ))
)

export default function writeChordPro(song: Song): string {
  return [
    generateTag('title', song.title),
    generateTag('subtitle', song.subtitle),
    generateTag('artist', song.authors.join(', ')),
    generateTag('key', song.key),
    generateTag('tempo', song.tempo),
    ...generateLyrics(song)
  ].filter(item => item).join("\n")
}
