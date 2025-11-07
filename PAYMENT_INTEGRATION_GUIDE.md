# Complete Payment Integration Guide

This document provides comprehensive information about all payment methods for the Secure the Future donation system.

## Overview

We support multiple payment methods to accommodate both local and international donors:

### 🌍 International Donors

- **Credit/Debit Card Payments** (Visa, Mastercard, Amex)
  - Accepts USD, EUR, GBP and other major currencies
  - Instant processing with email receipts
  - SSL encrypted and PCI compliant
  - Recommended for donors outside Liberia

### 🇱🇷 Liberian Donors

- **Lonestar MTN Mobile Money** (\*155#)
- **Orange Money** (\*144#)
- Payments in Liberian Dollars (LRD)
- No credit card required

---

## Payment Provider Details

### International Card Payments

#### Option 1: Stripe (Recommended)

- **Website**: https://stripe.com
- **Why Choose**: Best developer experience, comprehensive fraud protection, supports 135+ currencies
- **Fees**: 2.9% + $0.30 per transaction for international cards
- **Setup Time**: 1-2 days
- **Required Documents**:
  - Business registration
  - Tax ID
  - Bank account
  - Government-issued ID

**Integration Steps**:

```bash
npm install @stripe/stripe-js stripe
```

Add to `.env.local`:

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
```

#### Option 2: PayPal

- **Website**: https://paypal.com
- **Why Choose**: Widely recognized brand, good for donor trust
- **Fees**: 3.49% + fixed fee (varies by currency)
- **Setup Time**: 1-3 days

#### Option 3: Flutterwave

- **Website**: https://flutterwave.com
- **Why Choose**: African-focused, supports multiple payment methods
- **Fees**: 3.8% for international cards
- **Setup Time**: 2-5 days
- **Advantage**: Better for African diaspora donors

### Liberian Mobile Money

#### Lonestar MTN Mobile Money

- **USSD Code**: \*155#
- **Our Account**: +231 886 123 456
- **Business Contact**: +231 XXX XXX XXX
- **Department**: Lonestar MTN Business Solutions
- **Website**: www.lonestar.com.lr
- **Email**: business@lonestar.com.lr

**For Merchant Account**:

- Visit nearest Lonestar MTN office
- Required: Business registration, ID, bank account
- Fee: Merchant account may have setup/monthly fees
- Timeline: 1-2 weeks

#### Orange Money

- **USSD Code**: \*144#
- **Our Account**: +231 770 123 456
- **Business Contact**: +231 XXX XXX XXX
- **Department**: Orange Liberia Business Solutions
- **Website**: www.orange.lr
- **Email**: business@orange.lr

**For Merchant Account**:

- Visit Orange Business Center in Monrovia
- Required: Business registration, ID, bank account
- Fee: Merchant account may have setup/monthly fees
- Timeline: 1-2 weeks

---

## User Flow

### 💳 Card Payment Flow (International)

1. Donor visits `/donate` page
2. Selects donation amount (automatically converted to USD)
3. Chooses "Credit/Debit Card" payment method
4. Enters donor information (required: name, email)
5. Clicks "Continue to Payment"
6. Card form appears:
   - Card number
   - Expiry date (MM/YY)
   - CVC
   - Cardholder name
   - Billing country
7. Clicks "Pay $XX.XX USD"
8. Payment processed instantly (2-3 seconds)
9. Success confirmation shown with transaction ID
10. Email receipt sent automatically
11. Donor can download PDF receipt

**Average Time**: 2-3 minutes

### 📱 Mobile Money Flow (Liberian)

1. Donor visits `/donate` page
2. Selects donation amount (in LRD)
3. Chooses mobile money provider (Lonestar/Orange)
4. Enters optional information (name, email, phone, message)
5. Clicks "Donate LRD X,XXX"
6. Instructions displayed:
   - Step-by-step USSD guide
   - Our mobile money number
   - Amount to send
7. Donor dials USSD code on their phone
8. Follows prompts to send money
9. Receives SMS confirmation from provider
10. We verify payment and send email confirmation

**Average Time**: 5-10 minutes

---

## Current Implementation (Phase 1)

### ✅ What's Live Now:

**Card Payments**:

- ✅ Complete UI with card form
- ✅ Input validation (card number, expiry, CVC)
- ✅ Country selection
- ✅ Simulated payment processing (3 seconds)
- ✅ Success confirmation with transaction ID
- ⏳ **Not Yet**: Real payment processing (needs Stripe/PayPal integration)

**Mobile Money**:

- ✅ Amount selection (LRD 50 - 2,500)
- ✅ Custom amount input
- ✅ Provider selection (Lonestar/Orange)
- ✅ Step-by-step instructions
- ✅ Contact information display
- ⏳ **Manual verification required** (staff checks accounts)

**Features**:

- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Premium UI with animations
- ✅ FAQ section
- ✅ Impact statistics
- ✅ Trust badges
- ✅ Form validation

### 📁 Current Files:

- `/src/app/(public)/donate/page.tsx` - Main donation page (724 lines)
- `/src/app/api/donate/route.ts` - API endpoint (console logging)
- `/PAYMENT_INTEGRATION_GUIDE.md` - This documentation

---

## Phase 2: Full API Integration (Next Steps)

### Priority 1: Card Payment Integration (1-2 weeks)

#### Step 1: Choose Payment Processor

**Recommendation**: Stripe (best for non-profits, easy integration)

#### Step 2: Create Stripe Account

1. Go to https://stripe.com
2. Click "Start now"
3. Complete business verification:
   - Upload business registration
   - Provide tax ID
   - Connect bank account
   - Submit ID verification
4. Wait for approval (usually 1-2 days)

#### Step 3: Get API Keys

1. Login to Stripe Dashboard
2. Navigate to Developers → API Keys
3. Copy "Publishable key" (pk*live*...)
4. Copy "Secret key" (sk*live*...)
5. Store securely in `.env.local`

#### Step 4: Install Stripe SDK

```bash
npm install @stripe/stripe-js stripe
```

#### Step 5: Create Stripe API Route

Create `/src/app/api/donate/stripe/route.ts`:

```typescript
import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-10-28",
});

