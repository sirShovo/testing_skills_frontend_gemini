import React, { useState } from 'react'

type CodeLanguage = 'rust' | 'typescript' | 'python' | 'curl'

interface QueryResult {
  id: string
  score: number
  shard: string
  payload: string
  distance: number
}

export const Hero: React.FC = () => {
  const [activeLang, setActiveLang] = useState<CodeLanguage>('rust')
  const [metric, setMetric] = useState<'cosine' | 'dot_product' | 'euclidean'>('cosine')
  const [efSearch, setEfSearch] = useState<number>(128)
  const [dimensions, setDimensions] = useState<number>(1536)
  const [isExecuting, setIsExecuting] = useState<boolean>(false)
  const [copiedCmd, setCopiedCmd] = useState<boolean>(false)

  // Dynamic simulated query execution
  const [results, setResults] = useState<QueryResult[]>([
    {
      id: 'doc_vec_984128a',
      score: 0.9842,
      distance: 0.0158,
      shard: 'shard-03-eu-west',
      payload: '{"tenant": "acme_ai", "model": "text-embedding-3-large", "token_span": [128, 512]}',
    },
    {
      id: 'doc_vec_412093c',
      score: 0.9715,
      distance: 0.0285,
      shard: 'shard-01-eu-west',
      payload: '{"tenant": "acme_ai", "model": "text-embedding-3-large", "token_span": [512, 1024]}',
    },
    {
      id: 'doc_vec_774910f',
      score: 0.9583,
      distance: 0.0417,
      shard: 'shard-07-eu-west',
      payload: '{"tenant": "acme_ai", "model": "text-embedding-3-large", "token_span": [0, 128]}',
    },
  ])

  // Latency breakdown metrics (in milliseconds)
  const latencySteps = [
    { label: 'eBPF Ingress Routing', duration: 0.06, color: '#121314' },
    { label: 'Partition Fan-Out (8 Shards)', duration: 0.12, color: '#4B5563' },
    { label: 'HNSW Beam Traversal (AVX-512)', duration: 0.38, color: '#FF4400' },
    { label: 'IVF-PQ Quantized Reranking', duration: 0.14, color: '#9CA3AF' },
    { label: 'Zero-Copy mmap Deserialization', duration: 0.08, color: '#D1D5DB' },
  ]

  const totalLatency = latencySteps.reduce((acc, step) => acc + step.duration, 0).toFixed(2)

  const handleExecute = () => {
    setIsExecuting(true)
    setTimeout(() => {
      // Perturb scores slightly to demonstrate live reactive query
      const baseScores = [0.985 + (Math.random() * 0.008 - 0.004), 0.972 + (Math.random() * 0.008 - 0.004), 0.956 + (Math.random() * 0.008 - 0.004)]
      setResults([
        {
          id: `doc_vec_${Math.floor(100000 + Math.random() * 900000)}a`,
          score: parseFloat(baseScores[0].toFixed(4)),
          distance: parseFloat((1 - baseScores[0]).toFixed(4)),
          shard: `shard-0${Math.floor(Math.random() * 7) + 1}-eu-west`,
          payload: `{"tenant": "acme_ai", "dims": ${dimensions}, "metric": "${metric}"}`,
        },
        {
          id: `doc_vec_${Math.floor(100000 + Math.random() * 900000)}c`,
          score: parseFloat(baseScores[1].toFixed(4)),
          distance: parseFloat((1 - baseScores[1]).toFixed(4)),
          shard: `shard-0${Math.floor(Math.random() * 7) + 1}-eu-west`,
          payload: `{"tenant": "acme_ai", "dims": ${dimensions}, "ef": ${efSearch}}`,
        },
        {
          id: `doc_vec_${Math.floor(100000 + Math.random() * 900000)}f`,
          score: parseFloat(baseScores[2].toFixed(4)),
          distance: parseFloat((1 - baseScores[2]).toFixed(4)),
          shard: `shard-0${Math.floor(Math.random() * 7) + 1}-eu-west`,
          payload: `{"tenant": "acme_ai", "recall": 0.994}`,
        },
      ])
      setIsExecuting(false)
    }, 400)
  }

  const copyInstall = () => {
    navigator.clipboard.writeText('docker run -d -p 8443:8443 -v /data/kestra:/var/lib/kestra kestradb/engine:v2.4')
    setCopiedCmd(true)
    setTimeout(() => setCopiedCmd(false), 2000)
  }

  const codeSnippets: Record<CodeLanguage, string> = {
    rust: `use kestradb_client::{Client, Metric, QueryBuilder};

#[tokio::main]
async fn main() -> Result<(), kestradb_client::Error> {
    let client = Client::connect("kestra://eu-cluster-01.internal:8443").await?;
    
    let query_vector = vec![0.0821f32; ${dimensions}];
    let response = client
        .collection("production_embeddings")
        .query(QueryBuilder::new(query_vector)
            .top_k(3)
            .metric(Metric::${metric === 'cosine' ? 'Cosine' : metric === 'dot_product' ? 'DotProduct' : 'Euclidean'})
            .ef_search(${efSearch})
            .consistency_level("quorum")
            .build())
        .await?;

    println!("p99 latency: {:?}ms | results: {}", response.latency_ms, response.matches.len());
    Ok(())
}`,
    typescript: `import { KestraClient, Metric } from "@kestradb/sdk";

const client = new KestraClient({
  endpoint: "kestra://eu-cluster-01.internal:8443",
  quorumConsistency: "majority",
});

const queryVector = new Float32Array(${dimensions}); // 1536-d embedding
const results = await client.collection("production_embeddings").search({
  vector: queryVector,
  topK: 3,
  metric: Metric.${metric.toUpperCase()},
  efSearch: ${efSearch},
  filter: { tenantId: "acme_ai" },
});

console.log(\`Execution p99: \${results.stats.latencyMs}ms\`);`,
    python: `from kestradb import KestraCluster, MetricType

cluster = KestraCluster("kestra://eu-cluster-01.internal:8443")
collection = cluster.get_collection("production_embeddings")

# SIMD-accelerated zero-copy search
results = collection.query(
    vector=[0.0821] * ${dimensions},
    top_k=3,
    metric=MetricType.${metric.toUpperCase()},
    ef_search=${efSearch},
    read_consistency="linearizable"
)

print(f"p99: {results.latency_ms:.2f}ms | Matches: {len(results.items)}")`,
    curl: `curl -X POST https://eu-cluster-01.internal:8443/v1/collections/production_embeddings/search \\
  -H "Authorization: Bearer kdb_live_920f1883" \\
  -H "Content-Type: application/json" \\
  -d '{
    "vector": [0.0821, -0.4109, 0.9123, ... ${dimensions} dims],
    "top_k": 3,
    "metric": "${metric}",
    "ef_search": ${efSearch},
    "routing_strategy": "nearest_shard"
  }'`,
  }

  return (
    <section className="relative border-b border-[#E8E8E5] bg-[#FBFBFA] pt-12 pb-20 sm:pt-16 sm:pb-24 overflow-hidden">
      {/* Structural subtle grid background */}
      <div className="absolute inset-0 grid-line-pattern pointer-events-none opacity-40"></div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Meta technical stamp */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 rounded border border-[#E8E8E5] bg-white px-2.5 py-1 text-[11px] font-mono tracking-wider uppercase text-[#121314]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF4400]"></span>
            <span>Kernel Specification: RFC-088</span>
          </div>
          <span className="hidden sm:inline text-xs font-mono text-[#8F939A]">/</span>
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#6B6F76]">
            Zero-Copy mmap · SIMD AVX-512 · Raft Quorum Replication
          </span>
        </div>

        {/* Editorial Heading */}
        <div className="max-w-4xl">
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal leading-[1.08] tracking-[-0.03em] text-[#121314]">
            Sub-millisecond approximate nearest neighbors at billion-vector scale.
          </h1>
          <p className="mt-6 text-base sm:text-lg leading-relaxed text-[#6B6F76] font-sans max-w-3xl">
            KestraDB is an open-source distributed vector database engineered in Rust. It combines segmented HNSW graphs, hardware-intrinsic AVX-512 vector arithmetic, and a Raft consensus plane to deliver deterministic p99 query latency under heavy concurrency.
          </p>
        </div>

        {/* Action button bar */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href="#deploy"
            className="inline-flex items-center gap-2 rounded bg-[#121314] px-4 py-2.5 text-xs font-mono text-white hover:bg-[#2A2A2A] transition-colors active:scale-[0.98]"
          >
            <span>Deploy Self-Hosted Cluster</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>

          <a
            href="#architecture"
            className="inline-flex items-center gap-2 rounded border border-[#E8E8E5] bg-white px-4 py-2.5 text-xs font-mono text-[#121314] hover:bg-[#F6F6F4] transition-colors"
          >
            Read Architecture Whitepaper
          </a>

          {/* Inline Copy command */}
          <div className="flex items-center rounded border border-[#E8E8E5] bg-white px-3 py-2 text-xs font-mono text-[#6B6F76]">
            <span className="text-[#8F939A] select-none mr-2">$</span>
            <span className="text-[#121314] font-medium">docker pull kestradb/engine:v2.4</span>
            <button
              type="button"
              onClick={copyInstall}
              className="ml-3 rounded border border-[#E8E8E5] bg-[#FBFBFA] px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-[#121314] hover:bg-white"
            >
              {copiedCmd ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>

        {/* Interactive Query Mockup Container */}
        <div id="console" className="mt-14 rounded-lg border border-[#E8E8E5] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-hidden">
          {/* Faux OS Topbar / Header */}
          <div className="flex flex-wrap items-center justify-between border-b border-[#E8E8E5] bg-[#FAF9F7] px-4 py-3 gap-2">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#E8E8E5] border border-[#D4D4CE]"></span>
                <span className="h-2.5 w-2.5 rounded-full bg-[#E8E8E5] border border-[#D4D4CE]"></span>
                <span className="h-2.5 w-2.5 rounded-full bg-[#E8E8E5] border border-[#D4D4CE]"></span>
              </div>
              <span className="text-xs font-mono font-medium text-[#121314] ml-2">kestradb-query-engine-terminal</span>
              <span className="rounded bg-[#EDF3EC] px-1.5 py-0.5 text-[10px] font-mono text-[#346538]">
                SIMD AVX-512 ENABLED
              </span>
            </div>

            {/* Language tabs */}
            <div className="flex items-center rounded border border-[#E8E8E5] bg-white p-0.5 text-xs font-mono">
              {(['rust', 'typescript', 'python', 'curl'] as CodeLanguage[]).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setActiveLang(lang)}
                  className={`px-2.5 py-1 text-[11px] uppercase tracking-wider transition-colors ${
                    activeLang === lang
                      ? 'bg-[#121314] text-white font-medium rounded-sm'
                      : 'text-[#6B6F76] hover:text-[#121314]'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Parameters Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-4 border-b border-[#E8E8E5] bg-[#FDFDFC] divide-y sm:divide-y-0 sm:divide-x divide-[#E8E8E5] text-xs font-mono">
            {/* Metric */}
            <div className="p-3">
              <label className="block text-[10px] uppercase tracking-wider text-[#8F939A] mb-1.5">Distance Metric</label>
              <div className="flex items-center gap-1">
                {(['cosine', 'dot_product', 'euclidean'] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMetric(m)}
                    className={`px-2 py-1 text-[10px] uppercase rounded border transition-colors ${
                      metric === m
                        ? 'border-[#121314] bg-[#121314] text-white font-medium'
                        : 'border-[#E8E8E5] bg-white text-[#6B6F76] hover:bg-[#F6F6F4]'
                    }`}
                  >
                    {m === 'cosine' ? 'Cosine' : m === 'dot_product' ? 'Dot' : 'L2'}
                  </button>
                ))}
              </div>
            </div>

            {/* Dimensions */}
            <div className="p-3">
              <label className="block text-[10px] uppercase tracking-wider text-[#8F939A] mb-1.5">Embedding Dims</label>
              <div className="flex items-center gap-1">
                {[768, 1536, 3072].map((dim) => (
                  <button
                    key={dim}
                    type="button"
                    onClick={() => setDimensions(dim)}
                    className={`px-2 py-1 text-[10px] font-mono rounded border transition-colors ${
                      dimensions === dim
                        ? 'border-[#121314] bg-[#121314] text-white font-medium'
                        : 'border-[#E8E8E5] bg-white text-[#6B6F76] hover:bg-[#F6F6F4]'
                    }`}
                  >
                    {dim}d
                  </button>
                ))}
              </div>
            </div>

            {/* efSearch parameter */}
            <div className="p-3">
              <label className="block text-[10px] uppercase tracking-wider text-[#8F939A] mb-1.5">
                Beam Width (ef_search: {efSearch})
              </label>
              <div className="flex items-center gap-1">
                {[64, 128, 256].map((ef) => (
                  <button
                    key={ef}
                    type="button"
                    onClick={() => setEfSearch(ef)}
                    className={`px-2 py-1 text-[10px] font-mono rounded border transition-colors ${
                      efSearch === ef
                        ? 'border-[#121314] bg-[#121314] text-white font-medium'
                        : 'border-[#E8E8E5] bg-white text-[#6B6F76] hover:bg-[#F6F6F4]'
                    }`}
                  >
                    {ef}
                  </button>
                ))}
              </div>
            </div>

            {/* Run Trigger */}
            <div className="p-3 flex items-center justify-between sm:justify-end">
              <button
                type="button"
                onClick={handleExecute}
                disabled={isExecuting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded bg-[#FF4400] px-4 py-2 text-xs font-mono font-medium text-white hover:bg-[#E03C00] transition-colors disabled:opacity-50 active:scale-[0.98]"
              >
                {isExecuting ? (
                  <>
                    <svg className="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <circle cx="12" cy="12" r="10" strokeDasharray="32" strokeDashoffset="10" />
                    </svg>
                    <span>Executing Vector Search...</span>
                  </>
                ) : (
                  <>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                    <span>Execute Vector Query</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Main 2-column workspace: Code on left, Live execution result & Latency Graph on right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#E8E8E5]">
            {/* Code editor view */}
            <div className="lg:col-span-6 bg-[#FAF9F7] p-5 font-mono text-xs overflow-x-auto">
              <div className="flex items-center justify-between pb-3 text-[#8F939A] text-[11px] uppercase tracking-wider border-b border-[#E8E8E5]/70 mb-3">
                <span>query_execution.{activeLang === 'typescript' ? 'ts' : activeLang === 'rust' ? 'rs' : activeLang === 'python' ? 'py' : 'sh'}</span>
                <span>read-only</span>
              </div>
              <pre className="text-[#121314] leading-relaxed whitespace-pre font-mono text-[11.5px]">
                {codeSnippets[activeLang]}
              </pre>
            </div>

            {/* Live Graph & Execution Inspector */}
            <div className="lg:col-span-6 p-5 bg-white flex flex-col justify-between space-y-6">
              {/* Latency Waterfall Graph */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono uppercase tracking-wider text-[#121314] font-semibold">
                      p99 Latency Graph Breakdown
                    </span>
                    <span className="rounded bg-[#E1F3FE] px-1.5 py-0.2 text-[10px] font-mono text-[#1F6C9F]">
                      Total: {totalLatency}ms
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#8F939A]">Target &lt; 1.00ms</span>
                </div>

                {/* Segmented Waterfall Bar */}
                <div className="h-4 w-full rounded border border-[#E8E8E5] bg-[#F6F6F4] flex overflow-hidden p-0.5 gap-0.5">
                  {latencySteps.map((step) => {
                    const widthPercent = (step.duration / parseFloat(totalLatency)) * 100
                    return (
                      <div
                        key={step.label}
                        style={{
                          width: `${widthPercent}%`,
                          backgroundColor: step.color,
                        }}
                        className="h-full rounded-sm transition-all duration-300"
                        title={`${step.label}: ${step.duration}ms`}
                      />
                    )
                  })}
                </div>

                {/* Latency legend */}
                <div className="mt-3 space-y-1.5 font-mono text-[11px]">
                  {latencySteps.map((step) => (
                    <div key={step.label} className="flex items-center justify-between text-[#6B6F76]">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-xs" style={{ backgroundColor: step.color }}></span>
                        <span>{step.label}</span>
                      </div>
                      <span className="font-medium text-[#121314]">{step.duration.toFixed(2)} ms</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Nearest Neighbor Results list */}
              <div className="border-t border-[#E8E8E5] pt-4">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#121314] font-semibold">
                    Top-3 Matched Vectors (k=3)
                  </span>
                  <span className="text-[10px] font-mono text-[#346538] font-medium">RECALL @ 10: 99.4%</span>
                </div>

                <div className="space-y-2">
                  {results.map((res, idx) => (
                    <div
                      key={res.id}
                      className="rounded border border-[#E8E8E5] bg-[#FBFBFA] p-2.5 font-mono text-xs transition-colors hover:border-[#121314]"
                    >
                      <div className="flex items-center justify-between text-[11px] mb-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#FF4400]">#{idx + 1}</span>
                          <span className="text-[#121314] font-medium">{res.id}</span>
                          <span className="rounded bg-[#F6F6F4] px-1 py-0.2 text-[9px] text-[#8F939A]">{res.shard}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-[#6B6F76]">dist: {res.distance}</span>
                          <span className="font-semibold text-[#121314]">score: {res.score}</span>
                        </div>
                      </div>
                      <div className="text-[10px] text-[#8F939A] truncate bg-white rounded px-1.5 py-0.5 border border-[#E8E8E5]/50">
                        {res.payload}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
