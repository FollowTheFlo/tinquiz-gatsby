import React from "react";

export default function useWindowSize() {
  const isSSR = typeof window !== "undefined";
  const [windowSize, setWindowSize] = React.useState({
    width: isSSR ? 1200 : window.innerWidth,
    height: isSSR ? 800 : window.innerHeight,
  });

  function changeWindowSize() {
    console.log('useWindowSize()');  
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  }

  React.useEffect(() => {
    console.log('useWindowSize() IN'); 
    window.addEventListener("resize", changeWindowSize);

    return () => {
        console.log('useWindowSize() OUT');
      window.removeEventListener("resize", changeWindowSize);
    };
  }, []);

  return windowSize;
}

