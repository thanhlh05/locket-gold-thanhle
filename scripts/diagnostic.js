// Simple Diagnostic for Locket Gold
const url = $request.url || "";

if (url.includes("locket-status.invalid") || url.includes("/status")) {
    const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Locket Gold Status</title>
<style>
body{font-family:-apple-system,BlinkMacSystemFont,sans-serif;background:#0f0f0f;color:#fff;padding:20px;line-height:1.6}
.card{background:#1c1c1e;border-radius:16px;padding:20px;margin-bottom:16px}
h1{color:#ffd60a;margin:0 0 10px}
.status{color:#30d158;font-weight:600}
.ok{color:#30d158}
</style>
</head>
<body>
<div class="card">
<h1>Locket Gold Status</h1>
<p class="status">Module đang hoạt động</p>
<p>Version: Final 3.0 by Thanh Lê</p>
<p>Force US: <span class="ok">ON</span></p>
<p>Badge Keeper: <span class="ok">ON</span></p>
<p>RevenueCat Multi-domain: <span class="ok">ON</span></p>
<p>Remote Config: <span class="ok">ON</span></p>
</div>
<div class="card">
<p>Nếu bạn thấy trang này → MITM + Script đang chạy tốt.</p>
<p>Kiểm tra Locket → Profile có badge vàng + video 60s.</p>
</div>
</body>
</html>`;
    $done({
        response: {
            status: 200,
            headers: { "Content-Type": "text/html; charset=utf-8" },
            body: html
        }
    });
} else {
    $done({});
}