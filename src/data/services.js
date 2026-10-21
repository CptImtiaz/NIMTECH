// The six NIMTECH services, kept short: one line to understand it, four
// things you get, four steps, three questions. `color` tints its 3D field.
export const ORDER = ['software', 'apps', 'api-integration', 'websites', 'ai-models', 'ai-agents']

export const SERVICES = {
  software: {
    name: 'Software Development',
    short: 'Software',
    color: '#2F69FF',
    tagline: 'One system to run your whole business.',
    desc: 'Management systems built around how your team works: companies, trips, finance, healthcare and products, all in one secure place instead of ten spreadsheets.',
    tags: ['Admin systems', 'Dashboards', 'Portals', 'Cloud'],
    get: [
      ['Company management', 'Staff, branches, documents and approvals in one place.'],
      ['Trip and booking management', 'Schedules, bookings, drivers and customers, always in sync.'],
      ['Finance and fintech', 'Invoices, payments, wallets and reports your accountant trusts.'],
      ['Healthcare and wellness', 'Patients, appointments, products and stock, with the right access for each role.'],
    ],
    steps: [
      ['Discover', 'We map your workflows, users and the result that matters.'],
      ['Design', 'A clickable prototype you can test before we build.'],
      ['Build', 'Two-week sprints with a working demo every time.'],
      ['Launch', 'Go live, train your team, keep improving.'],
    ],
    faq: [
      ['Can it replace our spreadsheets?', 'Yes. We import your data and keep the parts of your process that work.'],
      ['Who can see what?', 'Every user gets a role, so staff only see what they need.'],
      ['Do we own the code?', 'Yes, all of it, along with the data and the accounts.'],
    ],
  },
  apps: {
    name: 'Mobile App Development',
    short: 'Mobile Apps',
    color: '#FFC5C2',
    tagline: 'iPhone and Android apps people keep using.',
    desc: 'Customer and partner apps for bookings, live tracking, payments and notifications, designed and built from first prototype to both app stores.',
    tags: ['iOS', 'Android', 'Live tracking', 'Payments'],
    get: [
      ['Customer apps', 'Order, book, pay and track in a few taps.'],
      ['Partner and staff apps', 'Jobs, schedules and updates for your team, even with weak signal.'],
      ['Live tracking', 'Customers see where their order or booking is, in real time.'],
      ['Store launch', 'App Store and Google Play release, then regular updates.'],
    ],
    steps: [
      ['Workshop', 'Users, key journeys and what success looks like.'],
      ['Prototype', 'A tappable prototype tested with real users.'],
      ['Build', 'One codebase for iPhone and Android, demoed every two weeks.'],
      ['Release', 'Store launch, analytics and updates.'],
    ],
    faq: [
      ['Native or cross-platform?', 'Usually one cross-platform codebase, native when it matters.'],
      ['How long does it take?', 'A focused first version is often 10 to 14 weeks.'],
      ['Can you take over our app?', 'Yes. We review it, fix the basics, then improve it.'],
    ],
  },
  'api-integration': {
    name: 'API Integration',
    short: 'API Integration',
    color: '#96E5FF',
    tagline: 'Your systems talking to each other, automatically.',
    desc: 'We connect your shop, couriers, payments, SMS, WhatsApp and accounting, so orders and data move on their own and nobody types the same thing twice.',
    tags: ['Shopify', 'Couriers', 'Payments', 'SMS and WhatsApp'],
    get: [
      ['Order automation', 'New orders flow to couriers, stock and invoices on their own.'],
      ['Customer messages', 'SMS, email and WhatsApp updates at the right moment.'],
      ['Payments', 'Gateways, refunds and reconciliation connected end to end.'],
      ['Your own API', 'Clean, documented APIs your partners can use.'],
    ],
    steps: [
      ['Map', 'Find where people copy data between systems.'],
      ['Design', 'Pick the safest, simplest way to connect.'],
      ['Build', 'Integrations with retries, alerts and a full log.'],
      ['Run', 'Monitoring and fixes before customers notice.'],
    ],
    faq: [
      ['Do we need new software?', 'Usually not. Connecting what you have is faster and cheaper.'],
      ['What if a system goes down?', 'Messages wait and retry, and we get an alert.'],
      ['Is it secure?', 'Signed requests, limited keys and encrypted secrets.'],
    ],
  },
  websites: {
    name: 'Website Development',
    short: 'Websites',
    color: '#E1FC03',
    tagline: 'Fast websites that turn visitors into customers.',
    desc: 'Brand sites, online ordering and booking platforms that load fast, rank on Google and let customers buy or book from their phone.',
    tags: ['Brand sites', 'Online booking', 'Ordering', 'SEO'],
    get: [
      ['Brand websites', 'A premium look that tells your story in seconds.'],
      ['Ordering', 'Menus, packages and WhatsApp or online checkout.'],
      ['Booking platforms', 'Customers pick a date, add extras and pay online.'],
      ['Found on Google', 'Fast pages, clean structure and search-ready content.'],
    ],
    steps: [
      ['Brief', 'Your goals, customers and the action you want them to take.'],
      ['Design', 'A design you approve before we build.'],
      ['Build', 'Responsive, fast and easy for you to update.'],
      ['Launch', 'Domain, hosting, analytics and support.'],
    ],
    faq: [
      ['How long does a website take?', 'A brand site often takes 3 to 5 weeks; booking platforms a little longer.'],
      ['Can we edit it ourselves?', 'Yes. We set it up so your team can change text and photos.'],
      ['Do you handle hosting?', 'Yes, or we can deploy to your own account.'],
    ],
  },
  'ai-models': {
    name: 'AI Model Development',
    short: 'AI Models',
    color: '#A068FF',
    tagline: 'Custom AI that sees, reads and predicts.',
    desc: 'Computer vision and machine learning models trained on your own data: tracking objects in video, analysing skin from a photo, reading documents and spotting defects.',
    tags: ['Computer vision', 'Object tracking', 'Image analysis', 'Prediction'],
    get: [
      ['Object detection and tracking', 'Find and follow people, vehicles or products in video.'],
      ['Image analysis', 'Measure skin, crops or parts from a single photo.'],
      ['Document reading', 'Turn receipts, IDs and forms into clean data.'],
      ['Prediction', 'Forecast demand, risk or churn from your history.'],
    ],
    steps: [
      ['Define', 'What the model must decide, and how accurate it must be.'],
      ['Data', 'Collect and label a small, varied set of examples.'],
      ['Train and test', 'Train, compare and test on real conditions.'],
      ['Deploy', 'Run it in the cloud, on a device or in an app.'],
    ],
    faq: [
      ['How much data do we need?', 'Often a few hundred good examples to start.'],
      ['Can it run without internet?', 'Yes, on an edge device or a phone.'],
      ['Who owns the model?', 'You do, with the data and the training code.'],
    ],
  },
  'ai-agents': {
    name: 'AI Agent Development',
    short: 'AI Agents',
    color: '#25D3A0',
    tagline: 'AI teammates that reply, book and update, 24/7.',
    desc: 'AI agents that answer customers on WhatsApp, take bookings, process documents and update your systems, with a person approving anything important.',
    tags: ['WhatsApp auto-reply', 'Support', 'Bookings', 'Back office'],
    get: [
      ['WhatsApp auto-reply', 'Instant answers about prices, orders and opening hours, day and night.'],
      ['Bookings and leads', 'Collects details, books slots and sends the lead to your team.'],
      ['Back-office agents', 'Read invoices and forms and fill your systems.'],
      ['Human approval', 'Anything risky waits for a one-click yes.'],
    ],
    steps: [
      ['Pick one job', 'A task with a clear owner and a number to move.'],
      ['Connect', 'Safe, limited access to the tools it needs.'],
      ['Test', 'Run it on your real past conversations first.'],
      ['Go live', 'Launch with monitoring, then add the next job.'],
    ],
    faq: [
      ['Will it sound like a robot?', 'No. It writes in your tone and hands over to a person when needed.'],
      ['Which AI model do you use?', 'Whichever fits the task. We test several and can switch later.'],
      ['How fast is the first agent live?', 'Usually two to six weeks.'],
    ],
  },
}

export const svcName = (id) => SERVICES[id]?.name || id
