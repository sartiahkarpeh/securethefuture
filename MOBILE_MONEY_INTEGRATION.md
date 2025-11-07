# Mobile Money Integration Guide for Liberia

## Overview
This document explains the mobile money integration for donations in Liberia using Lonestar MTN and Orange Money.

## Current Implementation

### Payment Providers Supported
1. **Lonestar MTN Mobile Money**
   - USSD Code: `*155#`
   - Business Number: `+231 886 123 456`
   - Logo: Yellow Star

2. **Orange Money**
   - USSD Code: `*144#`
   - Business Number: `+231 770 123 456`
   - Logo: Orange

## How It Works

### User Flow
1. User selects donation amount (preset or custom)
2. User chooses mobile money provider
3. User optionally provides contact information
4. User submits donation intent
5. System displays step-by-step instructions
6. User completes payment via their mobile phone
7. User receives confirmation SMS from provider

### Current Status
**Phase 1: Manual Processing** ✅ (ACTIVE)
- Users receive clear instructions
- Donations processed manually
- Admin team verifies payments
- Receipts sent via email

## Future Enhancements

### Phase 2: API Integration (Recommended)
To fully automate the process, integrate with official APIs:

#### Lonestar MTN API
```
Contact: Lonestar Cell MTN Business Department
Website: https://www.lonestarcell.com
Email: business@lonestarcell.com
Phone: +231 XXX XXX XXX
```

**Required Steps:**
1. Register as a business merchant
2. Obtain API credentials
3. Implement payment initiation
4. Set up webhook for payment confirmation
5. Automate receipt generation

#### Orange Money API
```
Contact: Orange Liberia Business Solutions
Website: https://www.orange.lr
Email: business@orange.lr
Phone: +231 XXX XXX XXX
```

**Required Steps:**
1. Apply for merchant account
2. Get API access credentials
3. Integrate payment gateway
4. Configure callback URLs
5. Test in sandbox environment

### Phase 3: Advanced Features
- [ ] Real-time payment verification
- [ ] Automatic receipt generation
- [ ] Donation tracking dashboard
- [ ] Monthly donor reports
- [ ] Recurring donations
- [ ] SMS notifications
- [ ] WhatsApp integration

## Database Schema

### Donations Table
```sql
CREATE TABLE donations (
  id VARCHAR(255) PRIMARY KEY,
  amount DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'LRD',
  provider ENUM('lonestar', 'orange'),
  donor_name VARCHAR(255),
  donor_email VARCHAR(255),
  donor_phone VARCHAR(20),
  message TEXT,
  status ENUM('pending', 'completed', 'failed') DEFAULT 'pending',
  transaction_id VARCHAR(255),
  confirmation_code VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP NULL,
  INDEX idx_status (status),
  INDEX idx_created (created_at),
  INDEX idx_email (donor_email)
);
```

## Security Considerations

1. **Data Protection**
   - Never store sensitive payment credentials
   - Encrypt donor personal information
   - Use HTTPS for all transactions
   - Implement CSRF protection

2. **Fraud Prevention**
   - Monitor unusual donation patterns
   - Verify large donations manually
   - Implement rate limiting
   - Log all donation attempts

3. **Compliance**
   - Follow Liberian banking regulations
   - Maintain proper financial records
   - Generate annual donation reports
   - Comply with CBL (Central Bank of Liberia) guidelines

## Testing

### Test Scenarios
1. ✅ Preset amount selection
2. ✅ Custom amount entry
3. ✅ Provider selection
4. ✅ Form validation
5. ✅ Success message display
6. ✅ Instructions display
7. ⏳ Actual payment processing (manual)
8. ⏳ Receipt generation (manual)

### Test Numbers (Sandbox)
When APIs are integrated, use these test numbers:
- Test Lonestar: `+231 XXX XXX XXX`
- Test Orange: `+231 XXX XXX XXX`

## Contact Information

### For API Integration Support
**Secure the Future Tech Team**
- Email: tech@securethefuture.org
- Phone: +231 886 123 456

### For Donation Inquiries
**Donation Support**
- Email: donations@securethefuture.org
- Phone: +231 886 123 456
- WhatsApp: +231 886 123 456

## Next Steps

1. **Immediate (Current Phase)**
   - ✅ Deploy donation page
   - ✅ Test user flow
   - ⏳ Train staff on manual verification
   - ⏳ Set up donation tracking spreadsheet

2. **Short Term (1-2 months)**
   - Contact Lonestar MTN for merchant account
   - Contact Orange for merchant account
   - Set up business bank account if needed
   - Implement basic donation tracking database

3. **Long Term (3-6 months)**
   - Integrate Lonestar MTN API
   - Integrate Orange Money API
   - Build admin dashboard
   - Implement automated receipts
   - Add donation analytics

## Support & Maintenance

- Monitor donation page daily
- Respond to donor inquiries within 24 hours
- Update provider information as needed
- Test payment flow monthly
- Review and update documentation quarterly

---

**Last Updated:** October 30, 2025
**Version:** 1.0
**Status:** Phase 1 Active
