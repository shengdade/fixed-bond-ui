import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

function UserCard({ userInfo }) {
  if (!userInfo) return <CircularProgress />;

  return (
    <Card sx={{ my: 2 }}>
      <CardHeader title="User" />
      <CardContent>
        <Typography>
          Amount Deposited: {userInfo.amountDeposited.toNumber()}
        </Typography>
        <Typography>Deposited On: {userInfo.depositedOn.toNumber()}</Typography>
        <Typography>Lock Period: {userInfo.lockPeriod.toNumber()}</Typography>
      </CardContent>
      <CardActions>
        <Box sx={{ flex: 1 }}>
          <Button size="small" color="warning">
            Emergency Withdraw
          </Button>
        </Box>
        <Button size="small">Withdraw</Button>
        <Button size="small">Deposit</Button>
      </CardActions>
    </Card>
  );
}

export default UserCard;
