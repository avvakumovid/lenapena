import { useEffect, useState } from 'react';
import { Audio } from 'expo-av';

const useAudio = audio => {
  const [sound, setSound] = useState();
  const [isSoundPlay, setIsSoundPlay] = useState(false);
  const [isFirst, setIsFirst] = useState(true);
  useEffect(() => {
    async function fetch() {
      const { sound } = await Audio.Sound.createAsync(audio);
      sound.setOnPlaybackStatusUpdate(_onPlaybackStatusUpdate);
      setSound(sound);
    }
    fetch();
  }, [audio]);

  const _onPlaybackStatusUpdate = playbackStatus => {
    if (!playbackStatus.isLoaded) {
      // Update your UI for the unloaded state

      if (playbackStatus.error) {
        console.log(
          `Encountered a fatal error during playback: ${playbackStatus.error}`
        );
        // Send Expo team the error on Slack or the forums so we can help you debug!
      }
    } else {
      if (playbackStatus.isPlaying) {
        // setIsSoundPlay(true);
      } else {
        // setIsSoundPlay(false);
      }

      if (playbackStatus.isBuffering) {
        // Update your UI for the buffering state
        console.log('isBuffering');
      }

      if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
        // The player has just finished playing and will stop. Maybe you want to play something else?
        // set
        setIsSoundPlay(false);
        console.log('didJustFinish');
      }
    }
  };

  const playSound = async () => {
    await sound.playAsync();
  };

  const pauseSound = async () => {
    await sound.pauseAsync();
  };

  return {
    playSound,
    pauseSound,
    isSoundPlay,
    setIsSoundPlay,
  };
};

export default useAudio;
