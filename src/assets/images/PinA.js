import React from "react";
import { SvgCss } from "react-native-svg";

export default (props) => {
  const { fill, width, height } = props;
  const xml = `
    <svg width="30" height="33" viewBox="0 0 30 33" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 0C12.5136 0 10.129 0.98772 8.37087 2.74587C6.61272 4.50403 5.625 6.8886 5.625 9.375C5.625 18.75 15 30 15 30C15 30 24.375 18.75 24.375 9.375C24.375 6.8886 23.3873 4.50403 21.6291 2.74587C19.871 0.98772 17.4864 0 15 0V0ZM15 15C13.5082 15 12.0774 14.4074 11.0225 13.3525C9.96763 12.2976 9.375 10.8668 9.375 9.375C9.375 7.88316 9.96763 6.45242 11.0225 5.39752C12.0774 4.34263 13.5082 3.75 15 3.75C16.4918 3.75 17.9226 4.34263 18.9775 5.39752C20.0324 6.45242 20.625 7.88316 20.625 9.375C20.625 10.8668 20.0324 12.2976 18.9775 13.3525C17.9226 14.4074 16.4918 15 15 15Z" fill="#FF5757"/>
    <circle cx="15" cy="10" r="6.25" fill="#FF5757"/>
    <path d="M14.5659 7.408H16.4259L19.6539 16H17.8659L17.1459 13.948H13.8579L13.1379 16H11.3499L14.5659 7.408ZM16.6179 12.46L15.8619 10.3L15.5499 9.268H15.4539L15.1419 10.3L14.3739 12.46H16.6179Z" fill="white"/>
    <ellipse cx="15.5" cy="32" rx="3.5" ry="1" fill="#0461C1"/>
    </svg>    
`;
  return (
    <SvgCss
      xml={xml}
      width={width || "100%"}
      height={height || "100%"}
      fill={fill}
    />
  );
};
