export enum invoiceStatus {
  settled = 'Settled',
  inProcess = 'Processing',
  determinatingTradeType = 'Determinating Trade Type',
  queuedTrade = 'Queued for Trade',
  completedTrade = 'Completed Trade',
  fiatPayout = 'Fiat Payout',
}