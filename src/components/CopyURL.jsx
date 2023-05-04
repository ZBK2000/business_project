import { Button } from '@mui/material';
import React from 'react';

const CopyToClipboardButton = (props) => {
    const handleClick = () => {
        const url = window.location.href;
        const customLink = `Invitation to join this match at ${props.datetime}`;
        const text = `${customLink} ${url}`;
      
        // Create a temporary textarea element
        const textarea = document.createElement('textarea');
      
        // Set its value to the hyperlink with the custom text
        textarea.value = text;
      
        // Add it to the DOM
        document.body.appendChild(textarea);
      
        // Select its contents
        textarea.select();
      
        // Copy its contents to the clipboard
        document.execCommand('copy');
      
        // Remove the temporary textarea element
        document.body.removeChild(textarea);
      };
  return (
    <Button variant='outlined'
   sx={{color:"black", borderColor:"black"}}
      onClick={handleClick}
      onCopy={handleClick}
      data-clipboard-text={window.location.href}
    >
      Copy URL to Clipboard and invite your friends with it!
    </Button>
  );
};

export default CopyToClipboardButton;