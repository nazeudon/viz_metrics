import React from "react";
import { NativeSelect, FormControl } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchDetermineClassID,
  fetchDeterminePrecisions,
  fetchDetermineRecalls,
  selectClassIDs,
} from "../metricsSlice";

const SwitchClass: React.FC = () => {
  const dispatch = useDispatch();
  const classIDs = useSelector(selectClassIDs);
  const UniqueClassIDs = classIDs.filter(
    (elem, index, self) => self.indexOf(elem) === index
  );

  return (
    <FormControl>
      <NativeSelect
        onChange={(e) => {
          dispatch(fetchDetermineClassID(e.target.value));
          dispatch(fetchDeterminePrecisions());
          dispatch(fetchDetermineRecalls());
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
