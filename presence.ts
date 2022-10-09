const presence = new Presence({
	clientId: "1003670800089497680",
});

let poster = "";

presence.on("UpdateData", async () => {

	const presenceData: PresenceData = {
		largeImageKey: "logo",
	};

	if (document.location.href.includes("/vod/")) {
		let title = document.querySelector<HTMLSpanElement>("span[class^='AssetTitles__title']").textContent;
		let year = document.querySelector<HTMLUListElement>("ul[class^='VodDetails'] li").textContent;
		presenceData.largeImageKey = poster;
		presenceData.state = `${title} (${year})`;
		presenceData.buttons = [
			{
				label: "Παρακολούθηση",
				url: document.location.href,
			},
		];

		if (!document.querySelector("div[data-test='insys-player']")) {
			poster = document.querySelector<HTMLImageElement>("img[data-role='poster']").src;
			presenceData.details = "Περιήγηση...";
		} else {
			let video = document.querySelector<HTMLMediaElement>("div[data-test='insys-player'] video");
			
			[, presenceData.endTimestamp] = presence.getTimestampsfromMedia(video);
			//if (video.paused) delete presenceData.endTimestamp;
			presenceData.smallImageKey = video.paused ? "pause" : "play";
			presenceData.smallImageText = video.paused ? "Σε παύση" : "Αναπαραγωγή";
			presenceData.details = "Βλέπει";
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
  });
