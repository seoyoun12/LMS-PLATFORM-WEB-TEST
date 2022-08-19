import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link } from "@components/common";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { signIn } from "@common/api/auth";
import { useSetRecoilState } from "recoil";
import { isLoginState } from "@common/recoil";
import { useIsLoginStatus } from "@hooks/useIsLoginStatus";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSnackbar } from "@hooks/useSnackbar";
import { regCategory } from "@common/api/auth/signUp";
import { userInfo } from "@common/recoil/user";
import { loginType } from "@common/api/auth/signIn";
import { UserRole } from "@common/api/user";


export function SignIn() {
  const router = useRouter();
  const isLogin = useIsLoginStatus();
  const setIsLoginState = useSetRecoilState(isLoginState);
  const setUsetInfo = useSetRecoilState(userInfo)
  // const [loginType , setLoginType] = React.useState<regCategory>("TYPE_TRANS_EDU")
  const snackbar = useSnackbar();

  useEffect(() => {
    if (isLogin) {
      router.push("/");
    }
  }, [isLogin]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get("username") as string;
    const password = data.get("password") as string;

    try {
      const res = await signIn(username, password, loginType.TYPE_TRAFFIC_SAFETY_EDU);
      if (res.success) {
        setIsLoginState(true);
        setUsetInfo({name:res.data.username , role:[...res.data.roles as unknown as UserRole[]] }) // api가 있었음 필요없을듯
        snackbar({ variant: "success", message: "로그인이 완료되었습니다." });
        return router.push("/");
      }
    } catch (e: any) {
      snackbar({ variant: "error", message: e.data.message });
    }
  };

  return (
    <Container
      component="div"
      maxWidth="xs"
      sx={{
        marginBottom: 8,
      }}
    >
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          로그인
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          {/* <Typography component="div" variant="button" onClick={()=>setLoginType("TYPE_TRANS_EDU")} >저상/운수</Typography>
          <Typography component="div" variant="button" onClick={()=>setLoginType("TYPE_TRAFFIC_SAFETY_EDU")} >도민</Typography> */}
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="아이디"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="비밀번호"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            로그인
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                비밀번호를 잊으셨나요?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/sign-up" variant="body2">
                {"회원 가입하기"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
