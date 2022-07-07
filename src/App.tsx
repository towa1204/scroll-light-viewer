import React, {useState, useCallback} from 'react';
import { useDropzone } from 'react-dropzone';
import './App.css';

const App = () => {
  const [files, setFiles] = useState<Array<File & {preview: string}>>([]);

  const appendFiles = (acceptedFiles: File[]) => {
    // [...files, ...acceptedFiles] ファイルが追加されるごとにファイルリストを追加
    // Object.assign でFileにFileのURLを含んだpreviewプロパティを追加
    setFiles([...files, ...acceptedFiles].map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    })))
  }

  return (
    <div className="App">
      <h1>Scroll Light Viewer</h1>
      <InputFilesArea appendFiles={appendFiles} />
      <ViewFilesName files={files} />
    </div>
  );
}

const InputFilesArea = (props: {appendFiles: (acceptedFiles: File[]) => void}) => {

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/webp': ['.webp'],
      'video/mp4': ['.mp4']
    },
    onDrop: acceptedFiles => {
      props.appendFiles(acceptedFiles)
    } 
  });

  const style = {
    width: 400,
    height: 300,
    margin: "0 auto",
    border: "1px dotted #888"
  };

  return (
    <div {...getRootProps()} style={style}>
      <input {...getInputProps()} />
      {
          isDragActive ?
              <p>ここにドラッグ&ドロップ</p> :
              <p>画像・動画ファイルをドロップ</p>
      }
    </div>
  );
}

const viewStyle = {
  maxWidth: "100%",
};

const viewer = {
  width: "80%",
  margin: "0 auto",
};

const ViewFilesName = (props: {files: Array<File & {preview: string}>}) => {
  const listFiles = props.files.map((file, index) => {
    if (file.type === "video/mp4") {
      return <div key={index} ><video style={viewStyle} src={file.preview} controls /></div>
    }
    return <div key={index} ><img style={viewStyle} src={file.preview} /></div>
  });
  return (
    <div id="viewer" style={viewer}>{listFiles}</div>
  );
}

export default App;
