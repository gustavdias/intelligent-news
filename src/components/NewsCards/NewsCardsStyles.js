import { makeStyles } from "@material-ui/core/styles";
const NewsCardsStyles = makeStyles({
  container: {
    padding: "0 1%",
    width: "100%",
    // margin: "0",
    marginBottom: "50px"
  },
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "100%",
    padding: "10%",
    // margin: "10%",
    borderRadius: 15,
    color: "#F1FAEE",
  },
  infoCard: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    // textSizeAdjust: "auto",
    margin: "5"
  },
  space:{
    margin: "10px 0",
  }
});

export default NewsCardsStyles;
