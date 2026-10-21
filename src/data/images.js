// Photography. Real-world photos from Unsplash (free to use), loaded from
// their CDN at the size we need, plus screenshots of our own work.
const u = (id) => (w = 1600) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`

export const IMG = {
  ai: u('1677442136019-21780ecad995'),
  robot: u('1620712943543-bcc4688e7485'),
  circuit: u('1518770660439-4636190af475'),
  code: u('1461749280684-dccba630e2f6'),
  laptop: u('1498050108023-c5249f4df085'),
  dashboard: u('1551288049-bebda4e38f71'),
  analytics: u('1460925895917-afdab827c52f'),
  server: u('1558494949-ef010cbdcc31'),
  matrix: u('1526374965328-7f61d4dc18c5'),
  phone: u('1512941937669-90a1b58e7e9c'),
  apps: u('1556656793-08538906a9f8'),
  chat: u('1611162617474-5b21e879e113'),
  web: u('1547658719-da2b51169166'),
  food: u('1504674900247-0877df9cc836'),
  beach: u('1507525428034-b723cf961d3e'),
  travel: u('1488646953014-85cb44e25828'),
  office: u('1497366216548-37526070297c'),
  team: u('1522071820081-009f0129c71c'),
  payment: u('1563986768609-322da13575f3'),
  doctor: u('1576091160399-112ba8d25d1d'),
  wellness: u('1544367567-0f2fcb009e0b'),
  skincare: u('1570172619644-dfd03ed5d881'),
  products: u('1556228578-8c89e6adf883'),
  truck: u('1519003722824-194d4455a60c'),
  port: u('1494412574643-ff11b0a5c1c3'),
  warehouse: u('1586528116311-ad8dd3c8310d'),
  engineer: u('1581092160562-40aa08e78837'),
}
