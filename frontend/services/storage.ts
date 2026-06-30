import { Provider } from "@/types/provider";

const KEY = "mytv-provider";

export function saveProvider(provider: Provider) {
  localStorage.setItem(
    KEY,
    JSON.stringify(provider)
  );
}

export function loadProvider(): Provider | null {
  const saved = localStorage.getItem(KEY);

  if (!saved) {
    return null;
  }

  return JSON.parse(saved);
}

export function clearProvider() {
  localStorage.removeItem(KEY);
}
console.log("storage loaded");