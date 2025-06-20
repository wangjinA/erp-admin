/* cache.ts --------------------------------------------------------- */
type CacheEntry<T> = { expire: number; value: T };

export interface CacheOptions<Args extends any[], T> {
  /** 过期时间（毫秒）。默认 60 min；设为 Infinity 表示永不过期 */
  ttl?: number;
  /** ⾃定义缓存键。默认 JSON.stringify(args) */
  key?: (...args: Args) => string;
  /** 命中缓存时是否返回深拷贝，避免外部修改 */
  clone?: boolean;
}

export function withCache<Args extends any[], T>(
  fn: (...args: Args) => Promise<T>,
  { ttl = 60 * 60_000, key = (...args: Args) => JSON.stringify(args), clone = false }: CacheOptions<Args, T> = {},
) {
  const store = new Map<string, CacheEntry<T>>();

  /** 手动清理指定 key（或全部） */
  const invalidate = (k?: string) => (k ? store.delete(k) : store.clear());

  /** 包装后的新函数 */
  const wrapped = (...args: Args): Promise<T> => {
    const k = key(...args);
    const now = Date.now();
    const cached = store.get(k);

    if (cached && (ttl === Infinity || cached.expire > now)) {
      // 命中缓存
      return Promise.resolve(clone ? structuredClone(cached.value) : cached.value);
    }

    // 未命中 → 真正发请求
    return fn(...args).then((res) => {
      store.set(k, { expire: now + ttl, value: res });
      return res;
    });
  };

  // 暴露失效方法
  Object.assign(wrapped, { invalidate });
  return wrapped as typeof fn & { invalidate: (k?: string) => void };
}
