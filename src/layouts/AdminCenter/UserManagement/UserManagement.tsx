import {
  Container,
  TableBody,
  TableHead,
  Typography,
  Button,
} from "@mui/material";
import styles from "@styles/common.module.scss";
import { Table } from "@components/ui";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { userList, removeUser } from "@common/api/adm/user";
import styled from "@emotion/styled";
import { Spinner } from "@components/ui";
import dateFormat from "dateformat";
import { UserModifyModal } from "@components/admin-center/UserModifyModal";
import { useSnackbar } from "@hooks/useSnackbar";
import { useDialog } from "@hooks/useDialog";

const headRows = [
  { name: "회원번호" },
  { name: "아이디" },
  { name: "이름" },
  { name: "성별" },
  { name: "생년월일" },
  { name: "계정생성일" },
  { name: "핸드폰번호" },
  { name: "문자수신동의" },
  { name: "메일수신동의" },
  { name: "로그인실패횟수" },
  { name: "로그인잠김여부" },
  { name: "유저수정일" },
  { name: "암호변경일" },
  { name: "가입구분" },
  { name: "수정" },
  { name: "삭제" },
];

export function UserManagement() {
  const router = useRouter();
  const snackbar = useSnackbar();
  const dialog = useDialog();
  const [page, setPage] = useState(0);
  const { data, error, mutate } = userList({ page });
  const [userSeq, setUserSeq] = useState<number | null>(null);
  const [openUserModifyModal, setopenUserModifyModal] = useState(false);

  const onClickRemoveUser = async (userSeq: number) => {
    try {
      const dialogConfirmed = await dialog({
        title: '유저 삭제하기',
        description: '정말로 삭제하시겠습니까?',
        confirmText: '삭제하기',
        cancelText: '취소'
      });
      if (dialogConfirmed) {
        await removeUser(userSeq);
        snackbar({ variant: "success", message: "성공적으로 삭제되었습니다." });
        await mutate();
      }
    } catch (e: any) {
      snackbar({ variant: "error", message: e.data.message });
    }
  };

  const onClickModifyUser = async (seq: number) => {
    setUserSeq(seq);
    setopenUserModifyModal(true);
  };

  useEffect(() => {
    const { page } = router.query;
    setPage(!isNaN(Number(page)) ? Number(page) : 0);
  }, [router.query]);

  const onChangePage = async (page: number) => {
    await router.push({
      pathname: router.pathname,
      query: {
        page,
      },
    });
  };

  const handleModalClose = async (isSubmit: boolean) => {
    if (openUserModifyModal) {
      setopenUserModifyModal(false);
      await mutate();
    }
  };

  if (error) return <div>Error</div>;
  if (!data) return <Spinner />;

  return (
    <div>
    {/* <Container className={styles.globalContainer}> */}
      <UserTypo variant="h5">회원 목록</UserTypo>
      <Table
        pagination={true}
        totalNum={data.totalElements}
        page={data.number}
        onChangePage={onChangePage}
        size="small"
      >
        <TableHead>
          <UserTableRow>
            {headRows.map(({ name }: { name: string }) => (
              <UserTitleTableCell key={name} align="center">
                {name}
              </UserTitleTableCell>
            ))}
          </UserTableRow>
        </TableHead>

        <TableBody>
          {data.content.map((user) => (
            <TableRow key={user.seq} hover>
              <UserTableCell>{user.seq}</UserTableCell>
              <UserTableCell>{user.username}</UserTableCell>
              <UserTableCell>{user.name}</UserTableCell>
              <UserTableCell>{user.gender}</UserTableCell>
              <UserTableCell>
                {dateFormat(user.birth, "yyyy-mm-dd")}
              </UserTableCell>
              <UserTableCell>
                {dateFormat(user.createdDtime, "isoDate")}
              </UserTableCell>
              <UserTableCell>{user.phone}</UserTableCell>
              <UserTableCell>{user.smsYn}</UserTableCell>
              <UserTableCell>{user.emailYn}</UserTableCell>
              <UserTableCell>{user.loginFailedCount}</UserTableCell>
              <UserTableCell>{user.failedYn}</UserTableCell>
              <UserTableCell>
                {dateFormat(user.modifiedDtime, "isoDate")}
              </UserTableCell>
              <UserTableCell>
                {dateFormat(user.lastPwUpdDtime, "isoDate")}
              </UserTableCell>
              <UserTableCell>{user.regCategory}</UserTableCell>
              <UserTableCell>
                <Button
                  variant="text"
                  color="neutral"
                  size="small"
                  onClick={() => onClickModifyUser(user.seq)}
                >
                  수정
                </Button>
              </UserTableCell>

              <UserTableCell>
                <Button
                  variant="text"
                  color="warning"
                  size="small"
                  onClick={() => onClickRemoveUser(user.seq)}
                >
                  삭제
                </Button>
              </UserTableCell>
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
    {/* </Container> */}
    </div>
  );
}

const UserTypo = styled(Typography)`
  margin-bottom: 12px;
  font-weight: 700;
`;

const UserTableRow = styled(TableRow)`
  white-space: nowrap;
`;

const UserTitleTableCell = styled(TableCell)`
  height: 1px;
  position: relative;
  font-weight: bold;
`;

const UserTableCell = styled(TableCell)`
  white-space: nowrap;
  text-align: center;
  padding-top: 10px;
  margin: 0;
`;
