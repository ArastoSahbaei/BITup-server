import { speedPolicy } from '../enums'

export interface IcreateStore {
  name?: string
  website?: string | URL
  defaultCurrency?: string
  invoiceExpiration?: number
  monitoringExpiration?: number
  speedPolicy?: speedPolicy
  lightningDescriptionTemplate?: string
  paymentTolerance?: number
  anyoneCanCreateInvoice?: boolean
  requiresRefundEmail?: boolean
  receipt?: {
    enabled: boolean
    showQR: boolean
    showPayments: boolean
  }
  lightningAmountInSatoshi?: boolean
  lightningPrivateRouteHints?: boolean
  onChainWithLnInvoiceFallback?: boolean
  redirectAutomatically?: boolean
  showRecommendedFeet?: boolean
  recommendedFeeBlockTarget?: number
  defaultLang?: string
  customLogo?: string
  customCSS?: string
  htmlTitle?: string
  networkFeeMode?: string
  payJoinEnabled?: boolean
  lazyPaymentMethods?: boolean
  defaultPaymentMethod?: string
}