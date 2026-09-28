import React, { useState } from 'react'

export const PricingSection: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual')

  const tiers = [
    {
      name: 'Community Engine',
      tag: 'APACHE 2.0 OPEN SOURCE',
      price: '$0',
      period: 'perpetual',
      subhead: 'Self-hosted binary or container for local development and self-managed production infrastructure.',
      cta: 'Clone Repository',
      ctaHref: 'https://github.com',
      highlighted: false,
      features: [
        'Complete Rust engine core with SIMD AVX-512',
        'Single-node and self-managed multi-node clustering',
        'Zero-copy NVMe memory-mapped storage engine',
        'Unlimited collections, vectors, and dimensions',
        'Standard community support via GitHub Discussions',
      ],
    },
    {
      name: 'Managed Dedicated',
      tag: 'FULLY MANAGED CLUSTER',
      price: billingCycle === 'annual' ? '$480' : '$560',
      period: 'per node / month',
      subhead: 'Dedicated bare-metal instances on AWS or GCP with automated Raft failover and zero-downtime compactions.',
      cta: 'Provision Managed Cluster',
      ctaHref: '#deploy',
      highlighted: true,
      features: [
        'Everything in Community, fully managed',
        '3-node or 5-node automated Raft quorum',
        'Continuous cold snapshot backups to S3/GCS',
        '99.99% query availability SLA guarantee',
        'Automated online segment compaction & vacuuming',
        'Encrypted TLS 1.3 in-transit and AES-256 at rest',
        '8x5 technical engineering support via Slack',
      ],
    },
    {
      name: 'Enterprise Sovereign',
      tag: 'AIR-GAPPED & DEDICATED',
      price: 'Custom',
      period: 'annual contract',
      subhead: 'For national defense, sovereign finance, and high-throughput multi-cluster deployments with kernel engineers.',
      cta: 'Contact Kernel Engineering',
      ctaHref: '#contact',
      highlighted: false,
      features: [
        'Air-gapped and Sovereign Cloud deployment validation',
        'Custom SIMD micro-architecture kernel optimization',
        'Multi-region active-active linearizable replication',
        'SOC2 Type II, HIPAA, and ISO-27001 compliance kit',
        'Sub-15 minute P0 emergency response SLA',
        'Dedicated Rust database core engineer assigned',
      ],
    },
  ]

  const featureMatrix = [
    { feature: 'Core SIMD AVX-512 Acceleration', community: true, managed: true, enterprise: true },
    { feature: 'Zero-Copy NVMe mmap Engine', community: true, managed: true, enterprise: true },
    { feature: 'Vector Metrics (Cosine, L2, Dot Product)', community: true, managed: true, enterprise: true },
    { feature: 'Hybrid Dense + BM25 Sparse Search', community: true, managed: true, enterprise: true },
    { feature: 'Automated Raft Multi-Node Consensus', community: 'Manual', managed: 'Automated 3-5 Nodes', enterprise: 'Custom Multi-Region' },
    { feature: 'Zero-Downtime Rolling Upgrades', community: 'Manual', managed: true, enterprise: true },
    { feature: 'Durable Tiered Object Storage Snapshots', community: 'CLI Tool', managed: 'Automated hourly', enterprise: 'Continuous streaming' },
    { feature: 'Air-Gapped & Offline Deployment', community: true, managed: false, enterprise: true },
    { feature: 'Hardware-Intrinsic NUMA Pinning', community: 'Config file', managed: true, enterprise: 'Custom tuned' },
    { feature: 'Direct Core Engineer SLA', community: false, managed: '8x5 Support', enterprise: '24/7/365 Sub-15m' },
  ]

  return (
    <section id="pricing" className="relative border-b border-[#E8E8E5] bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#E8E8E5] pb-8 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#FF4400] mb-2 font-medium">
              <span>Section 04</span>
              <span>/</span>
              <span>Cluster Procurement</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#121314] tracking-[-0.02em]">
              Transparent Hardware & Licensing
            </h2>
          </div>

          {/* Billing Switcher */}
          <div className="flex items-center gap-2 rounded border border-[#E8E8E5] bg-[#FBFBFA] p-1 text-xs font-mono">
            <button
              type="button"
              onClick={() => setBillingCycle('monthly')}
              className={`px-3 py-1 rounded transition-colors ${
                billingCycle === 'monthly'
                  ? 'bg-[#121314] text-white font-medium'
                  : 'text-[#6B6F76] hover:text-[#121314]'
              }`}
            >
              Monthly Billing
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle('annual')}
              className={`px-3 py-1 rounded transition-colors ${
                billingCycle === 'annual'
                  ? 'bg-[#121314] text-white font-medium'
                  : 'text-[#6B6F76] hover:text-[#121314]'
              }`}
            >
              Annual Contract (-15%)
            </button>
          </div>
        </div>

        {/* Pricing Cards Bento */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`rounded-lg border p-7 sm:p-8 flex flex-col justify-between transition-shadow ${
                t.highlighted
                  ? 'border-[#121314] bg-[#FAF9F7] shadow-[0_4px_16px_rgba(0,0,0,0.04)] relative'
                  : 'border-[#E8E8E5] bg-white hover:border-[#8F939A]'
              }`}
            >
              {t.highlighted && (
                <div className="absolute -top-3 left-6 rounded bg-[#FF4400] px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider text-white font-bold">
                  Recommended for Production
                </div>
              )}

              <div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-[#8F939A]">
                  {t.tag}
                </div>
                <h3 className="font-mono text-xl font-bold text-[#121314] mt-1">{t.name}</h3>

                <div className="mt-4 flex items-baseline gap-1 font-mono">
                  <span className="text-4xl font-bold tracking-tight text-[#121314]">{t.price}</span>
                  <span className="text-xs text-[#8F939A]">/ {t.period}</span>
                </div>

                <p className="mt-4 text-xs font-sans text-[#6B6F76] leading-relaxed border-b border-[#E8E8E5] pb-5">
                  {t.subhead}
                </p>

                {/* Features list */}
                <div className="mt-6 space-y-2.5 font-mono text-xs">
                  {t.features.map((f) => (
                    <div key={f} className="flex items-start gap-2.5 text-[#121314]">
                      <svg className="h-4 w-4 shrink-0 text-[#FF4400] mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span className="leading-tight">{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-[#E8E8E5]">
                <a
                  href={t.ctaHref}
                  className={`w-full inline-flex items-center justify-center rounded py-2.5 text-xs font-mono transition-colors active:scale-[0.98] ${
                    t.highlighted
                      ? 'bg-[#121314] text-white hover:bg-[#2A2A2A] font-medium'
                      : 'border border-[#E8E8E5] bg-white text-[#121314] hover:bg-[#F6F6F4]'
                  }`}
                >
                  {t.cta}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Dense Technical Feature Matrix Table */}
        <div className="mt-16 border border-[#E8E8E5] rounded-lg bg-white overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
          <div className="bg-[#FAF9F7] px-6 py-4 border-b border-[#E8E8E5] flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-wider font-semibold text-[#121314]">
              Deep Technical Capability Matrix
            </span>
            <span className="text-[11px] font-mono text-[#8F939A]">All specifications guaranteed by SLA</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs font-mono">
              <thead>
                <tr className="border-b border-[#E8E8E5] bg-[#FDFDFC] text-[#8F939A] text-[11px] uppercase tracking-wider">
                  <th className="py-3 px-6 font-medium">Capability Specification</th>
                  <th className="py-3 px-6 font-medium">Community (OSS)</th>
                  <th className="py-3 px-6 font-medium">Managed Dedicated</th>
                  <th className="py-3 px-6 font-medium">Enterprise Sovereign</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E8E5]">
                {featureMatrix.map((item, idx) => (
                  <tr key={item.feature} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#FAF9F7]/50'}>
                    <td className="py-3 px-6 text-[#121314] font-medium">{item.feature}</td>
                    
                    <td className="py-3 px-6 text-[#6B6F76]">
                      {typeof item.community === 'boolean' ? (
                        item.community ? (
                          <span className="text-[#346538] font-bold">YES</span>
                        ) : (
                          <span className="text-[#8F939A]">-</span>
                        )
                      ) : (
                        item.community
                      )}
                    </td>

                    <td className="py-3 px-6 text-[#121314]">
                      {typeof item.managed === 'boolean' ? (
                        item.managed ? (
                          <span className="text-[#346538] font-bold">YES</span>
                        ) : (
                          <span className="text-[#8F939A]">-</span>
                        )
                      ) : (
                        item.managed
                      )}
                    </td>

                    <td className="py-3 px-6 text-[#121314] font-semibold">
                      {typeof item.enterprise === 'boolean' ? (
                        item.enterprise ? (
                          <span className="text-[#346538] font-bold">YES</span>
                        ) : (
                          <span className="text-[#8F939A]">-</span>
                        )
                      ) : (
                        item.enterprise
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
