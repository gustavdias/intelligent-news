import React from "react";
import NewsCard from "../NewsCard/NewsCard";
import { Grid, Grow, Typography } from "@material-ui/core";
import useStyles from "./NewsCardsStyles";

const infoCards = [
  {
    color: "#91121D",
    title: "Latest News",
    text: "Give me the latest news",
    index: "1",
  },
  {
    color: "#457b9d",
    title: "News by Categories",
    info:
      "Business, Entertainment, General, Health, Science, Sports, Technology",
    text: "Give me the latest Technology news",
    index: "2",
  },
  {
    color: "#264653",
    title: "News by Terms",
    info: "Bitcoin, PlayStation 5, Smartphones, Donald Trump...",
    text: "What's up with PlayStation 5",
    index: "3",
  },
  {
    color: "#1d3557",
    title: "News by Sources",
    info: "CNN, Wired, BBC News, Time, IGN, Buzzfeed, ABC News...",
    text: "Give me the news from CNN",
    index: "4",
  },
];

const NewsCards = ({ articles, activeArticle }) => {
  //You use useStyles because makeStyles from NewsCardsStyles.js creates a hook that you can call here on the top of your component:
  const classes = useStyles();
  //useStyles() calls it as a hook.

  //If there are no articles, show instructions:
  if (!articles.length) {
    return (
      <Grow in>
        <Grid
          className={classes.container}
          container
          alignItems="stretch"
          spacing={3}
        >
          {infoCards.map((infoCard) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              lg={3}
              className={classes.infoCard}
              key={infoCard.index}
            >
              <div
                className={classes.card}
                style={{ backgroundColor: infoCard.color }}
              >
                <Typography variant="h5" component="h5">
                  {infoCard.title}
                </Typography>
                {/* if there is info, show the Typography / infoCard.title.split(' ')[2] splits the title into a array and grabs the third word */}
                {infoCard.info ? (
                  <Typography variant="h6" component="h6">
                    <strong>{infoCard.title.split(" ")[2]}</strong>: <br />
                    {infoCard.info}
                  </Typography>
                ) : null}
                <Typography variant="h6" component="h6">
                  Try saying: <br /> <i>{infoCard.text}</i>
                </Typography>
              </div>
            </Grid>
          ))}
        </Grid>
      </Grow>
    );
  }
  return (
    <Grow in>
      <Grid
        className={classes.container}
        container
        alignItems="stretch"
        spacing={3}
      >
        {articles.map((article, i) => (
          <Grid item xs={12} sm={6} md={4} lg={3} style={{ display: "flex" }}>
            <NewsCard article={article} activeArticle={activeArticle} i={i} />
          </Grid>
        ))}
      </Grid>
    </Grow>
  );
};

export default NewsCards;
