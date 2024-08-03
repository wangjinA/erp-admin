import { useEffect } from 'react';
import mitt from 'mitt';

// 创建事件总线
export const bus = mitt();

// 自定义 Hook
export const useEventBus = (eventType, handler) => {
  useEffect(() => {
    // 在组件挂载时监听事件
    bus.on(eventType, handler);

    // 组件卸载时取消监听
    return () => {
      bus.off(eventType, handler);
    };
  }, [eventType, handler]);
};