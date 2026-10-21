import OrbitManifesto from '../../components/agents/OrbitManifesto.jsx'
import ChatAnywhere from '../../components/agents/ChatAnywhere.jsx'
import { ServiceDetail } from '../Service.jsx'

// AI Agents: the agent cast in orbit, the manifesto, chat on every
// channel, then the service detail.
export default function AgentsLanding() {
  return (
    <>
      <OrbitManifesto />
      <ChatAnywhere />
      <ServiceDetail id="ai-agents" />
    </>
  )
}
