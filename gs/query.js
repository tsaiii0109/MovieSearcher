const sheet =SpreadsheetApp.getActive();
function doGet(){
  var data = sheet.getRange('A1').getValue();
  return ContentService.createTextOutput(data).setMimeType(ContentService.MimeType.JSON);
}
function query(){
  var option={
      channelId: "UCyNixargb5VhzNV2URJRubA",
      maxResults: 50,
      order: "date",
      publishedAfter: getTime(),
  }
  const results =YouTube.Search.list('id,snippet',option);
  sheet.getRange('A1').setValue(JSON.stringify(results));
}
function getTime(){
  return new Date(new Date().getTime()-1000*86400*21).toISOString();
}