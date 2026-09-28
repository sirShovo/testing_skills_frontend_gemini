import React, { useState } from 'react'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { InteractiveBenchmarks } from './components/InteractiveBenchmarks'
import { EngineSpecs } from './components/EngineSpecs'
import { ClusterArchitecture } from './components/ClusterArchitecture'
import { PricingSection } from './components/PricingSection'
import { TechnicalFAQ } from './components/TechnicalFAQ'
import { TechnicalFooter } from './components/TechnicalFooter'

export const App: React.FC = () => {
  const [copiedScript, setCopiedScript] = useState(false)

  const deployCommand = 'curl -sSL https://get.kestradb.io | bash -s -- --cluster --shards 3 --raft-peers 3'

  const copyScript = () => {
    navigator.clipboard.writeText(deployCommand)
    setCopiedScript(true)
    setTimeout(() => setCopiedScript(false), 2000)
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBFA] text-[#121314]">
      {/* Top Banner for Open Source Release */}
      <aside aria-label="Engine release announcement" className="border-b border-[#E8E8E5] bg-[#FAF9F7] py-2 px-4 text-center font-mono text-[11px] text-[#6B6F76]">
        <span className="font-semibold text-[#121314]">KESTRADB CORE v2.4.1 RELEASED:</span>
        <span className="ml-1 text-[#6B6F76]">Deterministic sub-millisecond p99 vectors with Linux io_uring and AVX-512 intrinsics.</span>
        <a href="#benchmarks" className="ml-2 font-medium text-[#FF4400] underline hover:text-[#E03C00]">
          Inspect Verified Benchmarks &rarr;
        </a>
      </aside>

      {/* Main Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Section 1: Hero & Interactive Query Console */}
        <Hero />

        {/* Section 2: Interactive Benchmarks */}
        <InteractiveBenchmarks />

        {/* Technical Engine Hardware Specs Bento */}
        <EngineSpecs />

        {/* Section 3: Cluster Architecture with SVG Connectors */}
        <ClusterArchitecture />

        {/* Section 4: Pricing Table & Deep Capability Matrix */}
        <PricingSection />

        {/* Technical FAQ Accordion */}
        <TechnicalFAQ />
      </main>

      {/* Section 5: Technical Footer & Telemetry Bar */}
      <TechnicalFooter />

      {/* Quick Deploy Command Overlay (triggered by #deploy links) */}
      <div id="deploy" className="hidden target:flex fixed inset-0 z-50 bg-black/40 backdrop-blur-xs items-center justify-center p-4">
        <div className="w-full max-w-xl rounded-lg border border-[#E8E8E5] bg-white p-6 shadow-xl font-mono text-xs">
          <div className="flex items-center justify-between border-b border-[#E8E8E5] pb-3 mb-4">
            <span className="font-bold text-[#121314] uppercase tracking-wider">Quick Cluster Deployment</span>
            <a href="#" className="text-[#8F939A] hover:text-[#121314] text-base leading-none">&times;</a>
          </div>

          <p className="font-sans text-xs text-[#6B6F76] mb-4">
            Execute this command on your Linux hosts to install the KestraDB engine binary, configure systemd services, and bind NVMe io_uring memory queues.
          </p>

          <div className="flex items-center justify-between rounded border border-[#E8E8E5] bg-[#FBFBFA] p-3 text-[11px] text-[#121314] mb-4 overflow-x-auto">
            <code>{deployCommand}</code>
          </div>

          <div className="flex items-center justify-end gap-3">
            <a href="#" className="rounded border border-[#E8E8E5] px-3 py-1.5 text-xs text-[#6B6F76] hover:bg-[#F6F6F4]">
              Close
            </a>
            <button
              type="button"
              onClick={copyScript}
              className="rounded bg-[#121314] px-4 py-1.5 text-xs text-white hover:bg-[#2A2A2A]"
            >
              {copiedScript ? 'Copied to Clipboard' : 'Copy Installation Script'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
