import { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { FileDetails } from "../types/file_details"
import Button from "./button"
import Label from "./label"
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faGears } from '@fortawesome/free-solid-svg-icons'
import download from "../src/download"
import convertChordPro from "../src/convert/convert_chord_pro"
import convertOpenLyrics from "../src/convert/convert_open_lyrics"

interface FileActionsArgsInterface {
  files: FileDetails[];
  onCancel: () => void;
  onAddFiles: (a: File[]) => void;
}

export default function FileActions({ onCancel, onAddFiles, files = [] } : FileActionsArgsInterface) {
  const onDrop = useCallback((acceptedFiles: File[]) => onAddFiles(acceptedFiles), [onAddFiles])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  const handleConvertOpenLP = () => {
    files.forEach(file => download(
      file.name.replace(/\.\w+$/, '.xml'),
      convertOpenLyrics(file.parsed)
    ))
  }

  const handleConvertSongBook = () => {
    files.forEach(file => download(
      file.name.replace(/\.\w+$/, '.cho'),
      convertChordPro(file.parsed)
    ))
  }

  return (
    <div className="grid flex-1 w-full justify-center gap-8 p-4 items-stretch grid-cols-1 lg:grid-cols-2">
      <div>
        <Label className="mb-3">Songs</Label>
        <div
          {...getRootProps()}
          className={`border-dashed border-2 p-6 rounded-lg ${isDragActive ? 'border-slate-400' : 'border-[rgba(128,128,128,0.25)]'}`}
        >
          <input {...getInputProps()} />
          <ul className="list-disc space-y-2">
            { files.map((file, index) => (
              <li className="list-item ml-6" key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
        <div className="mt-4">
          <Button variant='secondary' className="text-sm" onClick={onCancel}>
            <Icon icon={faArrowLeft} className="mr-2"/>
            Back
          </Button>
        </div>
      </div>

      <div>
        <Label className="mb-3" fromClass="from-pink-500" toClass="to-purple-400">Actions</Label>
        <div className="space-y-2">
          <div>
            <Button onClick={handleConvertOpenLP}>
              <Icon icon={faGears} className="mr-2"/>
              Convert to OpenLP
            </Button>
          </div>
          <div>
            <Button onClick={handleConvertSongBook}>
              <Icon icon={faGears} className="mr-2"/>
              Convert to SongBook
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
