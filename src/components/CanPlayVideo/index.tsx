import React, { useRef, useState, useEffect } from 'react';
import './index.less';
import playButton from '../../../public/play.svg';
// import volumeClose from '../../../public/volume_close.svg';
import volume from '../../../public/volume.svg';
import { getPrefixClass } from '../../utils/index';

let animloop: number;
const Index = ({
  parentDom,
  video,
  poster,
}: {
  parentDom: any;
  video: string;
  poster: string;
}) => {
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
    const canObj: any = can?.current;
    const parentWidth: number =
      document.querySelector(parentDom || '#canvasContainer')!.clientWidth || 0;
    canObj.setAttribute('width', parentWidth);
    const ctx = canObj.getContext('2d');
    setCtxObj(ctx);
  };
  // 绘制封面图
  const drawPoster = () => {
    const canWidth = can?.current.width;
    const canHeight = can?.current.height;
    console.log(canWidth, canHeight, ctxObj);
    // ctxObj.fillStyle = 'red';
    // ctxObj.fillRect(0, 0, canWidth, canHeight);
    ctxObj.drawImage(videoObj?.poster, 0, 0, canWidth, canHeight);
  };
  // 视频播放
  const playVideo = () => {
    console.log('开始绘制');
    const canWidth = can?.current.width;
    const canHeight = can?.current.height;
    animloop = window.requestAnimationFrame(playVideo);
    ctxObj.clearRect(0, 0, canWidth, canHeight);
    ctxObj.drawImage(videoObj?.video, 0, 0, canWidth, canHeight);
  };
  // 获取视频信息
  const getVideoObj = () => {
    const videoObj = document.createElement('video');
    videoObj.src = video || 'https://video.kaikeba.com/65831180111202yubt.mp4';
    const posterObj = new Image();
    posterObj.src = poster || 'https://img.kaikeba.com/559170701202qqtj.jpeg';
    posterObj.onload = () => {
      drawPoster();
    };
    setVideoObj({
      video: videoObj,
      poster: posterObj,
    });
    videoObj.addEventListener('play', () => {
      setVideoStatus('play');
    });
    videoObj.addEventListener('pause', () => {
      setVideoStatus('pause');
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
    <div className={getPrefixClass('canvasContainer')} id="canvasContainer">
      <canvas
        onClick={play}
        ref={can}
        width="763"
        height="429"
        id="videoCan"
      ></canvas>
      <div
        style={{ display: showPlayButton ? 'none' : 'flex' }}
        className={getPrefixClass('controlTool')}
      >
        {/* 设置虚拟播放按钮 */}
        <div onClick={play} className={getPrefixClass('smallPlayButton')}>
          <img width="20px" src={playButton} alt="play" />
        </div>
        {/* 设置虚拟控制按钮 */}
        <div className={getPrefixClass('mutedButton')}>
          <img width="20px" src={volume} alt="play" />
        </div>
      </div>
      {/* // 播放按钮 */}
      <div
        style={{ display: showPlayButton ? 'block' : 'none' }}
        className={getPrefixClass('playVuttonMask')}
      >
        <div onClick={play} className={getPrefixClass('playButton')}>
          <img width="48px" src={playButton} alt="play" />
        </div>
      </div>
    </div>
  );
};
export default Index;
