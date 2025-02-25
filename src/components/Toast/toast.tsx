import type { Message, Toast } from '.';
import { creatId, setState, store } from './store';

export const toast = (msg: Message, options?: Partial<Toast>) => {
  if (!msg) return;

  const id = options?.id ?? (typeof msg === 'string' ? msg : creatId());

  setState((state) => {
    if (Reflect.has(state.map, id)) {
      Object.assign(state.map[id], { msg, ...options, update: true });
      return;
    }

    state.map[id] = {
      id,
      type: 'info',
      duration: 3000,
      msg,
      ...options,
    };
    state.list.push(id);
  });
};

toast.dismiss = (id: string) => {
  if (!Reflect.has(store.map, id)) return;
  setState((state) => {
    state.map[id].exit = true;
  });
};
toast.set = (id: string, options: Partial<Toast>) => {
  if (!Reflect.has(store.map, id)) return;
  setState((state) => {
    Object.assign(state.map[id], options);
  });
};

toast.success = (msg: string, options?: Partial<Toast>) =>
  toast(msg, { ...options, type: 'success' });
toast.warn = (msg: string, options?: Partial<Toast>) =>
  toast(msg, { ...options, type: 'warn' });
toast.error = (msg: string, options?: Partial<Toast>) =>
  toast(msg, { ...options, type: 'error' });
