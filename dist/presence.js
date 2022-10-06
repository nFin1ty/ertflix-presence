const presence = new Presence({
    clientId: "1003670800089497680",
});
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "logo",
    };
    if (document.location.href.includes("/vod/")) {
        let poster = document.querySelector("img[data-role='poster']").src;
        let title = document.querySelector("span[class^='AssetTitles__title']").textContent;
        presenceData.largeImageKey = poster;
        presenceData.details = "Περιήγηση...";
        presenceData.state = title;
        presenceData.buttons = [
            {
                label: "Προβολή ταινίας",
                url: document.location.href,
            },
        ];
    }
    if (presenceData.details)
        presence.setActivity(presenceData);
    else
        presence.setActivity();
});
