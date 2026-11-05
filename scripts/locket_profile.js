// Locket Profile & Badge Keeper - Final Strong Version
// Ép badge mạnh hơn, chống mất khi refresh / thoát app

const url = $request.url || "";
const method = $request.method || "";

function forceGoldBadge(obj) {
    if (!obj || typeof obj !== "object") return obj;

    // Ép trực tiếp trên object
    obj.profile_badge_visible = true;
    obj.has_gold = true;
    obj.is_gold = true;
    obj.gold = true;
    obj.isGold = true;
    obj.hasGold = true;

    // Ép trong user
    if (obj.user) {
        obj.user.profile_badge_visible = true;
        obj.user.has_gold = true;
        obj.user.is_gold = true;
        obj.user.gold = true;
        obj.user.isGold = true;
        obj.user.hasGold = true;

        if (obj.user.customAttributes) {
            obj.user.customAttributes.revenueCatEntitlements = ["Gold"];
            obj.user.customAttributes.entitlements = ["Gold"];
        } else {
            obj.user.customAttributes = {
                revenueCatEntitlements: ["Gold"],
                entitlements: ["Gold"]
            };
        }
    }

    // Ép trong data.user
    if (obj.data && obj.data.user) {
        obj.data.user.profile_badge_visible = true;
        obj.data.user.has_gold = true;
        obj.data.user.is_gold = true;
        obj.data.user.gold = true;
    }

    // Ép customAttributes gốc
    if (obj.customAttributes) {
        obj.customAttributes.revenueCatEntitlements = ["Gold"];
        obj.customAttributes.entitlements = ["Gold"];
    }

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