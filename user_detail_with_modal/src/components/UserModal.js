import {
  Container,
  Modal,
  Fade,
  TextField,
  Grid,
  Button,
} from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    "& label.Mui-focused": {
      color: "green",
    },
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: "green",
      },
      "&.Mui-focused fieldset": {
        borderColor: "green",
      },
    },
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modal_fade: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid green",
    boxShadow: theme.shadows[5],
  },
  text_field: {
    marginBottom: "7px",
    color: "green",
    borderBottomColor: "green",
    borderColor: "green",
  },
}));
function UserModal(detail) {
  const classes = useStyles();
  const userData = detail.userData;
  const [userDetail, setUserDetail] = useState(userData);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetail({
      ...userDetail,
      [name]: value,
    });
  };

  const handleAddUser = (event) => {
    event.preventDefault();
    const user = {
      firstName: userDetail.firstName,
      lastName: userDetail.lastName,
      age: userDetail.age,
      mobile: userDetail.mobile,
    };
    let containerListUpdate = [...detail.containerList];
    if (detail.isEdit === true) {
      containerListUpdate[detail.index][detail.activeItemIndex] = user;
    } else {
      containerListUpdate[detail.index].push(user);
    }
    detail.setIsEdit(false);
    detail.setContainer(containerListUpdate);
    setUserDetail({
      firstName: "",
      lastName: "",
      age: "",
      mobile: "",
    });
    detail.setOpenModal(false);
  };
  return (
    <Modal
      className={classes.modal}
      open={detail.openModal}
      onClose={detail.closeModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={detail.openModal}>
        <Container maxWidth="xs">
          <Grid container spacing={2} className={classes.modal_fade}>
            <Grid item xs={12} className={classes.root}>
              <TextField
                className={classes.text_field}
                autoComplete="off"
                name="firstName"
                required
                fullWidth
                variant="outlined"
                value={userDetail.firstName}
                onChange={handleInputChange}
                id="firstName"
                label="First Name"
                autoFocus
              />
              <TextField
                className={classes.text_field}
                autoComplete="off"
                name="lastName"
                required
                fullWidth
                variant="outlined"
                value={userDetail.lastName}
                onChange={handleInputChange}
                id="lastName"
                label="Last Name"
                autoFocus
              />
              <TextField
                autoComplete="off"
                className={classes.text_field}
                name="age"
                required
                fullWidth
                value={userDetail.age}
                onChange={handleInputChange}
                id="age"
                label="Age"
                variant="outlined"
                autoFocus
              />
              <TextField
                autoComplete="off"
                name="mobile"
                variant="outlined"
                required
                fullWidth
                value={userDetail.mobile}
                onChange={handleInputChange}
                id="mobile"
                label="Mobile Number"
                autoFocus
              />
              <Button
                variant="contained"
                style={{
                  marginTop: "10px",
                  backgroundColor: "green",
                  color: "white",
                  left: "72%",
                }}
                onClick={(e)=>handleAddUser(e)}
              >
                add user
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Fade>
    </Modal>
  );
}
export default UserModal;
