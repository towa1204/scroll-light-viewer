/* eslint-disable react/jsx-props-no-spreading */
import React, { ReactNode, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './App.css';

type MediaFile = File & { preview: string };

const App = () => {
  const [files, setFiles] = useState<Array<MediaFile>>([]);

  const appendFiles = (acceptedFiles: File[]) => {
    // [...files, ...acceptedFiles] ファイルが追加されるごとにファイルリストを追加
    // Object.assign でFileにFileのURLを含んだpreviewプロパティを追加
    setFiles(
      [...files, ...acceptedFiles].map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  };

  return (
    <div className="App" style={{ height: '100%' }}>
      <h1>Scroll Light Viewer</h1>
      <InputFilesArea appendFiles={appendFiles}>
        <ViewFiles files={files} />
      </InputFilesArea>
    </div>
  );
};

const InputFilesArea = ({
  appendFiles,
  children,
}: {
  appendFiles: (acceptedFiles: File[]) => void;
  children: ReactNode;
}) => {
  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/webp': ['.webp'],
      'video/mp4': ['.mp4'],
    },
    onDrop: (acceptedFiles) => {
      appendFiles(acceptedFiles);
    },
    noClick: true,
  });

  const borderNormalStyle = {
    width: '90%',
    height: '100%',
    margin: '0 auto',
    border: '1px dotted #888',
  };
  const borderDragStyle = {
    width: '90%',
    height: '100%',
    margin: '0 auto',
    border: '1px solid #00f',
    transition: 'border .5s ease-in-out',
    backgroundColor: '#2e2e2e',
    opacity: 0.5,
  };

  return (
    <div {...getRootProps()} style={isDragActive ? borderDragStyle : borderNormalStyle}>
      <input {...getInputProps()} />
      {isDragActive ? <p>ここにドラッグ&ドロップ</p> : <p>画像・動画ファイルをドロップ</p>}
      <button type="button" onClick={open}>
        画像・動画ファイルを選択
      </button>
      {children}
    </div>
  );
};

const ViewFiles = ({ files }: { files: Array<MediaFile> }) => {
  const viewStyle = {
    maxWidth: '100%',
    maxHeight: '100vh',
  };

  const listFiles = files.map((file) => {
    if (file.type === 'video/mp4') {
      // file.nameをkeyにするのはあまりよくない気がしてる
      return (
        <div key={file.name}>
          <video style={viewStyle} src={file.preview} controls />
        </div>
      );
    }
    return (
      <div key={file.name}>
        <img style={viewStyle} src={file.preview} />
      </div>
    );
  });

  return (
    <div id="viewer" style={{ width: '80%', margin: '0 auto' }}>
      {listFiles}
    </div>
  );
};

export default App;
