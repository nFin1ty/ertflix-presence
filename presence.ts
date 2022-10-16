const presence = new Presence({
	clientId: "1003670800089497680",
});

let poster = "";

presence.on("UpdateData", async () => {

	const presenceData: PresenceData = {
		largeImageKey: "logo",
	};

	if (document.location.href.includes("/vod/") || document.location.href.includes("/series/")) {
		let title = document.querySelector<HTMLSpanElement>("span[class^='AssetTitles__title']").textContent.trim();
		presenceData.largeImageKey = poster;
		if (document.location.href.includes("/vod/")) {
			let episodeText = document.querySelectorAll<HTMLLIElement>("ul[class^='VodDetails'] li")[2].textContent;
			let year = document.querySelector<HTMLLIElement>("ul[class^='VodDetails'] li").textContent;
			if (episodeText.includes("επεισόδιο")) {
				let episodeNumber = episodeText.split(" ")[1];
				presenceData.state = `${title} – Επεισόδιο ${episodeNumber} (${year})`;
			} else {
				presenceData.state = `${title} (${year})`;
			}
		} else {
			presenceData.state = title;
		}
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
