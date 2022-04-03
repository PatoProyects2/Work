import React, { useRef } from 'react';
import { Button } from 'reactstrap';
const FileUploader = ({handleChange, text}) => {
    const hiddenFileInput = useRef(null);
    const handleClick = () => {
        hiddenFileInput.current.click();
    };    
    return (
        <div className="d-flex justify-content-center">
            <Button onClick={handleClick} color="primary">
                {text ? text : "Choose image"}
                <input type="file" accept="image/png, image/jpeg" style={{display: 'none'}} ref={hiddenFileInput} onChange={handleChange} />
            </Button>
        </div>
    );
}
export default FileUploader;