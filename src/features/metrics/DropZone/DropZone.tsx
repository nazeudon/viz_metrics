import React from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch } from "react-redux";
import {
  fetchAsyncGetMetrics,
  fetchDeterminePrecisions,
  fetchDetermineRecalls,
} from "../metricsSlice";

const DropZone: React.FC = () => {
  const dispatch = useDispatch();
  const readCSV = (csvdata: any) => {
    const splitData = csvdata.split("\n");
    const data = [];
    for (let i = 0; i < splitData.length; i++) {
      //csvの1行のデータを取り出す
      let rowData = splitData[i];
      data[i] = rowData.split(",");
    }
    return data;
  };

  const bookMetrics = (data: any) => {
    let ids = [];
    let pres = [];
    let recs = [];
    let f1s = [];
    let confs = [];
    for (let i = 1; i < data.length; i++) {
      ids.push(parseInt(data[i][0]));
      pres.push(parseFloat(data[i][3]));
      recs.push(parseFloat(data[i][2]));
      f1s.push(parseFloat(data[i][4]));
      confs.push(parseFloat(data[i][1]));
    }
    return {
      classIds: ids,
      precisions: pres,
      recalls: recs,
      f1s: f1s,
      confidences: confs,
    };
  };

  const dropProcess = (acceptedFiles: any) => {
    const files = acceptedFiles[0]; //ドロップしたファイルを取得
    const reader = new FileReader(); //リーダーインスタンス定義

    reader.readAsText(files); //ファイル読み込み
    reader.onload = async (e) => {
      //処理の実行
      const result = e.target!.result;
      const data = readCSV(result);
      const metrics = bookMetrics(data);
      console.log(metrics);
      await dispatch(fetchAsyncGetMetrics(metrics));
      await dispatch(fetchDeterminePrecisions());
      await dispatch(fetchDetermineRecalls());

      //エラーメッセージ
      reader.onerror = function () {
        alert("エラー：ファイルを読み込めませんでした");
      };
      return metrics;
    };
  };

  const onDrop = (acceptedFiles: any) => {
    // Do something with the files
    dropProcess(acceptedFiles);
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
};

export default DropZone;
