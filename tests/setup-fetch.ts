import fetch from "cross-fetch";

if (!globalThis.fetch) {
  globalThis.fetch = fetch as typeof globalThis.fetch;
}
