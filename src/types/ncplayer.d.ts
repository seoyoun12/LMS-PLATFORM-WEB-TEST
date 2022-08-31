/**
 * 상세 가이드라인은 아래 링크로 이동
 * https://guide.ncloud-docs.com/docs/videoplayer-videoplayerguide
 **/


export declare global {
  interface Window {
    ncplayer: {
      prototype: Ncplayer;
      new(elementId: string, config: Config): Ncplayer;
    };
  }
}

interface Config {
  /** 재생하고자 하는 video 정보. 단일 경로 또는, 여러 경로를 전달 **/
  playlist: string | string[];

  /**
   * player 시작 시, video를 자동으로 재생. 브라우저의 자동재생 정책을 따름
   * DEFAULT: false
   **/
  autostart?: boolean;

  /**
   * player 시작 시, video를 자동으로 음소거 상태로 설정
   * DEFAULT: false
   **/
  mute?: boolean;

  /**
   * player 제어를 위한 컨트롤의 표시 여부 결정
   * DEFAULT: true
   **/
  controls?: boolean;

  /**
   * 창이 전환되거나 최소화되어 player가 보이지 않게 되는 경우, 자동으로 player를 정지 상태로 만듦
   * DEFAULT: false
   **/
  autoPause?: boolean;

  /** player의 가로X세로 비율 지정. "width:height" 형식으로 전달해야 합니다.   **/
  aspectRatio?: string;

  /** player의 가로 사이즈 고정  **/
  width?: number;

  /** player의 세로 사이즈 고정 **/
  height?: number;

  /**
   * video 의 재생속도 조절. 1.0보다 낮으면 느려지고, 1.0보다 높으면 빠르게 재생
   * DEFAULT: 1.0
   **/
  playbackRate?: number;

  /**
   * video의 반복 재생 여부 결정
   * DEFAULT: 1.0
   **/
  repeat?: boolean;

  /** 마우스 우클릭 시 표시되는 바로가기 정보 수정   **/
  about?: object;
}

type EventType =
  'play' // video 재생요청이 성공하였을 때 발생하는 이벤트
  | 'pause' // video가 일시정지 되었을 때 발생하는 이벤트
  | 'canplay' // 재생을 시작할 수 있을 만큼 video가 충분히 load 되었을 때 발생하는 이벤트
  | 'error'  // 에러가 발생하였을 때 발생하는 이벤트
  | 'playing' // 실제 video가 재생이 시작될 때 발생하는 이벤트
  | 'ended' // 재생이 끝까지 완료되었을 떄 발생하는 이벤트
  | 'seeking' // seek 동작을 시작할 때 발생하는 이벤트
  | 'seeked' // seek 동작이 완료되었을 때 발생하는 이벤트
  | 'wating' // 버퍼링이 발생하였을 때, 발생하는 이벤트
  | 'progress' // video를 download 중일때 350ms(오차 200ms) 마다 주기적으로 발생하는 이벤트
  | 'timeupdate' // 현재 재생시간이 변경될 떄 발생하는 이벤트
  | 'volumechange' // volume 값이 변경될 때 발생하는 이벤트
  | 'blur' // player가 화면에서 노출되지 않는 상태일 떄 발생하는 이벤트
  | 'windowresize'; // 창 크기가 변경될 때 발생하는 이벤트


interface Ncplayer {
  /** video를 재생합니다. **/
  play(): void;

  /** video를 정지합니다. **/
  pause(): void;

  /** 첫번째 video를 재생합니다.  **/
  firstTrack(): void;

  /** 다음 video가 있는 경우, 다음 video를 재생합니다.  **/
  prevTrack(): void;

  /** 이전 video가 있는 경우, 이전 video를 재생합니다. **/
  nextTrack(): void;

  /**
   * 음소거를 적용/해제합니다.
   * state: state 가 true이면, 음소거 적용
   **/
  mute(state: boolean): void;

  /**
   * 자동재생을 적용/해제 합니다.
   * state: state 가 true이면, 자동재생 적용
   **/
  autostart(state: boolean): void;

  /**
   * video 의 볼륨을 설정합니다.
   * value: 0 - 1사이에 볼륨값 설정
   **/
  volume(value: number): void;

  /**
   * 현재 재생 중인 video의 시간을 변경합니다.
   * value: 현재 재생중인 video의 재생시간을 설정한 값으로 변경. 초 단위로 시간 설정 예) 3분 20초 -> 200
   **/
  currentTime(value: number): void;

  /**
   * 전체화면 모드로 변경합니다.
   * state: state 가 true이면, 전체화면 모드로 변경
   **/
  fullscreen(state: boolean): void;

  /**
   * 재생속도를 변경합니다.
   * value: video의 재생속도 변경. 1 보다 크면 빠르게 1 보다 작으면 느려짐
   **/
  playbackRate(value: number): void;

  /**
   * 이벤트를 수신합니다.
   * type: 수신할 이벤트 명. 이벤트 목록은 여기를 참고하세요.
   * callback: 이벤트가 발생하면 호출 시킬 function을 전달
   **/
  on(type: EventType, callback: (event: Event) => void): void;

  _corePlayer: any;

  _view: any;

  _detachEvent(event: { type: EventType, listner: (event: Event) => void }): void;
  
}
