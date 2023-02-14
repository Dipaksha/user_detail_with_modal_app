import React from "react";
import { useState } from "react";
import { Grid, Container, Paper, Button } from "@material-ui/core";
import { AddCircle, Delete, Edit } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import UserModal from "./UserModal";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    border: "1px solid green",
  },
}));

const UserSectionLayout = () => {
  const classes = useStyles();
  const [container, setContainer] = useState([[]]);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    mobile: "",
  });
  const [openModal, setOpenModal] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [isEdit, setIsEdit] = useState(false);

  const handleOpenModal = (index) => {
    setUserData({ firstName: "", lastName: "", age: "", mobile: "" });
    setActiveIndex(index);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsEdit(false);
    setOpenModal(false);
  };

  const addSection = (event) => {
    event.preventDefault();
    const sectionList = [...container];
    let arr = [];
    if (
      userData.firstName !== "" &&
      userData.lastName !== "" &&
      userData.age !== "" &&
      userData.mobile !== ""
    ) {
      const user = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        age: userData.age,
        mobile: userData.mobile,
      };
      arr = [user];
    }
    sectionList.push(arr);
    setContainer(sectionList);
  };

  const editItems = (index, itemIndex) => {
    setIsEdit(true);
    setOpenModal(true);
    setActiveIndex(index);
    setActiveItemIndex(itemIndex);
    const newContainerItems = [...container];
    const dataToEdit = newContainerItems[index][itemIndex];
    setUserData(dataToEdit);
  };

  const deleteItem = (sectionItems, index, itemIndex) => {
    const newContainerItems = [...container];
    const dataToDelete = newContainerItems[index][itemIndex];
    const indexValue = sectionItems.indexOf(dataToDelete);
    if (sectionItems) {
      sectionItems.splice(indexValue, 1);
    }
    setContainer(newContainerItems);
  };
  return (
    <Container component="main">
      {container.map((items, index) => {
        return (
          <div
            style={{ border: "2px solid green", marginBottom: "10px" }}
            key={index}
          >
            <Grid container spacing={1} style={{ margin: "5px 2px 5px" }}>
              {items.map((itemData, itemsIndex) => {
                return (
                  <Grid
                    container
                    spacing={1}
                    style={{ margin: "5px 1px 5px" }}
                    key={itemsIndex}
                  >
                    <Grid item xs={3}>
                      <Paper className={classes.paper}>
                        {itemData.firstName}
                      </Paper>
                    </Grid>
                    <Grid item xs={3}>
                      <Paper className={classes.paper}>
                        {itemData.lastName}
                      </Paper>
                    </Grid>
                    <Grid item xs={2}>
                      <Paper className={classes.paper}>{itemData.age}</Paper>
                    </Grid>
                    <Grid item xs={3}>
                      <Paper className={classes.paper}>{itemData.mobile}</Paper>
                    </Grid>
                    <Grid item xs={1}>
                      <Edit
                        style={{
                          fontSize: 30,
                          color: "green",
                          marginTop: "4px",
                        }}
                        onClick={() => editItems(index, itemsIndex)}
                      />
                      <Delete
                        style={{
                          fontSize: 30,
                          color: "green",
                          marginTop: "4px",
                        }}
                        onClick={() => deleteItem(items, index, itemsIndex)}
                      />
                    </Grid>
                  </Grid>
                );
              })}
            </Grid>
            <Grid container justifyContent="flex-end">
              <AddCircle
                style={{ fontSize: 30, color: "green" }}
                onClick={() => handleOpenModal(index)}
              />
            </Grid>
          </div>
        );
      })}
      {openModal && (
        <UserModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          closeModal={handleCloseModal}
          index={activeIndex}
          activeItemIndex={activeItemIndex}
          items={[]}
          isEdit={isEdit}
          containerList={container}
          setContainer={setContainer}
          userData={userData}
          setUserData={setUserData}
          setIsEdit={setIsEdit}
        />
      )}
      <Grid container spacing={3} justifyContent="flex-end">
        <Grid item>
          <Button
            onClick={addSection}
            variant="contained"
            style={{
              marginTop: "10px",
              backgroundColor: "green",
              color: "white",
            }}
          >
            add section
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};
export default UserSectionLayout;
