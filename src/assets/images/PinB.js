import React from "react";
import { SvgCss } from "react-native-svg";

export default (props) => {
  const { fill, width, height } = props;
  const xml = `
    <svg width="30" height="33" viewBox="0 0 30 33" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 0C12.5136 0 10.129 0.98772 8.37087 2.74587C6.61272 4.50403 5.625 6.8886 5.625 9.375C5.625 18.75 15 30 15 30C15 30 24.375 18.75 24.375 9.375C24.375 6.8886 23.3873 4.50403 21.6291 2.74587C19.871 0.98772 17.4864 0 15 0V0ZM15 15C13.5082 15 12.0774 14.4074 11.0225 13.3525C9.96763 12.2976 9.375 10.8668 9.375 9.375C9.375 7.88316 9.96763 6.45242 11.0225 5.39752C12.0774 4.34263 13.5082 3.75 15 3.75C16.4918 3.75 17.9226 4.34263 18.9775 5.39752C20.0324 6.45242 20.625 7.88316 20.625 9.375C20.625 10.8668 20.0324 12.2976 18.9775 13.3525C17.9226 14.4074 16.4918 15 15 15Z" fill="#FF5757"/>
    <circle cx="15" cy="10" r="6.25" fill="#FF5757"/>
    <path d="M12.0992 7.408H15.4592C15.9392 7.408 16.3792 7.508 16.7792 7.708C17.1872 7.908 17.5072 8.18 17.7392 8.524C17.9712 8.868 18.0872 9.244 18.0872 9.652C18.0872 10.084 17.9792 10.46 17.7632 10.78C17.5552 11.092 17.2792 11.332 16.9352 11.5V11.596C17.3832 11.756 17.7392 12.012 18.0032 12.364C18.2672 12.708 18.3992 13.124 18.3992 13.612C18.3992 14.084 18.2712 14.504 18.0152 14.872C17.7672 15.232 17.4272 15.512 16.9952 15.712C16.5712 15.904 16.0992 16 15.5792 16H12.0992V7.408ZM15.3392 10.912C15.6912 10.912 15.9712 10.816 16.1792 10.624C16.3952 10.424 16.5032 10.176 16.5032 9.88C16.5032 9.592 16.3992 9.352 16.1912 9.16C15.9912 8.96 15.7232 8.86 15.3872 8.86H13.7192V10.912H15.3392ZM15.5192 14.524C15.9112 14.524 16.2152 14.424 16.4312 14.224C16.6552 14.016 16.7672 13.748 16.7672 13.42C16.7672 13.092 16.6552 12.824 16.4312 12.616C16.2072 12.408 15.8872 12.304 15.4712 12.304H13.7192V14.524H15.5192Z" fill="white"/>
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
