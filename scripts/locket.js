var ua = ($request.headers["User-Agent"] || $request.headers["user-agent"] || "").toLowerCase();
var obj = JSON.parse($response.body);
obj.Attention = "Enjoy";

var subscriptionData = {
  is_sandbox: false,
  ownership_type: "PURCHASED",
  billing_issues_detected_at: null,
  period_type: "normal",
  expires_date: "2099-01-01T00:00:00Z",
  grace_period_expires_date: null,
  unsubscribe_detected_at: null,
  original_purchase_date: "2099-01-01T00:00:00Z",
  purchase_date: "2099-01-01T00:00:00Z",
  store: "app_store"
};

var entitlementData = {
  grace_period_expires_date: null,
  purchase_date: "2099-01-01T00:00:00Z",
  product_identifier: "com.locket.Locket.premium.yearly",
  expires_date: "2099-12-18T01:04:17Z"
};

if (obj.subscriber) {
  obj.subscriber.subscriptions["com.locket.Locket.premium.yearly"] = subscriptionData;
  obj.subscriber.entitlements["Gold"] = entitlementData;
  obj.subscriber.entitlements["gold"] = entitlementData;
  obj.subscriber.entitlements["pro"] = entitlementData;
}

$done({ body: JSON.stringify(obj) });