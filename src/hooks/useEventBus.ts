import { useEffect } from 'react';
import mitt from 'mitt';

export enum EmitTypes {
  refreshOrderPage = 'refresh-order-page'
}

// 创建事件总线
export const bus = mitt<Record<EmitTypes, any>>();

// 自定义 Hook
export const useEventBus = (eventType: EmitTypes, handler) => {
  useEffect(() => {
    // 在组件挂载时监听事件
    bus.on(eventType, handler);

    // 组件卸载时取消监听
    return () => {
      bus.off(eventType, handler);
    };
  }, [eventType, handler]);
};