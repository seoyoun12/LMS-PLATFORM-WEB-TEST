
import Script from 'next/script';
import { Config, EventType, Ncplayer } from 'types/ncplayer';
import styled from '@emotion/styled';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
// import { Box } from '@mui/material';
// import { ModalQuiz } from '@components/ui/Modal';

const CDN_URL =
  'https://cn-lms-storage.cdn.gov-ntruss.com/common/js/ncplayer-1.2.5.umd.min-c808bb53.js';

type Events = { [Key in `on${Capitalize<EventType>}`]?: (e: Event) => void };

interface Props extends Events {
  initialConfig: Omit<Config, 'playlist'>;
  initialPlayerId: string;
  playlist: Config['playlist'];
  seconds: number;
  showControl?: boolean;
  onReady?: (player: Ncplayer) => void;
  onTimeChange?: (time: number) => void;
  // onPause?: (player: Ncplayer) => void;
  // videoIsPaused?: boolean;
}

// 정신병자코드2
export function VideoPlayer(props: Props) {

  const [scriptLoaded, setScriptLoaded] = useState<boolean>(false);
  const [playlist, setPlaylist] = useState<Config['playlist'] | null>(
    null
  );

  const player = useRef<Ncplayer | null>(null);
  const playerTimeObserver = useRef<MutationObserver | null>(null);
  const playerElement = useRef(null);
  

  const needUpdate = useRef<boolean>(false);
  const initialConfig = useRef<Omit<Config, 'playlist'>>(
    props.initialConfig
  );
  const initialPlayerId = useRef<string>(props.initialPlayerId);
  const eventsPrev = useRef<Parameters<Ncplayer['_detachEvent']>[0][]>(
    []
  );

  
  useLayoutEffect(() => {
    if (!scriptLoaded || !window.ncplayer) return;

    if (
      Array.isArray(playlist) && Array.isArray(props.playlist)
        ? playlist.length !== props.playlist.length ||
          playlist.some((v, i) => v !== props.playlist[i])
        : playlist !== props.playlist
    ) {
      setPlaylist(props.playlist);
      needUpdate.current = true;
      return;
    }

    if (needUpdate.current) {
      needUpdate.current = false;
      playerElement.current.replaceChildren();

      player.current = new window.ncplayer(initialPlayerId.current, {
        ...initialConfig.current,
        playlist: props.playlist,
      });
      player.current.currentTime(props.seconds);
      player.current._corePlayer.onCurrentTimeChange = props.onTimeChange;

      // player.current._corePlayer.player.current.on('canplay', () => {
      player.current.on('canplay', () => {
        player.current._corePlayer._setDuration(
          player.current._corePlayer.player.duration
        );
      });
      eventsPrev.current = [];
      if (props.onReady) props.onReady(player.current);
    }

    if (player.current !== null) {
      for (const item of eventsPrev.current) player.current._detachEvent(item);
      for (const key of Object.keys(props)) {
        if (!key.startsWith('on')) continue;

        const event = key.slice(2).toLocaleLowerCase() as EventType;
        eventsPrev.current.push({ type: event, listner: props[key] });
        player.current.on(event, props[key]);
      }

      playerTimeObserver.current?.disconnect();

      const currentTimeNode = document.querySelector(
        `#${props.initialPlayerId} .current`
      );

      if (currentTimeNode) {
        playerTimeObserver.current = new MutationObserver((mutationList) => {
          mutationList.forEach((mutation) => {
            if (mutation.type !== 'characterData') return;

            const timeSplit = mutation.target.textContent.split(':');
            if (timeSplit.length !== 2 && timeSplit.length !== 3) return;

            const hours = timeSplit.length === 3 ? parseInt(timeSplit[0]) : 0;
            const minutes = parseInt(timeSplit[timeSplit.length - 2]);
            const seconds = parseInt(timeSplit[timeSplit.length - 2 + 1]);

            if (!Number.isNaN(hours) &&!Number.isNaN(minutes) &&!Number.isNaN(seconds))
              props.onTimeChange(hours * 60 * 60 + minutes * 60 + seconds);
              // console.log('현재 동영상 시간:', currentTimeNode);
          });
        });
        playerTimeObserver.current.observe(currentTimeNode, {
          characterData: true,
          attributes: false,
          childList: false,
          subtree: true,
        });
      }
    }
  }, [scriptLoaded, playlist, props]);

  useEffect(() => {
    const flag = (e) => {
      if (e.keyCode < 36 && e.keyCode < 40) {
        e.preventDefault();
      }
    }
    window.addEventListener('keydown', flag)
    return () => window.removeEventListener('keydown', flag);
  }, [player]);

  return (
    <>
      <Script
        src={CDN_URL}
        onLoad={() => window.ncplayer && setScriptLoaded(true)}
        onReady={() => window.ncplayer && setScriptLoaded(true)}
      />
      <Player
        id={initialPlayerId.current}
        ref={playerElement}
        showControl={props.showControl}
      ></Player>
    </>
  );
}

const Player = styled.div<{ showControl?: boolean }>`
  width: 100%;
  aspect-ratio: 16/9;
  overflow: hidden;
  z-index: 1;
  
  & .webplayer-internal-core-shadow {
    width: 100% !important;
    height: auto !important;
  }

  & .ncplayer-video-root {
    width: 100% !important;
    height: 100% !important;
  }

  & .ncplayer-progress {
    display: ${({ showControl }) => (showControl ? 'block' : 'none')};
  }
`;
