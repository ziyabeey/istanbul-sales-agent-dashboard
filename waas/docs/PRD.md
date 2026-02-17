# Product Requirements Document (PRD)

## Product Name: Waas (Website as a Service)

## Vision
To provide a seamless, drag-and-drop website building experience that empowers users to create, publish, and monetize their own sites without writing code.

## Target Audience
- Independent creators
- Small business owners
- Freelancers

## Core Features
1. **Drag-and-Drop Editor**: Intuitive interface to place components.
2. **Real-time Preview**: What You See Is What You Get (WYSIWYG).
3. **Auto-Publish**: One-click deployment to Vercel/Netlify.
4. **Subscription Management**: Integrated Stripe payments for premium features.
5. **Multi-tenancy**: Secure isolation of user data and sites.

## Functional Requirements
- **Auth**: Users must be able to sign up/login via Clerk.
- **Sites**: Users can create multiple sites. each with unique subdomain.
- **Pages**: Sites can have multiple pages.
- **Components**: Basic set (Container, Text, Button, Image).

## Non-Functional Requirements
- **Performance**: Editor loads < 2s.
- **Scalability**: Support 10k+ concurrent users.
- **Security**: Data encryption at rest and in transit.

## Success Metrics
- User Retention Rate > 20%
- Conversion to Paid > 5%
