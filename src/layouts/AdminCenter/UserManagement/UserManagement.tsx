import {
  Container,
  TableBody,
  TableHead,
  Typography,
  Button,
  Box,
  RadioGroup,
  FormControlLabel,
  Radio,
  Chip,
  InputBase,
  IconButton,
  TooltipProps,
  Tooltip,
  tooltipClasses,
  Backdrop,
} from "@mui/material";
import styles from "@styles/common.module.scss";
import { Table } from "@components/ui";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useRef, useState } from "react";
import { userList, removeUser } from "@common/api/adm/user";
import styled from "@emotion/styled";
import { Spinner } from "@components/ui";
import dateFormat from "dateformat";
import { UserModifyModal } from "@components/admin-center/UserModifyModal";
import { useSnackbar } from "@hooks/useSnackbar";
import { useDialog } from "@hooks/useDialog";
import {
  authoritiesType,
  regCategoryType,
  registerType,
} from "@common/api/user";
import { ProductStatus } from "@common/api/course";
import { NumberFormat } from "xlsx";
import { grey } from "@mui/material/colors";
import SearchIcon from "@mui/icons-material/Search";
import ReplayIcon from "@mui/icons-material/Replay";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import { getExcelUserList } from "@common/api/adm/excel";

const userConfig = [
  { label: "실명가입", value: regCategoryType.TYPE_TRANS_EDU },
  { label: "핸드폰가입", value: regCategoryType.TYPE_TRAFFIC_SAFETY_EDU },
];

const radioConfig = [
  // { name: '전체', value: '' }, // Type이 required
  { name: "저상/운수", value: registerType.TYPE_TRANS_EDU },
  { name: "관리자", value: registerType.TYPE_TRAFFIC_SAFETY_EDU }, // 차후 도민
];

// TEST
// const radioConfig = [
//   { name: '회원(전체)', value: null },
//   { name: '회원(운수)', value: authoritiesType.ROLE_TRANS_USER },
//   { name: '회원(도민)', value: authoritiesType.ROLE_TRAFFIC_SAFETY_USER },
//   { name: '관리자(운수)', value: authoritiesType.ROLE_TRANS_MANAGER },
//   // { name: '관리자(도민)', value: authoritiesType.ROLE_TRAFFIC_SAFETY_MANAGER },
//   { name: '통합관리자', value: authoritiesType.ROLE_ADMIN },
// ];

const headRows: {
  name: string;
  align: "inherit" | "left" | "center" | "right" | "justify";
  width: string;
}[] = [
  { name: "No", align: "center", width: "6.5%" },
  { name: "아이디", align: "center", width: "19%" },
  { name: "이름", align: "center", width: "19.5%" },
  { name: "생년월일", align: "center", width: "14%" },
  { name: "핸드폰번호", align: "center", width: "19%" },
  { name: "가입구분", align: "center", width: "9.5%" },
  { name: "가입날짜", align: "center", width: "14%" },
];

