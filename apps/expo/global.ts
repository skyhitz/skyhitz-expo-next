import { Platform, LogBox } from "react-native";
import { TextEncoder, TextDecoder } from "text-encoding";
import { Buffer } from "buffer";
import process from "process";
import "@react-native-async-storage/async-storage";
export interface Global {
  self: Global;
  Buffer: typeof Buffer;
  process: {
    version: string;
  };
  TextEncoder: () => typeof TextEncoder;
  TextDecoder: () => typeof TextDecoder;
}

declare let global: Global;
if (typeof global.self === "undefined") {
  global.self = global;
}

if (Platform.OS !== "web") {
  require("react-native-get-random-values");
  LogBox.ignoreLogs([
    "Warning: The provided value 'ms-stream' is not a valid 'responseType'.",
    "Warning: The provided value 'moz-chunked-arraybuffer' is not a valid 'responseType'.",
  ]);
}

global.TextEncoder = () => TextEncoder;
global.TextDecoder = () => TextDecoder;

global.Buffer = Buffer;
global.process = process;
global.process.version = "v0.9.";
