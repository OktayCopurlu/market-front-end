import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Context from "../../../context/context";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import EditWish from "./editWish";
export default function EditWishModal(props) {
  const productId = props.value;
  const context = useContext(Context);
  const [open, setOpen] = useState(false);
  const [modalStyle] = useState(getModalStyle);

  function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

  const useStyles = makeStyles((theme) => ({
    paper: {
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      padding: 35,
      borderRadius: 16,
    },
  }));
  const classes = useStyles();

  function onSubmit(event) {
    event.preventDefault();
    setOpen(true);
    context.product(productId);
  }

  function handleClose(event) {
    event.preventDefault();
    setOpen(false);
  }
  return (
    <>
      <Link to="#" onClick={onSubmit} className="text-dark mr-2">
        <i className="fas fa-edit"></i>
      </Link>
      <Modal
        onClose={handleClose}
        open={open}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <Link to="#" onClick={handleClose} className="close-modal">
            Close
          </Link>
          <EditWish element={productId} />
        </div>
      </Modal>
    </>
  );
}
