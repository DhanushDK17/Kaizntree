// DashboardCard.js
import { Grid, Typography } from '@mui/material';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import CategoryIcon from '@mui/icons-material/Category';


export const StatCard = ({ title, value, type }) => {
  return (
    <Grid container sx={{py: 1, color: "gray"}}>
        <Grid container justifyContent="space-between">
            <Grid item>
                {type === "category" ? <AccountTreeIcon/> : <CategoryIcon/>}
            </Grid>
            <Grid item>
                <Typography variant="body2" component="div">{title}</Typography>
            </Grid>
            <Grid item>
                <Typography variant="body2">{value}</Typography>
            </Grid>
        </Grid>
    </Grid>
  );
};

