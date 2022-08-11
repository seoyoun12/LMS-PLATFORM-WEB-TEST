import { Container, Box } from '@mui/material';
import { BoardAccordion } from '@components/ui/BoardAccordion';
import React from 'react';
import { useInfiniteScroll } from '@hooks/useInfiniteScroll';
import styled from 'styled-components';

export function CategoryBoardNotice() {

  const [target , loadedItem , loading] = useInfiniteScroll(`/post`,"TYPE_NOTICE")

  return (
    <NtContainer>
      {loadedItem && loadedItem.map((content) => {
        const accordionInfo = [{ 
          date: content.createdDtime, 
          name: content.subject, 
          children: [{ name: content.content}] 
        }]
        return <BoardAccordion boardAccordionList={accordionInfo} key={content.seq}/>
      })}
      <Box ref={target} height='100px' >{loading ? <Container /> : ""}</Box>
    </NtContainer>
  )
}

const NtContainer = styled(Container) `
  white-space: pre-line;
`