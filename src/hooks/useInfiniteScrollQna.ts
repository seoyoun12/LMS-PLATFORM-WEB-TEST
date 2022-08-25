import { GET } from '@common/httpClient';
import React, { useEffect, useRef, useState } from 'react';
import { useSnackbar } from './useSnackbar';
import { Qna } from '@common/api/qna';
import { PaginationResult } from 'types/fetch';

const holdValue = 0.1;
// url: string, config:{ params:any , header:any  }
export function useInfiniteScrollQna(url: string) {
  const [target, setTarget] = useState<HTMLElement | null | undefined>(null);
  const [loadedItem, setLoadItem] = useState<Qna[]>([]);
  const page = useRef(0);
  const [loadingStatus , setLoadingStatus] = useState(false)
  const loading = useRef(false);
  const pageEnd = useRef(false);
  const snackbar = useSnackbar();

  const onIntersection = async (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
    if (entries[0].intersectionRatio <= holdValue) return;
    // if (entries[0].intersectionRatio <= 0) return;
    if (loading.current === true) return
    try {
      loading.current = true;
      const { data } = await GET<{ data: PaginationResult<Qna[]> }>(url, { params: { page: page.current } })
      page.current += 1;
      // if(loadedItem.length === 0)  setLoadItem(data.content);
      if (loadedItem) setLoadItem((prev) => [...prev, ...data.content]);
      loading.current = false;
      
      //임시조치
      if(page.current < 2){
        loading.current = true;
        setLoadingStatus(true);
        const {data} = await GET<{data:PaginationResult<Qna[]>}>(url,{params:{page:page.current }})
        setLoadingStatus(false);
        if(data.content.length === 0) {
          pageEnd.current = true;
          loading.current = false;
          return;
        }
        if(data.content.length !== 0) page.current += 1;
        // if(loadedItem.length === 0)  setLoadItem(data.content);
        if(loadedItem)  setLoadItem((prev)  =>[...prev , ...data.content])
        loading.current = false;
      }
    } catch (e: any) {
      snackbar({ variant: 'error', message: e.data.message })
      loading.current = false;
    }
  };

  useEffect(() => {
    if (target) {
      let intersectionObserver = new IntersectionObserver(onIntersection, { threshold: holdValue });
      intersectionObserver.observe(target);
      return () => {
        intersectionObserver && intersectionObserver.disconnect();
      };
    }
  }, [target]);

  return [setTarget, loadedItem, loading.current] as [React.Dispatch<React.SetStateAction<HTMLElement | null | undefined>>, Qna[], boolean]
}
