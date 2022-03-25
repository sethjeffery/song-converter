import { FileDetails } from "../types/file_details"

interface FileActionsArgsInterface {
  files: FileDetails[];
  onCancel: () => void
}

export default function FileActions({ onCancel, files } : FileActionsArgsInterface) {
  return (
    <div className="flex-1 w-full justify-center p-4 flex items-stretch">
      <div className="flex-1">
        <div className="text-xl mb-2">Songs</div>
        <ul className="list-disc space-y-2">
          { files.map((file, index) => (
            <li className="list-item ml-6" key={index}>{file.name}</li>
          ))}
        </ul>
      </div>

      <div className="flex-1">
        <div className="text-xl mb-2">Actions</div>
        <div className="space-y-2">
          <button onClick={onCancel} className="border-[rgba(255,255,255,0.5)] border-[1px] rounded px-4 py-2 text-sm">Cancel</button>
        </div>
      </div>
    </div>
  )
}
