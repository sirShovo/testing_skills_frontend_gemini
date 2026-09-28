import React from 'react'

export const EngineSpecs: React.FC = () => {
  const specs = [
    {
      code: 'AVX-512 FMA',
      title: 'Vector Hardware Intrinsics',
      desc: 'Inner loop dot products execute across 512-bit ZMM registers, calculating 16 single-precision float operations per clock cycle.',
      badge: 'HARDWARE ACCEL',
      color: '#FF4400',
    },
    {
      code: 'MAP_SHARED + IO_URING',
      title: 'Zero-Copy NVMe mmap',
      desc: 'Bypasses user-space buffers by mapping segment files directly to virtual memory space, executing direct kernel IO without page cache duplicate copies.',
      badge: 'LINUX KERNEL',
      color: '#121314',
    },
    {
      code: 'RAFT RFC-088',
      title: 'Deterministic Partitioning',
      desc: 'Metadata consensus guarantees linearizability. Vector write-ahead logs stream concurrently to localized quorum partition shards.',
      badge: 'CONSENSUS',
      color: '#1F6C9F',
    },
    {
      code: 'IVF-PQ 8-BIT',
      title: 'Scalar & Product Quantization',
      desc: 'Dynamic 8-bit quantization reduces memory consumption by 75-88% while maintaining greater than 99% recall on standard benchmarks.',
      badge: 'QUANTIZATION',
      color: '#346538',
    },
  ]

  return (
    <section id="specs" className="relative border-b border-[#E8E8E5] bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between border-b border-[#E8E8E5] pb-4 mb-8">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#FF4400] font-medium">
            <span>Hardware Specifications</span>
            <span>/</span>
            <span>Micro-Architectural Guarantees</span>
          </div>
          <span className="text-xs font-mono text-[#8F939A]">x86_64 & ARM64 Neon Native</span>
        </div>

        {/* Bento Grid of Specs with 1px border rule */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-[#E8E8E5] rounded-lg divide-y md:divide-y-0 md:divide-x divide-[#E8E8E5] bg-[#FAF9F7]/40">
          {specs.map((item) => (
            <div key={item.code} className="p-6 flex flex-col justify-between hover:bg-white transition-colors">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[10px] uppercase tracking-wider bg-white border border-[#E8E8E5] px-2 py-0.5 rounded text-[#121314]">
                    {item.badge}
                  </span>
                  <kbd className="font-mono text-[10px] text-[#8F939A] bg-[#F6F6F4] px-1.5 py-0.5 rounded border border-[#E8E8E5]">
                    {item.code}
                  </kbd>
                </div>
                <h4 className="font-mono text-sm font-bold text-[#121314] mt-2">{item.title}</h4>
                <p className="mt-2 text-xs font-sans text-[#6B6F76] leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-[#E8E8E5]/70 flex items-center justify-between text-[11px] font-mono text-[#8F939A]">
                <span>Kernel Subsystem</span>
                <span className="text-[#121314] font-medium">RFC-088 Compliant</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
