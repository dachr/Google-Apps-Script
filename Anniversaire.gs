var names =new Array();
var surname =new Array();
var j 
var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet(); 
var champ = sheet.getDataRange().getValues(); 


var day = Utilities.formatDate(new Date(), "GMT+1", "dd")
var month = Utilities.formatDate(new Date(), "GMT+1", "MM")

  
function anniv(){

  for (var i = 0; i < 12; i++) {
   
        console.log(champ[i][2])
        console.log(champ[i][3])
        if(champ[i][2] == day && champ[i][3] == month ){
        j = i
        sendEmail()
        }
        
     }
}


function sendEmail() {
 
 
  
  GmailApp.sendEmail('toto@gmail.com','Date Anniversaire','C EST L ANNIVERSAIRE DE '+
  champ[j][0] + ' ' + champ[j][1])
  GmailApp.sendEmail('titi@gmail.com','Date Anniversaire','C EST L ANNIVERSAIRE DE '+
  champ[j][0] + ' ' + champ[j][1])
  } ;
  