# AI Lead Triage Dashboard

Portfolio case study: a static manager dashboard that turns messy inbound requests into priority, summary, pain points, next action, and a draft reply.

This is the main portfolio case for my AI Operations / Business Process Automation positioning. It shows how a simple AI workflow can help a manager review leads faster without exposing private client data or requiring a paid API.

## Demo

- Live demo: TODO - publish through GitHub Pages
- Screenshot: `assets/dashboard-screenshot.png`
- 60-second walkthrough: TODO - add video link

![AI Lead Triage Dashboard screenshot](assets/dashboard-screenshot.png)

Open locally:

```text
index.html
```

No installation is required.

## Problem

Small teams often receive leads through forms, email, messengers, or spreadsheets. A manager still has to read every message, understand the client context, decide whether it is urgent, and write the next response.

That manual review is slow, inconsistent, and hard to scale.

## Solution

The dashboard shows what an AI-assisted lead review workflow can produce:

- lead priority: `hot`, `warm`, or `cold`
- short business summary
- likely pain points
- automation opportunity
- recommended next step
- draft reply for the manager
- human-review flag for sensitive or high-value cases

## Before / After

Before:

- raw requests are scattered across forms and messages
- every lead needs manual reading
- follow-up quality depends on manager attention
- urgent or high-value leads can be missed

After:

- each lead has a clear priority and summary
- the manager sees the next action immediately
- draft replies speed up follow-up
- human review stays in the workflow for sensitive cases

## Workflow

```text
Incoming request
  -> form / email / messenger / spreadsheet
  -> AI analysis prompt
  -> structured lead fields
  -> manager dashboard
  -> next action / reply draft
```

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

## What I Built

- static HTML dashboard
- filterable lead cards by priority and human-review status
- search across company, message, pain point, and niche
- synthetic lead dataset with enriched AI-style fields
- outreach message templates for portfolio validation

## Business Value

This type of workflow can help sales, HR, support, and operations teams:

- reduce time spent reading repetitive inbound messages
- standardize lead qualification
- keep high-risk cases under human control
- respond faster with a better first message
- turn spreadsheet intake into a simple operating dashboard

## Files

- `index.html` - static dashboard demo
- `data/demo-leads.json` - synthetic enriched leads
- `docs/outreach-message.md` - message templates for asking prospects for feedback

## Next Improvements

- publish GitHub Pages live demo
- add dashboard screenshot
- record a 45-60 second walkthrough video
- add CSV upload
- add one-click export to Google Sheets
- add n8n / Make workflow diagram
- add Telegram or email notification example
