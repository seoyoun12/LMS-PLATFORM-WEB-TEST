import { DropDownMenu } from "../TopNavigation";
import DropdownItem from "./DropdownItem";

interface Props {
  list : {
    title: string;
    href: string;
    isExternal?: boolean;
  }[];
  
  
}

export default function DropdownList({list}: Props) {
  return (
    <DropDownMenu>
      { list.map((item) => (<DropdownItem key={item.title} href={item.href} title={item.title} isExternal={item.isExternal}/>)) }
    </DropDownMenu>
  )
}
