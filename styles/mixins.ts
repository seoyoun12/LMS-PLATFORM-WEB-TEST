export const setLineClamp = (line: number) => (
  `
    word-wrap: break-word;
    -webkit-line-clamp: ${line};
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    // IE 브라우저일 때는 max-height를 줌
    @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
      max-height: 19px * ${line};
    }
  `
);


