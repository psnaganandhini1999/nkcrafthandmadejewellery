function getUserAgentJSON(agent) {
    let obj = {
        device: "unknown",
        deviceType: "unknown",
        browser: "unknown",
        version: "unknown",
        os: "unknown",
        osType: "unknown"
    };

    if (!agent) {
        return obj;
    }

    obj["device"] = agent.isMobile ? "mobile" : agent.isTablet ? "tablet" : agent.isSmartTV ? "smart-tv" : agent.isBot ? "bot" : "desktop";
    if (obj["device"] === "desktop") {
        obj["deviceType"] = "desktop";
    }
    else if (obj["device"] === "mobile") {
        obj["deviceType"] = agent.isAndroid ? "android" : agent.isiPhone ? "iphone" : agent.isiPad ? "ipad" : agent.isBlackberry ? "blackberry" : "mobile";
    }
    else if (obj["device"] === "tablet") {
        obj["deviceType"] = agent.isiPad ? "ipad" : agent.isAndroid ? "android-tablet" : "tablet";
    }
    else if (obj["device"] === "smart-tv") {
        obj["deviceType"] = "smart-tv";
    }
    else if (obj["device"] === "bot") {
        obj["deviceType"] = "bot";
    }

    obj["browser"] = agent.browser.toLowerCase();
    obj["version"] = agent.version === "unknown" ? null : agent.version;
    obj["os"] = agent.os;

    return obj;
}


const restrictBots = (options = { allowSearchEngines: true }) => {
    return (req, res, next) => {
        // express-useragent automatically evaluates and sets the isBot boolean flag
        if (!req.useragent || !req.headers['user-agent']) {
            // If the user-agent is missing, log it for security monitoring
            // console.warn(`[SECURITY WARNING] Missing user-agent header for request to ${req.url}`);
            return res.status(403).json({
                status: 403,
                error: 'Forbidden',
                message: 'Automated script or bot access is restricted on this endpoint.'
            })
        }

        if (req.useragent.isBot) {
            // List of safe, official search crawler identifiers
            const userAgentString = (req.headers['user-agent'] || '').toLowerCase();
            const safeBots = ['googlebot', 'bingbot', 'yandexbot', 'baiduspider'];

            if (!options.allowSearchEngines) {
                // Log the bot attempt for your security monitoring files
                // console.warn(`[SECURITY WARNING] Bot detected: ${req.useragent.source} trying to access ${req.url}`);

                // Instantly block and return a low-bandwidth 403 Forbidden payload
                return res.status(403).json({
                    status: 403,
                    error: 'Forbidden',
                    message: 'Automated script or bot access is restricted on this endpoint.'
                });
            }

            // Verify if the current user-agent contains any of our whitelisted keywords
            const isSafeBot = safeBots.some(bot => userAgentString.includes(bot));

            if (!isSafeBot) {
                // Log the safe crawler visit for your analytics and audit files
                return res.status(403).json({
                    status: 403,
                    error: 'Forbidden',
                    message: 'Automated script or bot access is restricted on this endpoint.'
                });
            }

            // console.log(`[INFO] Allowed verified search engine crawler: ${req.useragent.source}`);
            // Let Googlebot/Bingbot pass through safely
        }
        // If it's a real browser user, move to the next handler smoothly
        req.agentInfo = getUserAgentJSON(req.useragent);
        return next();
    };
};

module.exports = restrictBots;