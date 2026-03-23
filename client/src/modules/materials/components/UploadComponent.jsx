import {  useState } from 'react';
import { uploadMaterial } from '../api/materialApi';

const UploadComponent = () => {
    const [data, setData] = useState({
        title: '',
        subject: '',
        file: null,
        type: '',
    });
    const [file, setFile] = useState({});

    const handleFileChange =  (e) => {
        if (e.target.files)  setFile(e.target.files[0]);
        console.log(e.target.files)
        
    };
   

    const handleSubmit = () => {
        setData((prev)=>{return {...prev, file: file}})
        // console.log(file)
        const finallyData = {...file, ...data}
        console.log(finallyData)
        const res = uploadMaterial(finallyData);
    };

    return (
        <div>
            <h1> UPLOAD HERE: </h1>
            <label htmlFor="title">Title</label>
            <input
                type="text"
                id="title"
                onChange={(e) => {
                    setData((prev) => {
                        return { ...prev, title: e.target.value };
                    });
                }}
            />
            <br />
            <label htmlFor="subject">Subject</label>
            <input
                type="text"
                id="subject"
                onChange={(e) => {
                    setData((prev) => {
                        return { ...prev, subject: e.target.value };
                    });
                }}
            />
            <br />

            <label htmlFor="media">Select Media</label>
            <input type="file" id="media" onChange={handleFileChange} />
            <br />

            {file && (
                <div>
                    <p>Files: </p>
                    <p>Name: {file.name}</p>
                    <p>Type: {file.type}</p>
                    <p>Size: {file.size}</p>
                    <button onClick={handleSubmit}>Uplaod</button>
                </div>
            )}
        </div>
    );
};

export default UploadComponent;
