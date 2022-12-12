import React, { useState } from "react";
import {
  Grid,
  FormControl,
  Input,
  InputLabel,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  TextField,
  CircularProgress,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  IconButton
} from "@material-ui/core";
import { Alert, Autocomplete } from "@material-ui/lab";
import DashboardStyles from "./styles/Dashboard";
import DeleteIcon from '@material-ui/icons/Delete';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import { createCar, uploadImage } from "../actions";

const Dashboard = () => {
  const classes = DashboardStyles();
  const [imageAmount, setImageAmount] = useState()
  const [imagesArray, setImagesArray] = useState([]);
  const [imageUploading, setImageUploading] = useState(false);
  const [city, setCity] = useState('Lahore');
  const [alert, setAlert] = useState({
    status: "",
    msg: "",
    type: ""
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const payload = {
      model: data.get("model"),
      price: data.get("price"),
      phone: data.get("phone"),
      city: city,
      pictures: imagesArray
    }; try {
      const dataAPI = await createCar(payload);
      console.log("dataAPI",dataAPI)
      setAlert({
            status: true,
            msg: "Car insert!",
            type: "success"
      });
      setTimeout(() => {
            setAlert({ status: false });
      }, 3000);
} catch (error) {
      setAlert({
            status: true,
            msg: error.message,
            type: "error"
      });
      setTimeout(() => {
            setAlert({ status: false });
      }, 3000);
}
  };

  const handleChangeCity = (event) => {
    setCity(event.target.value);
  };


  const onChangedImage = (e) => {
    let file = e.target.files[0];
    const data = new FormData();
    data.append("image", file);
    console.log(e.target.files[0]);
    setImageUploading(true);
    uploadImage(data, (data) => {
      console.log("data_data",data);
      let newArr = [...imagesArray];
      newArr.push({
        url: data.image,
      });
      setImagesArray(newArr);
      setImageUploading(false);
    });
  };

  const handleDeleteImage = (id) => {
    let newArr = [...imagesArray];
    newArr.splice(id, 1);
    setImagesArray(newArr);
  };

  const arr = [
    { title: '1', value: 1 },
    { title: '2', value: 2 },
    { title: '3', value: 3 },
    { title: '4', value: 4 }
  ]

  return (
    <div className={classes.container}>
      <div className={classes.heading}>
        <h1>Create Car</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3} className={classes.formTop}>
          <Grid item xs={12} md={12} sm={12}>
            <FormControl required fullWidth>
              <InputLabel>Car Model</InputLabel>
              <Input required type="text" name="model" />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={12} sm={12}>
            <FormControl required fullWidth>
              <InputLabel>Price</InputLabel>
              <Input required type="number" name="price" />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={12} sm={12}>
            <FormControl required fullWidth>
              <InputLabel>Phone</InputLabel>
              <Input required type="text" name="phone" />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={12} sm={12}>
            <FormControl component="fieldset" required fullWidth>
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup aria-label="gender" name="gender1" className={classes.radioGroup} value={city} onChange={handleChangeCity}>
                <FormControlLabel value="Lahore" control={<Radio />} label="Lahore" />
                <FormControlLabel value="Karachi" control={<Radio />} label="Karachi" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={12} sm={12}>
            <FormControl required>
              <Autocomplete
                id="combo-box"
                options={arr}
                value={imageAmount}
                onChange={(event, newValue) => {
                  setImageAmount(newValue.value);
                }}
                inputValue={imageAmount}
                getOptionLabel={(option) => option.title}
                style={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Please select one" />}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={12} sm={12}>
            <FormControl>





              {imagesArray && imagesArray.length > 0 && (
                <ImageList
                  sx={{ width: "100%", height: 150 }}
                  cols={3}
                  rowHeight={164}
                >
                  {imagesArray.map((item, index) => {
                    console.log(item.url);
                    return (
                      <div>
                        <ImageListItem
                          key={item.img}
                        // sx={{ objectFit: "contain" }}
                        >
                          <img
                            src={`${item.url}`}
                            srcSet={`${item.url}`}
                            alt={item.title}
                            loading="lazy"
                            width={"100%"}
                            style={{
                              objectFit: "contain",
                            }}
                          />

                          <ImageListItemBar
                            sx={{
                              background:
                                "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
                                "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
                            }}
                            title={item.title}
                            position="top"
                            actionIcon={
                              <IconButton
                                sx={{ color: "#f44336" }}
                                aria-label={`star ${item.title}`}
                              >
                                <DeleteIcon
                                  onClick={() => handleDeleteImage(index)}
                                />
                              </IconButton>
                            }
                            actionPosition="right"
                          />
                        </ImageListItem>
                      </div>
                    );
                  })}
                </ImageList>
              )}

              <div style={{ textAlign: 'center' }}>
                <label style={{ fontSize: "30px" }}>
                  <Input
                    accept="image/*"
                    id="icon-button-file"
                    type="file"
                    onChange={onChangedImage}
                    multiple
                    style={{ display: 'none' }}
                  />
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                  >
                    {imageUploading ? (
                      <>
                        {" "}
                        <CircularProgress color="primary" />
                        Uploading....
                      </>
                    ) : (
                      <>
                        <PhotoCameraIcon /> Upload file
                      </>
                    )}
                  </IconButton>
                </label>
              </div>




            </FormControl>
          </Grid>
          <Grid item xs={12} md={12} sm={12}>
            <FormControl fullWidth>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
              >
                Save
              </Button>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={12} sm={12}>
            <FormControl fullWidth>
              {alert.status && (
                <Alert severity={alert.type}>{alert.msg}</Alert>
              )}
            </FormControl>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}

export default Dashboard