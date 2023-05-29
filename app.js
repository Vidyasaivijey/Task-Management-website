import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-analytics.js";
import {getDatabase,ref,set,onValue,remove} from"https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";
const firebaseConfig = {
  apiKey: "AIzaSyCVJ_wlNEZNaqcsCIEBNB0H_wtnyjVKhrg",
  authDomain: "task-manager-c1759.firebaseapp.com",
  databaseURL: "https://task-manager-c1759-default-rtdb.firebaseio.com",
  projectId: "task-manager-c1759",
  storageBucket: "task-manager-c1759.appspot.com",
  messagingSenderId: "1068307960212",
  appId: "1:1068307960212:web:301c9ffdc000511bafff81",
  measurementId: "G-F4MKBBZ0V4"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db=getDatabase(app);
const dbm=ref(db,'/');
document.addEventListener("DOMContentLoaded",()=>{

  onValue(dbm, (snapshot) => {
  var ggg=document.getElementById("cont");
  ggg.innerHTML=' ';
    snapshot.forEach((childSnapshot) => {
      const childKey = childSnapshot.key;
      const childData = childSnapshot.val();
      if (childData.status=="true")
      {
      console.log(childKey+"   "+childData.status);
      var ser=document.createElement('div');
      ser.id="cmplted";
      ser.innerHTML='<center>'+'<p style="font-size:23px">'+childData.title+'</p>'+" <br> "+childData.sub+" <br> <br>Due Date:<br>"+childData.date+'</center>';
      ser.setAttribute('style','position:relative;height:250px;width:240px;margin-top:5px;background-color: rgb(255,255,255)');
      ggg.append(ser);
      }
    });
  });
});
document.addEventListener("click",(ev)=>
{
    var dme=document.getElementById("hamburger");
    var de=document.getElementById("itms"); 
    var v=ev.target;
    if (v==dme)
             de.setAttribute('style',"display:block");    
    else
             de.setAttribute('style',"display:none");
});