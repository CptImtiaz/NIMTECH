// Content for every page. Text may contain <em>…</em> for accent words.
export const SERVICES = {
 "ai-agents": {
  "name": "AI Agents",
  "short": "Agentic AI development",
  "icon": "agents",
  "vis": "agents",
  "badge": "Agentic AI Development",
  "h1": [
   "Build <em>AI agents</em> that do",
   "the work, not the demo."
  ],
  "lede": "We design, build and run AI agents that read, decide and act inside your systems, with guardrails, human approval and results you can measure.",
  "stats": [
   "Connected to your tools and data",
   "Human approval where it matters",
   "Evaluated before every release"
  ],
  "one": "Agents that read, decide and act inside your systems.",
  "tags": [
   "Support agents",
   "RAG",
   "Workflow automation",
   "Copilots"
  ],
  "problemT": "Why most AI pilots <em>stall.</em>",
  "problems": [
   [
    "Answers without context",
    "Generic chatbots don’t know your products, policies or customers, so people stop trusting them."
   ],
   [
    "No access to real systems",
    "An assistant that can’t read the CRM or update the ticket is just another tab to check."
   ],
   [
    "No guardrails",
    "Without permissions, approvals and audit trails, risk and IT teams say no, and they’re right to."
   ],
   [
    "No way to measure",
    "If you can’t see accuracy, cost and time saved, you can’t decide whether to scale it."
   ]
  ],
  "capsT": "What we <em>build.</em>",
  "caps": [
   [
    "agents",
    "Customer service agents",
    "Resolve order, billing and account requests across chat, email and WhatsApp, then hand over to a person with the full context."
   ],
   [
    "db",
    "Knowledge agents (RAG)",
    "Answer questions from your documents, wikis and databases, with citations your team can check."
   ],
   [
    "loop",
    "Workflow automation agents",
    "Run multi‑step processes end to end: qualify a lead, draft the quote, update the CRM, notify the owner."
   ],
   [
    "content",
    "Document intelligence",
    "Extract, validate and reconcile data from invoices, contracts, claims and forms, at any volume."
   ],
   [
    "users",
    "Enterprise copilots",
    "Assistants inside the tools your people already use, from Slack and Microsoft Teams to your own apps."
   ],
   [
    "layers",
    "Multi‑agent systems",
    "Specialist agents that plan, research and check each other’s work, and escalate when they’re unsure."
   ]
  ],
  "showT": "Every action, <em>traceable.</em>",
  "showP": "Each agent run is logged step by step: what it read, which tool it called, who approved it and what changed. This is an example trace of a refund request.",
  "processT": "From use case to <em>production.</em>",
  "process": [
   [
    "Discover",
    "We map the workflows, data and systems involved and pick the use case with the clearest return."
   ],
   [
    "Design",
    "Agent architecture: tools, memory, permissions, approval points and fallbacks."
   ],
   [
    "Prototype",
    "A working agent on your real data within weeks, tested by the people who’ll use it."
   ],
   [
    "Evaluate",
    "Accuracy, safety and red‑team tests run against hundreds of real cases before launch."
   ],
   [
    "Deploy",
    "Integrated with your channels and systems, with monitoring and audit logs from day one."
   ],
   [
    "Improve",
    "Weekly reviews of failures and handovers feed the next release."
   ]
  ],
  "usesT": "Where agents <em>pay off</em> first.",
  "uses": [
   [
    "Customer support",
    "Instant answers to order, billing and account questions, with clean handover to your team."
   ],
   [
    "Sales & revenue ops",
    "Lead research, qualification, follow‑up and CRM hygiene that runs every day."
   ],
   [
    "Finance & back office",
    "Invoice matching, expense checks and reconciliation without manual typing."
   ],
   [
    "HR & internal help",
    "Policy questions, onboarding steps and IT requests answered in seconds."
   ],
   [
    "Operations",
    "Order exceptions, supplier updates and reporting handled across systems."
   ]
  ],
  "stackT": "Model‑agnostic by <em>design.</em>",
  "stack": [
   [
    "Models",
    "GPT, Claude, Gemini, Llama and Mistral open models"
   ],
   [
    "Orchestration",
    "LangGraph, LlamaIndex, Model Context Protocol"
   ],
   [
    "Knowledge",
    "pgvector, Pinecone, Elasticsearch, hybrid search"
   ],
   [
    "Channels",
    "WhatsApp, Slack, Microsoft Teams, web, email, voice"
   ],
   [
    "Quality & ops",
    "Evaluation suites, tracing, OpenTelemetry, audit logs"
   ]
  ],
  "why": [
   [
    "Model‑agnostic",
    "We pick the best model for each task and can switch as models improve."
   ],
   [
    "Guardrails built in",
    "Permissions, approvals, rate limits and full audit trails."
   ],
   [
    "Evaluation first",
    "No release without passing tests on your real cases."
   ],
   [
    "You own it",
    "Prompts, code, evaluation data and infrastructure are yours."
   ]
  ],
  "faq": [
   [
    "Which AI model do you use?",
    "Whichever fits the task. We test several, often mixing a strong reasoning model with smaller, faster ones, and keep the system able to switch."
   ],
   [
    "How do you stop the agent making things up?",
    "Agents answer from your approved sources, cite them, and say when they don’t know. Risky actions require a person to approve."
   ],
   [
    "Is our data safe?",
    "Data stays in your cloud or a private environment, access follows your permissions, and we don’t use your data to train public models."
   ],
   [
    "How long until the first agent is live?",
    "A focused first agent usually reaches production in four to eight weeks, depending on integrations."
   ],
   [
    "Can it work with our older systems?",
    "Yes. Agents can use APIs, databases or, where needed, controlled browser automation."
   ]
  ]
 },
 "computer-vision": {
  "name": "Computer Vision & Model Training",
  "nav": "Computer Vision",
  "short": "Custom vision models, trained on your data",
  "icon": "vision",
  "vis": "vision",
  "badge": "Computer Vision · Model Training",
  "h1": [
   "Train <em>vision models</em> on",
   "your own data."
  ],
  "lede": "From raw images to production models. We collect and label data, train and evaluate custom models, and deploy them to the cloud, edge devices or phones.",
  "stats": [
   "Detection, segmentation, OCR and more",
   "Cloud, edge and on‑device deployment",
   "Active learning that keeps improving"
  ],
  "one": "Custom models trained, evaluated and deployed on your data.",
  "tags": [
   "Data & labelling",
   "Model training",
   "Evaluation",
   "Edge deployment"
  ],
  "problemT": "Why off‑the‑shelf models <em>fall short.</em>",
  "problems": [
   [
    "Your objects aren’t in public datasets",
    "Your parts, products, defects and documents look nothing like the images general models were trained on."
   ],
   [
    "Real conditions are messy",
    "Lighting, angles, motion blur and camera quality differ from every benchmark."
   ],
   [
    "Demo accuracy isn’t field accuracy",
    "A model that scores well in a notebook can fail on the first night shift."
   ],
   [
    "Models drift",
    "New products, seasons and sites slowly change what the model sees, and accuracy drops without anyone noticing."
   ]
  ],
  "capsT": "The full model <em>lifecycle.</em>",
  "caps": [
   [
    "db",
    "Data strategy & collection",
    "What to capture, how much and from which cameras, plus synthetic data to cover rare cases."
   ],
   [
    "tag",
    "Annotation & quality control",
    "Boxes, polygons, keypoints and masks, labelled with model‑assisted tools and checked in review passes."
   ],
   [
    "cpu",
    "Custom model training",
    "Fine‑tuning modern architectures for detection, segmentation, classification, pose and OCR."
   ],
   [
    "chart",
    "Evaluation & benchmarking",
    "mAP, precision, recall and per‑class errors measured on held‑out data from your own environment."
   ],
   [
    "rocket",
    "Deployment & optimisation",
    "Exported to ONNX, TensorRT or Core ML, quantised and benchmarked for your target hardware."
   ],
   [
    "loop",
    "MLOps & active learning",
    "Drift monitoring and low‑confidence samples routed for review, then retraining on what the model got wrong."
   ]
  ],
  "showT": "Training you can <em>see.</em>",
  "showP": "Every model comes with a full evaluation report: training curves, per‑class accuracy and a confusion matrix showing exactly where it still makes mistakes. Shown here: an illustrative training run.",
  "processT": "From raw images to a <em>production model.</em>",
  "process": [
   [
    "Define",
    "The task, the classes, the success metric and the hardware it must run on."
   ],
   [
    "Data",
    "Collect, curate and label a dataset that reflects real conditions, including edge cases."
   ],
   [
    "Train",
    "Strong baselines first, then iterate on architecture, augmentation and data."
   ],
   [
    "Evaluate",
    "Measure on held‑out data from your environment and agree go‑live thresholds."
   ],
   [
    "Deploy",
    "Optimise for cloud GPUs, edge devices or phones and integrate with your apps."
   ],
   [
    "Improve",
    "Active learning collects hard cases from production and feeds the next training run."
   ]
  ],
  "usesT": "Where custom vision <em>wins.</em>",
  "uses": [
   [
    "Manufacturing",
    "Surface defect detection, assembly verification and label inspection on the line."
   ],
   [
    "Retail & consumer goods",
    "Shelf monitoring, product recognition and planogram compliance."
   ],
   [
    "Agriculture",
    "Plant health, fruit counting and yield estimation from field and drone imagery."
   ],
   [
    "Logistics",
    "Package, label and damage detection at receiving and dispatch."
   ],
   [
    "Documents",
    "OCR and layout models for forms, receipts and handwritten records."
   ],
   [
    "Research & science",
    "Cell counting, microscopy and sample analysis for research teams."
   ]
  ],
  "stackT": "Modern tooling, <em>end to end.</em>",
  "stack": [
   [
    "Tasks",
    "Detection, instance segmentation, classification, pose, OCR, anomaly detection, tracking, vision‑language"
   ],
   [
    "Architectures",
    "YOLO, RF‑DETR, SAM 2, Grounding DINO, SigLIP, ViT, ResNet"
   ],
   [
    "Data & labels",
    "CVAT, Label Studio, model‑assisted labelling, synthetic data"
   ],
   [
    "Training",
    "PyTorch, Ultralytics, Hugging Face, MLflow, Weights & Biases"
   ],
   [
    "Deployment",
    "ONNX, TensorRT, OpenVINO, Core ML, NVIDIA Jetson, cloud GPUs"
   ]
  ],
  "why": [
   [
    "Data first",
    "Most accuracy gains come from better data, so that’s where we start."
   ],
   [
    "Measured on your reality",
    "We report results on your images, not on public benchmarks."
   ],
   [
    "Hardware‑aware",
    "Models sized for the device they run on, from GPU servers to phones."
   ],
   [
    "Your weights, your data",
    "Datasets, labels and trained model weights belong to you."
   ]
  ],
  "research": true,
  "faq": [
   [
    "How much data do we need?",
    "It depends on the task. Many projects start with a few hundred to a few thousand labelled images, then grow through active learning."
   ],
   [
    "Can you label our data?",
    "Yes. We set up labelling guidelines, label with model assistance and review every batch for quality."
   ],
   [
    "Do we own the model and the dataset?",
    "Yes. The dataset, labels, training code and model weights are all yours."
   ],
   [
    "Cloud, edge or phone?",
    "Any of them. We choose architecture and model size based on where it must run and how fast it must be."
   ],
   [
    "How do you keep accuracy high after launch?",
    "We monitor confidence and drift, collect hard cases from production and retrain on a schedule you agree."
   ]
  ]
 },
 "software": {
  "name": "Software Development",
  "nav": "Software",
  "short": "Platforms, portals and internal tools",
  "icon": "software",
  "vis": "software",
  "badge": "Custom Software Engineering",
  "h1": [
   "Software shaped around",
   "<em>how you work.</em>"
  ],
  "lede": "Platforms, portals and internal tools engineered for scale. One reliable system in place of spreadsheets and disconnected apps.",
  "stats": [
   "From product design to production",
   "Cloud‑native and secure by default",
   "Code and IP stay yours"
  ],
  "one": "Platforms and internal tools engineered for scale.",
  "tags": [
   "SaaS",
   "Portals",
   "Data platforms",
   "Modernisation"
  ],
  "problemT": "When your tools stop <em>fitting.</em>",
  "problems": [
   [
    "Data lives in spreadsheets",
    "Critical numbers sit in files only one person understands."
   ],
   [
    "Off‑the‑shelf forces workarounds",
    "Generic software makes your team bend the process to fit the tool."
   ],
   [
    "Legacy slows every change",
    "Old systems make simple updates slow, risky and expensive."
   ],
   [
    "No single view",
    "Leaders wait days for reports stitched together by hand."
   ]
  ],
  "capsT": "What we <em>engineer.</em>",
  "caps": [
   [
    "rocket",
    "SaaS & product engineering",
    "From first version to scale, with multi‑tenant architecture, billing and analytics."
   ],
   [
    "layers",
    "Operations platforms",
    "Order, inventory, scheduling and approval systems built around your process."
   ],
   [
    "users",
    "Customer & partner portals",
    "Self‑service for orders, documents, tickets and reporting."
   ],
   [
    "chart",
    "Data platforms & dashboards",
    "Pipelines, warehouses and live dashboards for every level of the business."
   ],
   [
    "loop",
    "Legacy modernisation",
    "Old systems rebuilt step by step without stopping the business."
   ],
   [
    "spark",
    "AI inside your product",
    "Search, summarisation, copilots and predictions built into your software."
   ]
  ],
  "showT": "Architecture that <em>scales.</em>",
  "showP": "Every system is designed in clear layers, so each one can change, scale and be tested on its own.",
  "processT": "How we <em>ship.</em>",
  "process": [
   [
    "Discovery",
    "Users, workflows, data and constraints, turned into a clear product scope."
   ],
   [
    "Design",
    "UX research and a clickable prototype tested with real users."
   ],
   [
    "Architecture",
    "Technology choices, data model, security and scaling plan."
   ],
   [
    "Build",
    "Two‑week sprints with a working demo at the end of each one."
   ],
   [
    "Quality",
    "Automated tests, code review, security checks and performance testing."
   ],
   [
    "Launch & scale",
    "Migration, training, go‑live and ongoing improvement."
   ]
  ],
  "usesT": "Built for <em>real operations.</em>",
  "uses": [
   [
    "Distribution & logistics",
    "Orders, stock, routes and proof of delivery in one system."
   ],
   [
    "Professional services",
    "Client portals for documents, approvals and billing."
   ],
   [
    "Hospitality",
    "Property, event and supplier operations across sites."
   ],
   [
    "Education & training",
    "Enrolment, scheduling, attendance and certification."
   ],
   [
    "Financial services",
    "Onboarding, case management and compliance workflows."
   ]
  ],
  "stackT": "Proven, modern <em>stack.</em>",
  "stack": [
   [
    "Frontend",
    "TypeScript, React, Next.js, Vue"
   ],
   [
    "Backend",
    "Node.js, Python, Go, GraphQL, REST"
   ],
   [
    "Data",
    "PostgreSQL, Redis, BigQuery, Snowflake"
   ],
   [
    "Cloud",
    "AWS, Google Cloud, Azure, Docker, Kubernetes, Terraform"
   ],
   [
    "Quality",
    "Automated testing, CI/CD, observability, security scanning"
   ]
  ],
  "why": [
   [
    "Product thinking",
    "We question the brief so the software solves the real problem."
   ],
   [
    "Senior engineers",
    "Experienced people on every project, not a revolving door."
   ],
   [
    "See it every two weeks",
    "Working demos you can test and steer."
   ],
   [
    "Built to hand over",
    "Documentation, tests and pipelines your team can own."
   ]
  ],
  "faq": [
   [
    "Do we own the code?",
    "Yes. Source code, infrastructure accounts and data are yours."
   ],
   [
    "Can you work with our in‑house team?",
    "Yes. We can lead the project, join your team, or hand over gradually."
   ],
   [
    "How do you handle changing requirements?",
    "We plan in short sprints, so priorities can shift without derailing the project."
   ],
   [
    "What happens after launch?",
    "We offer ongoing support, monitoring and improvement, or a full handover."
   ]
  ]
 },
 "apps": {
  "name": "App Development",
  "nav": "Apps",
  "short": "iOS, Android and cross‑platform apps",
  "icon": "apps",
  "vis": "apps",
  "badge": "iOS · Android · Cross‑platform",
  "h1": [
   "Mobile apps people",
   "<em>actually keep.</em>"
  ],
  "lede": "We design and build iOS and Android apps, from first prototype to App Store launch and every release after.",
  "stats": [
   "One codebase, both app stores",
   "Designed and tested with real users",
   "Analytics and releases handled"
  ],
  "one": "iOS and Android apps, from prototype to every release.",
  "tags": [
   "iOS & Android",
   "Commerce",
   "Field apps",
   "On‑device AI"
  ],
  "problemT": "Why apps get <em>deleted.</em>",
  "problems": [
   [
    "Slow and unstable",
    "Crashes and long load times lose users in the first session."
   ],
   [
    "Confusing first run",
    "If value isn’t clear in a minute, people leave."
   ],
   [
    "No reason to return",
    "Without habits, notifications and rewards, usage fades."
   ],
   [
    "Abandoned after launch",
    "OS updates and store rules break apps that nobody maintains."
   ]
  ],
  "capsT": "Apps we <em>build.</em>",
  "caps": [
   [
    "apps",
    "Consumer apps",
    "Polished apps with onboarding, accounts, payments and notifications."
   ],
   [
    "tag",
    "Commerce & ordering",
    "Ordering, loyalty and subscriptions with secure payments."
   ],
   [
    "users",
    "Field & workforce apps",
    "Offline‑first apps for inspections, deliveries and service teams."
   ],
   [
    "eye",
    "On‑device AI",
    "Camera, voice and vision features that run on the phone itself."
   ],
   [
    "cpu",
    "Connected devices",
    "Companion apps for wearables, IoT and hardware products."
   ],
   [
    "loop",
    "App rescue",
    "Audits, fixes and modernisation for apps that have fallen behind."
   ]
  ],
  "showT": "Designed screen by <em>screen.</em>",
  "showP": "We prototype every key journey before writing production code, then test it with real users.",
  "processT": "From idea to the <em>App Store.</em>",
  "process": [
   [
    "Product workshop",
    "Users, core journeys and the metric that defines success."
   ],
   [
    "UX & prototype",
    "Clickable prototype tested with real users before the build."
   ],
   [
    "Build",
    "Flutter, React Native or fully native Swift and Kotlin."
   ],
   [
    "Test",
    "Automated tests and real‑device testing across screen sizes."
   ],
   [
    "Launch",
    "Store listings, review and staged rollout on both stores."
   ],
   [
    "Grow",
    "Analytics, experiments and regular releases."
   ]
  ],
  "usesT": "Apps for every <em>business model.</em>",
  "uses": [
   [
    "Retail & food",
    "Direct ordering and loyalty without marketplace commissions."
   ],
   [
    "Logistics",
    "Driver apps with routes, scanning and proof of delivery."
   ],
   [
    "Health & wellness",
    "Booking, tracking and secure messaging."
   ],
   [
    "Fintech",
    "Onboarding, payments and account management."
   ],
   [
    "Startups",
    "An MVP fast enough to test with users and investors."
   ]
  ],
  "stackT": "Native quality, <em>shared code.</em>",
  "stack": [
   [
    "Cross‑platform",
    "Flutter, React Native"
   ],
   [
    "Native",
    "Swift, SwiftUI, Kotlin, Jetpack Compose"
   ],
   [
    "Backend",
    "Firebase, Supabase, Node.js, GraphQL"
   ],
   [
    "On‑device AI",
    "Core ML, TensorFlow Lite, ML Kit"
   ],
   [
    "Release & quality",
    "Fastlane, CI/CD, Sentry, analytics"
   ]
  ],
  "why": [
   [
    "Design‑led",
    "Every screen designed and tested before it’s built."
   ],
   [
    "Right tech for the job",
    "Cross‑platform where it fits, native where it matters."
   ],
   [
    "Store‑ready",
    "We handle listings, reviews and releases."
   ],
   [
    "Long‑term partner",
    "Updates for every new OS and device."
   ]
  ],
  "faq": [
   [
    "Native or cross‑platform?",
    "Cross‑platform covers most apps well. We go native when performance, hardware access or platform features demand it."
   ],
   [
    "Do you publish to the stores?",
    "Yes. We prepare listings and privacy details and manage review with Apple and Google."
   ],
   [
    "Can you take over our existing app?",
    "Yes. We start with a code and UX audit, fix critical issues, then improve."
   ],
   [
    "Can the app work offline?",
    "Yes. We build offline‑first apps that sync when a connection returns."
   ]
  ]
 },
 "api-integration": {
  "name": "API & Systems Integration",
  "nav": "Integration",
  "short": "Connect every system, automate every handoff",
  "icon": "api",
  "vis": "api",
  "badge": "API · Integration · Automation",
  "h1": [
   "Connect every system.",
   "<em>Automate</em> every handoff."
  ],
  "lede": "We connect your ERP, CRM, commerce and finance systems so data moves on its own, accurately and securely, with monitoring that tells you when something breaks.",
  "stats": [
   "Payments, commerce, ERP and CRM",
   "Retries, alerts and audit logs",
   "Clean APIs your partners can use"
  ],
  "one": "Systems connected, data flowing, failures caught.",
  "tags": [
   "ERP & CRM",
   "Payments",
   "E‑invoicing",
   "Event‑driven"
  ],
  "problemT": "The hidden cost of <em>copy‑paste.</em>",
  "problems": [
   [
    "Double data entry",
    "Staff retype the same order into three systems."
   ],
   [
    "Out of sync",
    "Stock, prices and customer data disagree across channels."
   ],
   [
    "Silent failures",
    "Integrations break quietly and nobody knows until a customer complains."
   ],
   [
    "Hard to partner with",
    "Partners can’t connect to you without a clean, documented API."
   ]
  ],
  "capsT": "Integration, <em>done properly.</em>",
  "caps": [
   [
    "bolt",
    "Payments & finance",
    "Payment providers, banks and accounting, with automatic reconciliation."
   ],
   [
    "tag",
    "Commerce & marketplaces",
    "Orders, stock and prices synced across every sales channel."
   ],
   [
    "db",
    "ERP & CRM",
    "SAP, NetSuite, Dynamics, Salesforce and HubSpot connected to everything else."
   ],
   [
    "shield",
    "E‑invoicing & compliance",
    "Compliant e‑invoices sent to national networks from your existing systems."
   ],
   [
    "code",
    "API design & portals",
    "Documented, versioned APIs and developer portals for partners."
   ],
   [
    "loop",
    "Event‑driven automation",
    "Workflows that react to events in real time, with queues and retries."
   ]
  ],
  "showT": "Every message, <em>accounted for.</em>",
  "showP": "Data flows through one monitored layer. Every event is logged, retried on failure and alerted when it needs a person.",
  "processT": "How we <em>connect.</em>",
  "process": [
   [
    "Audit",
    "Every system, data flow and manual step mapped."
   ],
   [
    "Design",
    "Data contracts, field mapping, timing and error handling."
   ],
   [
    "Build",
    "Integrations built and tested against sandboxes and real edge cases."
   ],
   [
    "Deploy",
    "Released with monitoring, alerts and dashboards."
   ],
   [
    "Operate",
    "Kept working as connected systems change their APIs."
   ]
  ],
  "usesT": "Common <em>integrations.</em>",
  "uses": [
   [
    "Omnichannel retail",
    "Orders and stock synced across web, marketplaces and stores."
   ],
   [
    "Finance automation",
    "Payments reconciled into the ledger automatically."
   ],
   [
    "Multi‑country groups",
    "Local tax and e‑invoicing compliance from one system."
   ],
   [
    "SaaS platforms",
    "Public APIs and webhooks for partner ecosystems."
   ],
   [
    "Supply chain",
    "Suppliers, warehouses and carriers exchanging data in real time."
   ]
  ],
  "stackT": "Standards we <em>work with.</em>",
  "stack": [
   [
    "Protocols",
    "REST, GraphQL, gRPC, webhooks, SFTP, EDI"
   ],
   [
    "Messaging",
    "Kafka, RabbitMQ, cloud queues"
   ],
   [
    "Platforms",
    "Stripe, Shopify, Salesforce, SAP, NetSuite, HubSpot, Xero"
   ],
   [
    "Automation",
    "n8n, Make, Zapier, custom workers"
   ],
   [
    "Security",
    "OAuth 2.0, OpenAPI specs, secrets management, audit logs"
   ]
  ],
  "why": [
   [
    "Monitoring included",
    "Every integration ships with logs, retries and alerts."
   ],
   [
    "Documented",
    "Field maps and runbooks your team can follow."
   ],
   [
    "Built for change",
    "Versioned contracts so updates don’t break everything."
   ],
   [
    "Secure",
    "Least‑privilege access and encrypted secrets."
   ]
  ],
  "faq": [
   [
    "What if a system has no API?",
    "We use database access, file exchange or controlled browser automation as a bridge."
   ],
   [
    "What happens when a sync fails?",
    "It’s retried automatically, and if it still fails your team is alerted with the exact record."
   ],
   [
    "Do you support e‑invoicing?",
    "Yes. We integrate with national e‑invoicing networks and common accounting systems."
   ],
   [
    "Who maintains the integrations?",
    "We can monitor and update them as connected systems change, or hand over with full documentation."
   ]
  ]
 },
 "ai-content": {
  "name": "AI Content",
  "nav": "AI Content",
  "short": "Any format, any channel, made with AI",
  "icon": "content",
  "vis": "content",
  "badge": "AI Content Studio",
  "h1": [
   "Content for everything,",
   "made with <em>AI.</em>"
  ],
  "lede": "Video, images, copy, voice, social, ads and documentation, produced at speed with AI and finished by people who care about craft. Any brand, any industry, any channel.",
  "stats": [
   "Every format: video, image, copy, voice",
   "Trained on your brand, finished by people",
   "Published in 30+ languages"
  ],
  "one": "Video, images, copy and voice for any channel, produced with AI.",
  "tags": [
   "Video",
   "Images",
   "Copy",
   "Voice",
   "Social",
   "Ads"
  ],
  "problemT": "Why content <em>falls behind.</em>",
  "problems": [
   [
    "Demand outruns the team",
    "Every channel, market and product launch wants fresh content, every week."
   ],
   [
    "Generic AI looks generic",
    "Unedited AI output is easy to spot and easy to ignore."
   ],
   [
    "Formats multiply",
    "One idea now needs a video, a carousel, an ad set, a blog post and a voice‑over."
   ],
   [
    "Quality is inconsistent",
    "Different tools, freelancers and agencies make the brand look different everywhere."
   ]
  ],
  "capsT": "What we <em>make.</em>",
  "caps": [
   [
    "eye",
    "AI video & motion",
    "Brand films, explainers, product demos, short‑form social and animated ads."
   ],
   [
    "spark",
    "Images & visual design",
    "Campaign visuals, product shots, illustrations and social graphics in your style."
   ],
   [
    "pen",
    "Copy & storytelling",
    "Websites, articles, scripts, emails, newsletters and long‑form editorial."
   ],
   [
    "users",
    "Social content",
    "Always‑on posts, carousels, reels and stories for every platform."
   ],
   [
    "bolt",
    "Ads & performance creative",
    "Hundreds of on‑brand ad variations, ready to test and scale."
   ],
   [
    "tag",
    "Product & e‑commerce",
    "Product descriptions, catalogue imagery and listings at catalogue scale."
   ],
   [
    "content",
    "Docs, training & learning",
    "Manuals, onboarding guides, course material and knowledge bases."
   ],
   [
    "globe",
    "Voice & localisation",
    "AI voice‑over, dubbing, subtitles and adaptation for 30+ languages."
   ],
   [
    "chart",
    "Strategy & measurement",
    "Content plans from audience data, with reporting on what actually works."
   ]
  ],
  "showT": "From brief to <em>published.</em>",
  "showP": "One content engine for every format: AI drafts in your brand’s voice and style, people refine and check, and everything runs on one shared calendar.",
  "processT": "How the studio <em>works.</em>",
  "process": [
   [
    "Brand capture",
    "We learn your voice, visual style, audiences and guardrails from what you already have."
   ],
   [
    "Plan",
    "A content plan across formats and channels, built around your goals."
   ],
   [
    "Produce",
    "AI generates drafts, visuals, video and voice at speed."
   ],
   [
    "Craft & check",
    "Editors, designers and motion artists refine, fact‑check and approve."
   ],
   [
    "Publish & learn",
    "Scheduled across channels, measured, and fed back into the next plan."
   ]
  ],
  "usesT": "Made for <em>every kind</em> of team.",
  "uses": [
   [
    "Consumer brands",
    "Campaigns, social, product imagery and ads for launches and always‑on marketing."
   ],
   [
    "Retail & e‑commerce",
    "Catalogue copy, product visuals and localised listings at scale."
   ],
   [
    "Technology & SaaS",
    "Product videos, docs, release notes and website content."
   ],
   [
    "Media & creators",
    "Scripts, edits, thumbnails, dubbing and repurposed clips."
   ],
   [
    "Education & training",
    "Course videos, learning material and multilingual training content."
   ],
   [
    "Public sector & non‑profit",
    "Clear, accessible information campaigns in every language."
   ],
   [
    "Industrial & B2B",
    "Explainers, case studies, technical documentation and sales material."
   ]
  ],
  "stackT": "Our content <em>toolkit.</em>",
  "stack": [
   [
    "Video & motion",
    "AI video generation, motion templates, editing, captioning"
   ],
   [
    "Images & design",
    "Image generation, brand style models, retouching, layout"
   ],
   [
    "Writing",
    "Custom brand‑voice models, research, editing, fact‑checking"
   ],
   [
    "Voice & language",
    "AI voice‑over, dubbing, subtitles, 30+ languages"
   ],
   [
    "Publishing",
    "Social schedulers, CMS, email platforms, ad managers"
   ],
   [
    "Measurement",
    "Engagement, search, conversion and attribution reporting"
   ]
  ],
  "why": [
   [
    "Every format",
    "Video, images, copy and voice from one studio, not five vendors."
   ],
   [
    "People‑finished",
    "Every piece reviewed by a specialist before you see it."
   ],
   [
    "On brand, everywhere",
    "Trained on your voice and visual style, so it all looks like you."
   ],
   [
    "Fast without shortcuts",
    "AI handles the volume, people handle the judgement."
   ]
  ],
  "faq": [
   [
    "What kinds of content can you make?",
    "Almost anything digital: video, motion, images, design, copy, social, ads, product content, documentation, voice‑over and translations."
   ],
   [
    "Will it look and sound like AI?",
    "No. We train on your own brand material, and editors, designers and motion artists finish every piece."
   ],
   [
    "Do you work with any industry?",
    "Yes. The studio is built for consumer, B2B, public sector and creator content alike."
   ],
   [
    "Who owns the content?",
    "You do, everything we create for you."
   ],
   [
    "Can you publish for us?",
    "Yes, to social platforms, your website, email and ad accounts, or we hand over ready files."
   ]
  ]
 }
}

