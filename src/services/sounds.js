import { Audio } from 'expo-av';

export async function playSound(sound, setSound) {
  const s = await sound.playAsync();
}

export async function pauseSound(sound) {
  await sound.pauseAsync();
}
export async function loadSound(audio) {
  const { sound } = await Audio.Sound.createAsync(audio);
  sound.setOnPlaybackStatusUpdate(_onPlaybackStatusUpdate);
  return sound;
}
export async function loadSounds(audios) {
  const loadedSounds = [];
  for (const audio of audios) {
    const loadedSound = await loadSound(audio);
    loadedSounds.push(loadedSound);
  }
  console.log(loadedSounds);
  return loadedSounds;
}

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
    // Update your UI for the loaded state

    if (playbackStatus.isPlaying) {
      // Update your UI for the playing state
      console.log('UI Play');
    } else {
      // Update your UI for the paused state
      console.log('UI Pause');
    }

    if (playbackStatus.isBuffering) {
      // Update your UI for the buffering state
      
    }

    if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
      // The player has just finished playing and will stop. Maybe you want to play something else?
    }
  }
};
