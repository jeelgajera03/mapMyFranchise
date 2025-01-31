const USER_ROLES = {
  1: 'ADMIN',
  2: 'SALES_PERSON',
};

const DEFAULT_PAGE_LIMIT = 50;

const LOCAL_PRINTERS = [
  {
    'deviceId': 'NPIC7A32E (HP LaserJet Pro MFP M226dn)',
    'name': 'NPIC7A32E (HP LaserJet Pro MFP M226dn)',
  },
  {
    'deviceId': 'EPSON4E1AAF (L15150 Series)',
    'name': 'EPSON4E1AAF (L15150 Series)',
  },
];

const TEST_PRINTERS = [
  {
    'deviceId': 'RyanPrinter-Local',
    'name': 'RyanPrinter-Local',
  },
];

const BYPASS_PRINTERS = [
  'Microsoft XPS Document Writer',
  'Microsoft Print to PDF',
];

const PDI_ORDER_STATUSES = {
  1: 'Ordered',
  2: 'Pick List Printed',
  3: 'Shipped',
  4: 'Dispatched',
  5: 'Released For Billing',
  6: 'Billed',
  7: 'Cancelled As Quote',
  8: 'Cancelled As Order',
  9: '',
  10: 'Released For Dispatched',
  11: '',
  12: 'Released For Picking',
};

module.exports = {
  USER_ROLES,
  DEFAULT_PAGE_LIMIT,
  LOCAL_PRINTERS,
  TEST_PRINTERS,
  BYPASS_PRINTERS,
  PDI_ORDER_STATUSES,
};
