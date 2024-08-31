function generateVastXml(config, queryParams) {
  const baseUrl = `http://${config.HOST}:${config.PORT}`;
  const queryString = new URLSearchParams(queryParams).toString();

  function createTrackingUrl(event) {
    if (queryString) {
      return `${baseUrl}/${event}?${queryString}`;
    } else {
      return `${baseUrl}/?${event}`;
    }
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<VAST version="4.1" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.iab.com/VAST">
  <Ad id="1" adType="video">
    <InLine>
      <AdSystem version="1">Debug</AdSystem>
      <AdTitle>Vast Linear</AdTitle>
      <Creatives>
        <Creative sequence="1" id="1">
          <UniversalAdId idRegistry="Ad-ID">1</UniversalAdId>
          <Linear>
            <Duration>${config.MEDIA_FILE.duration}</Duration>
            <MediaFiles>
              <MediaFile id="1" delivery="progressive" type="video/mp4" width="${config.MEDIA_FILE.width}" height="${config.MEDIA_FILE.height}" scalable="1" maintainAspectRatio="1"><![CDATA[${config.MEDIA_FILE.url}]]></MediaFile>
            </MediaFiles>
            <VideoClicks>
              <ClickThrough id="1"><![CDATA[${config.URL_DEST}]]></ClickThrough>
              <ClickTracking><![CDATA[${createTrackingUrl(config.EVENT_PARAMS.clickTracking)}]]></ClickTracking>
            </VideoClicks>
            <TrackingEvents>
              ${Object.entries(config.EVENTS)
                .map(
                  ([event, param]) =>
                    `<Tracking event="${event}"><![CDATA[${createTrackingUrl(param)}]]></Tracking>`,
                )
                .join('\n              ')}
            </TrackingEvents>
          </Linear>
        </Creative>
      </Creatives>
      <Extensions>
      </Extensions>
      <Impression id=""><![CDATA[${createTrackingUrl(config.EVENT_PARAMS.impression)}]]></Impression>
      <ViewableImpression id="">
        <Viewable><![CDATA[${createTrackingUrl(config.EVENT_PARAMS.viewableImpression)}]]></Viewable>
      </ViewableImpression>
    </InLine>
  </Ad>
</VAST>`;
}

module.exports = { generateVastXml };
