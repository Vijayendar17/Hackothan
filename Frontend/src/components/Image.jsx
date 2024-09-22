import React, { useEffect, useContext, useState } from 'react';
import { ImageContext } from '../context/Imagecontext.jsx';
import { IoMdSend } from "react-icons/io";
import animation from '../assets/animation.svg'
import { useUser } from "../context/opContext";


function Image() {
  const { user } = useUser();
  const { isLoading, setInput, onSent, image, input } = useContext(ImageContext);
  const [homepageIndex, setHomepageIndex] = useState(0);
  const homepage = [
   "create your imagination into a image",
   "Hey there, ready to explore a world of possibilities?",
"Welcome back! Let's make today a productive one!",
"Good to see you! What can I help you achieve today?",
"Hello! Your next adventure in learning starts here.",
"Hey! Ready to turn your ideas into reality?",
  ];

  const loadPrompt = async (data) => {
    await onSent(data);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setHomepageIndex((prevIndex) => (prevIndex + 1) % homepage.length);
    }, 2500);
    return () => clearTimeout(timeout);
  }, [homepage.length, homepageIndex]);

  return (
    <div className="max-w-[900px] mx-auto">
      {!image ? (
        <div className="my-12 text-[52px] text-white font-semibold p-5">
          <p>
            <span className="bg-gradient-to-r from-[#368ddd] to-[#ff5546] bg-clip-text text-transparent bg-[length:200%_200%] animate-gradientMove">
              Hello, <span className='uppercase'>{user.name === "Vijay" ? ` ${user.name} sir` : user.name}

              </span>.
            </span>
          </p>
          <p className="text-slate-400 text-[47px] capitalize">
            {homepage[homepageIndex]}
          </p>
        </div>
      ) : (
        <div className="py-0 px-[5%] max-h-[70vh] overflow-y-scroll scrollbar-hidden">
          <div className="flex items-start gap-5">
            {isLoading ? (
              <div className="w-full flex flex-col items-center text-white">
                <p>Loading...</p>
                <div className='w-full h-full flex justify-center items-center'>
                  <img src={animation} alt="Loading" />
                </div>
              </div>
            ) : (
              <img src={image} alt="Generated" />
            )}
          </div>
        </div>
      )}

      <div className="absolute bottom-3 w-full max-w-[900px] px-5 mx-auto mt-5">
        <div className="flex items-center justify-between gap-20 bg-gray-200 py-2 px-5 rounded-full">
          <input
            type="text"
            placeholder="Enter a prompt here..."
            className="flex-1 bg-transparent border-none outline-none p-2 text-lg"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <div className="flex gap-4 items-center">
            {input && (
              <IoMdSend
                onClick={() => onSent(input)} 
                className="text-2xl cursor-pointer"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Image;
