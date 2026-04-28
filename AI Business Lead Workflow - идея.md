# AI Business Lead Workflow

## Concept

AI workflow for small businesses that helps managers process incoming leads faster and more consistently.

The workflow turns an unstructured customer request into a clear summary, priority level, and recommended next action.

## Use Case

Small businesses often receive leads from forms, messengers, email, landing pages, or CRM systems. Managers need to quickly understand:

- what the customer wants;
- how urgent the request is;
- whether the lead is high priority;
- what should happen next.

This workflow helps structure that first step.

## Workflow

```text
incoming lead -> table / CRM -> AI analysis -> priority -> manager next action
```

## AI Output

For each lead, the AI returns:

- lead category: `hot`, `warm`, or `cold`;
- short summary;
- reason for the category;
- recommended next step;
- human review flag.

## Example Input

```text
Hello. We want to set up CRM and automatic replies for website leads.
We have 3 sales managers and around 40 leads per day.
Budget is open for discussion, and we want to start within a week.
```

## Example Output

```json
{
  "category": "hot",
  "summary": "The company wants CRM setup and automated replies for around 40 website leads per day.",
  "reason": "The request has a clear business need, team context, urgency, and budget readiness.",
  "next_step": "Offer a short discovery call to map the current lead handling process.",
  "needs_human_review": true
}
```

## Minimal Demo

A simple demo can be built with:

- Google Form or manual lead input;
- Google Sheets as a lightweight database;
- OpenAI / ChatGPT / Make / n8n for AI analysis;
- result written back to the sheet;
- Telegram or email notification for the manager.

## Business Value

- Faster lead triage.
- Clearer priorities for managers.
- Less manual reading of repetitive requests.
- Consistent lead handling format.
- Better visibility for the business owner.

## Portfolio Artifacts

- workflow diagram;
- test lead table;
- before / after example;
- AI prompt and structured output;
- short demo video;
- README explaining the business problem and implementation.
