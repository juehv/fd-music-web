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
import Plyr from "plyr";

export default function MyApp() {
  const [activeTab, setActiveTab] = useState("tab-1");
  const [isTabbarLabels, setIsTabbarLabels] = useState(true);
  const [isTabbarIcons, setIsTabbarIcons] = useState(false);

  const player = new Plyr("#player");
  player.source = {
    type: "audio",
    title: "Music",
    sources: [
      {
        src: "./title1.mp3",
        type: "audio/mp3",
      },
    ],
  };

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
              player.play();
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
              <span>
                Quod praesentium consequatur autem veritatis, magni alias
                consectetur ut quo, voluptatum earum in repellat! Id, autem!
                Minus suscipit, ad possimus non voluptatem aliquam praesentium
                earum corrupti optio velit tenetur numquam?
              </span>
              <span>
                Illo id ipsa natus quidem dignissimos odio dolore veniam,
                accusamus vel assumenda nulla aliquam amet distinctio! Debitis
                deserunt, et, cum voluptate similique culpa assumenda inventore,
                facilis eveniet iure optio velit.
              </span>
              <span>
                Maiores minus laborum placeat harum impedit, saepe veniam iusto
                voluptates delectus omnis consectetur tenetur ex ipsa error
                debitis aspernatur amet et alias! Sit odit cum voluptas quae?
                Est, omnis eos?
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
              <span>
                Officia pariatur qui, deleniti eum, et minus nisi aliquam nobis
                hic provident quisquam quidem voluptatem eveniet ducimus.
                Commodi ea dolorem, impedit eaque dolor, sint blanditiis magni
                accusantium natus reprehenderit minima?
              </span>
              <span>
                Dicta reiciendis ut vitae laborum aut repellendus quasi beatae
                nulla sapiente et. Quod distinctio velit, modi ipsam
                exercitationem iste quia eaque blanditiis neque rerum optio,
                nulla tenetur pariatur ex officiis.
              </span>
              <span>
                Consectetur accusamus delectus sit voluptatem at esse! Aperiam
                unde maxime est nemo dicta minus autem esse nobis quibusdam
                iusto, reprehenderit harum, perferendis quae. Ipsum sit fugit
                similique recusandae quas inventore?
              </span>
            </p>
          </Block>
        )}
        <Block>
          <audio id="player" controls>
            <source src="./title1.mp3" type="audio/mp3" />
          </audio>
        </Block>
      </Page>
    </App>
  );
}