export async function POST(request: NextRequest) {
  try {
    const { amount, email, name, currency } = await request.json();

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: currency || "usd",
      receipt_email: email,
      metadata: {
        donor_name: name,
        organization: "Secure the Future Liberia",
      },
      description: "Donation to Secure the Future",
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
```

#### Step 6: Update Donate Page

In `/src/app/(public)/donate/page.tsx`, replace simulated payment with:

```typescript
"use client";

import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

// Initialize Stripe
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

// Inside component
const handleCardPayment = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    // Create payment intent
    const response = await fetch("/api/donate/stripe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: finalAmount / 100, // Convert LRD to USD (approximate rate)
        email: donorEmail,
        name: cardName || donorName,
        currency: "usd",
      }),
    });

    const { clientSecret, error } = await response.json();

    if (error) {
      throw new Error(error);
    }

    // Confirm card payment
    const stripe = await stripePromise;
    const result = await stripe!.confirmCardPayment(clientSecret, {
      payment_method: {
        card: {
          number: cardNumber.replace(/\s/g, ""),
          exp_month: parseInt(cardExpiry.split("/")[0]),
          exp_year: parseInt("20" + cardExpiry.split("/")[1]),
          cvc: cardCvc,
        },
        billing_details: {
          name: cardName,
          email: donorEmail,
        },
      },
    });

    if (result.error) {
      throw new Error(result.error.message);
    }

    // Payment successful
    setShowSuccess(true);
    setShowCardForm(false);

    // Send confirmation email (separate API call)
    await fetch("/api/send-receipt", {
      method: "POST",
      body: JSON.stringify({
        email: donorEmail,
        amount: finalAmount / 100,
        transactionId: result.paymentIntent.id,
      }),
    });
  } catch (error) {
    alert("Payment failed: " + error.message);
  } finally {
    setIsSubmitting(false);
  }
};
```

#### Step 7: Test Card Payments

Stripe test cards:

- Success: `4242 4242 4242 4242`
- Requires authentication: `4000 0027 6000 3184`
- Declined: `4000 0000 0000 0002`
- Expiry: Any future date
- CVC: Any 3 digits

#### Step 8: Setup Webhooks (Optional but Recommended)

Create `/src/app/api/webhooks/stripe/route.ts`:

```typescript
import { headers } from "next/headers";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: Request) {
  const body = await request.text();
  const signature = headers().get("stripe-signature")!;

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    );

    switch (event.type) {
      case "payment_intent.succeeded":
        // Update database, send confirmation
        const paymentIntent = event.data.object;
        console.log("Payment succeeded:", paymentIntent.id);
        break;
      case "payment_intent.payment_failed":
        // Handle failed payment
        console.log("Payment failed");
        break;
    }

    return Response.json({ received: true });
  } catch (error) {
    return Response.json({ error: "Webhook error" }, { status: 400 });
  }
}
```

### Priority 2: Database Integration (1 week)

#### Add Donation Model to Prisma

Update `/prisma/schema.prisma`:

```prisma
model Donation {
  id              String   @id @default(cuid())
  amount          Int      // Amount in cents (USD) or LRD
  currency        String   @default("USD") // USD or LRD
  paymentMethod   String   // card, lonestar, orange
  status          String   @default("pending") // pending, completed, failed

  // Donor info
  donorName       String?
  donorEmail      String?
  donorPhone      String?
  message         String?

  // Payment details
  transactionId   String?  @unique
  paymentIntentId String?

  // Card specific
  last4           String?  // Last 4 digits of card
  cardBrand       String?  // visa, mastercard, etc
  billingCountry  String?

  // Mobile money specific
  mobileNumber    String?

  // Metadata
  createdAt       DateTime @default(now())
  completedAt     DateTime?

  @@index([status])
  @@index([donorEmail])
  @@index([createdAt])
}
```

Run migration:

```bash
npx prisma migrate dev --name add_donations
```

#### Update API Route

```typescript
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const data = await request.json();

  const donation = await prisma.donation.create({
    data: {
      amount: data.amount,
      currency: data.currency,
      paymentMethod: data.paymentMethod,
      donorName: data.donorName,
      donorEmail: data.donorEmail,
      donorPhone: data.donorPhone,
      message: data.message,
      status: "pending",
    },
  });

  return Response.json({ success: true, donationId: donation.id });
}
```

### Priority 3: Mobile Money API Integration (2-4 weeks)

**Prerequisites**:

1. ✅ Obtain merchant accounts from Lonestar and Orange
2. ✅ Get API credentials (keys, merchant IDs)
3. ✅ Set up test accounts
4. ✅ Document API endpoints

**Note**: Mobile money API documentation is not publicly available. You'll receive this when you register as a merchant.

**Expected API Flow** (generic):

```typescript
// Initiate payment
const response = await fetch(PROVIDER_API_URL, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    merchant_id: MERCHANT_ID,
    amount: amount,
    customer_phone: phone,
    currency: "LRD",
    callback_url: "https://yourdomain.com/api/webhooks/mobile-money",
  }),
});

