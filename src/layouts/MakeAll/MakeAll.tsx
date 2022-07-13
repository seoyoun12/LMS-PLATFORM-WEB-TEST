import { Container } from "@mui/material"
import styled from "styled-components"

export function MakeAll() {

  return (
    <>
      {/* <div>여기서 만들자</div> */}
      <MakeBlock>1</MakeBlock>
      <MakeBlock>2</MakeBlock>
      <MakeBlock>3</MakeBlock>
      <MakeBlock>4</MakeBlock>
      <MakeBlock>5</MakeBlock>
      <MakeBlock>6</MakeBlock>
    </>
  )

}

// const MakeBlock = styled(Container)`
const MakeBlock = styled.div`
  box-sizing: border-box;
  border: 1px solid black;
  width: 20%;
  height: 300px;
  display: flex;
  position: relative;
  float: left;
`