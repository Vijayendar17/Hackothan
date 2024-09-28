import React, { useContext, useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import { Context } from "../context/Usercontext";
import { useUser } from "../context/opContext";

function Homepage() {
  const { user } = useUser();
  const { input, setInput, recentPrompt, showResult, loading, resultData, onSent } = useContext(Context);

  const loadPrompt = async (prompt) => {
    await onSent(prompt);
  };

  const homepageMessages = [
    "Hi there! How can I assist you today?",
    "Welcome aboard!",
    "How may I help you today?",
    "What can I do for you?",
  ];

  const [homepageIndex, setHomepageIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHomepageIndex(prevIndex => (prevIndex + 1) % homepageMessages.length);
    }, 3500);

    return () => clearTimeout(timer);
  }, [homepageIndex, homepageMessages.length]);

  return (
    <div className="max-w-[900px] mx-auto">
      {!showResult ? (
        <>
          <div className="my-12 text-[52px] text-white font-semibold p-5">
          <p>
            <span className="bg-gradient-to-r from-[#368ddd] to-[#ff5546] bg-clip-text text-transparent bg-[length:200%_200%] animate-gradientMove">
              Hello User,
            </span>
          </p>
            <p className="text-slate-400 text-[47px] capitalize">
              {homepageMessages[homepageIndex]}
            </p>
          </div>
        </>
      ) : (
        <div className="py-0 px-[5%] min-h-[70vh] overflow-y-scroll scrollbar-hidden">
          <div className="my-10 mx-0 flex items-center gap-5">
            <FaUserCircle className="text-3xl" />
            <p className="text-lg font-[400] leading-[1.8]">{recentPrompt}</p>
          </div>
          <div className="flex items-start gap-5">
            {loading ? (
              <div className="w-full flex flex-col gap-2">
                <p>Loading...</p> 
              </div>
            ) : (
              <p
                dangerouslySetInnerHTML={{ __html: resultData }}
                className="text-lg font-[400] text-white leading-[1.8]"
              />
            )}
          </div>
        </div>
      )}

      <div className=" bottom-3 fixed w-full max-w-[900px] px-5 mx-auto mt-5">
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
                onClick={() => loadPrompt(input)}
                className="text-2xl cursor-pointer"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
