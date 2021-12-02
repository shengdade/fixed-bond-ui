import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import CardHeader from "@mui/material/CardHeader";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

function BondCard({ bondInfo }) {
  if (!bondInfo) return <CircularProgress />;

  return (
    <Card sx={{ my: 2 }}>
      <CardHeader
        title="Bond"
        subheader={`Minimum Deposit: ${bondInfo.minimumDeposit.toNumber()}`}
        action={
          bondInfo.isActive ? (
            <Chip label="Active" variant="outlined" color="success" />
          ) : (
            <Chip label="Inactive" variant="outlined" />
          )
        }
      />
      <CardContent>
        <Typography>
          1 Month Interest: {bondInfo.interestOneMonth.toNumber()}
        </Typography>
        <Typography>
          3 Month Interest: {bondInfo.interestThreeMonth.toNumber()}
        </Typography>
        <Typography>
          6 Month Interest: {bondInfo.interestSixMonth.toNumber()}
        </Typography>
        <Typography>
          12 Month Interest: {bondInfo.interestTwelveMonth.toNumber()}
        </Typography>
      </CardContent>
      <CardActions>
        <Box sx={{ flex: 1 }}>
          <Button size="small" color="warning">
            Deposit Rewards
          </Button>
        </Box>
        <Button size="small">Update</Button>
        <Button size="small">Setup</Button>
      </CardActions>
    </Card>
  );
}

export default BondCard;
