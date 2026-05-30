# High-Velocity NoSQL Clickstream & Conversion Funnel Pipeline

## Project Overview
This repository features an advanced, end-to-end analytical pipeline designed to ingest and process high-velocity, structurally variant e-commerce clickstream data using **MongoDB**. 

In modern retail landscapes, customer interactions (clicks, views, cart additions, and checkouts) are captured as dynamic streams of nested JSON documents. This project demonstrates how to leverage the **MongoDB Aggregation Framework** to execute complex multi-stage transformations, deconstruct nested document arrays, and compute critical conversion funnel metrics directly within the database layer.

---

## Technical Stack & Architecture
* **Database Engine:** MongoDB (NoSQL)
* **Shell Interface:** MongoSH / JavaScript Engine
* **Core Mechanisms:** Multi-Stage Aggregation Framework, Array Deconstruction, Structural Variance Handling
* **Performance Engineering:** Compound Indexing, Query Plan Diagnostics (`.explain()`)

---

## Pipeline Engine Breakdown

### 1. Data Ingestion & Structural Variance Schema
* `01_database_seed_and_schema.js`
* Establishes the database context and handles unstructured JSON schemas. It seamlessly hosts standard linear interaction documents alongside complex purchase documents containing nested `cart_items` product arrays.

### 2. Multi-Stage Aggregation Analytics
* `02_analytical_aggregation_pipelines.js`
* **Funnel Analytics Pipeline:** Programmatically scans interaction streams, maps conditional arrays using `$cond`, isolates unique user sessions, and outputs a **60% Global Cart Abandonment Rate**.
* **Nested Array Deconstruction Pipeline:** Deploys the architectural `$unwind` stage to split atomic arrays into independent document layers. It automatically computes itemized total quantities and multiplies sub-field prices to determine gross revenue distributions by product category (`Electronics` vs. `Accessories`).

### 3. Performance Tuning & Query Execution Strategy
* `03_performance_tuning_and_indexing.js`
* Mitigates processing degradation by building a **Compound Index** on `{ event_type: 1, timestamp: -1 }`.
* Integrates an architectural diagnostic check using `.explain("executionStats")` to verify that the query engine uses an optimized **IXSCAN (Index Scan)** path instead of resorting to a resource-intensive **COLLSCAN (Collection Scan)**.

---

## Key Metrics Calculated
* **Total Cart Addition Sessions:** 5
* **Successful Purchases:** 2
* **Abandoned Carts:** 3
* **Funnel Abandonment Rate:** 60.0%
* **Top Revenue Driver:** Electronics ($480.00 Gross Revenue / 4 Items Sold)

---

## How to Execute the Platform Scripts
1. Open your MongoSH terminal or MongoDB Compass shell.
2. Load and run the seeding script:
   ```bash
   load("01_database_seed_and_schema.js")
