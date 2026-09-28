import React from 'react'

export const TechnicalFooter: React.FC = () => {
  return (
    <footer className="border-t border-[#E8E8E5] bg-[#FAF9F7] text-xs font-mono text-[#6B6F76]">
      {/* Realtime Engine Status Bar */}
      <div className="border-b border-[#E8E8E5] bg-white py-3 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-2 w-2 rounded-full bg-[#346538] animate-pulse"></span>
            <span className="font-semibold text-[#121314]">KESTRA TELEMETRY NETWORK:</span>
            <span className="text-[#346538]">ALL 12 REGIONAL QUORUMS HEALTHY</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[11px] text-[#8F939A]">
            <span>p99 Global: 0.82ms</span>
            <span>·</span>
            <span>Total Indexed Vectors: 1.48B</span>
            <span>·</span>
            <span>Consensus Lag: 0.00ms</span>
            <span>·</span>
            <span className="rounded bg-[#F6F6F4] px-1.5 py-0.5 text-[#121314]">Zero-Copy Engine Active</span>
          </div>
        </div>
      </div>

      {/* Dense Navigation Grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Column 1: Core Engine */}
          <div>
            <div className="text-[11px] uppercase tracking-wider text-[#121314] font-semibold mb-3">
              Engine Core
            </div>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-[#121314] transition-colors">Rust Kernel Source</a></li>
              <li><a href="#" className="hover:text-[#121314] transition-colors">RFC-088 Specification</a></li>
              <li><a href="#" className="hover:text-[#121314] transition-colors">SIMD AVX-512 Intrinsics</a></li>
              <li><a href="#" className="hover:text-[#121314] transition-colors">Zero-Copy mmap Subsystem</a></li>
              <li><a href="#" className="hover:text-[#121314] transition-colors">HNSW Graph Pruning</a></li>
              <li><a href="#" className="hover:text-[#121314] transition-colors">IVF-PQ Quantization</a></li>
            </ul>
          </div>

          {/* Column 2: Protocols & SDKs */}
          <div>
            <div className="text-[11px] uppercase tracking-wider text-[#121314] font-semibold mb-3">
              Client SDKs
            </div>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-[#121314] transition-colors">Rust (<code className="text-[10px]">crates.io/kestradb</code>)</a></li>
              <li><a href="#" className="hover:text-[#121314] transition-colors">TypeScript (<code className="text-[10px]">npm/@kestradb</code>)</a></li>
              <li><a href="#" className="hover:text-[#121314] transition-colors">Python (<code className="text-[10px]">pypi/kestradb</code>)</a></li>
              <li><a href="#" className="hover:text-[#121314] transition-colors">Go Driver (<code className="text-[10px]">pkg.go.dev</code>)</a></li>
              <li><a href="#" className="hover:text-[#121314] transition-colors">gRPC / FlatBuffers Protobufs</a></li>
              <li><a href="#" className="hover:text-[#121314] transition-colors">LangChain & LlamaIndex Integrations</a></li>
            </ul>
          </div>

          {/* Column 3: Distributed Cluster */}
          <div>
            <div className="text-[11px] uppercase tracking-wider text-[#121314] font-semibold mb-3">
              Cluster Ops
            </div>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-[#121314] transition-colors">Raft Topology Configuration</a></li>
              <li><a href="#" className="hover:text-[#121314] transition-colors">eBPF XDP Dispatcher</a></li>
              <li><a href="#" className="hover:text-[#121314] transition-colors">NVMe Linux io_uring Tuning</a></li>
              <li><a href="#" className="hover:text-[#121314] transition-colors">Multi-Region Quorums</a></li>
              <li><a href="#" className="hover:text-[#121314] transition-colors">Prometheus Metrics Exporter</a></li>
              <li><a href="#" className="hover:text-[#121314] transition-colors">Rolling Zero-Downtime Upgrade</a></li>
            </ul>
          </div>

          {/* Column 4: Research & Benchmarks */}
          <div>
            <div className="text-[11px] uppercase tracking-wider text-[#121314] font-semibold mb-3">
              Research & Papers
            </div>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-[#121314] transition-colors">100M ANN Benchmark Paper</a></li>
              <li><a href="#" className="hover:text-[#121314] transition-colors">AVX-512 Distance Acceleration</a></li>
              <li><a href="#" className="hover:text-[#121314] transition-colors">Product Quantization Error Drift</a></li>
              <li><a href="#" className="hover:text-[#121314] transition-colors">Deterministic Memory Bounds</a></li>
              <li><a href="#" className="hover:text-[#121314] transition-colors">Hardware NUMA Pinning Guide</a></li>
              <li><a href="#" className="hover:text-[#121314] transition-colors">Reciprocal Rank Fusion Analysis</a></li>
            </ul>
          </div>

          {/* Column 5: Governance & Security */}
          <div>
            <div className="text-[11px] uppercase tracking-wider text-[#121314] font-semibold mb-3">
              Assurance & Trust
            </div>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-[#121314] transition-colors">Apache 2.0 Open Source</a></li>
              <li><a href="#" className="hover:text-[#121314] transition-colors">SOC2 Type II Attestation</a></li>
              <li><a href="#" className="hover:text-[#121314] transition-colors">Air-Gapped Defense Validation</a></li>
              <li><a href="#" className="hover:text-[#121314] transition-colors">Security Disclosure Policy</a></li>
              <li><a href="#" className="hover:text-[#121314] transition-colors">Enterprise SLA Guarantee</a></li>
              <li><a href="#" className="hover:text-[#121314] transition-colors">Privacy & Data Sovereignty</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-[#E8E8E5] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-6 w-6 items-center justify-center rounded border border-[#E8E8E5] bg-white text-[#FF4400]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3" fill="#FF4400" />
                <path d="M12 3v6M12 15v6M3 12h6M15 12h6" />
              </svg>
            </div>
            <span className="font-mono text-xs text-[#121314] font-medium">
              KESTRADB DISTRIBUTED ENGINE &copy; 2026
            </span>
            <span className="text-[#D4D4CE]">/</span>
            <span className="text-[11px] text-[#8F939A]">Licensed under Apache 2.0</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-[#8F939A]">Commit: <code className="text-[#121314]">8f921bc (v2.4.1)</code></span>
            <span>·</span>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-[#121314]">GitHub</a>
            <span>·</span>
            <a href="#" className="hover:text-[#121314]">Status</a>
            <span>·</span>
            <a href="#" className="hover:text-[#121314]">Discord</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
