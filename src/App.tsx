/* eslint-disable jsx-a11y/anchor-is-valid */
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
    <div className="App">
      <h1>Scroll Light Viewer</h1>
      <h3>画像・動画ファイルを縦スクロールして閲覧できます</h3>
      <div id="wrapper">
        <InputFilesArea appendFiles={appendFiles}>
          <ViewFiles files={files} />
        </InputFilesArea>
        <ScrollButton />
      </div>
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
    border: '1px dotted #888',
  };
  const borderDragStyle = {
    border: '1px solid #00f',
    transition: 'border .5s ease-in-out',
    backgroundColor: '#2e2e2e',
    opacity: 0.5,
  };

  return (
    <div {...getRootProps()} id="dragarea" style={isDragActive ? borderDragStyle : borderNormalStyle}>
      <input {...getInputProps()} />
      <button className="c-button" type="button" onClick={open}>
        画像・動画ファイルを選択
      </button>
      {isDragActive ? <p>ここにドラッグ&ドロップ</p> : <p>または画像・動画ファイルをドロップ</p>}
      {children}
    </div>
  );
};

const ViewFiles = ({ files }: { files: Array<MediaFile> }) => {
  const listFiles = files.map((file) => {
    if (file.type === 'video/mp4') {
      // file.nameをkeyにするのはあまりよくない気がしてる
      return (
        <div key={file.name}>
          <video src={file.preview} controls />
        </div>
      );
    }
    return (
      <div key={file.name}>
        <img src={file.preview} />
      </div>
    );
  });

  return <div id="viewer">{listFiles}</div>;
};

const ScrollButton = () => (
  <a href="#" className="btn-circle-border-simple scroll">
    <img src="/top.png" />
  </a>
);

export default App;
