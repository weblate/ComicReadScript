import { createEffect, createRoot, on } from 'solid-js';

import { throttle } from 'throttle-debounce';
import type { State } from '..';
import { setState, store } from '..';
import type { UseDragOption } from '../../useDrag';
import { loadTypeMap } from '../ImageState';

/** 漫画流的容器 */
export const mangaFlowEle = () => store.mangaFlowRef?.parentNode as HTMLElement;

/** 漫画流的总高度 */
export const contentHeight = () => mangaFlowEle().scrollHeight;

/** 能显示出漫画的高度 */
export const windowHeight = () => store.rootRef?.offsetHeight ?? 0;

/** 更新滚动条滑块的高度和所处高度 */
export const updateDrag = (state: State) => {
  if (!state.option.scrollMode) {
    state.scrollbar.dragHeight = 0;
    state.scrollbar.dragTop = 0;
    return;
  }
  state.scrollbar.dragHeight =
    windowHeight() / (contentHeight() || windowHeight());
};

/** 获取指定图片的提示文本 */
const getImgTip = (state: State, i: number) => {
  if (i === -1) return '填充页';
  const img = state.imgList[i];

  // 如果图片未加载完毕则在其 index 后增加显示当前加载状态
  if (img.loadType !== 'loaded')
    return `${i + 1} (${loadTypeMap[img.loadType]})`;

  if (
    img.translationType &&
    img.translationType !== 'hide' &&
    img.translationMessage
  )
    return `${i + 1}：${img.translationMessage}`;

  return `${i + 1}`;
};

/** 获取指定页面的提示文本 */
const getPageTip = (
  state: State,
  pageIndex: number,
): [string] | [string, string] => {
  const page = state.pageList[pageIndex];
  if (!page) return ['null'];
  const pageIndexText = page.map((index) => getImgTip(state, index)) as
    | [string]
    | [string, string];
  if (state.option.dir === 'rtl') pageIndexText.reverse();
  return pageIndexText;
};

const getTipText = (state: State) => {
  if (!state.pageList.length || !state.mangaFlowRef) return '';

  if (!state.option.scrollMode)
    return getPageTip(state, state.activePageIndex).join(' | ');

  /** 当前显示图片的列表 */
  const activeImageIndexList: number[] = [];

  const { scrollTop } = mangaFlowEle();
  const imgEleList = store.mangaFlowRef!
    .childNodes as NodeListOf<HTMLImageElement>;
  const scrollBottom = scrollTop + store.rootRef!.offsetHeight;

  // 通过一个一个检查图片元素所在高度来判断图片是否被显示
  for (let i = 0; i < imgEleList.length; i += 1) {
    const element = imgEleList[i];
    // 当图片的顶部位置在视窗口的底部位置时中断循环
    if (element.offsetTop > scrollBottom) break;
    // 当图片的底部位置还未达到视窗口的顶部位置时，跳到下一个图片
    if (element.offsetTop + element.offsetHeight < scrollTop) continue;
    activeImageIndexList.push(+element.alt - 1);
  }
  state.activePageIndex = activeImageIndexList.at(0) ?? 0;

  return activeImageIndexList
    .map((index) => getPageTip(state, index))
    .join('\n');
};

/** 更新滚动条提示文本 */
export const updateTipText = throttle(100, () => {
  setState((state) => {
    state.scrollbar.tipText = getTipText(state);
  });
});

/** 处理漫画页的滚动事件 */
export const handleMangaFlowScroll = () => {
  if (!store.option.scrollMode) return;

  setState((state) => {
    state.scrollbar.dragTop =
      !mangaFlowEle || !contentHeight()
        ? 0
        : mangaFlowEle().scrollTop / contentHeight();
    updateDrag(state);
  });
  updateTipText();
};

/** 开始拖拽时的 dragTop 值 */
let startTop = 0;
export const dragOption: UseDragOption = {
  handleDrag: ({ type, xy: [, y], initial: [, iy] }, e) => {
    // 跳过拖拽结束事件（单击时会同时触发开始和结束，就用开始事件来完成单击的效果
    if (type === 'end') return;
    // 跳过没必要处理的情况
    if (type === 'dragging' && y === iy) return;

    if (!store.mangaFlowRef) return;

    /** 滚动条高度 */
    const scrollbarHeight = (e.target as HTMLElement).offsetHeight;
    /** 点击位置在滚动条上的位置比率 */
    const clickTop = y / scrollbarHeight;
    let top = clickTop;

    if (store.option.scrollMode) {
      if (type === 'dragging') {
        /** 在滚动条上的移动比率 */
        const dy = (y - iy) / scrollbarHeight;
        top = startTop + dy;
        // 处理超出范围的情况
        if (top < 0) top = 0;
        else if (top > 1) top = 1;
        mangaFlowEle().scrollTo({
          top: top * contentHeight(),
          behavior: 'instant',
        });
      } else {
        // 确保滚动条的中心会在点击位置
        top -= store.scrollbar.dragHeight / 2;
        startTop = top;
        mangaFlowEle().scrollTo({
          top: top * contentHeight(),
          behavior: 'smooth',
        });
      }
    } else {
      let newPageIndex = Math.floor(top * store.pageList.length);
      // 处理超出范围的情况
      if (newPageIndex < 0) newPageIndex = 0;
      else if (newPageIndex >= store.pageList.length)
        newPageIndex = store.pageList.length - 1;

      if (newPageIndex !== store.activePageIndex) {
        setState((state) => {
          state.activePageIndex = newPageIndex;
        });
      }
    }
  },
};

createRoot(() => {
  // 更新滚动条提示文本
  createEffect(
    on(
      [
        () => store.activePageIndex,
        () => store.pageList,
        () => store.scrollbar.dragHeight,
        () => store.scrollbar.dragTop,
        () => store.option.scrollMode,
        () => store.option.dir,
      ],
      updateTipText,
    ),
  );
});