export function UserManagement() {
  const router = useRouter();
  const snackbar = useSnackbar();
  const dialog = useDialog();
  const [page, setPage] = useState(0);
  const [typeValue, setTypeValue] = useState(registerType.TYPE_TRANS_EDU);
  // const [authorities, setAuthorities] = useState(null);
  // const [authoritiesValue, setAuthoritiesValue] = useState(
  //   authoritiesType.ROLE_TRANS_USER || null
  // );
  const [userSeq, setUserSeq] = useState<number | null>(null);
  const [openUserModifyModal, setopenUserModifyModal] = useState(false);
  const date = new Date();
  const year = date.getFullYear();
  const [loading, setLoading] = useState(false);

  // 검색기능
  const [notFound, setNotFound] = useState(false);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const [keyword, setKeyword] = useState<string>("");
  const [nameOrUsername, setNameOrUsername] = useState<string>(""); //이름 혹은 아이디
  const { data, error, mutate } = userList({
    page,
    registerType: typeValue,
    // authorities: authorities,
    // nameOrUsername,
    keyword,
  });
  // console.log('회원정보 Data : ', data);
  // console.log('회원정보 Data.content : ', data.content);
  // console.log(
  //   '회원정보 Data.content 1 : ',
  //   data.content.filter(item => item.name === '이세정')
  // );

  // console.log('authorities : ', authorities);
  // console.log(
  //   '회원정보 Data.content authorities 2 : ',
  //   data?.content.filter(item => item.authorities === authorities)
  // );

  // console.log('data?.content[0].authorities : ', data?.content[0].authorities);

  // console.log(
  //   'map data : ',
  //   data?.content.map(item => item.authorities[0] === authorities)
  // );

  // console.log(
  //   'map data 2 : ',
  //   data?.content.map(item =>
  //     data?.content.filter(item => item.authorities[0] === authorities)
  //   )
  // );

  // console.log(
  //   'authorities 필터 데이터 : ',
  //   data?.content.filter(item => item.authorities[0] === authorities)
  // );

  // console.log(data.filter());

  // console.log('authoritiesValue : ', authorities);

  // 검색기능
  const handleSearch = async (event: FormEvent, isReload = false) => {
    event.preventDefault();
    setNotFound(false);
    if (isReload) {
      // setKeyword(null);
      setPage(0);
      // return mutate();
      return setKeyword("");
    }

    if (searchInputRef.current) {
      setKeyword(searchInputRef.current.value);
      // setNameOrUsername(searchInputRef.current.value);
    }
  };
  useEffect(() => {
    if (data) {
      data.content.length === 0 && setNotFound(true);
    }
  }, [data]);
  // 삭제. 기능 이동. modal 안쪽으로.
  // const onClickRemoveUser = async (userSeq: number) => {
  //   try {
  //     const dialogConfirmed = await dialog({
  //       title: '유저 삭제하기',
  //       description: (
  //         <div>
  //           <div>삭제시 회원의 모든 정보가 영구적으로 삭제됩니다.</div>
  //           <div>정말로 삭제하시겠습니까?</div>
  //           <div style={{ color: 'red', fontSize: '14px' }}>*복구가 불가능합니다.*</div>
  //         </div>
  //       ),
  //       confirmText: '삭제하기',
  //       cancelText: '취소',
  //     });
  //     if (dialogConfirmed) {
  //       await removeUser(userSeq);
  //       snackbar({ variant: 'success', message: '성공적으로 삭제되었습니다.' });
  //       await mutate();
  //     }
  //   } catch (e: any) {
  //     snackbar({ variant: 'error', message: e.data.message });
  //   }
  // };

  // birth 변경. 지금은 백엔드에서 yy-mm-dd로 보내주는중. yyyy-mm-dd로 변경시도.
  // console.log('!!!!!!!!!!!!! : ', data?.content.find(item => item.seq === userSeq).birth);
  // const ymdBirth = data?.content.find(item => item.seq === userSeq)?.birth;
  const onClickModifyUser = async (seq: number) => {
    setUserSeq(seq);
    // const birth =
    //   Number(ymdBirth.split('-', 1)) < 1000
    //     ? Number(ymdBirth?.slice(0, 2)) + Number(2000) > year
    //       ? 19 + ymdBirth
    //       : 20 + ymdBirth
    //     : ymdBirth;
    // setBirth(birth);
    // console.log('birth : ', birth);
    setopenUserModifyModal(true);
  };

  // 엑셀
  const onClickExcelDownload = async () => {
    const a = document.createElement("a");
    setLoading(true);
    try {
      const data = await getExcelUserList();
      const excel = new Blob([data]);
      a.href = URL.createObjectURL(excel);
      a.download = "충남_관리자_회원목록_리스트.xlsx";
      a.click();
      a.remove();
      URL.revokeObjectURL(a.href);
      snackbar({ variant: "success", message: "다운로드 완료" });
      setLoading(false);
    } catch (e) {
      snackbar({ variant: "error", message: e.data.message });
      setLoading(false);
    }
  };

  // pagination
  // useEffect(() => {
  //   const { page } = router.query;
  //   setPage(!isNaN(Number(page)) ? Number(page) : 0);
  // }, [router.query]);

  // const onChangePage = async (page: number) => {
  //   await router.push({
  //     pathname: router.pathname,
  //     query: {
  //       page,
  //     },
  //   });
  // };

  // pagination 02
  const onChangePage = (page: number) => {
    setPage(page);
  };

  // modal 제어
  const handleModalClose = async (isSubmit: boolean) => {
    if (openUserModifyModal) {
      setopenUserModifyModal(false);
      await mutate();
    }
  };

  if (error) return <div>Error</div>;
  if (!data) return <Spinner />;

  return (
    <Box>
      <Typography fontSize={30} fontWeight="bold">
        회원구분
      </Typography>

      <RadioGroup row sx={{ mb: 3 }}>
        {radioConfig.map(({ name, value }) => (
          <FormControlLabel
            key={name}
            label={name}
            value={value}
            // control={<Radio checked={authorities == value} />}
            control={<Radio checked={typeValue == value} />}
            // onClick={() => setAuthorities(value)}
            onClick={() => setTypeValue(value)}
          />
        ))}
      </RadioGroup>

      <SearchBox>
        <SearchContainer onSubmit={handleSearch}>
          <SearchInput
            inputRef={searchInputRef}
            placeholder="이름 또는 핸드폰번호 검색"
            size="small"
            type="search"
          />
          <IconButton type="submit">
            <SearchIcon />
          </IconButton>
        </SearchContainer>
        <ReloadButton
          size="small"
          color="neutral"
          variant="text"
          endIcon={<ReplayIcon htmlColor={grey[700]} />}
          onClick={(e) => handleSearch(e, true)}
        >
          전체 다시 불러오기
        </ReloadButton>
      </SearchBox>

      <Box display="flex">
        <Button
          variant="contained"
          color="success"
          sx={{ marginLeft: "auto" }}
          // onClick={() => snackbar({ variant: 'info', message: '준비중입니다.' })}
          onClick={onClickExcelDownload}
        >
          {loading ? (
            <Spinner fit={true} />
          ) : (
            <>
              <FileCopyIcon sx={{ marginRight: "4px" }} />
              회원목록 엑셀다운로드
            </>
          )}
        </Button>
      </Box>

      <Box mt={2} mb={2} fontSize={18} fontWeight="bold">
        {keyword !== "" && `검색어 : ${keyword}`}
      </Box>
      <Backdrop open={loading}>
        <Box
          display="flex"
          flexDirection="column"
          sx={{ background: "white", borderRadius: "4px", padding: "12px" }}
        >
          <Spinner fit={true} />
          <Box color="#246def" fontWeight="bold">
            다운로드가 오래걸릴수 있습니다 페이지를 이탈하지 마세요.
          </Box>
        </Box>
      </Backdrop>

      <UserTypography variant="h5">회원 목록</UserTypography>

      <Table
        pagination={true}
        totalNum={data.totalElements}
        page={data.number}
        onChangePage={onChangePage}
        size="small"
        sx={{ tableLayout: "fixed" }}
      >
        <TableHead>
          <TableRow>
            {headRows.map(
              ({
                name,
                align,
                width,
              }: {
                name: string;
                align: string;
                width: string;
              }) => (
                <UserTitleTableCell key={name} align="center" width={width}>
                  {name}
                </UserTitleTableCell>
              )
            )}
          </TableRow>
        </TableHead>

        <TableBody>
          {data.content.map((user) => (
            <TableRow
              key={user.seq}
              hover
              onClick={() => onClickModifyUser(user.seq)}
              sx={{ cursor: "pointer" }}
            >
              <UserTableCell align="center">{user.seq}</UserTableCell>
              <UserTableCell align="center">
                {regCategoryType.TYPE_TRANS_EDU === user.regCategory
                  ? "실명가입"
                  : user.username}
              </UserTableCell>

              <UserTableCell align="center">
                <NameBox title={user.name}>{user.name}</NameBox>
              </UserTableCell>

              <UserTableCell align="center">
                {/* 주민번호 뒷자리의 첫번째 번호 백엔드에서 줬으니 차후 수정할것. */}
                {Number(user.birth?.split("-", 1)) < 1000
                  ? Number(user.birth?.slice(0, 2)) + Number(2000) > year
                    ? 19 + user.birth
                    : 20 + user.birth
                  : user.birth}
              </UserTableCell>
              <UserTableCell align="center">{user.phone}</UserTableCell>
              {/* <UserTableCell>{user.smsYn}</UserTableCell> */}
              {/* <UserTableCell>{user.emailYn}</UserTableCell> */}
              {/* <UserTableCell>{user.loginFailedCount}</UserTableCell> */}
              {/* <UserTableCell>{user.failedYn}</UserTableCell> */}
              <UserTableCell align="center">
                {
                  userConfig.filter(
                    (item) => item.value === user.regCategory
                  )[0].label
                }{" "}
              </UserTableCell>
              <UserTableCell align="center">
                {user.createdDtime.slice(0, 10)}
              </UserTableCell>
              {/* <UserTableCell>
                <Chip
                  variant="outlined"
                  size="small"
                  label={user.status === ProductStatus.APPROVE ? '정상' : '중지'}
                  color={user.status === ProductStatus.APPROVE ? 'secondary' : 'default'}
                />
              </UserTableCell> */}

              {/* <UserTableCell>
                <Button
                  variant="text"
                  color="neutral"
                  size="small"
                  onClick={() => onClickModifyUser(user.seq)}
                >
                  수정
                </Button>
              </UserTableCell> */}

              {/* <UserTableCell>
                <Button
                  variant="text"
                  color="warning"
                  size="small"
                  onClick={() => onClickRemoveUser(user.seq)}
                >
                  삭제
                </Button>
              </UserTableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <UserModifyModal
        open={openUserModifyModal}
        handleClose={(isSubmit) => handleModalClose(isSubmit)}
        userData={data.content.find((item) => item.seq === userSeq)!}
        error={error}
      />
    </Box>
    // {/* </div> */}
  );
}

// 검색창 박스
const SearchBox = styled(Box)`
  /* border: 1px solid black; */
  margin-bottom: 30px;
`;

// 검색창
const SearchContainer = styled.form`
  display: flex;
  /* align-items: center; */
  width: 20%;
  padding: 4px 6px 0 10px;
  border-radius: 4px;
  border: 1px solid ${grey[300]};
`;

// 검색 Input창
const SearchInput = styled(InputBase)`
  width: 100%;
`;

// 검색창 되돌리기 버튼
const ReloadButton = styled(Button)`
  margin-top: 3px;
`;

// 회원 목록 글자
const UserTypography = styled(Typography)`
  margin-bottom: 30px;
  font-weight: 700;
`;

// 회원 목록 테이블의 title부분
const UserTitleTableCell = styled(TableCell)`
  font-weight: bold;
  background: #f5f5f5;
  border-right: 1px solid #f0f0f0;
  border-top: 1px solid #f0f0f0;

  &:last-child {
    border-right: 1px solid #f0f0f0;
  }
`;

// 회원 목록 테이블의 본문
const UserTableCell = styled(TableCell)`
  margin: 0;
  border-right: 1px solid #f0f0f0;

  &:first-of-type {
    background: #f5f5f5;
  }
`;

// 회원 이름. ellipsis 적용.
const NameBox = styled(Box)`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
`;
