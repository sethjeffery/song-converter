import parseChordPro from "./parser/parse_chord_pro"
import parseOpenLyrics from "./parser/parse_open_lyrics"

export function parser(content: string) {
  if(content.includes('openlyrics.info')) {
    return parseOpenLyrics(content)
  }
  if(content.match(/{title: [^\n}]+}/)) {
    return parseChordPro(content)
  }
}
