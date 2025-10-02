---
home: true
heroImage: assets/images/common/logo_marketplace_guidlelines.svg
heroText: PrestaShop Marketplace Seller & Developer Guidelines
tagline: Welcome to the official PrestaShop recommendations and best practices for developing and selling in Addons Marketplace
actionText: Get Started →
actionLink: /0-guidelines-introduction/
footer: © Copyright 2007-2025 PrestaShop. All rights reserved.
---
<div class="features-list">

  <div class="feature">
    <h3>Mandatory Technical Standards</h3>
    <p>Non-negotiable rules for code, security, and structure required to pass validation.
     <br><a href="/2-technical-development-standards/">Learn more →</a></p>
  </div>

  <div class="feature">
    <h3>Content & Marketing Standards</h3>
    <p>Requirements for product names, visuals, and documentation to maximize merchant conversion.
    <br><a href="/3-content-and-marketing-standards/">Learn more →</a></p>
  </div>

  <div class="feature">
    <h3>PrestaShop Quality Standards</h3>
    <p>Best practices for achieving top performance and enhancing marketplace visibility.
    <br><a href="/4-quality-standards-and-verified-plus/">Learn more →</a></p>
  </div>
</div>
<div class="features-list">

  <div class="feature">
    <h3>Submission & Validation Process</h3>
    <p>The multi-stage workflow from automated Validator scan to final expert review.
    <br><a href="/5-submission-and-validation-process/">Learn more →</a></p>
  </div>

  <div class="feature">
    <h3>Partnership & Account Setup</h3>
    <p>Seller tiers, exclusive partner benefits, and the mandatory steps for professional account creation.
    <br><a href="/1-getting-started/">Learn more →</a></p>
  </div>

  <div class="feature">
    <h3>Business Care & Legal Obligations</h3>
    <p>Mandatory support requirements, financial reporting duties, and compliance rules (GDPR & IP).
    <br><a href="/7-legal-and-compliance/">Learn more →</a></p>
  </div>
</div>

<style>
/* This FINAL CSS unifies spacing for a clean, balanced look */

/* Base style for all feature rows (applying padding for equal vertical spacing) */
.features-list {
    display: flex;
    justify-content: space-between;
    width: 100%;

    /* We are reducing margin and increasing padding to unify the spacing */
    margin: 0;
    padding: 2.5rem 0 2.5rem 0; /* Creates equal vertical space above and below the features */
}

/* 1. Add the separator line ONLY to the first row (and space it from the hero section) */
.features-list:first-of-type {
    border-top: 1px solid #ddd; /* Subtle Separator */
    margin-top: 3rem; /* Space the first row down from the "Get Started" button */
    padding-top: 3rem; /* Increase the space above the separator */
}

/* 2. Reduce the space between the first and second row */
/* We target the second row to reduce its top padding, bringing it closer to the first row */
.features-list + .features-list {
    margin-top: 0; /* Remove top margin between rows */
    padding-top: 1.5rem; /* Small vertical gap between the rows */
}

/* Content and sizing styles */
.features-list .feature {
    flex-basis: 32%;
    padding: 0 1rem;
    box-sizing: border-box;
}

.features-list .feature h3 {
    font-size: 1.4rem;
    font-weight: 500;
    border-bottom: none;
    /* Unify spacing between Title (h3) and Details (p) */
    margin-top: 0;
    margin-bottom: 0.8rem;
    padding-bottom: 0;
    color: black;
}

.features-list .feature p {
    color: black;
    /* Reduce padding/margin on paragraphs for tight text blocks */
    margin-top: 0;
    margin-bottom: 0;
}

.features-list a {
    font-weight: bold;
    color: #000000;
    text-decoration: none;
}
</style>
