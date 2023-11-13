import { TablePagination } from '@mui/material';

interface Props {
  page: number;
  rowsPerPage: number;
  count: number | null;
  setPage: (page: number) => void;
  setRowsPerPage: (rowsPerPage: number) => void; 
}

export default function CourseTablePagination({page,count,rowsPerPage,setPage,setRowsPerPage}:Props) {

  const onChangePage = (_,page: number) => {
    setPage(page);
  };
  const onChangeRowsPerPage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+e.target.value);
    setPage(0);
  }
  return (
    <TablePagination
        page={page}
        count={count ?? 0}
        rowsPerPage={rowsPerPage}
        onPageChange={onChangePage}
        onRowsPerPageChange={onChangeRowsPerPage}
        rowsPerPageOptions={[1, 2, 5, 9, 10, 25]}
        labelRowsPerPage={<span>페이지당 행의 개수</span>}
        labelDisplayedRows={({ page }) => {return `현재 페이지: ${page + 1}`;}}
        backIconButtonProps={{ color: "secondary" }}
        nextIconButtonProps={{ color: "secondary" }}
        SelectProps={{ native: true }}
        showFirstButton={true}
        showLastButton={true}
        sx={{width:'100%',display:'flex',justifyContent:'center',marginTop:'2rem'}}
      />
  )
}
