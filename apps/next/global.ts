export interface Global {
  self: Global;
  setImmediate: typeof setTimeout;
}

declare let global: Global;
if (typeof global.self === "undefined") {
  global.self = global;
}

global.setImmediate = setTimeout;
