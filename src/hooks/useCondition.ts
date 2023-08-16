import { useCallback } from "react";

interface Props<T> {
  condition: T;
}


function useCondition({ condition }: Props<string>) {

  const isTrue = useCallback((type: string | string[]) => {
    if(Array.isArray(type)) return type.includes(condition);
    else return type === condition;
  },[condition])

  return {
    isTrue
  }
}

export default useCondition