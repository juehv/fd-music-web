import * as React from "react";
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
import { APITypes, PlyrInstance, PlyrProps, usePlyr } from "plyr-react";
import "plyr-react/plyr.css";


const streamUrl = "./title1.mp3"; // "https://dl.jensheuschkel.de/title1.mp3";
const metaData = require('./meta.json');

const points = metaData["entry_points"].map((item,index) => {
  return ({time: Number(item.start)/100, label: item.name});
})



const audioSource = {
  type: "audio",
  sources: [
    {
      type: "audio/mp3",
      src: streamUrl,
    },
  ],
};

const CustomPlyrInstance = React.forwardRef((props, ref) => {
  const { source, options = null } = props;
  const raptorRef = usePlyr(ref, { options, source });

  React.useEffect(() => {

    var api = ref.current;
    if (api.plyr.source === null) return;

    api.plyr.on("ready", () => console.log("I'm ready"));
    api.plyr.on("seeked", () => { api.plyr.play() })
    // api.plyr.on("canplay", () => {
    //   // NOTE: browser may pause you from doing so:  https://goo.gl/xX8pDD
    //   api.plyr.play();
    //   console.log("duration of audio is", api.plyr.duration);
    // });
    api.plyr.on("ended", () => console.log("I'm Ended"));
  });

  return <audio ref={raptorRef} className="plyr-react plyr" preload="auto" />;
});

const PlyrComponent = (props) => {
  const ref = React.useRef(null);

  const [leadTime, setLeadTime] = React.useState(5);
  const [speed, setSpeed] = React.useState(100);

  let entryPointItems = "";


  for (let i = 0; i < metaData["entry_points"].length; i++) {
    entryPointItems += ` 
    <ListItem
      title=${metaData["entry_points"][i].name}
      after={
        <Toggle
          checked="false"
          onChange={() => {
            console.log("chek")
          }}
        />
      }
    /> `;

  }

  let playerOptions = {
    markers: {
      enabled: true,
      points: undefined
    },
    controls: ['play', 'progress', 'current-time', 'airplay']
  };
  playerOptions["markers"].points = points

  console.log(playerOptions)

  return (
    <div className="wrapper">
      {audioSource && (
        <>
          <List margin="my-0" padding="py-0">
            <ListItem
              innerClassName="flex space-x-4"
              innerChildren={
                <>
                  <span>
                    <nobr>Lead Time: {String(leadTime).padStart(2, '0')}s &nbsp;</nobr>
                  </span>
                  <Range
                    value={leadTime}
                    step={1}
                    min={0}
                    max={30}
                    onChange={(e) => setLeadTime(e.target.value)} />
                </>
              }
            />

            <ListItem
              innerClassName="flex space-x-4"
              innerChildren={
                <>
                  <span>
                    <nobr>Speed: {String(speed).padStart(3, '0')}% &nbsp;</nobr>
                  </span>
                  <Range
                    value={speed}
                    step={1}
                    min={50}
                    max={200}
                    onChange={(e) => setSpeed(e.target.value)} />
                </>
              }
            />

            {/* <ListItem
            innerClassName="flex space-x-6"
            innerChildren={
              <p>
                <Plyr
                />
              </p>
              }
            /> */}

          </List>
          <Block margin="my-0" padding="py-0">
            <CustomPlyrInstance
              ref={ref}
              source={audioSource}
              options={playerOptions}
            />
          </Block>


          <List strong inset>
            {metaData["entry_points"].map((item, index) => {
              return (
                <ListItem
                key={index}
                title={item.name}
                after={
                  <Toggle
                    checked={false}
                    onChange={() => {
                      console.log("chek")
                    }}
                  />
                }
              /> 
                )
            })}
          </List>
        </>
      )}
    </div>
  );
};

export default PlyrComponent;
