/**
 * FILE: 02_analytical_aggregation_pipelines.js
 * DESCRIPTION: Compiles advanced multi-stage aggregation queries 
 * to extract cart abandonment metrics and category revenue distributions.
 */

db = db.getSiblingDB('ECommerce_Analytics');

print('--- PIPELINE 1: COMPUTING GLOBAL CART ABANDONMENT RATE ---');

var abandonmentPipeline = [
  {
    $match: {
      event_type: { $in: ["cart_add", "purchase"] }
    }
  },
  {
    $group: {
      _id: "$session_id",
      actions: { $push: "$event_type" }
    }
  },
  {
    $project: {
      session_id: "$_id",
      addedToCart: { $cond: { if: { $in: ["cart_add", "$actions"] }, then: 1, else: 0 } },
      purchased: { $cond: { if: { $in: ["purchase", "$actions"] }, then: 1, else: 0 } }
    }
  },
  {
    $group: {
      _id: null,
      totalCartAdds: { $sum: "$addedToCart" },
      totalPurchases: { $sum: "$purchased" }
    }
  },
  {
    $project: {
      _id: 0,
      totalCartAdds: 1,
      totalPurchases: 1,
      abandonedCarts: { $subtract: ["$totalCartAdds", "$totalPurchases"] },
      abandonmentRatePercentage: {
        $multiply: [
          { $divide: [ { $subtract: ["$totalCartAdds", "$totalPurchases"] }, "$totalCartAdds" ] },
          100
        ]
      }
    }
  }
];

var abandonmentResult = db.clickstream_events.aggregate(abandonmentPipeline).toArray();
printjson(abandonmentResult);


print('\n--- PIPELINE 2: UNWINDING NESTED ARRAYS FOR CATEGORY REVENUE ---');

var revenuePipeline = [
  {
    $match: {
      event_type: "purchase",
      cart_items: { $exists: true }
    }
  },
  {
    $unwind: "$cart_items"
  },
  {
    $group: {
      _id: "$cart_items.category",
      totalItemsSold: { $sum: "$cart_items.quantity" },
      grossRevenue: { 
        $sum: { $multiply: ["$cart_items.price", "$cart_items.quantity"] } 
      }
    }
  },
  {
    $sort: { grossRevenue: -1 }
  }
];

var revenueResult = db.clickstream_events.aggregate(revenuePipeline).toArray();
printjson(revenueResult);
