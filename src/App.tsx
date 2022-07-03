import React, {useCallback} from 'react';
import { useDropzone } from 'react-dropzone';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <h1>Scroll Light Viewer</h1>
      <InputFilesArea />
    </div>
  );
}

const InputFilesArea = () => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log('acceptedFiles:', acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

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

export default App;
