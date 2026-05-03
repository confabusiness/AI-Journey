# AI Lead Triage Dashboard

A small portfolio demo for AI business automation: incoming leads are classified by priority, summarized, and turned into a clear next action for a manager.

This project is intentionally simple and business-readable. It shows the result of an AI workflow without requiring a backend, paid API, or private client data.

## What It Demonstrates

- Lead classification: `hot`, `warm`, `cold`
- Business summary for each request
- Pain points and automation opportunity
- Recommended next step for a manager
- Human-review flag for sensitive or high-value cases
- Simple dashboard view for sales / operations review

## Demo Data

The dataset is synthetic and based on realistic small-business requests:

- recruiting and HR agencies
- ecommerce support
- healthcare-adjacent request routing
- online schools
- local services
- logistics RFQ processing
- agencies and consultants

No real customer data is used.

## How To Open

Open `index.html` in a browser.

No installation is required.

## Workflow Behind The Demo

```text
Incoming request
  -> Google Form / spreadsheet
  -> AI analysis prompt
  -> structured lead fields
  -> manager dashboard
  -> next action / reply draft
```

## Portfolio Positioning

Short version:

> I help small businesses handle incoming leads faster by turning messy requests into priority, summary, and next action using AI.

## Files

- `index.html` - static dashboard demo
- `data/demo-leads.json` - synthetic enriched leads
- `docs/outreach-message.md` - message templates for testing the demo with prospects

## Next Improvements

- Add CSV upload
- Add one-click export to Google Sheets
- Add n8n / Make workflow diagram
- Add Telegram/email notification example
- Record a 60-second walkthrough video
