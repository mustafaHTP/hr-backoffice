import { XYPosition } from "@xyflow/react";

export enum GraphDirection {
  Horizontal = "LR",
  Vertical = "TB",
}

export const DEFAULT_NODE_POSITION: XYPosition = { x: 0, y: 0 };
export const EDGE_TYPE = "smoothstep";
