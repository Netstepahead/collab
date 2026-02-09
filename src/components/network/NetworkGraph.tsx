'use client';

import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  MiniMap,
  NodeTypes,
  Handle,
  Position,
  NodeProps,
} from 'reactflow';
import 'reactflow/dist/style.css';
import type { Contact } from '@/types/contact';
import { Card, CardContent } from '@/components/ui/card';

interface NetworkGraphProps {
  contacts: Contact[];
}

interface CustomNodeData {
  label: string;
  contact: Contact;
}

// Custom Node Component
function ContactNode({ data }: NodeProps<CustomNodeData>) {
  const { contact } = data;
  const strength = contact.connection_strength || 1;
  
  // Calculate node size based on connection strength (1-5)
  const nodeSize = 40 + (strength * 8); // 48px to 80px
  
  // Color based on strength (lighter navy for weak, darker for strong)
  const nodeColor = strength >= 4 
    ? '#1B365D' // Strong - dark navy
    : strength >= 3
    ? '#2a4d80' // Medium-strong - medium navy
    : '#4a6fa5'; // Weak - lighter navy

  return (
    <div className="contact-node">
      <Handle type="target" position={Position.Top} />
      <div
        className="rounded-full flex items-center justify-center text-white font-semibold shadow-lg border-2 border-white"
        style={{
          width: `${nodeSize}px`,
          height: `${nodeSize}px`,
          backgroundColor: nodeColor,
          fontSize: nodeSize < 50 ? '12px' : '14px',
        }}
      >
        {contact.full_name.charAt(0).toUpperCase()}
      </div>
      <div className="mt-2 text-center">
        <div className="text-xs font-medium text-[#1B365D] max-w-[100px] truncate">
          {contact.full_name}
        </div>
        {contact.company && (
          <div className="text-xs text-gray-500 max-w-[100px] truncate">
            {contact.company}
          </div>
        )}
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

// Center Node (User)
function CenterNode({ data }: NodeProps) {
  return (
    <div className="center-node">
      <Handle type="target" position={Position.Top} />
      <div
        className="rounded-full flex items-center justify-center text-white font-bold shadow-xl border-4 border-[#E87722]"
        style={{
          width: '100px',
          height: '100px',
          backgroundColor: '#1B365D',
          fontSize: '24px',
        }}
      >
        You
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

const nodeTypes: NodeTypes = {
  contact: ContactNode,
  center: CenterNode,
};

export function NetworkGraph({ contacts }: NetworkGraphProps) {
  const { i18n } = useTranslation();
  
  // Create nodes and edges
  const { nodes, edges } = useMemo(() => {
    const centerNode: Node = {
      id: 'center',
      type: 'center',
      position: { x: 0, y: 0 },
      data: { label: 'You' },
    };

    // Calculate positions in a circle around center
    const radius = 200;
    const angleStep = (2 * Math.PI) / contacts.length;

    const contactNodes: Node[] = contacts.map((contact, index) => {
      const angle = index * angleStep;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      return {
        id: contact.id,
        type: 'contact',
        position: { x, y },
        data: {
          label: contact.full_name,
          contact,
        },
      };
    });

    // Create edges from center to each contact
    const contactEdges: Edge[] = contacts.map((contact) => {
      const strength = contact.connection_strength || 1;
      
      // Edge thickness based on strength (1-5)
      const strokeWidth = 1.5 + (strength * 0.7); // 2.2px to 5px
      
      // Edge color based on strength
      const strokeColor = strength >= 4
        ? '#1B365D' // Strong (4-5) - dark navy
        : strength >= 3
        ? '#2a4d80' // Medium (3) - medium navy
        : '#9bb5d1'; // Weak (1-2) - light navy

      // For strong connections, use animated dashed line to show active/strong relationship
      // For medium/weak, use solid lines
      const isStrong = strength >= 4;

      return {
        id: `center-${contact.id}`,
        source: 'center',
        target: contact.id,
        style: {
          stroke: strokeColor,
          strokeWidth,
          strokeDasharray: isStrong ? '5,5' : '0', // Dashed for strong, solid for others
        },
        animated: isStrong, // Animated flow effect for strong connections (4-5)
        markerEnd: {
          type: 'arrowclosed',
          color: strokeColor,
        },
      };
    });

    return {
      nodes: [centerNode, ...contactNodes],
      edges: contactEdges,
    };
  }, [contacts]);

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    // Could open a modal or navigate to contact detail page
    console.log('Node clicked:', node);
  }, []);

  return (
    <Card className="border-[#1B365D]/10 bg-white/80 backdrop-blur-sm shadow-card">
      <CardContent className="p-0">
        <div style={{ width: '100%', height: '600px' }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodeClick={onNodeClick}
            fitView
            fitViewOptions={{ padding: 0.2 }}
            minZoom={0.3}
            maxZoom={2}
          >
            <Background color="#f0f0f0" gap={16} />
            <Controls 
              style={{
                button: {
                  backgroundColor: '#1B365D',
                  color: 'white',
                  border: 'none',
                },
              }}
            />
            <MiniMap
              nodeColor={(node) => {
                if (node.type === 'center') return '#1B365D';
                const strength = (node.data as CustomNodeData).contact?.connection_strength || 1;
                return strength >= 4 ? '#1B365D' : strength >= 3 ? '#2a4d80' : '#4a6fa5';
              }}
              maskColor="rgba(27, 54, 93, 0.1)"
              style={{
                backgroundColor: '#FAF9F6',
              }}
            />
          </ReactFlow>
        </div>
        
        {/* Legend */}
        <div className="p-4 border-t border-[#1B365D]/10 bg-[#FAF9F6]/50">
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-[#1B365D] mb-2">
              {i18n.language === 'he' ? 'מקרא עוצמת קשר:' : 'Connection Strength Legend:'}
            </h3>
            <div className="flex flex-wrap items-center gap-6 text-sm">
              {/* Node Colors */}
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#1B365D] border-2 border-white shadow"></div>
                <span className="text-gray-700 font-medium">
                  {i18n.language === 'he' ? 'חזק (4-5)' : 'Strong (4-5)'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#2a4d80] border-2 border-white shadow"></div>
                <span className="text-gray-700 font-medium">
                  {i18n.language === 'he' ? 'בינוני (3)' : 'Medium (3)'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-[#4a6fa5] border-2 border-white shadow"></div>
                <span className="text-gray-700 font-medium">
                  {i18n.language === 'he' ? 'חלש (1-2)' : 'Weak (1-2)'}
                </span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-6 text-sm pt-2 border-t border-[#1B365D]/10">
              {/* Edge Styles */}
              <div className="flex items-center gap-2">
                <svg width="40" height="2" className="overflow-visible">
                  <line 
                    x1="0" 
                    y1="1" 
                    x2="40" 
                    y2="1" 
                    stroke="#1B365D" 
                    strokeWidth="3" 
                    strokeDasharray="5,5"
                    className="animate-pulse"
                  />
                </svg>
                <span className="text-gray-600 text-xs">
                  {i18n.language === 'he' 
                    ? 'קו מקווקו מונפש = קשר חזק (4-5)' 
                    : 'Animated dashed line = Strong connection (4-5)'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <svg width="40" height="2">
                  <line 
                    x1="0" 
                    y1="1" 
                    x2="40" 
                    y2="1" 
                    stroke="#2a4d80" 
                    strokeWidth="2.5"
                  />
                </svg>
                <span className="text-gray-600 text-xs">
                  {i18n.language === 'he' 
                    ? 'קו מלא = קשר בינוני (3)' 
                    : 'Solid line = Medium connection (3)'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <svg width="40" height="2">
                  <line 
                    x1="0" 
                    y1="1" 
                    x2="40" 
                    y2="1" 
                    stroke="#9bb5d1" 
                    strokeWidth="2"
                  />
                </svg>
                <span className="text-gray-600 text-xs">
                  {i18n.language === 'he' 
                    ? 'קו דק = קשר חלש (1-2)' 
                    : 'Thin solid line = Weak connection (1-2)'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
