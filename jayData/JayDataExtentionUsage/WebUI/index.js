window.WebUI = window.WebUI || {};

$(function() {
    // Uncomment the line below to disable platform-specific look and feel and to use the Generic theme for all devices
    DevExpress.devices.current({ platform: "generic" });

    WebUI.app = new DevExpress.framework.html.HtmlApplication({
        namespace: WebUI,
        navigationType: WebUI.config.navigationType,
        navigation: WebUI.config.navigation
    });
    WebUI.app.router.register(":view/:id", { view: "about", id: undefined });
    WebUI.app.navigate();
});
