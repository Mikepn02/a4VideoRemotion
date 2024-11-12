// This is your entry file! Refer to it when you render:
// npx remotion render <entry-file> HelloWorld out/video.mp4

import { registerRoot } from "remotion";
import { RemotionRoot } from "./Root";
export {A4VideoComposition} from './A4Video/A4VideoComponent';

registerRoot(RemotionRoot);
