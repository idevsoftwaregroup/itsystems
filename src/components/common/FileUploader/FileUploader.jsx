import React, { useState } from "react";
import axios from "axios";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "filepond/dist/filepond.min.css";
import "./FileUploader.css";

const FileUploader = ({
  uploaderName,
  handleStatus = () => {},
  fileName,
  extraUrl = "",
  btn_name = "بارگزاری تصویر",
  width,
}) => {
  registerPlugin(
    FilePondPluginImageExifOrientation,
    FilePondPluginImagePreview
  );
  const [files, setFiles] = useState([]);
  const fileStorageUrl = process.env.REACT_APP_FILESTORAGE_API_URL;
  const uploadIcon =
    '<svg stroke="currentColor" fill="currentColor" stroke-width="5" viewBox="0 0 1024 1024" height="70" width="70" xmlns="http://www.w3.org/2000/svg" style="margin-top: 45px; margin-right: -45px;"><path d="M257,185.43a5.5,5.5,0,0,0-5.5,5.5h0v33.83a12.87,12.87,0,0,1-12.88,12.88H45.24a12.87,12.87,0,0,1-12.87-12.88V190.93a5.5,5.5,0,0,0-11,0v33.83a23.88,23.88,0,0,0,23.87,23.88H238.59a23.88,23.88,0,0,0,23.88-23.88V190.93A5.5,5.5,0,0,0,257,185.43Z"/><path d="M94.79,96.81h0l40-40-1.34,99.67a8.5,8.5,0,1,0,17,.23l1.31-97.25L189,96.81a8.5,8.5,0,1,0,12-12L155.29,39a18.93,18.93,0,0,0-26.75,0L82.77,84.79a8.5,8.5,0,1,0,12,12Z"/></svg>';

  const handleProccessAxios = (
    fieldName,
    file,
    metadata,
    load,
    error,
    progress,
    abort,
    transfer,
    options
  ) => {
    // set data
    const formData = new FormData();
    formData.append("formFile", file);
    // related to aborting the request
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    // the request itself
    axios({
      method: "post",
      url: fileStorageUrl + "api/FileStorage/" + extraUrl,
      data: formData,
      cancellationToken: source.token,
      onUploadProgress: (e) => {
        // updating progress indicator
        progress(e.lengthComputable, e.loaded, e.total);
      },
    })
      .then((response) => {
        // passing the file id to FilePond
        fileName(response.data);
        load(response.data.data);
        handleStatus(1);
      })
      .catch((thrown) => {
        if (axios.isCancel(thrown)) {
          //console.log("Request canceled", thrown.message);
        } else {
          //console.log("Request error");
          error("خطای بارگزاری");
          // handle error
        }
        handleStatus(0);
      });
    // Setup abort interface
    return {
      abort: () => {
        source.cancel("Operation canceled by the user.");
      },
    };
  };

  //Doc
  //https://pqina.nl/filepond/docs/getting-started/installation/react/

  //all labels is here
  //https://github.com/pqina/filepond/issues/39

  return (
    <div className={`App select-none ${width ? width : "w-full"}`}>
      <FilePond
        credits={false}
        files={files}
        labelTapToRetry="بارگزاری مجدد"
        labelTapToUndo="بارگزاری مجدد"
        labelTapToCancel="لغو بارگزاری"
        labelFileProcessingError={(e) => {
          return e.body;
        }}
        acceptedFileTypes={["image/jpg", "image/jpeg", "image/png"]}
        onupdatefiles={setFiles}
        onaddfilestart={() => {
          //console.log("onaddfilestart");
          //setImagesUploading(true); // make the save button disabled
        }}
        onprocessfilestart={() => {
          //console.log(`onprocessfilestart`);
          //  setImagesUploading(true); // make the save button disabled
        }}
        onprocessfiles={() => {
          //console.log(`onprocessfiles`);
          // setImagesUploading(false); // make the save button abled
        }}
        onremovefile={(error, file) => {
          handleStatus(0);
        }}
        allowMultiple={false}
        maxFiles={1}
        server={{
          process: handleProccessAxios,
        }}
        name={uploaderName}
        labelIdle={`<div class='cursor-pointer flex justify-center items-center font-theme-regular'>
        ${uploadIcon}
        <div style="font-size:14px">${btn_name}</div>
        </div>`}
      />
    </div>
  );
};

export default FileUploader;
