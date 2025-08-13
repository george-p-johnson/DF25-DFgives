function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);

  // Clear old data (except header)
  sheet.getRange(2, 1, sheet.getLastRow() - 1, 2).clearContent();

  // Write new data
  var newData = data.map(entry => [entry.name, entry.score]);
  if (newData.length > 0) {
    sheet.getRange(2, 1, newData.length, 2).setValues(newData);
  }

  return ContentService.createTextOutput(JSON.stringify({status: 'success', data: newData}))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getRange(2, 1, sheet.getLastRow() - 1, 2).getValues();
  var entries = data.map(row => ({ name: row[0], score: row[1] }));
  return ContentService.createTextOutput(JSON.stringify(entries))
    .setMimeType(ContentService.MimeType.JSON);
}