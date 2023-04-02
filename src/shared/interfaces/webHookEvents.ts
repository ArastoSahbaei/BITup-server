export interface webHookEvents {
  InvoiceCreated?: boolean,
  InvoiceReceivedPayment?: boolean,
  InvoiceProcessing?: boolean,
  InvoiceExpired?: boolean,
  InvoiceSettled?: boolean,
  InvoiceInvalid?: boolean,
}