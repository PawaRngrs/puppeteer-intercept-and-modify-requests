import { Interception, InterceptionWithUrlPatternRegExp } from './main'

export class InterceptionMap extends Map<
  string,
  InterceptionWithUrlPatternRegExp
> {
  override set(
    urlPattern: string,
    value: InterceptionWithUrlPatternRegExp,
  ): this {
    return super.set(this.serializer(value), value)
  }
  override get(
    urlPattern: string,
  ): InterceptionWithUrlPatternRegExp | undefined {
    for (const key in super.keys()) {
      if (this.deserializer(key).url === urlPattern) {
        return super.get(key)
      }
    }
    return undefined
  }
  override delete(urlPattern: string): boolean {
    for (const key in super.keys()) {
      if (this.deserializer(key).url === urlPattern) {
        return super.delete(key)
      }
    }
    return false
  }
  // Convert Interception object to a JSON string to use as the map key
  private serializer(interceptions: Interception): string {
    return JSON.stringify({
      url: interceptions.urlPattern,
      resourceType: interceptions.resourceType,
    })
  }
  private deserializer(key: string) {
    return JSON.parse(key) as { url: string; resourceType: string }
  }
}
