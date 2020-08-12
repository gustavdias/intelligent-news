import React, { useState, useEffect, createRef } from "react";
import {
  Card,
  CardActions,
  CardActionArea,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";
import useStyles from "./NewsCardStyles";
import classNames from "classnames";

const NewsCard = ({
  article: { description, publishedAt, source, title, url, urlToImage },
  activeArticle,
  i,
}) => {
  const classes = useStyles();

  // createRef for each specific card/article and put it in a Array
  //store them inside of an array
  const [elRefs, setElRefs] = useState([]);
  // -50 is for giving some space above the card that was scrolled onto
  const scrollToRef = (ref) => window.scroll(0, ref.current.offsetTop - 50);
  //create references after useEffect(componentDidMount)
  useEffect(() => {
    window.scroll(0, 0);
    // Array(20) creates a array with 20 elements and fills it with nothing, then it use .map() over each element.
    // leaving the fist parameter empty  ("_" means that the parameter will not be used), because here I am only concerned with index.
    // if j already exists you are going to keep it, but if not, you are going to create a new ref for it (createRef())
    setElRefs((refs) =>
      Array(20)
        .fill()
        .map((_, j) => refs[j] || createRef())
    );
  }, []);

  //Now that references here created, alan can scroll to them, the second useEffect() is for that. It will run every time that alan starts reading a new article (equivalent to componentDidUpdate).
  useEffect(() => {
    //if article exist and has a reference, scroll to that reference
    if (i === activeArticle && elRefs[activeArticle]) {
      scrollToRef(elRefs[activeArticle]);
    }
    //that is why it will listen for changes in i, activeArticle, elRefs (equivalent to componentDidUpdate, but more specific)
  }, [i, activeArticle, elRefs]);
  return (
    <Card
      ref={elRefs[i]}
      className={classNames(
        classes.card,
        activeArticle === i ? classes.activeCard : null
      )}
    >
      <CardActionArea href={url} target="_blank">
        <CardMedia
          className={classes.media}
          //If there is no image for the article, show this generic image: news
          image={urlToImage || "../../images/news.png"}
        />
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary" component="h2">
            {new Date(publishedAt).toDateString()}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="h2">
            {source.name}
          </Typography>
        </div>
        <Typography className={classes.title} gutterBottom variant="h5">
          {title}
        </Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary">
          Learn More
        </Button>
        <Typography variant="h5" color="textSecondary">
          {i + 1}
        </Typography>
      </CardActions>
    </Card>
  );
};

export default NewsCard;
