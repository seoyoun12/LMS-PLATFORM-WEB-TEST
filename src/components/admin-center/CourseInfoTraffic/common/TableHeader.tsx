import { memo } from 'react'
import { InRow, InRowTitle, OutRow } from '../CourseInfomationTraffic';

interface Props {
  titleArray: string[];
}

const TableHeader = ({ titleArray }:Props) => {
  return (
        <OutRow>
          <InRow>
            {
              titleArray.map((title, index) => (
                <InRowTitle key={index}>{title}</InRowTitle>
              ))
            }
          </InRow>
        </OutRow>
  )
}

export default memo(TableHeader);