export const ORDER = [
 "ai-agents",
 "computer-vision",
 "software",
 "apps",
 "api-integration",
 "ai-content"
]

export const INDUSTRIES = [
 [
  "Manufacturing",
  "Visual inspection models, production dashboards and maintenance agents.",
  [
   "computer-vision",
   "software",
   "ai-agents"
  ]
 ],
 [
  "Retail & e‑commerce",
  "Shopping apps, inventory sync, product recognition and support agents.",
  [
   "apps",
   "api-integration",
   "ai-agents"
  ]
 ],
 [
  "Logistics & supply chain",
  "Driver apps, label and damage detection, carrier integrations.",
  [
   "apps",
   "computer-vision",
   "api-integration"
  ]
 ],
 [
  "Financial services",
  "Document agents, onboarding platforms and compliance workflows.",
  [
   "ai-agents",
   "software",
   "api-integration"
  ]
 ],
 [
  "Healthcare & life sciences",
  "Booking apps, research imaging models and secure internal assistants.",
  [
   "apps",
   "computer-vision",
   "ai-agents"
  ]
 ],
 [
  "Agriculture & food",
  "Crop and yield models from drone imagery, traceability platforms.",
  [
   "computer-vision",
   "software"
  ]
 ],
 [
  "Hospitality & travel",
  "Guest apps, booking integrations and multilingual service agents.",
  [
   "apps",
   "api-integration",
   "ai-agents"
  ]
 ],
 [
  "Professional & B2B services",
  "Client portals, knowledge agents and AI‑made content for every channel.",
  [
   "software",
   "ai-agents",
   "ai-content"
  ]
 ]
]

