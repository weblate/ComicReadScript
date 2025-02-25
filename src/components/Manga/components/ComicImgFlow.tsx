import type { Component } from 'solid-js';
import { Index } from 'solid-js';

import { ComicImg } from './ComicImg';
import { LoadTypeTip } from './LoadTypeTip';

import { store } from '../hooks/useStore';
import {
  bindRef,
  handleMangaFlowScroll,
  initPanzoom,
} from '../hooks/useStore/slice';
import { handlePageClick } from './TouchArea';
import { useDoubleClick } from '../hooks/useDoubleClick';

import classes from '../index.module.css';
import { useHiddenMouse } from '../hooks/useHiddenMouse';

/**
 * 漫画图片流的容器
 */
export const ComicImgFlow: Component = () => {
  const handleClick = (e: MouseEvent) => handlePageClick(e);

  /** 处理双击缩放 */
  const handleDoubleClickZoom = (e: MouseEvent) => {
    setTimeout(() => {
      if (!store.panzoom || store.option.scrollMode) return;

      const { scale } = store.panzoom.getTransform();

      // 当缩放到一定程度时再双击会缩放回原尺寸，否则正常触发缩放

      if (scale >= 2) store.panzoom.smoothZoomAbs(0, 0, 1);
      else store.panzoom.smoothZoomAbs(e.clientX, e.clientY, scale + 1);
    });
  };

  const { hiddenMouse, onMouseMove } = useHiddenMouse();

  return (
    <div
      class={classes.mangaFlowBox}
      style={{ overflow: store.option.scrollMode ? 'auto' : 'hidden' }}
      ref={(e) =>
        e.addEventListener('scroll', handleMangaFlowScroll, { passive: true })
      }
      tabIndex={-1}
      data-hiddenMouse={hiddenMouse()}
      on:mousemove={onMouseMove}
    >
      <div
        id={classes.mangaFlow}
        ref={bindRef('mangaFlowRef', initPanzoom)}
        class={classes.mangaFlow}
        classList={{
          [classes.disableZoom]:
            store.option.disableZoom || store.option.scrollMode,
          [classes.scrollMode]: store.option.scrollMode,
        }}
        dir={store.option.dir}
        on:click={useDoubleClick(handleClick, handleDoubleClickZoom)}
      >
        <Index each={store.imgList} fallback={<h1>NULL</h1>}>
          {(img, i) => <ComicImg img={img()} index={i} />}
        </Index>
        <LoadTypeTip />
      </div>
    </div>
  );
};
