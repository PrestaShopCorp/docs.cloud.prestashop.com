# Submission & Validation Process
:::warning VERY IMPORTANT
**The latest major PrestaShop version (V9.0.0) was launched on June 2025** and its adoption is crucial for PrestaShop ecosystem to continue thriving.

👉 **All new products must be compatible** to the latest PrestaShop version available, otherwise the submissions will be automatically rejected by PrestaShop Validation team.

👉 **For all existing products, from February 1st 2026**, all update submissions will be rejected by PrestaShop Validation team if the product is not already compatible with the latest PrestaShop version.
:::
## Pre-Submission Preparation

Before submitting your module or theme, ensure you have met **all mandatory requirements** outlined in the [Technical Development Standards](/2-technical-development-standards/) and [Content & Marketing Standards](/3-content-and-marketing-standards/) sections.

**Your submission will be automatically rejected if any mandatory (🚨) rules are not followed.**

### Final Verification Steps

#### Technical Compliance Verification:
Run through each mandatory technical rule listed in sections 2.1-2.3 to confirm full compliance. Pay particular attention to:

- The technical name is strictly identical for all ZIP versions 
- PrestaShop context protection in all PHP files
- SQL query sanitisation throughout your code
- Security file protections (.htaccess and index.php files)
- Zero errors in debug mode testing

#### Marketing Content Completeness:
Review all mandatory marketing requirements from section 3 to ensure your product page will pass content validation:

- Professional product name following naming conventions
- Complete short description under character limits
- All required screenshots with proper specifications
- Comprehensive PDF documentation in English

#### Submission Readiness:

- Use the PrestaShop Validator tool during your development process and as first validation check
- Add your unique module_key to the module constructor
- Prepare your ZIP file with proper naming and structure
- Have your annual validation fee (€99) ready for payment

*Failure to meet any mandatory requirement will result in immediate rejection and require resubmission after corrections.*

## Validation Workflow

### Stage 1: Automated Technical Analysis

**Duration:** Immediate to 24 hours

Your ZIP submission undergoes comprehensive automated testing:

**Instant first check:** Immediately upon upload, [**PrestaShop Validator**](https://validator.prestashop.com/) scans the ZIP file.

- For **themes**, this is a foundational code check.
- For **modules**, it's more stringent: if it fails the 5 critical technical rules, it will be **auto-declined** instantly, and you will get instant feedback by email detailing the errors.

**Deep Technical Scan (Modules Only):** If a module passes the initial Validator step, it then undergoes further automated analysis by **PrestaShop Compliance Service**, an internal PrestaShop tool that checks for:

- **Security** vulnerabilities
- **PHP version compatibility** issues
- **Override** detection
- **Debug Mode** errors

The results of the PrestaShop Compliance Service are instantly available for you in on your product page in the Seller Account, where you can download the complete **Compliance PDF Report** indicating the criticity of the errors found on your module.

### Stage 2: Expert Technical Review

**Duration:** 5-7 working days

Only if there are no automated rejections on step 1, the PrestaShop Validation team performs manual analysis:

**Code Quality Assessment:**

- Architecture review for maintainability and scalability
- Performance analysis for hosting environment compatibility
- Best practices verification for PrestaShop ecosystem integration

**Functional Testing:**

- Real-world usage scenario testing

**Decision Point:** If **blocking technical errors** are found, the product is rejected, and the service provider receives detailed, actionable feedback to fix the issues and resubmit.

If it's clean, it moves to the next stage.

### Stage 3: Marketing Content Review

**Duration:** 7-10 working days

Marketing team evaluates all the detailed mandatory requirements described in the Content & Marketing Standards section, bear in mind that they will specially focus on the following eliminatory rules:

- **No unauthorised brand names** are used.
- **No unapproved external links** are present.
- There's **no copied content** (text or screenshots).
- The **product presentation is clear, professional, includes localised screenshots and documentation**, and accurately describes its functions.

**Final decision:**

- ✅ **Approved**: Product goes live on marketplace
- ❌ **Rejected**: Detailed feedback provided for improvement
