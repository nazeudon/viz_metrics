import { Container, Grid } from "@material-ui/core";
import React, { useState } from "react";
import DropZone from "../DropZone/DropZone";
import LinePlot from "../LinePlot/LinePlot";
import MetricsTable from "../MetricsTable/MetricsTable";
import SlideNumber from "../SlideNumber/SlideNumber";
import SwitchClass from "../SwitchClass/SwitchClass";
import styles from "./Dashboard.module.css";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      boxShadow: theme.shadows[10],
    },
  })
);

const Dashboard: React.FC = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Container className={styles.content}>
        {/* <DropZone /> */}
        <Grid container>
          <Grid
            container
            xs={12}
            md={5}
            direction="column"
            justify="space-between"
            alignItems="flex-start"
          >
            <SwitchClass />
            <SlideNumber />
            <MetricsTable />
          </Grid>

          <Grid item xs={12} md={7} className={styles.plotContent}>
            <LinePlot />
          </Grid>
        </Grid>
      </Container>
      <Container className={styles.btnContent}>
        <button type="button" onClick={handleOpen}>
          Upload CSV file
        </button>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              <DropZone />
            </div>
          </Fade>
        </Modal>
      </Container>
    </>
  );
};

export default Dashboard;
