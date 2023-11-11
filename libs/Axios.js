import axios from "axios";
import toast from "react-hot-toast";

export let Axios = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true,
});

export let UploadImage = async (url) => {
  try {
    let form = new FormData();
    form.append("upload_preset", "blogging");
    form.append("file", url);
    form.append("cloud_name", "du9pkirsy");
    let res = await axios.post(
      `https://api.cloudinary.com/v1_1/du9pkirsy/image/upload`,
      form
    );
    if (res.data) {
      return res.data.secure_url;
    } else {
      toast(`unable to upload profile`);
    }
  } catch (error) {
    toast(error.response.data);
  }
};
//https://blog-znuc.onrender.com/api