import React, { useState, useEffect } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";

//used index.js to enable the import bellow:
import { NewsCards, Modal } from "./components";
// import NewsCards from "./components/NewsCards/NewsCards";
// import Modal from "./components/Modal/Modal"

import { Typography } from "@material-ui/core";

// import classes from "*.module.css";
import useStyles from "./AppStyles";
import wordsToNumbers from "words-to-numbers";
import logo from "./images/android-chrome-512x512.png";

const alanKey =
  "c52722f66a1572bcb9cc640a84b7ec292e956eca572e1d8b807a3e2338fdd0dc/stage";
const App = () => {
  const [activeArticle, setActiveArticle] = useState(0);
  const [newsArticles, setNewsArticles] = useState([]);
  //!You stopped here! After, create a button/command to open instructions
  const [isOpen, setIsOpen] = useState(false);

  const classes = useStyles();
  useEffect(() => {
    alanBtn({
      key: alanKey, //number is the number of the article inside articles
      onCommand: ({ command, articles, number }) => {
        if (command === "newHeadlines") {
          setNewsArticles(articles);
          setActiveArticle(-1);
        } else if (command === "instructions") {
          setIsOpen(true);
        } else if (command === "highlight") {
          setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
        } else if (command === "open") {
          //wordsToNumbers convert string to number
          const parsedNumber =
            number.length > 2
              ? wordsToNumbers(number, { fuzzy: true })
              : number;
          const article = articles[parsedNumber - 1];

          if (parsedNumber > 20) {
            alanBtn().playText(
              "Please try that again... There are only 20 articles that you can choose from"
            );
          } else if (article) {
            window.open(article.url, "_blank");
            alanBtn().playText("Opening...");
          } else {
            alanBtn().playText("Please try that again...");
          }
        }
      },
    });
  }, []);
  return (
    <div>
      <div className={classes.logoContainer}>
        {newsArticles.length ? (
          <div className={classes.infoContainer}>
            <div className={classes.card}>
              <Typography variant="h5" component="h2">
                Try saying: <br />
                <br />
                Open article number [4]
              </Typography>
            </div>
            <div className={classes.card}>
              <Typography variant="h5" component="h2">
                Try saying: <br />
                <br />
                Go back
              </Typography>
            </div>
          </div>
        ) : null}
        <img
          src="https://is5-ssl.mzstatic.com/image/thumb/Purple115/v4/80/48/e3/8048e37d-0d91-b1c4-b52f-9a9f2a5b2519/source/512x512bb.jpg"
          className={classes.alanLogo}
          alt="ai logo"
        />
      </div>
      <NewsCards articles={newsArticles} activeArticle={activeArticle} />

      <Modal isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* If there isn't any news article show footer on big lg screens */}
      {!newsArticles.length ? (
        <div className={classes.footer}>
          <Typography variant="body1" component="h2">
            Created by
            <a className={classes.link} href="https://www.gustavodias.xyz">
              {" "}
              Gustavo Dias
            </a>{" "}
            -
          </Typography>
          <img
            className={classes.image}
            src={logo}
            height="25px"
            alt="GD Logo"
          />
        </div>
      ) : null}
    </div>
  );
};

export default App;
