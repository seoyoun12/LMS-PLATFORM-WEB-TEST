import { useCallback, useEffect, useState } from 'react';
import Script from 'next/script';
import * as React from 'react';
import { Config, Ncplayer } from 'types/ncplayer';

const CDN_URL = 'https://cn-lms-storage.cdn.gov-ntruss.com/common/js/ncplayer-1.2.5.umd.min-c808bb53.js';

type Props = {
  config: Config
  onReady?(player: Ncplayer): void;
  onPlay?(e: Event): void;
  onPause?(e: Event): void;
  onCanplay?(e: Event): void;
  onError?(e: Event): void;
  onPlaying?(e: Event): void;
  onEnded?(e: Event): void;
  onSeeking?(e: Event): void;
  onSeeked?(e: Event): void;
  onWaiting?(e: Event): void;
  onProgress?(e: Event): void;
  onTimeupdate?(e: Event): void;
  onVolumechange?(e: Event): void;
  onBlur?(e: Event): void;
  onWindowresize?(e: Event): void;
}

export function VideoPlayer(props: Props) {
  const [ player, setPlayer ] = useState<Ncplayer | null>(null);

  const setNcPlayer = useCallback(() => {
    const ncplayer = new window.ncplayer('NC_PLAYER', {
      ...props.config
    });
    setPlayer(ncplayer);

    if (props.onReady) {
      props.onReady(ncplayer);
    }
  }, [ props ]);

  React.useLayoutEffect(() => {
    if (!!window.ncplayer) {
      setNcPlayer();
    }

    const removePlayer = () => {
      if (!!document.getElementById('NC_PLAYER')?.children.length) {
        document.getElementById('NC_PLAYER')?.children[0].remove();
      }
    };

    return () => removePlayer();
  }, [ setNcPlayer ]);

  useEffect(() => {
    if (!!player) {
      player.on('play', (e) => props.onPlay ? props.onPlay(e) : null);
      player.on('pause', (e) => props.onPause ? props.onPause(e) : null);
      player.on('canplay', (e) => props.onCanplay ? props.onCanplay(e) : null);
      player.on('error', (e) => props.onError ? props.onError(e) : null);
      player.on('playing', (e) => props.onPlaying ? props.onPlaying(e) : null);
      player.on('ended', (e) => props.onEnded ? props.onEnded(e) : null);
      player.on('seeking', (e) => props.onSeeking ? props.onSeeking(e) : null);
      player.on('seeked', (e) => props.onSeeked ? props.onSeeked(e) : null);
      player.on('wating', (e) => props.onWaiting ? props.onWaiting(e) : null);
      player.on('progress', (e) => props.onProgress ? props.onProgress(e) : null);
      player.on('timeupdate', (e) => props.onTimeupdate ? props.onTimeupdate(e) : null);
      player.on('volumechange', (e) => props.onVolumechange ? props.onVolumechange(e) : null);
      player.on('blur', (e) => props.onBlur ? props.onBlur(e) : null);
      player.on('windowresize', (e) => props.onWindowresize ? props.onWindowresize(e) : null);
    }
  }, [ player, props ]);

  const handleOnload = () => {
    setNcPlayer();
  };

  return (
    <>
      <Script
        src={CDN_URL}
        strategy="lazyOnload"
        onLoad={handleOnload}
      />
      <div id="NC_PLAYER"></div>
    </>
  );
}

