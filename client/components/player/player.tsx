import Hls from 'hls.js';
import React, { useEffect, useRef } from 'react';

interface PlayerProps {
  source: string;
}

export const Player: React.FC<PlayerProps> = ({ source }) => {
  const videoRef = useRef();

  useEffect(() => {
    if (Hls.isSupported()) {
      const hls = new Hls({ debug: true });
      hls.loadSource(source);
      hls.attachMedia(videoRef.current);
      hls.on(Hls.Events.ERROR, (error) => {
        console.error(error);
      });
    } else {
      console.log('load');
    }
  }, [source]);

  return <video ref={videoRef} controls src={source} />;
};
