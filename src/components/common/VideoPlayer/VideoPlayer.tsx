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

  // 최대한 이 컴포넌트가 다시 렌더링 되지 않도록 해주세요.
  // 거의 모든 것을 useRef를 사용하여 막아보았지만,
  // 정말 필요한 것도 있어서 어쩔 수 없이...
  //
  // Lesson 컴포넌트 전체를 바꾼 이유 중 하나이기도 해요.
  // 어찌 낑겨 맞추려고 이렇게까지 한게 좀 웃기네요ㅋㅋㅋ
  //
  // 되도록이면 건들이지 말아주세요.

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
        
        // 그... 62번줄은 플레이어 방향키로 시간 조절하는 것을 막는 코드에요.
        // 일단 막아보았지만, 영상이 로드 되기 전에 방향키를 막 누르면 5초정도 이동되긴 해요.
        // 완전히 막는 방법을 모르겠어요...
        //
        // 이게 vue로 제작된 것 같더라고요.
        // 아마 생성될 때 한번, 그 후에 한번 새로 생기는 것 같네요.
        // 
        // 코드를 여기에 넣으면 뒤에 생기는 것을 막을 수 있지만,
        // 처음 만들어질 때 생성되는 것은 막을 수 없어요.
        // 어느 함수가 먼저 불러내는지 도무지 못 찾겠네요...

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