import { Audio } from 'expo-av';

export async function playSound(sound) {
  await sound.playAsync();
}
export async function loadSound(audio) {
  const { sound } = await Audio.Sound.createAsync(audio);
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
