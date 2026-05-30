/**
 * FILE: 03_performance_tuning_and_indexing.js
 * DESCRIPTION: Configures high-performance compound indexing 
 * structures and runs execution plan diagnostics to verify optimized state.
 */

db = db.getSiblingDB('ECommerce_Analytics');

print('Building high-performance compound search index...');

// Create compound index on highly queried fields
db.clickstream_events.createIndex({ event_type: 1, timestamp: -1 });

print('Index compiled successfully. Current active collections indexes:\n');
printjson(db.clickstream_events.getIndexes());

print('\nExecuting architectural diagnostic check (Query Execution Plan)...');

// Run explain plan execution stats to confirm index usage over raw disk scans
var diagnosticExplanation = db.clickstream_events.find({ event_type: "purchase" }).explain("executionStats");

// Output index scan status confirmation
var stage = diagnosticExplanation.queryPlanner.winningPlan.stage;
print('Winning Execution Strategy Stage: ' + stage);
print('--- (Note: IXSCAN confirms index usage, COLLSCAN means unoptimized collection scan) ---');
