import React, { useState } from 'react'

interface NodeDetails {
  id: string
  name: string
  layer: string
  status: string
  memory: string
  cpu: string
  throughput: string
  details: string
  params: Record<string, string>
}

export const ClusterArchitecture: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<string>('coord-1')

  const nodes: Record<string, NodeDetails> = {
    'ingress': {
      id: 'ingress',
      name: 'eBPF L4 Dispatcher',
      layer: 'Ingress & Network Layer',
      status: 'ONLINE',
      memory: '256 MB kernel buffer',
      cpu: '2 Cores (XDP bypass)',
      throughput: '120k req/sec',
      details: 'High-speed packet filtration and socket steering directly in the Linux kernel via eBPF XDP programs. Eliminates context switching before reaching userspace TCP stacks.',
      params: {
        'eBPF Program': 'xdp_kestra_router_v2.o',
        'Ingress Protocols': 'gRPC over HTTP/2, FlatBuffers binary',
        'Connection Pool': 'SO_REUSEPORT 32 workers',
      },
    },
    'raft-leader': {
      id: 'raft-leader',
      name: 'Raft Meta Leader (Node 01)',
      layer: 'Consensus Plane',
      status: 'LEADER (Term 84)',
      memory: '1.8 GB state log',
      cpu: '4 Cores dedicated',
      throughput: '4,500 commit/sec',
      details: 'Maintains linearizable partition table topology, shard placement maps, and lease management. Uses non-blocking append-entries with fsync coalescing.',
      params: {
        'Consensus Protocol': 'Raft with Joint Consensus (RFC-088)',
        'Commit Index': '14,892,104',
        'Peers': '3-node quorum (Nodes 01, 02, 03)',
        'Election Timeout': '150ms deterministic',
      },
    },
    'coord-1': {
      id: 'coord-1',
      name: 'Query Coordinator 01',
      layer: 'Execution & Query Tier',
      status: 'ACTIVE',
      memory: '6.4 GB resident',
      cpu: '16 Cores (AVX-512)',
      throughput: '14,200 QPS',
      details: 'Receives vector queries, decodes raw floating-point arrays, and scatters query sub-tasks to responsible shard partitions based on consistent hash rings.',
      params: {
        'Thread Scheduler': 'Work-stealing Tokio multi-thread',
        'SIMD Kernel': 'AVX-512 FMA Fused Multiply-Add',
        'Routing Mode': 'Locality-aware nearest shard',
        'Cache Hit Ratio': '94.2% on top-k filter metadata',
      },
    },
    'shard-01': {
      id: 'shard-01',
      name: 'Storage Shard 01 (HNSW)',
      layer: 'Segment Storage Tier',
      status: 'MMAP LOCKED',
      memory: '18.4 GB NVMe mmap',
      cpu: '8 Cores NUMA-pinned',
      throughput: '3.1M vectors indexed',
      details: 'Houses segmented HNSW graph partitions with zero-copy memory mapping directly against NVMe enterprise SSDs. Avoids page faults and userspace buffer duplication.',
      params: {
        'Index Structure': 'HNSW (M=32, ef_construction=200)',
        'Quantization': 'IVF-PQ 8-bit scalar quantization',
        'Segment Compaction': 'Online LSM-style concurrent merge',
        'Storage Subsystem': 'Linux io_uring direct NVMe',
      },
    },
    'shard-02': {
      id: 'shard-02',
      name: 'Storage Shard 02 (HNSW)',
      layer: 'Segment Storage Tier',
      status: 'MMAP LOCKED',
      memory: '19.1 GB NVMe mmap',
      cpu: '8 Cores NUMA-pinned',
      throughput: '3.2M vectors indexed',
      details: 'Replicated shard partition paired with Shard 01 for high-availability reads. Handles dense vector distance arithmetic with sub-millisecond return guarantees.',
      params: {
        'Index Structure': 'HNSW (M=32, ef_construction=200)',
        'Quantization': 'IVF-PQ 8-bit scalar quantization',
        'Active Replicas': '2 Sync Replicas (eu-west-1a / 1b)',
        'Read Latency': '0.34ms p99',
      },
    },
    'cold-s3': {
      id: 'cold-s3',
      name: 'Tiered Object Lake',
      layer: 'Durable Archival Layer',
      status: 'IDLE (Syncing)',
      memory: 'Cold Object Storage',
      cpu: 'Background thread pool',
      throughput: '100% durability SLA',
      details: 'Periodic asynchronous snapshots of closed immutable vector segments pushed to S3/GCS with zstandard compression. Enables instant cluster re-hydration.',
      params: {
        'Storage Target': 'AWS S3 / Google Cloud Storage',
        'Compression': 'Zstandard Level 7 with dictionary training',
        'Segment Checksum': 'xxHash64 verified',
        'RTO Recovery': 'Under 180s for 100M vector cluster',
      },
    },
  }

  const activeNode = nodes[selectedNode]

  return (
    <section id="architecture" className="relative border-b border-[#E8E8E5] bg-[#FBFBFA] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#E8E8E5] pb-8 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#FF4400] mb-2 font-medium">
              <span>Section 03</span>
              <span>/</span>
              <span>Distributed Topography</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#121314] tracking-[-0.02em]">
              High-Concurrence Cluster Architecture
            </h2>
          </div>
          <div className="text-xs font-mono text-[#6B6F76] max-w-md">
            Decoupled consensus, scatter-gather query execution, and zero-copy NVMe segment mmap. Click any node in the diagram to inspect its kernel state.
          </div>
        </div>

        {/* 2-Column Layout: Architecture Diagram (left) & Live Node Inspector (right) */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Architecture Diagram with SVG Connectors */}
          <div className="lg:col-span-8 rounded-lg border border-[#E8E8E5] bg-white p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] relative overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8E8E5] text-xs font-mono">
              <span className="text-[#8F939A] uppercase tracking-wider">Topology Diagram · RFC-088</span>
              <span className="flex items-center gap-1.5 text-[#346538]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#346538] animate-pulse"></span>
                Quorum Synchronized
              </span>
            </div>

            {/* SVG Canvas with Interactive Cluster Nodes */}
            <div className="relative mt-6 min-h-[460px] w-full">
              {/* Inline SVG Connector lines */}
              <svg className="absolute inset-0 h-full w-full pointer-events-none" viewBox="0 0 700 440" preserveAspectRatio="xMidYMid meet">
                <defs>
                  <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 2 L 8 5 L 0 8 z" fill="#D4D4CE" />
                  </marker>
                </defs>

                {/* Line: Ingress to Coordinator */}
                <path d="M 350 48 L 350 96" stroke="#D4D4CE" strokeWidth="1.5" strokeDasharray="4 3" markerEnd="url(#arrow)" />

                {/* Line: Coordinator to Raft Leader */}
                <path d="M 310 128 L 180 128" stroke="#D4D4CE" strokeWidth="1.5" strokeDasharray="3 3" />

                {/* Fan-Out Lines: Coordinator to Shard 01 & Shard 02 */}
                <path d="M 320 160 L 220 250" stroke="#D4D4CE" strokeWidth="1.5" />
                <path d="M 380 160 L 480 250" stroke="#D4D4CE" strokeWidth="1.5" />

                {/* Shards to Tiered Lake */}
                <path d="M 220 315 L 320 375" stroke="#D4D4CE" strokeWidth="1.5" strokeDasharray="4 3" />
                <path d="M 480 315 L 380 375" stroke="#D4D4CE" strokeWidth="1.5" strokeDasharray="4 3" />

                {/* Cross-Shard Heartbeat Replication */}
                <path d="M 270 280 L 430 280" stroke="#FF4400" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
              </svg>

              {/* Node 1: Ingress Layer */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64">
                <button
                  type="button"
                  onClick={() => setSelectedNode('ingress')}
                  className={`w-full text-left rounded border p-3 font-mono text-xs transition-all ${
                    selectedNode === 'ingress'
                      ? 'border-[#121314] bg-[#FAF9F7] ring-1 ring-[#121314]'
                      : 'border-[#E8E8E5] bg-[#FDFDFC] hover:border-[#8F939A]'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] text-[#8F939A] mb-1">
                    <span>LAYER 01</span>
                    <span className="text-[#346538]">eBPF FASTPATH</span>
                  </div>
                  <div className="font-semibold text-[#121314]">eBPF L4 Router</div>
                  <div className="text-[11px] text-[#6B6F76]">120k req/s · Zero user-space copy</div>
                </button>
              </div>

              {/* Node 2: Raft Consensus Leader (Left) */}
              <div className="absolute top-24 left-4 sm:left-8 w-56">
                <button
                  type="button"
                  onClick={() => setSelectedNode('raft-leader')}
                  className={`w-full text-left rounded border p-3 font-mono text-xs transition-all ${
                    selectedNode === 'raft-leader'
                      ? 'border-[#121314] bg-[#FAF9F7] ring-1 ring-[#121314]'
                      : 'border-[#E8E8E5] bg-[#FDFDFC] hover:border-[#8F939A]'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] text-[#8F939A] mb-1">
                    <span>RAFT QUORUM</span>
                    <span className="text-[#FF4400] font-medium">TERM 84</span>
                  </div>
                  <div className="font-semibold text-[#121314]">Raft Meta Leader</div>
                  <div className="text-[11px] text-[#6B6F76]">Consensus & Shard Mapping</div>
                </button>
              </div>

              {/* Node 3: Query Coordinator (Center) */}
              <div className="absolute top-24 left-1/2 -translate-x-1/2 w-64">
                <button
                  type="button"
                  onClick={() => setSelectedNode('coord-1')}
                  className={`w-full text-left rounded border p-3 font-mono text-xs transition-all ${
                    selectedNode === 'coord-1'
                      ? 'border-[#FF4400] bg-[#FFF8F5] ring-1 ring-[#FF4400]'
                      : 'border-[#E8E8E5] bg-[#FDFDFC] hover:border-[#8F939A]'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] text-[#8F939A] mb-1">
                    <span>EXECUTION TIER</span>
                    <span className="text-[#FF4400] font-bold">AVX-512</span>
                  </div>
                  <div className="font-semibold text-[#121314]">Query Coordinator 01</div>
                  <div className="text-[11px] text-[#6B6F76]">Scatter-gather · 14.2k QPS</div>
                </button>
              </div>

              {/* Node 4: Storage Shard 01 (Bottom Left) */}
              <div className="absolute top-60 left-8 sm:left-16 w-56">
                <button
                  type="button"
                  onClick={() => setSelectedNode('shard-01')}
                  className={`w-full text-left rounded border p-3 font-mono text-xs transition-all ${
                    selectedNode === 'shard-01'
                      ? 'border-[#121314] bg-[#FAF9F7] ring-1 ring-[#121314]'
                      : 'border-[#E8E8E5] bg-[#FDFDFC] hover:border-[#8F939A]'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] text-[#8F939A] mb-1">
                    <span>SHARD 01</span>
                    <span className="text-[#1F6C9F] font-medium">HNSW M=32</span>
                  </div>
                  <div className="font-semibold text-[#121314]">Segment Shard 01</div>
                  <div className="text-[11px] text-[#6B6F76]">3.1M vectors · NVMe mmap</div>
                </button>
              </div>

              {/* Node 5: Storage Shard 02 (Bottom Right) */}
              <div className="absolute top-60 right-8 sm:right-16 w-56">
                <button
                  type="button"
                  onClick={() => setSelectedNode('shard-02')}
                  className={`w-full text-left rounded border p-3 font-mono text-xs transition-all ${
                    selectedNode === 'shard-02'
                      ? 'border-[#121314] bg-[#FAF9F7] ring-1 ring-[#121314]'
                      : 'border-[#E8E8E5] bg-[#FDFDFC] hover:border-[#8F939A]'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] text-[#8F939A] mb-1">
                    <span>SHARD 02 (SYNC)</span>
                    <span className="text-[#1F6C9F] font-medium">HNSW M=32</span>
                  </div>
                  <div className="font-semibold text-[#121314]">Segment Shard 02</div>
                  <div className="text-[11px] text-[#6B6F76]">3.2M vectors · 0.34ms p99</div>
                </button>
              </div>

              {/* Node 6: S3 Tiered Lake (Bottom Center) */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64">
                <button
                  type="button"
                  onClick={() => setSelectedNode('cold-s3')}
                  className={`w-full text-left rounded border p-3 font-mono text-xs transition-all ${
                    selectedNode === 'cold-s3'
                      ? 'border-[#121314] bg-[#FAF9F7] ring-1 ring-[#121314]'
                      : 'border-[#E8E8E5] bg-[#FDFDFC] hover:border-[#8F939A]'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] text-[#8F939A] mb-1">
                    <span>COLD TIER</span>
                    <span className="text-[#346538]">ZSTANDARD L7</span>
                  </div>
                  <div className="font-semibold text-[#121314]">Tiered Object Storage</div>
                  <div className="text-[11px] text-[#6B6F76]">Durable immutable segments</div>
                </button>
              </div>
            </div>

            {/* Topology legend */}
            <div className="mt-8 border-t border-[#E8E8E5] pt-4 flex flex-wrap items-center justify-between gap-4 text-[11px] font-mono text-[#8F939A]">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="h-0.5 w-4 bg-[#D4D4CE]"></span>
                  <span>Data Ingress & Query Dispatch</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-0.5 w-4 bg-[#FF4400] border-t border-dashed border-[#FF4400]"></span>
                  <span>Cross-Node Raft Replication</span>
                </div>
              </div>
              <span>Click any node to inspect register state</span>
            </div>
          </div>

          {/* Live Node Inspector Panel */}
          <div className="lg:col-span-4 rounded-lg border border-[#E8E8E5] bg-white p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
            <div className="flex items-center justify-between border-b border-[#E8E8E5] pb-3 text-xs font-mono">
              <span className="text-[#8F939A] uppercase tracking-wider">Node Inspector</span>
              <span className="rounded bg-[#EDF3EC] px-2 py-0.5 text-[10px] font-medium text-[#346538]">
                {activeNode.status}
              </span>
            </div>

            <div className="mt-4">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#8F939A]">{activeNode.layer}</span>
              <h3 className="font-mono text-base font-bold text-[#121314] mt-0.5">{activeNode.name}</h3>
              <p className="mt-3 text-xs font-sans text-[#6B6F76] leading-relaxed">
                {activeNode.details}
              </p>
            </div>

            {/* Hardware & Runtime Telemetry stats */}
            <div className="mt-5 grid grid-cols-2 gap-2 border-t border-b border-[#E8E8E5] py-4 text-xs font-mono">
              <div className="rounded bg-[#FBFBFA] p-2 border border-[#E8E8E5]">
                <div className="text-[10px] text-[#8F939A] uppercase">Allocated Memory</div>
                <div className="text-xs font-semibold text-[#121314] mt-0.5">{activeNode.memory}</div>
              </div>
              <div className="rounded bg-[#FBFBFA] p-2 border border-[#E8E8E5]">
                <div className="text-[10px] text-[#8F939A] uppercase">CPU Affinity</div>
                <div className="text-xs font-semibold text-[#121314] mt-0.5">{activeNode.cpu}</div>
              </div>
            </div>

            {/* Low-Level Parameters table */}
            <div className="mt-5 space-y-2.5 font-mono text-xs">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-[#121314]">
                Kernel Configuration
              </div>
              {Object.entries(activeNode.params).map(([key, val]) => (
                <div key={key} className="flex flex-col border-b border-[#E8E8E5]/60 pb-1.5 text-[11px]">
                  <span className="text-[#8F939A]">{key}</span>
                  <span className="text-[#121314] font-medium truncate">{val}</span>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <a
                href="#deploy"
                className="w-full inline-flex items-center justify-center rounded bg-[#121314] py-2 text-xs font-mono text-white hover:bg-[#2A2A2A] transition-colors"
              >
                Inspect Telemetry Trace &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
