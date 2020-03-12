import React, {useEffect, useState,createRef} from 'react';
import {useDropzone} from 'react-dropzone';

import s from './Previews.module.scss';
import prew from '../../../../img/img-prew.png'
import dIcon from '../../../../img/download-icon.png'

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};


function Previews(props) {
  const [files, setFiles] = useState([]);
  const {getRootProps, getInputProps} = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
      props.setImg(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      }))[0]);
    }
  });
  const dropzoneRef = createRef();
  const openDialog = () => {
    // Note that the ref is set async,
    // so it might be null at some point 
    if (dropzoneRef.current) {
      dropzoneRef.current.open()
    }
  };
  const thumbs = files.map(file => (
    <div className = {s.thumbs} key={file.name}>
        <img
          src={file.preview}
          className ={s.prevImage}
        />
        <div onClick={openDialog} className = {s.dialodBlock}>
            <img src = {dIcon} alt = ''></img>
            <span className = {s.dialogText}>Download image</span>
      </div>
    </div>
  ));

  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <section className = {s.bragSection}>
      <div ref={dropzoneRef} {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()}  id='test'/>
        <img src = {prew} alt = ''></img>
        <span className = {s.zoneText}>Drag and drop an images, or click here</span>
        <div onClick={openDialog} className = {s.dialodBlock}>
            <img src = {dIcon} alt = ''></img>
            <span className = {s.dialogText}>Download image</span>
        </div>
          {thumbs}
      </div>
      
    </section>
  );
}
export default Previews;