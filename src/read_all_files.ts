import { FileDetails } from "../types/file_details"
import { parser } from "./parser"

export async function readAllFiles(files: File[]) {
  const promises = []

  for(const file of files) {
    promises.push(new Promise<FileDetails>((resolve) => {
      const reader = new FileReader()
      reader.onload = function () {
        const details = reader.result as string
        resolve({
          name: file.name,
          details,
          parsed: parser(details)
        })
      }
      reader.readAsText(file)
    }))
  }

  return Promise.all(promises)
}