// Response will include transaction ID
// Customer receives USSD prompt on their phone
// After confirmation, webhook is called
```

---

## Phase 3: Advanced Features (Optional)

### Recurring Donations

- Monthly/yearly subscriptions
- Donor portal to manage subscriptions
- Automatic receipts

### Donor Dashboard

- View donation history
- Download receipts
- Update payment methods
- See impact reports

### Admin Dashboard

- Real-time donation tracking
- Export reports (CSV, Excel)
- Refund management
- Donor management

### Notifications

- SMS confirmations (via Twilio)
- WhatsApp notifications
- Push notifications

---

## Database Schema

```prisma
model Donation {
  id              String   @id @default(cuid())
  amount          Int      // In cents (USD) or LRD
  currency        String   @default("USD")
  paymentMethod   String   // card, lonestar, orange
  status          String   @default("pending")

  donorName       String?
  donorEmail      String?
  donorPhone      String?
  message         String?

  transactionId   String?  @unique
  paymentIntentId String?
  last4           String?
  cardBrand       String?
  billingCountry  String?
  mobileNumber    String?

  createdAt       DateTime @default(now())
  completedAt     DateTime?

  @@index([status])
  @@index([donorEmail])
  @@index([createdAt])
}
```

---

## Security Considerations

### Card Payments

- ✅ Never store card numbers (use tokenization)
- ✅ Use Stripe Elements (PCI compliant)
- ✅ Implement 3D Secure for authentication
- ✅ SSL certificate (HTTPS only)
- ✅ Validate all inputs
- ✅ Rate limiting on API endpoints

### Mobile Money

- ✅ Store API keys in environment variables
- ✅ Never commit secrets to Git
- ✅ Use webhook signatures to verify authenticity
- ✅ Log all transactions
- ✅ Implement timeout/retry logic

### General

- ✅ GDPR compliance (if EU donors)
- ✅ Data encryption at rest
- ✅ Regular security audits
- ✅ Two-factor authentication for admin

---

## Testing Guide

### Card Payments

**Stripe Test Cards**:

```
Success: 4242 4242 4242 4242
3D Secure: 4000 0027 6000 3184
Declined: 4000 0000 0000 0002
Insufficient Funds: 4000 0000 0000 9995
```

**Test Amounts**:

- $10 - Small donation
- $50 - Medium donation
- $250 - Large donation
- $0.50 - Minimum amount (test fees)

### Mobile Money

**Manual Testing**:

1. Use small amounts (LRD 10-50)
2. Test with actual mobile money account
3. Verify SMS confirmations
4. Check account balance

**Scenarios to Test**:

- ✅ Successful payment
- ✅ Insufficient balance
- ✅ Wrong PIN
- ✅ Cancelled payment
- ✅ Network timeout

---

## Support Information

### For Donors

**Payment Issues**:

- Email: donations@securethefuture.org
- Phone: +231 886 123 456
- Hours: Mon-Fri 9AM-5PM GMT

**Common Issues**:

1. **Card Declined**: Check with your bank, may need to authorize international payments
2. **Mobile Money Failed**: Ensure sufficient balance and correct PIN
3. **No Receipt**: Check spam folder, or contact us with transaction ID

### For Developers

**Stripe Support**:

- Docs: https://stripe.com/docs
- Support: support@stripe.com
- Community: https://github.com/stripe

**Mobile Money Support**:

- Lonestar: businesssupport@lonestar.com.lr
- Orange: merchantsupport@orange.lr

---

## Cost Analysis

### Transaction Fees

**Card Payments (Stripe)**:

- International cards: 2.9% + $0.30
- Example: $100 donation = $2.90 + $0.30 = $3.20 fee
- Net: $96.80

**Mobile Money**:

- Merchant fees vary (typically 1-2%)
- Example: LRD 1,000 = ~LRD 20 fee
- Negotiate with provider for non-profit rates

### Monthly Costs

- Stripe: $0 (pay-as-you-go)
- Mobile Money Merchant Account: LRD 500-2,000/month
- SMS Notifications: ~$0.05 per SMS
- Hosting: Covered by current setup

---

## Next Steps

### Immediate (This Week)

1. ✅ Card payment UI complete
2. ⏳ Choose payment processor (Stripe recommended)
3. ⏳ Create Stripe account
4. ⏳ Get API keys

### Short Term (2-4 Weeks)

1. ⏳ Integrate Stripe API
2. ⏳ Test with test cards
3. ⏳ Add database tracking
4. ⏳ Deploy to production

### Medium Term (1-2 Months)

1. ⏳ Register for mobile money merchant accounts
2. ⏳ Get API credentials
3. ⏳ Integrate mobile money APIs
4. ⏳ Build admin dashboard

### Long Term (3-6 Months)

1. ⏳ Add recurring donations
2. ⏳ Build donor portal
3. ⏳ Add SMS notifications
4. ⏳ Implement advanced analytics

---

## Resources

### Documentation

- Stripe Docs: https://stripe.com/docs
- Next.js API Routes: https://nextjs.org/docs/app/building-your-application/routing/route-handlers
- Prisma Docs: https://www.prisma.io/docs

### Code Examples

- Stripe + Next.js: https://github.com/vercel/next.js/tree/canary/examples/with-stripe-typescript
- Payment Forms: https://stripe.com/docs/stripe-js

### Support

- Email: dev@securethefuture.org
- GitHub: (your repository)

---

**Last Updated**: October 30, 2025  
**Version**: 2.0  
**Status**: Phase 1 Complete, Phase 2 Ready to Start
