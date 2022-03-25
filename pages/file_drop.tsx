import { useCallback } from "react"
import { useDropzone } from "react-dropzone"

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
        <p>Drop the files here ...</p>
      ) : (
        <p>Drop files to convert here ...</p>
      )}
    </div>
  )
}
