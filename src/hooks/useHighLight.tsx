// import React, {useState} from "react";
// import ReactDOM from "react-dom";

// import "./styles.css";


// const searchResultArray = ['강동구 고덕동 111번지','강서구 화곡동 1-12','강서구 공항동 24-12'];

// export default function useHighLight() {
//   const [wordState, setWordState] = useState('');

//   const onChange = (e) => {
//     const { target: { value } } = e;
//     setWordState(value);
//   }

//   return (
//     <div>
//       <input type="text" value={wordState} onChange={onChange} />
//       {
//         searchResultArray.map((word, index) => {
//           const splitWord = word.split('');
//           const highLightWord = splitWord.map((w,idx) => {
//             if(wordState.includes(w)) {
//               return (
//                 <span key={idx} style={{color:'#2d63e2'}}>
//                   {w}
//                 </span>
//               )
//             }
//             return (
//               <span key={idx}>
//                 {w}
//               </span>
//             )
//           })
//           return (
//             <div key={index}>
//               {highLightWord}
//             </div>
//           )
//           })
//         }
//         </div>
//   )
// }