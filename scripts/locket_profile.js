// Locket Profile & Badge Keeper
// Giữ huy hiệu Gold luôn hiển thị, chống mất badge khi app refresh

const url = $request.url || "";
const method = $request.method || "";

// ===== REQUEST: changeProfileInfo =====
if (url.includes("changeProfileInfo") && method === "POST") {
    try {
        let body = typeof $request.body === "string" ? JSON.parse($request.body) : ($request.body || {});
                
        // Ép badge / gold related fields nếu có
        if (body) {
            body.profile_badge_visible = true;
            body.has_gold = true;
            body.is_gold = true;
            // một số key khác app có thể dùng
            if (body.customAttributes) {
                body.customAttributes.revenueCatEntitlements = ["Gold"];
            }
        }
        $done({ body: JSON.stringify(body) });
    } catch (e) {
        $done({});
    }
}

// ===== RESPONSE: mọi response từ api.locketcamera.com =====
else if ($response && $response.body) {
    try {
        let obj = JSON.parse($response.body);

        // Ép các field liên quan đến Gold / badge
        if (obj) {
            // Thường gặp trong user info / me
            if (obj.user) {
                obj.user.profile_badge_visible = true;
                obj.user.has_gold = true;
                obj.user.is_gold = true;
            }
            if (obj.data && obj.data.user) {
                obj.data.user.profile_badge_visible = true;
                obj.data.user.has_gold = true;
                obj.data.user.is_gold = true;
            }
            // Một số response trả về trực tiếp
            obj.profile_badge_visible = true;
            obj.has_gold = true;
            obj.is_gold = true;

            // Custom attributes (RevenueCat style)
            if (obj.customAttributes) {
                obj.customAttributes.revenueCatEntitlements = ["Gold"];
            } else if (obj.user && obj.user.customAttributes) {
                obj.user.customAttributes.revenueCatEntitlements = ["Gold"];
            }
        }

        $done({ body: JSON.stringify(obj) });
    } catch (e) {
        $done({});
    }
} else {
    $done({});
}