// Locket Profile & Badge Keeper - Final Strong Version
// Ép badge mạnh hơn, chống mất khi refresh / thoát app

const url = $request.url || "";
const method = $request.method || "";

function forceGoldBadge(obj) {
    if (!obj || typeof obj !== "object") return obj;

    const force = (target) => {
        if (!target || typeof target !== "object") return;
        target.profile_badge_visible = true;
        target.has_gold = true;
        target.is_gold = true;
        target.gold = true;
        target.isGold = true;
        target.hasGold = true;
        target.badge = "gold";
        target.profileBadge = "gold";
        target.subscription_status = "active";
        target.premium = true;
        target.is_premium = true;

        if (target.customAttributes) {
            target.customAttributes.revenueCatEntitlements = ["Gold"];
            target.customAttributes.entitlements = ["Gold"];
            target.customAttributes.has_gold = true;
        } else {
            target.customAttributes = {
                revenueCatEntitlements: ["Gold"],
                entitlements: ["Gold"],
                has_gold: true
            };
        }
    };

    force(obj);
    if (obj.user) force(obj.user);
    if (obj.data && obj.data.user) force(obj.data.user);
    if (obj.data) force(obj.data);

    return obj;
}

// ===== REQUEST: changeProfileInfo =====
if (url.includes("changeProfileInfo") && method === "POST") {
    try {
        let body = typeof $request.body === "string" ? JSON.parse($request.body) : ($request.body || {});
        body = forceGoldBadge(body);
        $done({ body: JSON.stringify(body) });
    } catch (e) {
        $done({});
    }
}

// ===== RESPONSE: mọi response từ api.locketcamera.com =====
else if ($response && $response.body) {
    try {
        let obj = JSON.parse($response.body);
        obj = forceGoldBadge(obj);
        $done({ body: JSON.stringify(obj) });
    } catch (e) {
        $done({});
    }
} else {
    $done({});
}