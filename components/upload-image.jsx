"use client";

import Spinner from "@/components/loader/spinner";
import { IKImage, IKUpload, ImageKitProvider } from "imagekitio-next";
import { UploadCloud } from "lucide-react";
import { useRef, useState } from "react";

const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;
const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;
const url = process.env.NEXT_PUBLIC_NEXTAUTH_URL;

const authenticator = async () => {
  try {
    const response = await fetch(`${url}/api/auth/imgKitAuth`);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

function UploadImage({
  folderName,
  name,
  setImagePath,
  imagePath,
  type,
  setUploading,
}) {
  const ikUploadRefTest = useRef(null);
  const [error, setError] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(false);

  const imageName = name.split(" ").join("-");

  const onSuccess = (res) => {
    setUploading(false);
    setImagePath(res?.filePath);
    setUploadProgress(false);
  };

  const onError = (err) => {
    setUploading(false);
    setError(err?.message);
    setUploadProgress(false);
  };

  const onUploadProgress = (progress) => {
    setUploading(true);
    setUploadProgress(true);
  };

  return (
    <>
      <ImageKitProvider
        publicKey={publicKey}
        urlEndpoint={urlEndpoint}
        authenticator={authenticator}
      >
        <IKUpload
          fileName={`${imageName}.jpg`}
          tags={["sample-tag1", "sample-tag2"]}
          customCoordinates={"10,10,10,10"}
          isPrivateFile={false}
          useUniqueFileName={true}
          responseFields={["tags"]}
          validateFile={(file) => file.size < 2000000}
          folder={folderName}
          overwriteFile={true}
          overwriteAITags={true}
          overwriteTags={true}
          overwriteCustomMetadata={true}
          onError={onError}
          onSuccess={onSuccess}
          onUploadProgress={onUploadProgress}
          style={{ display: "none" }}
          ref={ikUploadRefTest}
        />
        {ikUploadRefTest && !imagePath && (
          <div
            className='flex items-center space-x-2 cursor-pointer bg-customYellow hover:bg-hoverYellow text-white text-sm py-2 px-4 rounded-md max-w-fit'
            onClick={() => ikUploadRefTest.current.click()}
          >
            {uploadProgress ? (
              <>
                <Spinner className='w-5 h-5 ' />
                <span>Uploading</span>{" "}
              </>
            ) : (
              <>
                <UploadCloud className='w-5 h-5' />
                <span>Upload {type}</span>{" "}
              </>
            )}
          </div>
        )}

        {imagePath && (
          <div className='flex flex-col justify-center gap-y-2'>
            <div className='w-44 h-36  cursor-pointer rounded-sm relative  overflow-hidden'>
              <IKImage
                urlEndpoint={urlEndpoint}
                fill
                path={imagePath}
                priority
                alt={name}
                className='absolute inset-0 object-cover  object-center   '
              />
            </div>
            <div
              className='flex items-center space-x-2 cursor-pointer bg-customYellow hover:bg-hoverYellow text-white text-sm py-2 px-4 rounded-md max-w-fit'
              onClick={() => ikUploadRefTest.current.click()}
            >
              <UploadCloud className='w-5 h-5' />
              <span>Change {type}</span>{" "}
            </div>
          </div>
        )}

        {error && (
          <p className='text-red-500 font-robotoSlab font-medium '>
            Error ouccured: {error}
          </p>
        )}
      </ImageKitProvider>
    </>
  );
}

export default UploadImage;
