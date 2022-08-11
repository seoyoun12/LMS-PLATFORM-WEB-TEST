import { Container, Box } from '@mui/material';
import { BoardAccordion } from '@components/ui/BoardAccordion';
import React from 'react';
import { useInfiniteScroll } from '@hooks/useInfiniteScroll';
import { Spinner } from '@components/ui';

export function CategoryBoardNotice() {

  const [target , loadedItem , loading] = useInfiniteScroll(`/post`,"TYPE_NOTICE")

  return (
    <Container>
      {loadedItem && loadedItem.map((content) => {
        const accordionInfo = [{ 
          seq: content.seq,
          date: content.createdDtime, 
          name: content.subject, 
          children: [{ name: content.content}] 
        }]
        return <BoardAccordion boardAccordionList={accordionInfo}/>
      })}
      <Box ref={target} height='100px' >{loading ? <Spinner /> : ""}</Box>
    </Container>
  )
}