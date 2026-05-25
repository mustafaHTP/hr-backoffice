"use client";

import { useCallback } from "react";
import {
  Node,
  Background,
  ReactFlow,
  addEdge,
  ConnectionLineType,
  Panel,
  useEdgesState,
  useNodesState,
  Position,
  Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { graphlib, layout } from "dagre";
import { Department } from "@/generated/prisma/client";
import { ToastService } from "@/lib/toast-service";
import {
  DEFAULT_NODE_POSITION,
  EDGE_TYPE,
  GraphDirection,
} from "@/types/graph";
import { getLayoutedElements } from "@/lib/graph";

function buildGraphFromDepartments(departments: Department[]) {
  // DO NOT USE ARBITRARY ID
  // node of the id is important because building edges is based on these ids
  const nodes: Node[] = departments.map((department) => ({
    id: `department-${department.id}`,
    position: DEFAULT_NODE_POSITION,
    data: {
      label: `${department.name}`,
    },
    style: {
      background: "#111827",
      color: "#f8fafc",
      border: "1px solid #374151",
      boxShadow: "0 10px 30px rgba(15, 23, 42, 0.3)",
      fontSize: "0.95rem",
      fontWeight: 500,
    },
  }));

  // construct edges except root of departments
  // create root node, it represents company also departments who dont have parent department
  // are connected to root node
  const rootNode: Node = {
    id: `root`,
    type: "input",
    position: DEFAULT_NODE_POSITION,
    data: {
      label: `Company`,
    },
    style: {
      background: "#111827",
      color: "#f8fafc",
      border: "1px solid #374151",
      boxShadow: "0 10px 30px rgba(15, 23, 42, 0.3)",
      fontSize: "0.95rem",
      fontWeight: 500,
    },
  };
  nodes.push(rootNode);

  const edges: Edge[] = departments.map((department) => ({
    id: `edge-${department.parentId}-${department.id}`,
    source: department.parentId ? `department-${department.parentId}` : "root",
    target: `department-${department.id}`,
    type: EDGE_TYPE,
    animated: true,
    style: {
      stroke: "#9ca3af",
    },
    markerEnd: {
      type: "arrowclosed",
      color: "#9ca3af",
    },
  }));

  return { nodes, edges };
}

export type OrganizationSchemaFlowProps = {
  departments: Department[];
};

export default function OrganizationSchemaFlow(
  props: OrganizationSchemaFlowProps,
) {
  if (props.departments.length === 0) {
    ToastService.error("No departments to render");
  }

  const graph = buildGraphFromDepartments(props.departments);
  const layouted = getLayoutedElements(graph.nodes, graph.edges);

  const [nodes, setNodes, onNodesChange] = useNodesState(layouted.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layouted.edges);

  const onConnect = useCallback(
    (params: any) =>
      setEdges((eds) =>
        addEdge(
          { ...params, type: ConnectionLineType.SmoothStep, animated: true },
          eds,
        ),
      ),
    [setEdges],
  );

  const onLayout = useCallback(
    (direction: GraphDirection) => {
      const { nodes: layoutedNodes, edges: layoutedEdges } =
        getLayoutedElements(nodes, edges, direction);

      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);
    },
    [nodes, edges, setEdges, setNodes],
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      connectionLineType={ConnectionLineType.SmoothStep}
      fitView
    >
      <Panel
        position="top-right"
        style={{
          background: "rgba(15, 23, 42, 0.92)",
          border: "1px solid rgba(148, 163, 184, 0.25)",
          color: "#f8fafc",
          padding: "0.5rem",
          borderRadius: "0.75rem",
          boxShadow: "0 20px 50px rgba(15, 23, 42, 0.5)",
        }}
      >
        <button
          style={{
            background: "#1f2937",
            color: "#f8fafc",
            border: "1px solid #374151",
            borderRadius: "0.5rem",
            padding: "0.45rem 0.8rem",
            cursor: "pointer",
            marginBottom: "0.5rem",
            width: "100%",
          }}
          onClick={() => onLayout(GraphDirection.Vertical)}
        >
          vertical layout
        </button>
        <button
          style={{
            background: "#1f2937",
            color: "#f8fafc",
            border: "1px solid #374151",
            borderRadius: "0.5rem",
            padding: "0.45rem 0.8rem",
            cursor: "pointer",
            width: "100%",
          }}
          onClick={() => onLayout(GraphDirection.Horizontal)}
        >
          horizontal layout
        </button>
      </Panel>
      <Background />
    </ReactFlow>
  );
}
