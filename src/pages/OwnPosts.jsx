import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Axios } from "../../libs/Axios";
import toast from "react-hot-toast";
import Blog from "./Blog";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import { useSelector } from "react-redux";
import AddModal from "../../Hooks/AddModal";

const OwnPosts = () => {
  let { id } = useSelector((state) => state.user);
  let [loading, setLoading] = useState(false);
  let [posts, setPosts] = useState([]);
  let addModal = AddModal();
  let FetchRelatedPosts = useCallback(async () => {
    let res;
    try {
      setLoading(true);
      res = await Axios.get(`/post/own/posts/${id}`);
      setPosts(res.data.data);
      toast.success(`Your posts`);
    } catch (error) {
      toast(error.response.data.error);
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    FetchRelatedPosts();
  }, []);
  let openDialogBox = () => {
    if (id) {
      addModal.onOpen();
    }
  };
  return (
    <div
      className={`${
        loading ? "items-center justify-center" : "items-start justify-start"
      } flex-col pt-20 w-full flex min-h-screen`}
    >
      {loading ? (
        <ClimbingBoxLoader
          color={"#009866"}
          loading={loading}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : posts?.length > 0 ? (
        posts?.map((blog) => <Blog key={blog._id} data={blog} />)
      ) : (
        <div className="w-full min-h-[75vh] flex items-center justify-center flex-col">
          <h1 className="text-5xl text-rose-300">No Post 🥺</h1>
          <button
            onClick={openDialogBox}
            className="text-xs font-bold text-gray-500 p-1 shadow-md rounded-3xl"
          >
            {id
              ? "now! create your own posts😊"
              : "Login first! then create a your own posts😊!"}
          </button>
        </div>
      )}
    </div>
  );
};

export default OwnPosts;
