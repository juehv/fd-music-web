/* App.jsx */
import * as React from "react";
import { useState, useEffect } from "react";
import {
  App,
  Page,
  Navbar,
  Block,
  Button,
  List,
  ListInput,
  ListItem,
  useTheme,
} from "konsta/react";

import { KeyIcon } from "@heroicons/react/24/solid";

import Plyr from "./PlyrComponent";
import metaData from "./MetaData";

export default function MyApp() {
  const theme = useTheme();

  const [tokenValid, setTokenValid] = useState(false);
  const [inputToken, setInputToken] = useState("");
  const [error, setError] = useState(false);

  // check if url has token, or if not, load token from last time
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get("token");
    if (tokenFromUrl) {
      setInputToken(tokenFromUrl);
      validateToken(tokenFromUrl);
    } else {
      const storedToken = JSON.parse(localStorage.getItem("token"));
      if (storedToken) {
        setInputToken(storedToken);
        validateToken(storedToken);
      }
    }
  }, []);

  // store token for next time if it was valus
  useEffect(() => {
    if (tokenValid) {
      localStorage.setItem("token", JSON.stringify(inputToken));
    }
    // eslint-disable-next-line
  }, [tokenValid]);

  // handle token input
  const handleInputChange = (event) => {
    setInputToken(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Check if the input token is valid
    validateToken(inputToken);
  };

  const validateToken = (token) => {
    if (token === metaData["access_token"]) {
      setTokenValid(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  // show interface depending on valid token
  return (
    <App theme={theme}>
      <Page>
        {tokenValid && (
          <>
            <Navbar title="ChoreoTunes" />
            <Block>
              <Plyr />
            </Block>
          </>
        )}
        {!tokenValid && (
          <>
            <Navbar title="Login to ChoreoTunes" />
            <Block>
              <List strong inset>
                {error && (
                  <ListItem
                    innerClassName="textred"
                    title="Music password is not valid."
                  />
                )}
                <ListInput
                  label="Password"
                  type="password"
                  value={inputToken}
                  onChange={handleInputChange}
                  placeholder="Music password"
                  media={<KeyIcon className="h-6 w-6" />}
                />
                <ListItem>
                  <Button onClick={handleSubmit}>Login</Button>
                </ListItem>
              </List>
            </Block>
          </>
        )}
      </Page>
    </App>
  );
}
