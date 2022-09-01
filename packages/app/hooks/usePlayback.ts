import { Entry } from "app/api/graphql"
import { useRecoilState, useRecoilValue } from "recoil";
import {currentEntryAtom} from 'app/state/playback'
import { useCallback } from 'react';
import { isSome } from "app/utils";
import { useContext } from 'react';
import { PlaybackContext } from '../provider/playback';
import { videoSrc } from "app/utils/entry";

type PlaybackResult = {
    playEntry: (_entry: Entry) => void;
    // playPause: () => void;
    // skipForward: () => void;
    // skipBackward: () => void;
}

export function usePlayback(): PlaybackResult {
    console.log("use playback")
    const [entry, setEntry] = useRecoilState(currentEntryAtom)
    const {playback} = useContext(PlaybackContext)

    const playEntry = useCallback(async (entry: Entry) => {
        if (!isSome(entry.videoUrl)) return;
        const videoUrl = videoSrc(entry.videoUrl)
        if (playback != null) {
            await playback.unloadAsync();  
            const source = { uri: videoUrl };
            const initialStatus = {
              shouldPlay: true,
            };
            await playback.loadAsync(source, initialStatus, true)
            setEntry(entry)
            await playback.playAsync()
            console.log("loaded")
        }
    }, [playback, setEntry])

    return {
        playEntry
    }
}