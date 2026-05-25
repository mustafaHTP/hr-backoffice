import { Edge, XYPosition, Node, Position } from "@xyflow/react";
import { graphlib, layout } from "dagre";

export enum GraphDirection {
  Horizontal = "LR",
  Vertical = "TB",
}

export const DEFAULT_NODE_POSITION: XYPosition = { x: 0, y: 0 };
export const EDGE_TYPE = "smoothstep";
