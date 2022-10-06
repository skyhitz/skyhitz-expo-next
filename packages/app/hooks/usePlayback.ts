import { useContext } from "react";
import { PlaybackApi, PlaybackContext } from "app/provider/playback";

export function usePlayback(): PlaybackApi {
  const api = useContext(PlaybackContext);

  return api;
}
