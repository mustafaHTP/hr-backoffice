import { GraphDirection } from "@/types/graph";
import { Edge, Node, Position } from "@xyflow/react";
import { graphlib, layout } from "dagre";

export function getLayoutedElements(
  nodes: Node[],
  edges: Edge[],
  direction: GraphDirection = GraphDirection.Vertical,
) {
  const dagreGraph = new graphlib.Graph().setDefaultEdgeLabel(() => ({}));
  const nodeWidth = 172;
  const nodeHeight = 36;

  const isHorizontal = direction === GraphDirection.Horizontal;
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  layout(dagreGraph);

  const newNodes: Node[] = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    return {
      ...node,
      targetPosition: isHorizontal ? Position.Left : Position.Top,
      sourcePosition: isHorizontal ? Position.Right : Position.Bottom,
      position: {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      },
    };
  });

  return { nodes: newNodes, edges };
}
