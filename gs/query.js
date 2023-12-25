const sheet =SpreadsheetApp.getActive().getSheetByName('main');
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
  sheet.getRange("A2:C"+(sheet.getLastRow()+1)).clear();
  var obj = results.items;
  for(var i=0;i<obj.length;i++){
    var snippet =obj[i]['snippet']
    sheet.appendRow([snippet['title'],snippet['description'],snippet['publishTime']])
  }
}