export default function sectionNameShort(name: string) {
  return name.toLocaleLowerCase()
    .replace(/^(?:v|coup)[^\d]*(\d?)/, "v$1")
    .replace(/^(?:c|refr)[^\d]*(\d?)/, "c$1")
    .replace(/^p(?!ont)[^\d]*(\d?)/, "p$1")
    .replace(/^b[^\s][^\d]*(\d?)/, "b$1")
    .replace(/^e[^\s][^\d]*(\d?)/, "e$1")
    .replace(/^i[^\s][^\d]*(\d?)/, "i$1")
    .replace(/^(\w)[^\d]+/, "$1")
}
