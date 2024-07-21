export const DBConfig = {
  name: "MyDB",
  version: 1,
  objectStoresMeta: [
    {
      store: "expense",
      storeConfig: { keyPath: "id", autoIncrement: true },
      storeSchema: [
        { name: "name", keypath: "name", options: { unique: true } },
        { name: "airFreight", keypath: 'airFreight', options: { unique: false } },
        { name: "seaFreight", keypath: 'seaFreight', options: { unique: false } },
        { name: "paijian", keypath: 'paijian', options: { unique: false } },
        { name: "jindian", keypath: 'jindian', options: { unique: false } },
        { name: "huilv", keypath: 'huilv', options: { unique: false } },
        { name: "updateTime", keypath: 'updateTime', options: { unique: false } },
        { name: "code", keypath: 'code', options: { unique: false } },
      ],
    },
    {
      store: "businessMap",
      storeConfig: { keyPath: "id", autoIncrement: true },
      storeSchema: [
        { name: "id", keypath: "id", options: { unique: true } },
        { name: "name", keypath: "name", options: { unique: true } },
        { name: "values", keypath: 'values', options: { unique: false } },
        { name: "updateTime", keypath: 'createTime', options: { unique: false } },
      ],
    },
  ],
};