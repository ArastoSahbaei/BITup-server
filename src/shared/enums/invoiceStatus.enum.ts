export enum invoiceStatus {
  settled = 'Settled',
  inProcess = 'Processing',
  determinatingTradeType = 'Determinating Trade Type', //TODO: Keep this? a function that determines if the invoice is for a instant sell order or a queued one..
  queuedTrade = 'Queued for Trade',
  completedTrade = 'Completed Trade',
  fiatPayout = 'Fiat Payout',
}