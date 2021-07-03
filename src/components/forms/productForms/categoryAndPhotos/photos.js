import React, { useContext, useState } from "react";
import ProductContext from "../../../../context/productContext";
import { storage } from "../../../../firebase/firebase";
import { useAuth0 } from "@auth0/auth0-react";
import { v4 as uuidv4 } from "uuid";

export default function Photos() {
  const { user } = useAuth0();

  const productContext = useContext(ProductContext);
  const photos = productContext.photos;
  const [images] = useState([]);
  const [pictureUploaded, setPictureUploaded] = useState(true);
  const [photoCounter,setPhotoCounter] = useState("-0-")

  const handleImageChange = (event) => {
    if (event.target.files) {
      Object.values(event.target.files).forEach((element) => {
        images.push(element);
      });
    }
    setPhotoCounter(images.length)
  };

  const upload = () => {
    images.forEach((image) => {
      const uniqueId = uuidv4();
      const uniqueName = `${image.name}-${uniqueId}`;
      const uploadTask = storage
        .ref(`images/${user.name}/${uniqueName}`)
        .put(image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref(`images/${user.name}`)
            .child(uniqueName)
            .getDownloadURL()
            .then((url) => {
              photos.push(url);
            })
            .then(setPictureUploaded(false));
        }
      );
    });
    
  };

  return (
    <div className="form-group">
      <h3>Upload your product pictures</h3>
      {/* uploading images */}
      <div className="d-flex justify-content-between">
      <span className="btn btn-primary btn-file"> Add Photos
        <input
          className="mb-3 d-block"
          name="image"
          type="file"
          accept="image/*,.heic"
          multiple
          onChange={handleImageChange}
        /></span>
        <button className="btn btn-info" type="button" onClick={upload}>
          Upload
        </button>
      </div>
      <div  className="d-flex justify-content-between mt-5">
      <h6>You Choosed {photoCounter} Photo</h6>
      {pictureUploaded ? <h6 className="form-group text-danger">You must click Upload button</h6>:
      
      <div className="form-group">
        <input
          disabled={pictureUploaded}
          type="submit"
          value="Save and Publish"
          className="btn btn-primary"
        />
      </div>}</div>
    </div>
  );
}
