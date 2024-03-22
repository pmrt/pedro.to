import { writable, type Writable } from "svelte/store";

export function createStorageField(
  fieldName: string,
  initialVal: string
): Writable<string> {
  const item = localStorage.getItem(fieldName);
  const val = item || initialVal;
  if (!item) {
    localStorage.setItem(fieldName, val);
  }
  const { subscribe, set, update } = writable(val);

  return {
    subscribe,
    update,
    set: (value: string) => {
      localStorage.setItem(fieldName, val);
      set(value);
    },
  };
}
