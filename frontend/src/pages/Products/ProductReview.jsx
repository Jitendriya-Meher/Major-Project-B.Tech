import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";

import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
}));

const ProductReview = () => {
  const { id } = useParams();
  const { baseURL, token, isAdmin } = useSelector((s) => s.auth);
  const [review, setReview] = useState("");
  const [disabledButton, setDisabledButton] = useState(false);
  const [reviews, setReviews] = useState([]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setDisabledButton(true);
    try {
      const res = await axios.post(
        `${baseURL}/api/product/addproductreview/${id}`,
        {
          review,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      const data = await res.data;
      console.log("review", data);
      setReview("");

      getAllReviews();
    } catch (err) {
      toast.error(err.message);
    }
    setDisabledButton(false);
  };

  const getAllReviews = async () => {
    try {
      const res = await axios.get(
        `${baseURL}/api/product/getallreviews/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      const data = await res.data;
      console.log("review", data);
      setReviews(data.reviews);
    } catch (err) {
      toast.error(err.message);
    }
    setDisabledButton(false);
  };

  const deleteReview = async () => {
    try {
      const res = await axios.delete(
        `${baseURL}/api/product/deletereview/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      const data = await res.data;
      console.log("del review", data);
      getAllReviews();
    } catch (err) {
      toast.error(err.message);
    }
    setDisabledButton(false);
  };

  useEffect(() => {
    getAllReviews();
  }, []);

  return (
    <div className=" pb-10 ">
      <form
        action=""
        onSubmit={submitHandler}
        className="flex flex-col w-full gap-y-2 mt-6"
      >
        <textarea
          name=""
          id=""
          rows="5"
          className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-[1px] outline-1"
          placeholder="Enter Your Review"
          onChange={(e) => {
            setReview(e.target.value);
          }}
          value={review}
          required
        ></textarea>

        <button
          className="bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] flex mt-4 items-center justify-center gap-x-2 disabled:bg-gray-500"
          disabled={disabledButton}
        >
          <p className="text-[1.1rem]">Submit Review</p>
        </button>
      </form>

      <hr className="my-5 bg-gray-800 text-gray-800" />

      <div className="">
        {reviews.map((review) => (
          <div className=" bg-gray-700/80 flex gap-12 p-3 mt-2 mb-3 text-white font-sans rounded-md" key={review._id}>
            <div className=" flex items-center gap-2 bg-gray-700 px-4 py-2 rounded-sm">
              <div className=" text-center">
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  variant="dot"
                >
                  <Avatar alt="Remy Sharp" sx={{ width: 56, height: 56 }} />
                </StyledBadge>
              </div>
              <div className=" font-xl">
                {review.username}
              </div>
            </div>
            <div className=" bg-gray-800/40 px-4 py-2 rounded-sm flex-1">{review.review}</div>
            {
                isAdmin && <div className=" px-3 py-2 rounded-sm flex items-center justify-center bg-red-600 h-12" onClick={deleteReview}>
                    <DeleteIcon></DeleteIcon>
                </div>
            }
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductReview;
