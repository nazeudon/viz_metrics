import React, { useEffect } from "react";
import { NativeSelect, FormControl } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import {
  selectClassIDs,
  selectIndex,
  fetchDetermineClassID,
  fetchDeterminePrecisions,
  fetchDetermineRecalls,
  fetchDetermineF1s,
  fetchDetermineConfidences,
  fetchExtractPrecision,
  fetchExtractRecall,
  fetchExtractF1,
  fetchExtractIndex,
} from "../metricsSlice";

const SwitchClass: React.FC = () => {
  const dispatch = useDispatch();
  const classIDs = useSelector(selectClassIDs);
  const index = useSelector(selectIndex);
  const UniqueClassIDs = classIDs.filter(
    (elem, index, self) => self.indexOf(elem) === index
  );

  useEffect(() => {
    dispatch(fetchExtractPrecision(index));
    dispatch(fetchExtractRecall(index));
    dispatch(fetchExtractF1(index));
  }, [index, dispatch]);

  return (
    <FormControl>
      <NativeSelect
        onChange={async (e) => {
          await dispatch(fetchDetermineClassID(e.target.value));
          await dispatch(fetchDeterminePrecisions());
          await dispatch(fetchDetermineRecalls());
          await dispatch(fetchDetermineF1s());
          await dispatch(fetchDetermineConfidences());
          await dispatch(fetchExtractIndex());
        }}
      >
        {UniqueClassIDs.map((classID, i) => (
          <option key={i} value={classID}>
            {classID}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
};

export default SwitchClass;