export const CASES = [
 {
  "s": "computer-vision",
  "t": "Surface defect detection for an electronics line",
  "ind": "Manufacturing",
  "ch": "Manual inspection missed small scratches and solder faults at line speed.",
  "did": [
   "Collected and labelled images across shifts and lighting",
   "Trained and compared segmentation models",
   "Deployed an optimised model on an edge GPU at the station"
  ],
  "out": "Every unit inspected at line speed, with a review queue for borderline cases."
 },
 {
  "s": "ai-agents",
  "t": "Multilingual support agent for an online retailer",
  "ind": "E‑commerce",
  "ch": "Support tickets doubled each peak season across four markets.",
  "did": [
   "Connected the agent to orders, returns and policy documents",
   "Added approval steps for refunds above a set limit",
   "Launched on WhatsApp, web chat and email"
  ],
  "out": "Common requests resolved instantly, with full‑context handover for the rest."
 },
 {
  "s": "apps",
  "t": "Ordering and loyalty app for a cloud kitchen group",
  "ind": "Food & beverage",
  "ch": "Marketplace commissions were eating the margin on every order.",
  "did": [
   "Designed and tested ordering journeys with real customers",
   "Built iOS and Android apps with payments and loyalty",
   "Merged all order channels into one kitchen screen"
  ],
  "out": "A direct ordering channel the brand owns, with repeat‑order rewards."
 },
 {
  "s": "api-integration",
  "t": "Order, stock and invoice sync for a distributor",
  "ind": "Distribution",
  "ch": "Five systems, three spreadsheets and daily stock mismatches.",
  "did": [
   "Mapped every data flow and manual step",
   "Built a monitored integration hub with retries",
   "Automated e‑invoice submission from accounting"
  ],
  "out": "One source of truth for orders and stock, and no manual re‑typing."
 },
 {
  "s": "software",
  "t": "Operations platform for a recycling company",
  "ind": "Recycling",
  "ch": "Collections, weights and payouts tracked on paper and in chat groups.",
  "did": [
   "Designed a platform around the collection workflow",
   "Built a driver app with photos and weights",
   "Added dashboards for daily volumes and payouts"
  ],
  "out": "Every pickup recorded with proof, and same‑day reporting."
 },
 {
  "s": "ai-content",
  "t": "Always‑on content engine for a consumer brand",
  "ind": "Consumer goods",
  "ch": "Three markets, five channels and a two‑person marketing team.",
  "did": [
   "Trained brand voice and visual style models on past campaigns",
   "Produced video, social, ads and product imagery from one plan",
   "Localised every asset into three languages with AI voice‑over"
  ],
  "out": "A steady stream of on‑brand content in every format and market."
 }
]

export const ROLES = [
 [
  "Computer Vision Engineer",
  "Train, evaluate and deploy detection and segmentation models to edge devices.",
  "Remote · Kuala Lumpur"
 ],
 [
  "AI Agent Engineer",
  "Build agents with tools, retrieval and evaluation suites.",
  "Remote"
 ],
 [
  "Full‑stack Engineer",
  "Ship web platforms with TypeScript, React and Node.js.",
  "Remote"
 ],
 [
  "Mobile Engineer",
  "Build iOS and Android apps with Flutter or native code.",
  "Remote"
 ],
 [
  "Integration Engineer",
  "Connect payment, commerce, ERP and e‑invoicing systems.",
  "Remote"
 ],
 [
  "Content Editor & Producer",
  "Shape AI‑made video, images and copy into polished, on‑brand content.",
  "Remote"
 ],
 [
  "Delivery Lead",
  "Run sprints, demos and launches across time zones.",
  "Kuala Lumpur · Hybrid"
 ]
]
