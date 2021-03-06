import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import { readAllFiles } from '../src/read_all_files'
import type { FileDetails } from '../types/file_details'
import FileActions from './file_actions'
import FileDrop from './file_drop'
import Navbar from './navbar'

const Home: NextPage = () => {
  const [inputFiles, setInputFiles] = useState<FileDetails[]>([])

  const handleReceiveFiles = async (files: File[]) => {
    setInputFiles(await readAllFiles(files))
  }

  const handleAddFiles = async (files: File[]) => {
    setInputFiles([...inputFiles, ...await readAllFiles(files)])
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Song Converter</title>
        <meta name="description" content="Convert files from various formats to each other" />
      </Head>

      <Navbar/>
      { inputFiles.length ?
        <FileActions files={inputFiles} onCancel={() => setInputFiles([])} onAddFiles={handleAddFiles} /> :
        <FileDrop onReceiveFiles={handleReceiveFiles}/>
      }
    </div>
  )
}

export default Home
