/* App.jsx */
import React, { useState } from "react";
import {
  App,
  Page,
  Navbar,
  NavbarBackLink,
  Tabbar,
  TabbarLink,
  Block,
  Icon,
  List,
  ListItem,
  Toggle,
} from "konsta/react";
import {
  EnvelopeFill,
  Calendar,
  CloudUploadFill,
} from "framework7-icons/react";
import { MdEmail, MdToday, MdFileUpload } from "react-icons/md";

import { PlayButton, Timer } from 'react-soundplayer/components';

// it's just an alias for `withSoundCloudAudio` but makes code clearer
import { withCustomAudio } from 'react-soundplayer/addons';

// audio source
const streamUrl = './title1.mp3';

// some track meta information
const trackTitle = 'Great song by random artist';

const AWSSoundPlayer = withCustomAudio(props => {
  const { trackTitle } = props;

  return (
    <div>
      <PlayButton {...props} />
      <h2>{trackTitle}</h2>
      <Timer {...props} />
    </div>
  );
});


export default function MyApp() {
  const [activeTab, setActiveTab] = useState("tab-1");
  const [isTabbarLabels, setIsTabbarLabels] = useState(true);
  const [isTabbarIcons, setIsTabbarIcons] = useState(false);


  return (
    <App theme="ios">
      <Page>
        <Navbar title="FD Music" />


        <Tabbar
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
        </Tabbar>

        <Block>
          <AWSSoundPlayer
            streamUrl={streamUrl}
            trackTitle={trackTitle}
            preloadType="auto" />
        </Block>

        <List strong inset>
          <ListItem
            title="Tabbar Labels"
            after={
              <Toggle
                checked={isTabbarLabels}
                onChange={() => setIsTabbarLabels(!isTabbarLabels)}
              />
            }
          />
          <ListItem
            title="Tabbar Icons"
            after={
              <Toggle
                checked={isTabbarIcons}
                onChange={() => setIsTabbarIcons(!isTabbarIcons)}
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
        )}
      </Page>
    </App>
  );
}
