import React, { useRef, useState, useEffect } from 'react';
import './index.less';
import playButton from '../../../public/play.svg';
// import volumeClose from '../../public/volume_close.svg';
import volume from '../../../public/volume.svg';
import { getPrefixClass } from '../../utils/index';

let animloop: number;
const Index = ({
  video,
  poster,
  canvaStyle,
  customClass,
  videoEndCb,
  videoPause,
  videoPlay,
}: {
  video: string;
  poster: string;
  canvaStyle?: {
    width: number;
    height: number;
  };
  customClass?: string;
  videoEndCb: () => {};
  videoPause: () => {};
  videoPlay: () => {};
}) => {
  videoPlay;
  const can: any = useRef(null);
  const [ctxObj, setCtxObj] = useState({
    drawImage: (
      _poster?: any,
      _x?: number,
      _y?: number,
      _x1?: number,
      _x2?: number,
    ) => {},
    clearRect: (_x?: number, _y?: number, _x1?: number, _x2?: number) => {},
  });
  const [videoObj, setVideoObj] = useState({
    video: {
      pause: () => {},
      play: () => {},
    },
    poster: {},
  });
  const [videoStatus, setVideoStatus] = useState('stop');
  const [showPlayButton, setShowPlayButton] = useState(true);
  //初始化dom
  const init = () => {
    // if (!poster) {
    //   console.log('封面为空');
    // }
    // if (!video) {
    //   alert('视频不能为空');
    //   return;
    // }
    const canObj: any = can?.current;
    const parentWidth: number =
      document.querySelector('#canvasContainer')!.clientWidth || 0;
    canObj.setAttribute('width', parentWidth);
    const ctx = canObj.getContext('2d');
    setCtxObj(ctx);
  };
  // 绘制封面图
  const drawPoster = () => {
    const canWidth = can?.current.width;
    const canHeight = can?.current.height;
    // ctxObj.fillStyle = 'red';
    // ctxObj.fillRect(0, 0, canWidth, canHeight);
    ctxObj.drawImage(videoObj?.poster, 0, 0, canWidth, canHeight);
  };
  // 视频播放
  const playVideo = () => {
    const canWidth = can?.current.width;
    const canHeight = can?.current.height;
    animloop = window.requestAnimationFrame(playVideo);
    ctxObj.clearRect(0, 0, canWidth, canHeight);
    ctxObj.drawImage(videoObj?.video, 0, 0, canWidth, canHeight);
  };
  // 获取视频信息
  const getVideoObj = () => {
    const videoObj = document.createElement('video');
    videoObj.src = video || '';
    const posterObj = new Image();
    posterObj.src = poster || '';
    posterObj.onload = () => {
      drawPoster();
    };
    setVideoObj({
      video: videoObj,
      poster: posterObj,
    });
    videoObj.addEventListener('play', () => {
      setVideoStatus('play');
      videoPlay && videoPlay();
    });
    videoObj.addEventListener('pause', () => {
      setVideoStatus('pause');
      videoPause && videoPause();
    });
    videoObj.addEventListener('ended', () => {
      setVideoStatus('ended');
      videoEndCb && videoEndCb();
    });
  };

  const play = () => {
    // 设置播放按钮隐藏

    if (videoStatus === 'play') {
      setShowPlayButton(true);
      videoObj?.video.pause();
      window.cancelAnimationFrame(animloop);
    } else {
      setShowPlayButton(false);
      videoObj?.video.play();
      animloop = requestAnimationFrame(playVideo);
    }
  };
  // 获取到ctx 之后加载图像绘制封面
  useEffect(() => {
    if (ctxObj) {
      getVideoObj();
    }
  }, [ctxObj]);

  // 初始化dom
  useEffect(() => {
    init();
  }, []);
  return (
    <div
      className={`${getPrefixClass('canvasContainer', 'm')} ${customClass}`}
      id="canvasContainer"
    >
      <canvas
        onClick={play}
        ref={can}
        width={canvaStyle?.width || 369}
        height={canvaStyle?.height || 207}
        id="cpvm_videoCan"
      ></canvas>
      <div
        style={{ display: showPlayButton ? 'none' : 'flex' }}
        className={getPrefixClass('controlTool', 'm')}
      >
        {/* 设置虚拟播放按钮 */}
        <div onClick={play} className={getPrefixClass('smallPlayButton', 'm')}>
          <img width="20px" src={playButton} alt="play" />
        </div>
        {/* 设置虚拟控制按钮 */}
        <div className={getPrefixClass('mutedButton', 'm')}>
          <img width="20px" src={volume} alt="play" />
        </div>
      </div>
      {/* // 播放按钮 */}
      <div
        style={{ display: showPlayButton ? 'block' : 'none' }}
        className={getPrefixClass('playVuttonMask', 'm')}
      >
        <div onClick={play} className={getPrefixClass('playButton', 'm')}>
          <img width="48px" src={playButton} alt="play" />
        </div>
      </div>
    </div>
  );
};
export default Index;
