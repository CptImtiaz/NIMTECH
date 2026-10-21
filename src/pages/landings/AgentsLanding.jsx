import OrbitManifesto from '../../components/agents/OrbitManifesto.jsx'
import ChatAnywhere from '../../components/agents/ChatAnywhere.jsx'
import { AgentSpot } from '../../components/home/Sections.jsx'
import { ServiceDetail } from '../Service.jsx'

// AI Agents: the agent cast in orbit, the manifesto, chat on every
// channel, the WhatsApp demo, then the service detail.
export default function AgentsLanding() {
  return (
    <>
      <OrbitManifesto />
      <ChatAnywhere />
      <AgentSpot />
      <ServiceDetail id="ai-agents" demo={false} />
    </>
  )
}
