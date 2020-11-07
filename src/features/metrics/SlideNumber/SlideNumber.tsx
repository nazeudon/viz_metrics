import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import { fetchExtractConfidence, fetchExtractIndex } from "../metricsSlice";
import { useDispatch } from "react-redux";
import styles from "./SlideNumber.module.css";
import { Grid } from "@material-ui/core";

const valuetext = (value: number) => {
  return `${value}`;
};

const SlideNumber = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState<number | number[]>(0.5);
  const handleValueChange = (event: any, newValue: number | number[]) => {
    setValue(newValue);
  };
  useEffect(() => {
    dispatch(fetchExtractConfidence(value));
    dispatch(fetchExtractIndex());
  }, [value, dispatch]);

  return (
    <div className={styles.sliderContent}>
      <Grid container>
        <Grid item xs={6}>
          <Typography id="discrete-slider" gutterBottom>
            Confidence Threshould
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography align="right">{value}</Typography>
        </Grid>
      </Grid>
      <Slider
        defaultValue={0.5}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={0.1}
        marks
        min={0}
        max={1}
        value={value}
        onChange={handleValueChange}
      />
    </div>
  );
};

export default SlideNumber;
