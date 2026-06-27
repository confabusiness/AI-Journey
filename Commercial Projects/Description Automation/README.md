# Product Description Automation

Commercial project: n8n workflow for generating product descriptions from Google Sheets rows.

Demo video: https://drive.google.com/file/d/1Q9DCvCz6bITSSSUcSkMlHfbnqaedx1Pq/view?usp=sharing

## Client Feedback

![Client feedback about the automation](./automation-review.png)

## Problem

The client needed a repeatable way to prepare product descriptions from a spreadsheet without manually researching every item, copying links, writing text, and tracking status by hand.

## Solution

The workflow takes products from Google Sheets and turns each row into a ready-to-review Google Doc with a structured product description, source link, images, and processing status.

## Workflow

```text
Google Sheets -> n8n -> source search -> AI draft -> fact check -> image handling -> Google Doc -> status update in Google Sheets
```

## What The Automation Does

- Reads product rows from Google Sheets.
- Groups duplicate or similar product variants.
- Locks rows while processing to avoid double runs.
- Searches for an official product/source page.
- Builds an evidence pack for the AI prompt.
- Generates structured product description sections.
- Runs fact-checking before the final document.
- Searches, downloads, and prepares product images.
- Creates a Google Doc with the final text.
- Writes the document link and review status back to Google Sheets.

## Key Features

- Google Sheets as the task queue.
- Status-based processing: new, in progress, review, error.
- Row locking to prevent duplicate processing.
- AI generation based on gathered sources, not model memory.
- Fact-check pass before the final output.
- Retry handling for unstable external API calls.
- Human review through the final status in the sheet.
- Duplicate image protection so the same image is not repeated under every section.

## Business Value

- Reduces manual product-description work.
- Keeps output format consistent.
- Gives managers a clear review queue.
- Stores final descriptions as shareable Google Docs.
- Keeps source and image references attached to the result.
