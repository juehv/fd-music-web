import * as React from "react";
import {
  Block,
  Range,
  List,
  ListItem,
  Toggle,
  Segmented,
  SegmentedButton,
} from "konsta/react";
import { usePlyr } from "plyr-react";
import "plyr-react/plyr.css";
import { useEffect } from "react";
import { PlayCircleIcon } from "@heroicons/react/24/solid";
import metaData from "./MetaData";

//const metaData = MetaData; //require("./meta_da.json");
const streamUrl = metaData["music_file_path"];
const leadTimeMax = metaData["lead_time"] / 1000;

const audioSource = {
  type: "audio",
  sources: [
    {
      type: "audio/mp3",
      src: streamUrl,
    },
  ],
};

const points = metaData["entry_points"].map((item, index) => {
  //outString += ('{ time: ' + String(item.start/1000 + leadTimeMax) +', label: "' + String(item.name) + '"},');
  return { time: Number(item.start) / 1000 + leadTimeMax, label: item.name };
});
const playerOptions = {
  markers: {
    enabled: true,
    points: points,
  },
  controls: ["play", "progress", "current-time", "airplay"],
};

const CustomPlyrInstance = React.forwardRef((props, ref) => {
  const { source, options = null } = props;
  const raptorRef = usePlyr(ref, { options, source });
  // React.useEffect(() => {
  //   var api = ref.current;
  //   if (api.plyr.source === null) return;
  //   console.log("update effect");

  //   //api.plyr.on("ready", () => console.log("I'm ready"));
  //   api.plyr.on("seeked", () => {
  //     api.plyr.play();
  //     setStartPlayTime(api.plyr.currentTime);
  //     console.log("seek");
  //   });
  //   // api.plyr.on("canplay", () => {
  //   //   // NOTE: browser may pause you from doing so:  https://goo.gl/xX8pDD
  //   //   api.plyr.play();
  //   //   console.log("duration of audio is", api.plyr.duration);
  //   // });
  //   //api.plyr.on("ended", () => console.log("I'm Ended"));

  //   api.plyr.on("timeupdate", () => {
  //     console.log("update "+ loopRef)
  //   });
  // }, []);

  return <audio ref={raptorRef} className="plyr-react plyr" preload="auto" />;
});

var initDone = false;
var plyrLooping = false;
var plyrSingleTrack = false;
var plyrPassageMode = false;
var plyrStartTimePoint = 0;
var plyrStopTimePoint = 0;

function seekTo(
  ref,
  leadTime,
  trackStartTimeInMS,
  trackStopTimeInMS,
  passageStopTimeInMS
) {
  var api = ref.current;
  if (api.plyr.source === null) return;

  api.plyr.stop();
  plyrStartTimePoint = trackStartTimeInMS / 1000 + leadTimeMax - leadTime;
  plyrStopTimePoint = plyrPassageMode
    ? passageStopTimeInMS / 1000 + leadTimeMax
    : plyrSingleTrack
    ? trackStopTimeInMS / 1000 + leadTimeMax
    : metaData.entry_points[metaData.entry_points.length - 1].end / 1000 +
      leadTimeMax;

  api.plyr.forward(plyrStartTimePoint);
  api.plyr.play();

  console.log("passage? " + plyrPassageMode + " end: " + plyrStopTimePoint);

  if (!initDone) {
    initDone = true;
    console.log("Init");

    api.plyr.on("timeupdate", () => {
      if (plyrStopTimePoint > 0 && api.plyr.currentTime >= plyrStopTimePoint) {
        if (plyrPassageMode || plyrSingleTrack) {
          api.plyr.stop();
        }

        if (plyrLooping) {
          api.plyr.stop();
          api.plyr.forward(plyrStartTimePoint);
          api.plyr.play();
        }
      }
    });
  }
}

