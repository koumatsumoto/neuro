export class StorageService<Data extends Record<string, any>> {
  readonly #storage: Storage;
  readonly #keyPrefix: string;

  constructor({ version = 'v1', namespace = 'app', storage = localStorage }: { version?: string; namespace?: string; storage?: Storage } = {}) {
    this.#storage = storage;
    this.#keyPrefix = `${version}/${namespace}/`;
  }

  load<Key extends keyof Data>(key: Key): Data[Key] | null {
    const value = localStorage.getItem(`${this.#keyPrefix}${key}`);
    return value === null ? null : (JSON.parse(value) as Data[Key]);
  }

  save<Key extends keyof Data>(key: Key, value: Data[Key]) {
    localStorage.setItem(`${this.#keyPrefix}${key}`, JSON.stringify(value));
  }
}
