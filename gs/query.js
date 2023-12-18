const sheet =SpreadsheetApp.getActive().getSheetByName('main');
const listSheet =SpreadsheetApp.getActive().getSheetByName('list');
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
  setList(results);
}
function getTime(){
  return new Date(new Date().getTime()-1000*86400*21).toISOString();
}
function setList(results){
  listSheet.getDataRange().clear();
  var str = sheet.getRange('A1').getValue();
  var obj = results.items;
  for(var i=0;i<obj.length;i++){
    var snippet =obj[i]['snippet']
    listSheet.appendRow([snippet['title'],snippet['description'],snippet['publishTime']])
  }
}