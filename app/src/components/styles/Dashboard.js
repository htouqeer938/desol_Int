import { makeStyles } from "@material-ui/core/styles";

const DashboardStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: "flex",
        overflow: "auto",
        flexDirection: "column"
    },
    tableDiv: {
        padding: 20
    },
    formTop: {
        paddingTop: 20
    },
    radioGroup: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row'
    },
    heading:{
        textAlign: 'center'
    }
}));

export default DashboardStyles;
