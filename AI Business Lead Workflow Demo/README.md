# AI Business Lead Workflow Demo

Portfolio MVP showing how incoming business leads can be collected from a Google Form, stored in Google Sheets, and enriched with manual AI analysis before full automation.

## Live Demo Links

- Google Form: https://docs.google.com/forms/d/1mR0s35XgwwsVMzPQ7Ordf9xHMqudD6n13O-I2NHIG3A/edit
- Google Sheet: https://docs.google.com/spreadsheets/d/17zad7dTvH1r3zl3o-8Ef5LoAKSzEmhLjb-lw_CrMcjM/edit?gid=567416417#gid=567416417
- Demo Video: https://drive.google.com/file/d/1538TxVEdUdhyBk5tOLcJv3PStR_mgS1e/view?usp=sharing

## Problem

Small businesses receive inbound requests through forms, landing pages, messengers, email, or CRM systems. Managers need to quickly understand what the client wants, how urgent the request is, whether it is worth human attention, and what should happen next.

Manual lead review is slow and inconsistent. This demo shows a simple AI-assisted workflow for turning raw form submissions into structured business decisions.

## Workflow

```text
Google Form -> Form Responses sheet -> manual AI analysis -> AI Analysis sheet -> manager next action
```

## What The AI Analysis Produces

For each incoming lead, the AI analysis adds:

- `lead_category`: `hot`, `warm`, or `cold`
- `company_summary`
- `likely_pain_points`
- `automation_opportunity`
- `ai_summary`
- `ai_reason`
- `next_step`
- `personalized_reply`
- `needs_human_review`
- `status`

## Sheets Structure

- `Form Responses`: raw source data from the Google Form. This sheet is intentionally left as the form-connected source.
- `AI Analysis`: cleaned English portfolio dataset with 10 demo leads and structured AI enrichment.
- `Prompt Template`: readable English prompt template for manual analysis in Perplexity or ChatGPT.

## Demo Dataset

The demo uses 11 realistic synthetic leads from different business contexts:

- recruiting and HR
- ecommerce support
- healthcare request triage
- marketing agency operations
- online school support
- field service dispatch
- delivery operations
- design studio discovery
- logistics RFQ processing
- AI consultation and discovery for a tools company

The dataset is designed for portfolio review and GitHub presentation. It does not contain real customer data.

## MVP Scope

This is a manual-AI MVP:

- lead intake through Google Form
- storage in Google Sheets
- prompt-based analysis with Perplexity or ChatGPT
- results pasted into the `AI Analysis` sheet
- status and human-review flags for manager workflow

## Future Automation

The manual enrichment step can be automated later with:

- Google Apps Script
- n8n or Make
- a local Python or Node.js script
- a serverless API function
- CRM or email integration

## Portfolio Value

This project demonstrates a practical AI business automation workflow:

- clear before/after structure
- realistic source data
- structured AI output
- human-in-the-loop review logic
- business-focused next steps
- simple implementation using accessible tools

## Included Files

- `prompt-template.md`: the structured prompt used for manual AI enrichment.
- `ai-analysis-demo.csv`: exported snapshot of the cleaned `AI Analysis` demo dataset.

