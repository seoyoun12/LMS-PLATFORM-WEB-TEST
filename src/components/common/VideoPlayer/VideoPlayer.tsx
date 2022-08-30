import * as React from 'react';
import Script from 'next/script';
import { Config, EventType, Ncplayer } from 'types/ncplayer';
import styled from '@emotion/styled';

const CDN_URL = 'https://cn-lms-storage.cdn.gov-ntruss.com/common/js/ncplayer-1.2.5.umd.min-c808bb53.js';

type Events = { [Key in `on${Capitalize<EventType>}`]?: (e: Event) => void; };

interface Props extends Events {
  initialConfig: Omit<Config, "playlist">;
  initialPlayerId: string;
  playlist: Config["playlist"];
  seconds: number;
  onReady?: (player: Ncplayer) => void;
  onTimeChange?: (time: number) => void;
}

export function VideoPlayer(props: Props) {

  // 스테이트.

  const [scriptLoaded, setScriptLoaded] = React.useState<boolean>(false);
  const [playlist, setPlaylist] = React.useState<Config["playlist"] | null>(null);

  // 레퍼런스.

  const player = React.useRef<Ncplayer | null>(null);
  const playerTimeObserver = React.useRef<MutationObserver | null>(null);
  const playerElement = React.useRef(null);
  
  const needUpdate = React.useRef<boolean>(false);
  const initialConfig = React.useRef<Omit<Config, "playlist">>(props.initialConfig);
  const initialPlayerId = React.useRef<string>(props.initialPlayerId);
  const eventsPrev = React.useRef<Parameters<Ncplayer["_detachEvent"]>[0][]>([]);

  // 이펙트.

  React.useLayoutEffect(() => {

    if (!scriptLoaded || !window.ncplayer) return;

    if (Array.isArray(playlist) && Array.isArray(props.playlist) ? playlist.length !== props.playlist.length || playlist.some((v, i) => v !== props.playlist[i]) : playlist !== props.playlist) {
      
      setPlaylist(props.playlist);
      needUpdate.current = true;
      return;

    }

    if (needUpdate.current) {

      needUpdate.current = false;
      playerElement.current.replaceChildren();

      player.current = new window.ncplayer(initialPlayerId.current, { ...initialConfig.current, playlist: props.playlist });
      player.current.currentTime(props.seconds);
      player.current._corePlayer.onCurrentTimeChange = props.onTimeChange;
      player.current.on("canplay", () => {
        
        player.current._corePlayer._setDuration(player.current._corePlayer.player.duration);
        player.current._view.$el.__vue__.controlKeydownEvent = () => undefined;
        
      });

      eventsPrev.current = [];

      if (props.onReady) props.onReady(player.current);

    }
    
    if (player.current !== null) {

      for (const item of eventsPrev.current) player.current._detachEvent(item);
      for (const key of Object.keys(props)) {
  
        if (!key.startsWith("on")) continue;

        const event = key.slice(2).toLocaleLowerCase() as EventType;
        eventsPrev.current.push({ type: event, listner: props[key] });
        player.current.on(event, props[key]);

      }

      playerTimeObserver.current?.disconnect();
      playerTimeObserver.current = new MutationObserver((mutationList) => {

        mutationList.forEach((mutation) => {

          if (mutation.type !== "characterData") return;

          const timeSplit = mutation.target.textContent.split(":");
          if (timeSplit.length !== 2 && timeSplit.length !== 3) return;

          const hours = timeSplit.length === 3 ? parseInt(timeSplit[0]) : 0;
          const minutes = parseInt(timeSplit[timeSplit.length - 2]);
          const seconds = parseInt(timeSplit[timeSplit.length - 2 + 1]);

          if (!Number.isNaN(hours) && !Number.isNaN(minutes) && !Number.isNaN(seconds)) props.onTimeChange((hours * 60 * 60) + (minutes * 60) + seconds);

        });

      });
      playerTimeObserver.current.observe(
        document.querySelector(`#${props.initialPlayerId} .current`),
        { characterData: true, attributes: false, childList: false, subtree: true },
      );

    }

  }, [scriptLoaded, playlist, props]);

  // 렌더링.

  return (
    <>
      <Script
        src={CDN_URL}
        onLoad={() => window.ncplayer && setScriptLoaded(true)}
        onReady={() => window.ncplayer && setScriptLoaded(true)}
      />
      <Player id={initialPlayerId.current} ref={playerElement}></Player>
    </>
  );

}

const Player = styled.div`
  
  width: 100%;
  aspect-ratio: 16/9;
  overflow: hidden;

  & .webplayer-internal-core-shadow {
    width: 100% !important;
    height: auto !important;
  }

  & .ncplayer-progress {
    display: none;
  }

`;