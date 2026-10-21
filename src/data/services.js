// The six NIMTECH services, kept short: one line to understand it, four
// things you get, four steps, three questions.
export const ORDER = ['ai-agents', 'computer-vision', 'software', 'apps', 'api-integration', 'ai-content']

export const SERVICES = {
  'ai-agents': {
    name: 'AI Agents',
    icon: 'agents',
    scene: 'ai',
    tagline: 'Digital teammates that handle the busywork.',
    desc: 'Agents with a name and a role that answer customers, process documents and update your systems, with a person approving anything important.',
    get: [
      ['Support agents', 'Answer orders, refunds and questions on chat, email and WhatsApp.'],
      ['Back-office agents', 'Read invoices and forms, fill your ERP and flag what looks wrong.'],
      ['Knowledge assistant', 'Answers from your own documents, with sources your team can check.'],
      ['Human approval', 'Anything risky waits for a one-click yes from your team.'],
    ],
    steps: [
      ['Pick one job', 'We choose a task with a clear owner and a number to move.'],
      ['Connect', 'The agent gets safe, limited access to the tools it needs.'],
      ['Test', 'We run it on your real past cases before it goes live.'],
      ['Go live', 'Launch with monitoring, then add the next job.'],
    ],
    faq: [
      ['Will it make mistakes?', 'Sometimes, so anything costly needs approval and every action is logged.'],
      ['Which AI model do you use?', 'Whichever fits the task. We test several and can switch later.'],
      ['How fast is the first agent live?', 'Usually four to six weeks from the first workshop.'],
    ],
  },
  'computer-vision': {
    name: 'Computer Vision',
    icon: 'vision',
    scene: 'vision',
    tagline: 'Cameras that understand what they see.',
    desc: 'Custom models that detect, count, track and inspect, trained on your own images and running in the cloud, on a device or on a phone.',
    get: [
      ['Inspection', 'Spot defects and missing parts on the line, at line speed.'],
      ['Counting and tracking', 'Follow people, vehicles or products across cameras.'],
      ['Document reading', 'Turn receipts, IDs and forms into clean data.'],
      ['Safety', 'Flag missing helmets, vests or blocked exits in real time.'],
    ],
    steps: [
      ['Define', 'Agree what the camera must decide and how accurate it must be.'],
      ['Collect and label', 'A small, varied image set, labelled carefully.'],
      ['Train and test', 'Train, compare and test on your site’s real conditions.'],
      ['Deploy', 'Run it where it is needed, with a loop to keep improving.'],
    ],
    faq: [
      ['How many images do we need?', 'Often a few hundred varied images to start, more as it learns.'],
      ['Can it run without internet?', 'Yes, on an edge device or a phone.'],
      ['Who owns the model?', 'You do, with the data and the training code.'],
    ],
  },
  software: {
    name: 'Software',
    icon: 'software',
    scene: 'software',
    tagline: 'One reliable system instead of ten spreadsheets.',
    desc: 'Web platforms, booking systems, portals and internal tools, designed around how your team works and built to grow.',
    get: [
      ['Websites that sell', 'Fast brand sites with ordering, booking or enquiry built in.'],
      ['Booking and portals', 'Customers book, pay and track without calling you.'],
      ['Internal tools', 'Dashboards and workflows that replace spreadsheets.'],
      ['Modernisation', 'Move old systems to the cloud without stopping the business.'],
    ],
    steps: [
      ['Discover', 'Map users, workflows and the outcome that matters.'],
      ['Design', 'A clickable prototype you can test before we build.'],
      ['Build', 'Two-week sprints with a working demo every time.'],
      ['Launch', 'Release, monitor and keep improving.'],
    ],
    faq: [
      ['Fixed price or ongoing?', 'Both: a fixed first release, then a monthly plan if you want one.'],
      ['Which technology?', 'Modern, mainstream tools your future team can maintain.'],
      ['Do we own the code?', 'Yes, all of it.'],
    ],
  },
  apps: {
    name: 'Mobile Apps',
    icon: 'apps',
    scene: 'apps',
    tagline: 'iPhone and Android apps people keep using.',
    desc: 'Apps designed around the moment people need them, from first prototype to both app stores and every update after.',
    get: [
      ['Customer apps', 'Ordering, loyalty, booking and accounts in one app.'],
      ['Field apps', 'Offline-ready apps for drivers, inspectors and technicians.'],
      ['Smart features', 'On-device AI, camera scanning and notifications that matter.'],
      ['Store launch', 'App Store and Google Play release, reviews and updates.'],
    ],
    steps: [
      ['Workshop', 'Users, key journeys and the metric that defines success.'],
      ['Prototype', 'A tappable prototype tested with real users.'],
      ['Build', 'One codebase for iPhone and Android, demoed every two weeks.'],
      ['Release', 'Store launch, analytics and regular updates.'],
    ],
    faq: [
      ['Native or cross-platform?', 'Usually one cross-platform codebase; native when it matters.'],
      ['How long does it take?', 'A focused first version is often 10 to 14 weeks.'],
      ['Can you take over our app?', 'Yes. We audit it, fix the basics, then improve it.'],
    ],
  },
  'api-integration': {
    name: 'Integration',
    icon: 'api',
    scene: 'api',
    tagline: 'Your systems talking to each other, automatically.',
    desc: 'We connect your shop, ERP, CRM, couriers, payments and messaging so orders and data move on their own, with alerts when something breaks.',
    get: [
      ['Commerce automation', 'Orders flow from your shop to stock, couriers and invoices.'],
      ['Notifications', 'SMS, email and WhatsApp updates sent at the right moment.'],
      ['Payments', 'Gateways, reconciliation and refunds connected end to end.'],
      ['APIs', 'Clean, documented APIs your partners can use.'],
    ],
    steps: [
      ['Map', 'Find where people re-type data between systems.'],
      ['Design', 'Choose events, queues and the safest way to connect.'],
      ['Build', 'Integrations with retries, alerts and a full audit log.'],
      ['Run', 'Monitoring and fixes before your customers notice.'],
    ],
    faq: [
      ['Do we need new software?', 'Usually not. Connecting what you have is faster and cheaper.'],
      ['What if a system goes down?', 'Messages queue and retry, and we get an alert.'],
      ['Is it secure?', 'Signed webhooks, least-privilege keys and encrypted secrets.'],
    ],
  },
  'ai-content': {
    name: 'AI Content',
    icon: 'content',
    scene: 'content',
    tagline: 'More content, in your brand’s voice, every week.',
    desc: 'Product visuals, short videos, articles and social posts produced with AI and finished by people, in any language.',
    get: [
      ['Product visuals', 'Studio-quality images for every product and season.'],
      ['Short videos', 'Reels, ads and explainers made in days.'],
      ['Articles and guides', 'Search-friendly content checked by editors.'],
      ['Localisation', 'The same campaign in every market’s language.'],
    ],
    steps: [
      ['Brand kit', 'We learn your tone, colours and rules.'],
      ['Plan', 'A monthly calendar tied to your goals.'],
      ['Produce', 'AI drafts, people edit and approve.'],
      ['Publish', 'Delivered ready to post, with results each month.'],
    ],
    faq: [
      ['Will it sound like AI?', 'No. Editors finish every piece in your voice.'],
      ['Who owns the content?', 'You do, with full usage rights.'],
      ['How much per month?', 'Plans scale with volume; we quote after a short call.'],
    ],
  },
}

export const svcName = (id) => SERVICES[id]?.name || id
