/*****************************************************************
* check websites for http response
*****************************************************************/
 
function HTTPResponse( uri )
{
 /* source https://atulhost.com/how-to-pull-an-http-response-code-in-google-sheet */
 var response_code ;
try {
 response_code = UrlFetchApp .fetch( uri ) .getResponseCode() .toString() ;
 }
catch( error ) {
 response_code = error .toString() .match( / returned code (\d\d\d)\./ )[1] ;
 }
finally {
 return response_code ;
 }
}



/*****************************************************************
* Send an alert if somme http responses are not 200 OK
*****************************************************************/
function checkStatut() {
  
  /* source https://www.withoutthesarcasm.com/automating-google-spreadsheets-email-reminders/ */
  
  // get the spreadsheet object
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  // set the first sheet as active
  SpreadsheetApp.setActiveSheet(spreadsheet.getSheets()[0]);
  // fetch this sheet
  var sheet = spreadsheet.getActiveSheet();
   
  // figure out what the last row is
  var lastRow = sheet.getLastRow();
 
  // the rows are indexed starting at 1, and the second row
  // is the headers, so start with row 3
  var startRow = 3;
 
  // grab column 3 (the 'statut' column) 
  // getRange(row, column, numRows, numColumns)
  var range = sheet.getRange(startRow, 3,lastRow-startRow+1,1 );
  var numRows = range.getNumRows();
  var statut_values = range.getValues();
 
  // Now, grab the site name column (2)
  range = sheet.getRange(startRow, 2, lastRow-startRow+1, 1);
  var site_name_values = range.getValues();
  var warning_count = 0;
  var msg = "";
   
  // Loop over statut values
  //ajout de String(statut).length == 3 pour eviter des cellule pas terminé de se remplir par la premiere fonction .code erreur tjrs egale a 3 char du string (200, 403 etc..)
  for (var i = 0; i <= numRows - 1; i++) {
    var statut = statut_values[i][0];
    Logger.log(String(statut).length)
    if(statut != 200 && String(statut).length == 3) {
      var site_name = site_name_values[i][0];
       
      msg = msg + "Site : "+site_name+" ne fonctionne pas HTTP code "+statut+" .\n";
      warning_count++;
    }
  }
   
  if(warning_count) {
    MailApp.sendEmail("administrateur@quadra-informatique.fr", 
        "Des sites en panne", msg);
  }
};
