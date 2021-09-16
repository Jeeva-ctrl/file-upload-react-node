import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import { GrDocumentPdf } from "react-icons/gr";
import { BsCardImage } from "react-icons/bs";
import { AiTwotoneFileImage } from "react-icons/ai";
import axiosInstance from "./axios";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  ProgressBar,
  Alert,
} from "react-bootstrap";

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
  padding: 20,
};

const thumb = {
  position: "relative",
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: "100%",
  height: 100,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
};

const thumbButton = {
  backGroundColor: "transparent",
  border: "none",
};
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

export default function FileUpload(props) {
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState();
  const [error, setError] = useState();
  console.log("files", error);
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*,.pdf",
    onDrop: (acceptedFiles) => {
      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      setFiles([...newFiles, ...files]);
    },
  });

  const OnUpload = () => {
    let formData = new FormData();
    files.map((file) => formData.append("file", file));
    //formData.append("file", files[0]);
    axiosInstance
      .post("/upload_file", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (data) => {
          setProgress(Math.round((100 * data.loaded) / data.total));
        },
      })
      .catch((error) => {
        const code = error?.response?.code;
        switch (code) {
          case "FILE_MISSING":
            setError("Please select a file before uploading!");
            break;
          case "LIMIT_FILE_SIZE":
            setError("File size is too large. Please upload files below 1MB!");
            break;
          case "INVALID_TYPE":
            setError(
              "This file type is not supported! Only .png, .jpg and .jpeg files are allowed"
            );
            break;

          default:
            setError("Sorry! Something went wrong. Please try again later");
            break;
        }
      });
  };

  const thumbs = files.map((file, index) => (
    <div className="thumb" style={thumb} key={file.name}>
      <div className="thumbInner" style={thumbInner}>
        {file.type == "application/pdf" ? (
          <GrDocumentPdf className="img-pdf" />
        ) : file.type == "image/jpeg" ? (
          <BsCardImage className="img-pdf" />
        ) : (
          <AiTwotoneFileImage className="img-pdf" />
        )}
      </div>
      <div>
        {file.path}- <span className="file-size">{formatBytes(file.size)}</span>
      </div>
      <button
        className="btn-remove"
        style={thumbButton}
        onClick={() => {
          const updatedFiles = [...files];
          updatedFiles.splice(index, 1);
          setFiles(updatedFiles);
        }}
      >
        <IoMdRemoveCircleOutline className="remove-icon" />
      </button>
    </div>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return (
    <Container>
      <h2 className="hd">File Upload</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {!error && progress && (
        <ProgressBar now={progress} label={`${progress}%`} />
      )}
      <div {...getRootProps({ className: "dropzone", isDragAccept: "true" })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <aside style={thumbsContainer}>{thumbs}</aside>
      <button className="btn-upload" onClick={OnUpload}>
        Upload Files
      </button>
    </Container>
  );
}
