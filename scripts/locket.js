var obj = JSON.parse($response.body);

obj.Attention = "Locket Gold by Thanh Lê";

var sub = {
  is_sandbox: false,
  ownership_type: "PURCHASED",
  billing_issues_detected_at: null,
  period_type: "normal",
  expires_date: "2099-12-31T23:59:59Z",
  grace_period_expires_date: null,
  unsubscribe_detected_at: null,
  original_purchase_date: "2023-01-01T00:00:00Z",
  purchase_date: "2023-01-01T00:00:00Z",
  store: "app_store",
  store_transaction_id: "1000000000000001",
  auto_resume_date: null,
  is_trial: false
};

var ent = {
  grace_period_expires_date: null,
  purchase_date: "2023-01-01T00:00:00Z",
  product_identifier: "com.locket.Locket.premium.yearly",
  expires_date: "2099-12-31T23:59:59Z"
};

if (!obj.subscriber) obj.subscriber = {};
if (!obj.subscriber.subscriptions) obj.subscriber.subscriptions = {};
if (!obj.subscriber.entitlements) obj.subscriber.entitlements = {};

// Nhiều product để tăng khả năng khớp
["com.locket.Locket.premium.yearly", "com.locket.Locket.premium.monthly", "rc_promo_Gold_lifetime", "Gold", "premium", "locket_gold"].forEach(function(id) {
  obj.subscriber.subscriptions[id] = sub;
});

["Gold", "pro", "premium", "locket_gold", "Locket Gold"].forEach(function(id) {
  obj.subscriber.entitlements[id] = ent;
});

obj.subscriber.original_app_user_id = obj.subscriber.original_app_user_id || "$RCAnonymousID:locketgold";
obj.subscriber.first_seen = "2023-01-01T00:00:00Z";
obj.subscriber.last_seen = new Date().toISOString();
obj.subscriber.management_url = null;

$done({ body: JSON.stringify(obj) });