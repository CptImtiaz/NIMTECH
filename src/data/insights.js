// Insights: short, practical articles from the NIMTECH engineering team.
// `s` links an article to a service; `body` is a list of [heading, paragraphs].
export const INSIGHTS = [
  {
    slug: 'ai-agents-pilot-to-production',
    seo: 'Putting AI Agents Into Production: A Guide',
    s: 'ai-agents',
    kind: 'Guide',
    title: 'From pilot to production: putting AI agents to work',
    sum: 'Most agent pilots impress in a demo and stall after it. The gap is rarely the model. It is access, guardrails and measurement.',
    date: '2026-10-20',
    read: 6,
    takeaways: [
      'Start with one workflow that has a clear owner and a measurable outcome.',
      'Give the agent real, permissioned access to the systems the work lives in.',
      'Put people in the loop where a mistake is expensive, and nowhere else.',
      'Evaluate on your own cases before every release, not on public benchmarks.',
    ],
    body: [
      ['Why pilots stall', [
        'A pilot usually runs on a copy of the data, with a friendly user and no connection to the systems where the work actually happens. It answers questions well, so everyone is impressed. Then it meets production: real permissions, messy records, edge cases and a risk team that wants to know what happens when it is wrong.',
        'At that point the hard questions are not about the model. They are about which systems the agent may read and write, who approves what, how you know it is getting better or worse, and what it costs per task.',
      ]],
      ['Pick one workflow, not one chatbot', [
        'Good first candidates are high-volume, rule-heavy tasks where a person currently copies information between systems: order and billing requests, claim intake, supplier onboarding, ticket triage. Each has a clear owner, a clear definition of done and a number you can move, such as handling time or first-contact resolution.',
        'Write the workflow down step by step before writing any code. The steps an experienced person takes, and the checks they make, become the agent’s tools and guardrails.',
      ]],
      ['Connect it to real systems, safely', [
        'An agent that cannot read the CRM or update the ticket is just another tab to check. Give it narrow, purpose-built tools (look up an order, issue a refund up to a limit, draft a reply) rather than broad database access. Each tool enforces its own permissions and writes to an audit log.',
        'Keep humans where the stakes are high. A refund above a threshold, a contract change or a message to a key account goes to a person for one-click approval, with the agent’s reasoning and sources attached.',
      ]],
      ['Measure before you scale', [
        'Build an evaluation set from your own historical cases, including the awkward ones. Run it on every change to prompts, tools or models, and track accuracy, cost and latency side by side. When the numbers hold steady in production for a few weeks, widen the scope.',
      ]],
    ],
  },
  {
    slug: 'training-vision-models-on-your-data',
    seo: 'How to Train a Vision Model on Your Own Data',
    s: 'computer-vision',
    kind: 'Playbook',
    title: 'Training a vision model on your own data: a practical playbook',
    sum: 'Off-the-shelf models rarely know your products, defects or sites. Here is how we go from raw images to a model you can trust on the line.',
    date: '2026-10-20',
    read: 7,
    takeaways: [
      'Define the decision the model supports before collecting a single image.',
      'Label a small, varied set first and let errors guide what to collect next.',
      'Evaluate on images from the site and season the model will actually face.',
      'Plan for retraining from day one: the world in front of the camera changes.',
    ],
    body: [
      ['Start from the decision', [
        'A vision project goes well when everyone agrees what the model is for: reject a part, count stock, flag a missing helmet, read a meter. That decision sets the classes, the acceptable error rate and how fast the answer is needed, which in turn decides whether the model runs in the cloud, on an edge device or on a phone.',
      ]],
      ['Collect for variety, not volume', [
        'Ten thousand near-identical images teach less than a few hundred that cover different lighting, angles, shifts, cameras and product variants. We start with a small, deliberately varied set, label it carefully and write a labelling guide with examples of every hard case, so labels stay consistent as the team grows.',
        'After the first model is trained, its mistakes tell you what to collect next. This active-learning loop is far cheaper than labelling everything up front.',
      ]],
      ['Evaluate where it will run', [
        'Hold back test images from the actual site and conditions the model will face, and never train on them. Report results per class and per condition, not just one overall score, because a model that is excellent on day-shift images and poor at night is not ready.',
      ]],
      ['Ship it with a feedback loop', [
        'Deployment is the start, not the end. Log low-confidence predictions, sample them for review, and feed corrected labels back into training on a regular schedule. With monitoring in place you will see drift, such as a new product line or a moved camera, before it shows up as a missed defect.',
      ]],
    ],
  },
  {
    slug: 'integration-first',
    seo: 'Integration First: Connect Before You Rebuild',
    s: 'api-integration',
    kind: 'Perspective',
    title: 'Integration first: connect the systems you have before you build new ones',
    sum: 'Many “we need a new platform” projects are really integration problems. Connecting what already works is often faster, cheaper and less risky.',
    date: '2026-10-20',
    read: 5,
    takeaways: [
      'Map where data is re-typed between systems; that is where the cost hides.',
      'Prefer events and queues over nightly batch jobs for anything time-sensitive.',
      'Build retries, alerts and an audit trail into every integration.',
      'Replace a system only when connecting it would cost more than rebuilding it.',
    ],
    body: [
      ['The hidden cost of re-typing', [
        'In most growing companies, orders, invoices and customer records pass through several systems: a shop, an ERP, a CRM, a warehouse tool, the bank. Wherever a person copies data from one to another, you pay in time, errors and delays, and nobody has one view of the truth.',
        'Before deciding to build or buy a new platform, map those hand-offs. The map often shows that the systems themselves are fine; the gaps between them are the problem.',
      ]],
      ['Design for failure', [
        'Every external system will eventually time out, change a field or go down for maintenance. Good integrations expect this. They queue messages, retry with back-off, alert a person when something cannot be fixed automatically, and keep a log of every message so you can answer “what happened to order 4821?” in seconds.',
      ]],
      ['When to build instead', [
        'Sometimes a legacy system cannot be connected cleanly, or the process it enforces is the problem. Then a new application is the right call, and it should be built with clean APIs from the start so the next integration is easy. The decision is economic: connect when connecting is cheaper, rebuild when it is not.',
      ]],
    ],
  },
]

export const insight = (slug) => INSIGHTS.find((a) => a.slug === slug)
