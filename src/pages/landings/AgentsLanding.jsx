import OrbitManifesto from '../../components/agents/OrbitManifesto.jsx'
import ChatAnywhere from '../../components/agents/ChatAnywhere.jsx'
import ServiceBody from '../../components/ServiceBody.jsx'

// AI Agents: a dark, character-driven opening (the agent cast in orbit,
// the manifesto, chat on every channel), then the standard service detail.
export default function AgentsLanding() {
  return (
    <>
      <OrbitManifesto />
      <ChatAnywhere />
      <div className="relative bg-[#101010]">
        <div className="h-16 rounded-t-[32px] bg-white md:h-24" />
      </div>
      <ServiceBody id="ai-agents" />
    </>
  )
}