const PlyrComponent = (props) => {
  const ref = React.useRef(null);

  const [leadTime, setLeadTime] = React.useState(5);
  const [speed, setSpeed] = React.useState(100);
  const [activePlayerMode, setActivePlayerMode] = React.useState(0);
  const [looping, setLooping] = React.useState(false);
  const [passageEndIndex, setPassageEndIndex] = React.useState(0);
  const [passageEndTimePoint, setPassageEndTimePoint] = React.useState(
    metaData["entry_points"][0].end
  );

  useEffect(() => {
    var api = ref.current;
    if (api.plyr.source === null) return;
    api.plyr.speed = speed / 100;
  }, [speed]);

  return (
    <div className="wrapper">
      {audioSource && (
        <>
          <Block margin="my-0" padding="py-0" position="sticky">
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
                  touchRipple={true}
                  media={
                    // activePlayerMode === 2 &&
                    <PlayCircleIcon
                      className="h-6 w-6 showpointer"
                      onClick={() => {
                        seekTo(
                          ref,
                          leadTime,
                          item.start,
                          item.end,
                          passageEndTimePoint
                        );
                      }}
                    />
                  }
                  // onClick={() => {
                  //   if (activePlayerMode === 2) return;
                  //   seekTo(
                  //     ref,
                  //     leadTime,
                  //     item.start,
                  //     item.end,
                  //     passageEndTimePoint
                  //   );
                  // }}
                  key={index}
                  title={item.name}
                  className="unselectable entrypoints"
                  after={
                    activePlayerMode === 2 && (
                      <Toggle
                        checked={passageEndIndex === index}
                        onChange={() => {
                          setPassageEndIndex(index);
                          setPassageEndTimePoint(item.end);
                        }}
                      />
                    )
                  }

                  // after={
                  //   <Radio
                  //     component="div"
                  //     value={index}
                  //     checked={groupValue === index}
                  //     onChange={() => setGroupValue(index)}
                  //   />
                  // }
                />
              );
            })}
          </List>

          <List margin="my-0" padding="py-0">
            <ListItem
              innerClassName="space-x-4"
              title="Loop"
              after={
                <Toggle
                  checked={looping}
                  onChange={() => {
                    plyrLooping = !looping;
                    setLooping(!looping);
                  }}
                />
              }
            />

            <ListItem
              innerClassName="flex space-x-4 unselectable showpointer"
              innerChildren={
                <>
                  <span onClick={() => setLeadTime(5)}>
                    <nobr>
                      Lead Time: {String(leadTime).padStart(2, "0")}s &nbsp;
                    </nobr>
                  </span>
                  <Range
                    value={leadTime}
                    step={1}
                    min={0}
                    max={leadTimeMax}
                    onChange={(e) => setLeadTime(e.target.value)}
                  />
                </>
              }
            />

            <ListItem
              innerClassName="flex space-x-4 unselectable showpointer"
              innerChildren={
                <>
                  <span onClick={() => setSpeed(100)}>
                    <nobr>Speed: {String(speed).padStart(3, "0")}% &nbsp;</nobr>
                  </span>
                  <Range
                    value={speed}
                    step={1}
                    min={75}
                    max={125}
                    onChange={(e) => setSpeed(e.target.value)}
                  />
                </>
              }
            />

            <ListItem
              innerClassName="flex space-x-4"
              innerChildren={
                <>
                  <Segmented strong>
                    <SegmentedButton
                      strong
                      active={activePlayerMode === 0}
                      onClick={() => {
                        plyrSingleTrack = false;
                        plyrPassageMode = false;
                        setActivePlayerMode(0);
                      }}
                    >
                      finish track
                    </SegmentedButton>
                    <SegmentedButton
                      strong
                      active={activePlayerMode === 1}
                      onClick={() => {
                        plyrSingleTrack = true;
                        plyrPassageMode = false;
                        setActivePlayerMode(1);
                      }}
                    >
                      single section
                    </SegmentedButton>
                    <SegmentedButton
                      strong
                      active={activePlayerMode === 2}
                      onClick={() => {
                        plyrSingleTrack = false;
                        plyrPassageMode = true;
                        setActivePlayerMode(2);
                        ref.current.plyr.stop();
                      }}
                    >
                      passage mode
                    </SegmentedButton>
                  </Segmented>
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
        </>
      )}
    </div>
  );
};

export default PlyrComponent;
