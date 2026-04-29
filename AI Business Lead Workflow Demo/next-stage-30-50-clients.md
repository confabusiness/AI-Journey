# Next Stage: 30-50 Client Outreach

## Goal

Validate the AI Business Lead Workflow Demo with 30-50 real potential clients and collect enough feedback to understand whether this can become a paid service.

The goal is not to fully automate the product yet. The goal is to test whether small businesses understand the value, have the lead-processing problem, and are willing to discuss a pilot.

## Target Audience

Focus on small businesses where inbound requests are frequent, repetitive, and manager attention is limited:

- local service businesses
- recruiting and HR agencies
- ecommerce stores
- online schools and course providers
- logistics and delivery companies
- marketing and design agencies
- clinics or healthcare-adjacent teams, only with human review

## Outreach Volume

Start with 30-50 prospects:

- 30 minimum to get the first real signal
- 50 preferred for better response quality
- 5-10 conversations as a practical success metric
- 1-3 pilot opportunities as the target outcome

## Prospect Selection Criteria

Prioritize companies that likely receive leads through forms, messengers, email, calls, or CRM:

- visible contact form or lead form
- active website or social page
- service request or consultation flow
- repeated customer questions
- small team where managers still process requests manually
- signs of operational pressure, such as many services, locations, or request types

Avoid prospects where the workflow would require sensitive automation without human review.

## First Actions

1. Build a list of 30-50 companies.
2. For each company, capture name, website, niche, contact channel, and likely lead-processing pain.
3. Send a short personalized message with the demo video and Google Sheet workflow.
4. Ask one simple question: whether they manually review incoming requests and want to see a faster workflow.
5. Track every response in a simple outreach table.
6. For interested leads, offer a 15-minute discovery call or a small custom demo using synthetic data.
7. Use the feedback to decide which niche has the strongest demand.

## Message Template

```text
Hi [Name],

I built a small AI workflow demo for businesses that receive leads through forms, messengers, or email.

It takes a raw customer request and turns it into:
- lead category
- short summary
- likely pain points
- suggested next step
- human review flag

Demo video:
https://drive.google.com/file/d/1538TxVEdUdhyBk5tOLcJv3PStR_mgS1e/view?usp=sharing

Quick question: do you currently review incoming requests manually, or already have a system for prioritizing them?
```

## Tracking Fields

Use a simple sheet or CRM table with these fields:

- company
- niche
- website
- contact person
- contact channel
- message sent
- response
- lead category
- pain point
- next step
- status
- notes

## Status Values

```text
not_contacted
message_sent
replied
interested
call_booked
pilot_candidate
not_relevant
no_response
```

## Success Criteria

The next stage is successful if:

- 30-50 prospects are contacted
- at least 5 companies reply
- at least 2 companies agree to a call or custom demo
- at least 1 company gives clear feedback on a real lead-processing workflow

## What To Learn

During outreach, collect answers to these questions:

- Which niche reacts best to the demo?
- Do prospects understand the value in less than one minute?
- Which field matters most: category, summary, next step, or human review?
- Are they interested in Google Sheets, CRM integration, messenger integration, or email processing?
- Would they pay for setup, monthly support, or a one-time automation build?

## Next Automation Step

If outreach confirms demand, automate the manual step:

```text
Google Form -> Google Sheets -> AI API / Apps Script / n8n -> AI Analysis -> manager notification
```

Possible automation options:

- Google Apps Script for the fastest spreadsheet-native version
- n8n or Make for a no-code integration demo
- Node.js or Python for a more flexible backend
- CRM integration after the workflow is validated
