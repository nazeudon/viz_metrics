import React from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAsyncGetMetrics,
  fetchDeterminePrecisions,
  fetchDetermineRecalls,
  fetchDetermineF1s,
  fetchDetermineConfidences,
  fetchExtractPrecision,
  fetchExtractRecall,
  fetchExtractF1,
  fetchExtractIndex,
  selectIndex,
} from "../metricsSlice";
import styles from "./DropZone.module.css";

const DropZone: React.FC = () => {
  const dispatch = useDispatch();
  const index = useSelector(selectIndex);
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
      await dispatch(fetchAsyncGetMetrics(metrics));
      await dispatch(fetchDeterminePrecisions());
      await dispatch(fetchDetermineRecalls());
      await dispatch(fetchDetermineF1s());
      await dispatch(fetchDetermineConfidences());
      await dispatch(fetchExtractIndex());
      await dispatch(fetchExtractPrecision(index));
      await dispatch(fetchExtractRecall(index));
      await dispatch(fetchExtractF1(index));

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
        <p className={styles.dragTrue}>Drop and Drag</p>
      ) : (
        <p className={styles.dragFalse}>Drop and Drag</p>
      )}
    </div>
  );
};

export default DropZone;
