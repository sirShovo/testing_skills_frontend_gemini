import React, { useState } from 'react'

interface FAQItem {
  question: string
  answer: string
  tag: string
}

export const TechnicalFAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs: FAQItem[] = [
    {
      question: 'How does KestraDB avoid Linux kernel page faults with zero-copy mmap?',
      answer: 'KestraDB maps immutable HNSW segment files directly into virtual memory using mmap with MAP_SHARED and madvise(MADV_WILLNEED) flags. Segments are laid out sequentially with 64-byte SIMD alignment, allowing AVX-512 FMA instructions to operate directly on the memory-mapped pointers without buffering or intermediate userspace heap allocations.',
      tag: 'STORAGE ENGINE',
    },
    {
      question: 'What consensus protocol does KestraDB use for distributed cluster topology?',
      answer: 'KestraDB implements the Raft consensus algorithm (RFC-088 specification) in pure Rust. Only metadata (partition maps, node health leases, segment manifests) flows through the Raft log. Raw vector data writes are committed directly to localized quorum shards via non-blocking parallel append buffers, preventing consensus bottlenecks.',
      tag: 'CONSENSUS',
    },
    {
      question: 'Can KestraDB execute hybrid queries combining dense vectors and BM25 sparse tokens?',
      answer: 'Yes. Every shard contains a co-located inverted index partition alongside the HNSW vector graph. Query coordinators perform reciprocal rank fusion (RRF) at the shard level before returning top-k merged candidates, eliminating secondary network hops for lexical re-ranking.',
      tag: 'HYBRID SEARCH',
    },
    {
      question: 'What happens when a node fails during active vector insertions?',
      answer: 'The Raft quorum immediately identifies lease expiration via heartbeat timeout (150ms). Read and write traffic automatically routes to synchronous follower replicas holding verified segment write-ahead logs (WAL). Recovery requires zero full-data copies because cold segment state is already persisted to object storage.',
      tag: 'RESILIENCY',
    },
    {
      question: 'What are the minimum hardware requirements for self-hosting KestraDB?',
      answer: 'A single node requires at least 4 x86_64 vCPUs with AVX2 or AVX-512 support (or ARM64 with Neon), 8 GB RAM, and an NVMe SSD with ext4 or XFS filesystems. For production 100M+ vector clusters, we recommend 16+ cores, 64 GB RAM, and dual NVMe drives configured for io_uring.',
      tag: 'HARDWARE',
    },
  ]

  return (
    <section className="relative border-b border-[#E8E8E5] bg-[#FBFBFA] py-20 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="border-b border-[#E8E8E5] pb-6 mb-8">
          <div className="text-xs font-mono uppercase tracking-wider text-[#FF4400] font-medium mb-1">
            Documentation & Knowledge Base
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#121314]">
            Engineering Questions & Architectural Answers
          </h2>
        </div>

        {/* Minimalist accordion without boxed containers */}
        <div className="divide-y divide-[#E8E8E5] border-t border-[#E8E8E5]">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <div key={faq.question} className="py-5">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-start justify-between gap-4 text-left group"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] text-[#8F939A] uppercase tracking-wider bg-[#F6F6F4] px-1.5 py-0.5 rounded">
                      {faq.tag}
                    </span>
                    <span className="font-sans text-base font-medium text-[#121314] group-hover:text-[#FF4400] transition-colors">
                      {faq.question}
                    </span>
                  </div>
                  <span className="shrink-0 font-mono text-base font-light text-[#6B6F76] px-1">
                    {isOpen ? '—' : '+'}
                  </span>
                </button>

                {isOpen && (
                  <div className="mt-3 pl-0 sm:pl-24 text-xs font-sans leading-relaxed text-[#6B6F76]">
                    {faq.answer}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
