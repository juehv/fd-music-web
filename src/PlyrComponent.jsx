import * as React from "react";
import { APITypes, PlyrInstance, PlyrProps, usePlyr } from "plyr-react";
import "./plyr.css";

const videoOptions = undefined;

const videoSource = {
  type: "audio",
  sources: [
    {
      type: "audio/wav",
      src: "https://dl.songsara.net/FRE/2022/1/Roa%20-%20Tiny%20Love%20(2021)%20SONGSARA.NET.mp3",
    },
  ],
};

const CustomPlyrInstance = React.forwardRef((props, ref) => {
  const { source, options = null } = props;
  const raptorRef = usePlyr(ref, { options, source });

  // Do all api access here, it is guaranteed to be called with the latest plyr instance
  React.useEffect(() => {
    /**
     * Fool react for using forward ref as normal ref
     * NOTE: in a case you don't need the forward mechanism and handle everything via props
     * you can create the ref inside the component by yourself
     */
    var current = ref.current;
    if (current.plyr.source === null) return;

    var api = current;

    api.plyr.on("ready", () => console.log("I'm ready"));
    api.plyr.on("canplay", () => {
      // NOTE: browser may pause you from doing so:  https://goo.gl/xX8pDD
      api.plyr.play();
      console.log("duration of audio is", api.plyr.duration);
    });
    api.plyr.on("ended", () => console.log("I'm Ended"));
  });

  return <video ref={raptorRef} className="plyr-react plyr" />;
});

const PlyrComponent = () => {
  const ref = React.useRef(null);

  return (
    <div className="wrapper">
      {videoSource && (
        <CustomPlyrInstance
          ref={ref}
          source={videoSource}
          options={videoOptions}
        />
      )}
    </div>
  );
};

export default PlyrComponent;
