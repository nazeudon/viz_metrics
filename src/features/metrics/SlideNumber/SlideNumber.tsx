import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import { fetchExtractConfidence, fetchExtractIndex } from "../metricsSlice";
import { useDispatch } from "react-redux";

const useStyles = makeStyles({
  root: {
    width: 300,
  },
});

const valuetext = (value: number) => {
  return `${value}`;
};

const SlideNumber = () => {
  const classes = useStyles();
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
    <div className={classes.root}>
      <Typography id="discrete-slider" gutterBottom>
        Confidence Threshould
      </Typography>
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
      <Typography>{value}</Typography>
    </div>
  );
};

export default SlideNumber;
