import React, {useState, useCallback} from 'react';
import { useDropzone } from 'react-dropzone';
import './App.css';

const App = () => {
  const [files, setFiles] = useState<File[]>([]);
  return (
    <div className="App">
      <h1>Scroll Light Viewer</h1>
      <InputFilesArea setFiles={(acceptedFiles: File[]) => {setFiles([...files, ...acceptedFiles])}} />
      <ViewFilesName files={files} />
    </div>
  );
}

const InputFilesArea = (props: {setFiles: (acceptedFiles: File[])=> void}) => {

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop: acceptedFiles => {props.setFiles(acceptedFiles)} });

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


const ViewFilesName = (props: {files: File[]}) => {
  const listFiles = props.files.map((file, index) =>
    <li key={index}>{file.name}</li>
  );
  return (
    <ul>{listFiles}</ul>
  );
}

export default App;
