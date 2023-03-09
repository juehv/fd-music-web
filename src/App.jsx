/* App.jsx */
import * as React from "react";
import { useState, forwardRef } from "react";
import {
  App,
  Page,
  Navbar,
  NavbarBackLink,
  Tabbar,
  TabbarLink,
  BlockTitle,
  Block,
  Range,
  Icon,
  List,
  ListItem,
  Toggle,
  useTheme,
} from "konsta/react";
import {
  EnvelopeFill,
  Calendar,
  CloudUploadFill,
} from "framework7-icons/react";
import { MdEmail, MdToday, MdFileUpload } from "react-icons/md";

import Plyr from "./PlyrComponent";

// audio source
// const streamUrl = "https://dl.jensheuschkel.de/title2.mp3"; //<-- inside plyr component

export default function MyApp() {
  const [activeTab, setActiveTab] = useState("tab-1");
  const [isTabbarLabels, setIsTabbarLabels] = useState(true);
  const [isTabbarIcons, setIsTabbarIcons] = useState(false);

  const theme = useTheme();

  return (
    <App theme={theme}>
      <Page>
        <Navbar title="ChoreoTunes" />

        {/* <Tabbar
          labels={isTabbarLabels}
          icons={isTabbarIcons}
          className="left-0 bottom-0 fixed"
        >
          <TabbarLink
            active={activeTab === "tab-1"}
            onClick={() => setActiveTab("tab-1")}
            icon={
              <Icon
                ios={<Calendar className="w-7 h-7" />}
                material={<MdToday className="w-6 h-6" />}
              />
            }
            label={"Splits"}
          />
          <TabbarLink
            active={activeTab === "tab-2"}
            onClick={() => {
              setActiveTab("tab-2");
            }}
            icon={
              <Icon
                ios={<CloudUploadFill className="w-7 h-7" />}
                material={<MdFileUpload className="w-6 h-6" />}
              />
            }
            label={"Passages"}
          />
        </Tabbar> */}

        <Block>
          <Plyr />
        </Block>
        {/* 
        <List strong inset>
          <ListItem
            title="Tabbar Labels"
            after={
              <Toggle
                checked={isTabbarLabels}
                onChange={() => {
                  setIsTabbarLabels(!isTabbarLabels);
                }}
              />
            }
          />
          <ListItem
            title="Tabbar Icons"
            after={
              <Toggle
                checked={isTabbarIcons}
                onChange={() => {
                  setIsTabbarIcons(!isTabbarIcons);
                  console.log("1");

                  // clearInterval(plrInterval);
                  // ref.current.plyr.stop();
                  // ref.current.plyr.forward(35);

                  // ref.current.plyr.on("seeked", () => {
                  //   ref.current.plyr.volume = 1.0;
                  //   ref.current.plyr.play();

                  //   plrInterval = setInterval(() => {
                  //     console.log(ref.current.plyr.currentTime);
                  //     if (ref.current.plyr.playing) {
                  //       if (ref.current.plyr.currentTime > 39)
                  //         if (ref.current.plyr.volume > 0) {
                  //           ref.current.plyr.volume =
                  //             ref.current.plyr.volume - 0.05;
                  //         } else {
                  //           ref.current.plyr.togglePlay();
                  //           ref.current.plyr.volume = 1.0;
                  //         }
                  //     } else {
                  //       clearInterval(plrInterval);
                  //     }
                  //   }, 100);

                  // setTimeout(() => {
                  //   if (ref.current.plyr.playing) {
                  //     for (let i = 100; i > 0; i--) {
                  //       ref.current.plyr.volume = i / 100;
                  //       //sleep(100);
                  //     }
                  //     ref.current.plyr.togglePlay();
                  //   }
                  // }, 2000);
                  // });
                }}
              />
            }
          />
        </List>

        {activeTab === "tab-1" && (
          <Block strong inset className="space-y-4">
            <p>
              <b>Tab 1</b>
            </p>
            <p>
              <span>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias
                accusantium necessitatibus, nihil quas praesentium at quibusdam
                cupiditate possimus et repudiandae dolorum delectus quo,
                similique voluptatem magni explicabo adipisci magnam ratione!
              </span>
            </p>
          </Block>
        )}
        {activeTab === "tab-2" && (
          <Block strong inset className="space-y-4">
            <p>
              <b>Tab 2</b>
            </p>
            <p>
              <span>
                Dicta beatae repudiandae ab pariatur mollitia praesentium fuga
                ipsum adipisci, quia nam expedita, est dolore eveniet, dolorum
                obcaecati? Veniam repellendus mollitia sapiente minus saepe
                voluptatibus necessitatibus laboriosam incidunt nihil autem.
              </span>
            </p>
          </Block>
        )} */}
      </Page>
    </App>
  );
}
