const presence = new Presence({
	clientId: "1003670800089497680",
});

presence.on("UpdateData", async () => {

	const presenceData: PresenceData = {
		largeImageKey: "logo",
	};

	if (document.location.href.includes("/vod/")) {
		let poster = document.querySelector<HTMLImageElement>("img[data-role='poster']").src;
		let title = document.querySelector<HTMLSpanElement>("span[class^='AssetTitles__title']").textContent;
		presenceData.largeImageKey = poster;
		presenceData.details = "Περιήγηση...";
		presenceData.state = title;
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
  });