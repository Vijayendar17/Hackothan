import { createContext, useState } from "react";
import runimage from '../config/Image.js'; 

export const ImageContext = createContext(); 

const ImageContextProvider = (props) => {
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false); 
  const [input, setInput] = useState(null);

  const onSent = async (data) => {
    if (data) {
      try {
        setInput(data);
        setIsLoading(true);
        const imageUrl = await runimage(data);
        setImage(imageUrl);
      } catch (error) {
        console.error("Error fetching image:", error);
      } finally {
        setIsLoading(false);
        setInput("");
      }
    }
  };

  return (
    <ImageContext.Provider value={{ image, setImage, isLoading, setIsLoading, setInput, input, onSent }}>
      {props.children}
    </ImageContext.Provider>
  );
};

export default ImageContextProvider;
