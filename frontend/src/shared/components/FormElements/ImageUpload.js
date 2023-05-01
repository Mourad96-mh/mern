import {React} from 'react';

const ImageUpload = (props)=> {
    return (
        <div className="form-control">
            <input type="file" accept=".jpg, .png, .jpeg" styles={{display: 'none'}}/>
        </div>
    )
};

export default ImageUpload;