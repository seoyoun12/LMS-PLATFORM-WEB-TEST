import { DELETE, GET, POST, PUT } from "@common/httpClient"
import { useState } from "react"
import { useSnackbar } from "./useSnackbar"



// 비디오를 
// <body>
// <h1>Video</h1>
// <video class="video" src="../images/video.mp4" autoplay muted loop></video>
// // 우리 눈에 보이지 않고 있는 비디오 태그!
// <canvas class="canvas" width="600" height="400">이 브라우저는 캔버스를 지원하지 않습니다.</canvas>

// <script>
//   const canvas = document.querySelector('.canvas');
//   const ctx = canvas.getContext('2d');
//   let canPlayState = false;

//   ctx.textAlign = 'center';
//   ctx.fillText('비디오 로딩 중..', 300, 200);

//   const videoElem = document.querySelector('.video');
//   videoElem.addEventListener('canplaythrough', render);

//   function render() {
//     ctx.drawImage(videoElem, 0, 0, 600, 400);
//     // 첫 번째 인자로 비디오를 넣어준다.
//     requestAnimationFrame(render);
//   }
// </script>
// </body>




export interface Content {
  seq: number,
  code: null | string | number,
  contentType: string,
  contentName: string,
  contentWidth: null,
  contentHeight: null,
  lessonCnt: number,
  questionCnt: number,
  examCnt: number,
  homeworkCnt: number,
  courseSeq: number | null,
  courseName: string | null,
  createdDtime: string,
  modifiedDtime: string,
  status: number
}

export interface ContentResponse{
  success: true,
  status: number,
  message: string,
  data: {
      content: Content[]
      pageable: {
          sort: {
              sorted: boolean,
              unsorted: boolean,
              empty: boolean
          },
          offset: number,
          pageNumber: number,
          pageSize: number,
          paged: boolean,
          unpaged: boolean
      },
      totalPages: number,
      totalElements: number,
      last: boolean,
      number: number,
      sort: {
          sorted: boolean,
          unsorted: boolean,
          empty: boolean
      },
      size: number,
      numberOfElements: number,
      first: boolean,
      empty: boolean
  }
}

interface PageConfig {
  totalElements: number
  totalPages: number
}

export default function useDominContent() {
  const [data, setData] = useState<ContentResponse | null>(null)
  const [Content, setContent] = useState<Content | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pageConfig, setPageConfig] = useState<PageConfig | null>(null);
  const snackbar = useSnackbar();

  const getContents = async(page:number,elementCnt = 10) => {
    setIsLoading(true);
    try {
      const res = await GET<ContentResponse>('/content/adm',{
        params:{
          page,
          elementCnt
        }
      })
      setData(res);
      setPageConfig({
        totalElements: res.data.totalElements,
        totalPages: res.data.totalPages
      })
      setIsLoading(false);
    } catch (error) {
      snackbar({
        message: error.message,
        variant: 'error'
      })
      setIsLoading(false);
    }

  }
  const getContent = async() => {
    try {
      
    } catch (error) {
      
    }
  }

  const postContent = async() => {
    try {
      
    } catch (error) {
      
    }
  }
  const putContent = async() => {
    try {
      
    } catch (error) {
      
    }
  }
 const deleteContent = async() => {
  try {
    
  } catch (error) {
    
  }
 }
  
  return { data, isLoading, pageConfig, getContents }
}
