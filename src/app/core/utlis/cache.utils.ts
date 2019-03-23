const DEFAULT_EXPIRE = 900000; // 15 min - should be the same as token expired

interface CacheContent {
  value: any;
  expiry: number;
}

/**
 *    Methods used for inserting and deleting data to app cache (map)
 */
export class CacheUtils {

  private static _cache: Map<string, CacheContent> = new Map<string, CacheContent>();

  public static set(key: string, value: any): void {
    const content: CacheContent = {
      value: value,
      expiry: Date.now() + DEFAULT_EXPIRE
    };
    this._cache.set(key, content);
  }

  public static get(key: string): any {
    if (this.hasValidCachedValue(key)) {
      return this._cache.get(key).value;
    }
  }

  public static clear(key: string): void {
    this._cache.delete(key);
  }

  public static  clearAll(): void {
    this._cache.clear();
  }

  /**
   * Checks if the key exists and   has not expired.
   */
  private static hasValidCachedValue(key: string): boolean {
    if (this._cache.has(key)) {
      if (this._cache.get(key).expiry < Date.now()) {
        this._cache.delete(key);
        return false;
      }
      return true;
    } else {
      return false;
    }
  }
}
