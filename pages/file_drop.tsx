import { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import Label from "./label"

interface FileDropArgsInterface {
  onReceiveFiles: (a: File[]) => void;
}

export default function FileDrop({ onReceiveFiles }: FileDropArgsInterface) {
  const onDrop = useCallback((acceptedFiles: File[]) => onReceiveFiles(acceptedFiles), [onReceiveFiles])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div
      {...getRootProps()}
      className="flex flex-1 w-full justify-center items-center"
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <Label>Drop your files here</Label>
      ) : (
        <Label>Drop files to convert here</Label>
      )}
    </div>
  )
}
