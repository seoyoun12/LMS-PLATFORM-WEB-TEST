import { GET } from '@common/httpClient';
import React, { useEffect, useRef, useState } from 'react';
import { useSnackbar } from './useSnackbar';
import { CategoryBoard } from '@common/api/categoryBoard';
import { PaginationResult } from 'types/fetch';

const holdValue = 0.8;
// url: string, config:{ params:any , header:any  }
export function useInfiniteScroll(url:string,boardType:string) {
  const [target, setTarget] = useState<HTMLElement | null | undefined>(null);
  const [loadedItem, setLoadItem] = useState<CategoryBoard[]>([]);
  const page = useRef(0)
  const loading = useRef(false);
  const snackbar = useSnackbar()

  const onIntersection = async (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
    // console.log('intersection', entries ,observer);
    console.log("ssss",entries[0].intersectionRatio)
    if (entries[0].intersectionRatio <= holdValue) return;
    // if (entries[0].intersectionRatio <= 0) return;
    if(loading.current === true) return
    try{
      loading.current = true;
      const {data} = await GET<{data:PaginationResult<CategoryBoard[]>}>(url,{params:{page:page.current ,boardType: boardType}})
      page.current += 1;
      // if(loadedItem.length === 0)  setLoadItem(data.content);
      if(loadedItem)  setLoadItem((prev)  =>[...prev , ...data.content])
      loading.current = false;
    }catch(e:any){
      snackbar({variant:'error' , message:e.data.message})
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

  return [setTarget, loadedItem  , loading.current] as [React.Dispatch<React.SetStateAction<HTMLElement | null | undefined>> ,CategoryBoard[] , boolean]
}
