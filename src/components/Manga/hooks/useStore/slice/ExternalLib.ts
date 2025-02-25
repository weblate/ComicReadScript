import { throttle } from 'throttle-debounce';
import createPanZoom from 'panzoom';
import type { State } from '..';
import { setState, store } from '..';
import { sleep } from '../../../../../helper';

export const initPanzoom = (state: State) => {
  // 销毁之前可能创建过的实例
  state.panzoom?.dispose();

  const panzoom = createPanZoom(state.mangaFlowRef!, {
    // 边界限制
    bounds: true,
    boundsPadding: 1,
    // 禁止缩小
    minZoom: 1,
    // 禁用默认的双击缩放
    zoomDoubleClickSpeed: 1,
    // 禁止处理手指捏合动作，交给浏览器去缩放
    pinchSpeed: 0,

    // 忽略键盘事件
    filterKey: () => true,
    // 不处理 touch 事件
    onTouch: () => false,

    // 在 处于卷轴模式 或 不处于缩放状态且没有按下 alt 时，不进行缩放
    beforeWheel: (e) =>
      store.option.scrollMode ||
      (!e.altKey && panzoom.getTransform().scale === 1),
    // 不处于卷轴模式或按下「alt 键」或「处于放大状态」时才允许拖动
    beforeMouseDown: (e) =>
      !(
        !store.option.scrollMode ||
        e.altKey ||
        panzoom.getTransform().scale !== 1
      ),
  });

  panzoom.on(
    'zoom',
    throttle(200, () => {
      setState((draftState) => {
        if (!draftState.scrollLock) draftState.scrollLock = true;
        draftState.isZoomed = panzoom.getTransform().scale !== 1;
      });

      setState(async (draftState) => {
        if (!draftState.isZoomed && draftState.scrollLock) {
          // 防止在放大模式下通过滚轮缩小至原尺寸后立刻跳转至下一页，所以加一个延时
          await sleep(200);
          draftState.scrollLock = false;
        }
      });
    }),
  );

  state.panzoom = panzoom;
};
