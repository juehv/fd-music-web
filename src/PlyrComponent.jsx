import * as React from "react";
import { APITypes, PlyrInstance, PlyrProps, usePlyr } from "plyr-react";
import "plyr-react/plyr.css";


const streamUrl = "./title1.mp3"; // "https://dl.jensheuschkel.de/title1.mp3";

const playerOptions = {
  markers: {
    enabled: true,
    points: [{ time: 36, label: "1WiWa" }]
  },
  controls : [ 'play', 'progress', 'current-time', 'airplay']
};

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
    api.plyr.on("seeked", () => {api.plyr.play()})
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


  return (
    <div className="wrapper">
      {audioSource && (
        <CustomPlyrInstance
          ref={ref}
          source={audioSource}
          options={playerOptions}
        />
      )}
    </div>
  );
};

export default PlyrComponent;
