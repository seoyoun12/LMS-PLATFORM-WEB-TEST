import { Container, Box } from '@mui/material';
import { BoardAccordion } from '@components/ui/BoardAccordion';
import { useInfiniteScroll } from '@hooks/useInfiniteScroll';

export function GuideBoardAuth() {

  const [target , loadedItem , loading] = useInfiniteScroll(`/post`,"TYPE_GUIDE_AUTH")

  return (
    <Container>
      {loadedItem && loadedItem.map((content) => {
        const accordionInfo = [{ 
          date: content.createdDtime, 
          name: content.subject, 
          children: [{ name: content.content}] 
        }]
        return <BoardAccordion boardAccordionList={accordionInfo}/>
      })}
      <Box ref={target} height='100px' >{loading ? <div /> : ""}</Box>
    </Container>
  )
}