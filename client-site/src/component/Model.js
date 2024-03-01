import React, { useEffect } from 'react'
import ReactDom from 'react-dom'
import '../css/Model.css'
import { createTheme, ThemeProvider } from '@mui/material/styles';
function Model(props) {
  const theme = createTheme({
    typography: {
      fontSize: 20, // Adjust the font size as needed
    },
  });
    const {children}=props

    useEffect(() => {
      document.body.style.overflowY = "hidden";
      return () => {
        document.body.style.overflowY = "scroll";
      };
    }, []);
    
  return ReactDom.createPortal(
    <>
    <div className="modal-wrapper" ></div>
    <ThemeProvider theme={theme}>
    <div className="modal-container">
      {children}
      {/* {handelSubmit} */}
    </div>
    </ThemeProvider>
  </>,
    document.getElementById("model-contener")
  )
}

export default Model