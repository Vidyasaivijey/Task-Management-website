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
var bt=document.querySelector(".btn");
bt.addEventListener('click',register);

document.addEventListener("DOMContentLoaded",()=>{
   var g=document.querySelector(".container4");
   g.innerHTML=' ';
   var dbm=ref(db,'/');
    onValue(dbm, (snapshot) => {
        // document.body.innerHTML=" ";
          snapshot.forEach((childSnapshot) => {
            const childKey = childSnapshot.key;
            const childData = childSnapshot.val();
            var nt=document.createElement('div');
            var ec=document.createElement('div');
            ec.setAttribute("style","position:absolute;height:250px;width:240px;background-color: rgb(255,255,255);margin-top:3px;margin-left:5px;border-radius:5px;color:black");
             ec.innerHTML='<center>'+'<p style="font-size:23px">'+childData.title+'</p>'+" <br> "+childData.sub+" <br> <br>Due Date:<br>"+childData.date+'</center>';
            nt.setAttribute("style","color:white");
            nt.className="cnt";
            nt.id="ct";
            var btt=document.createElement('button');
            var ebt=document.createElement('button');
            ebt.setAttribute('style',"background-color:blue");
            ebt.innerHTML='<i class="material-icons">edit</i>';
            ebt.setAttribute('style',"position:absolute;margin-top:280px;margin-left:110px;border-radius:100%");
            ebt.addEventListener("click",()=>{
                ec.innerHTML='<textarea id ="nti" rows="2" style="border-radius: 3px;font-family:Arial;font-size: 15px;margin-left:3px;margin-top:3px;width:220px" >'+childData.title+'</textarea>'
               +'<textarea id="nsub" rows="5" style="border-radius: 3px;font-family:Arial;font-size: 15px;margin-left:3px;margin-top:33px;width:220px" >'+childData.sub+'</textarea>'+
               '<input type="date" id ="deadl" class="dte"  style="padding-right:15px ;width:205px;font-family:Arial;margin-left:3px;margin-top:10px" value=childData.date>'
               +
               '<center><button id ="done" class="back" style="margin-top:15px">done</button></center>'
              
                var fff=document.getElementById("done");
                fff.addEventListener("click",()=>{
                    var val=document.getElementById("nsub").value;
                    var val2=document.getElementById("nti").value;
                    console.log(val);
                    var ns=ref(db,childData.id+"/sub");
                    set(ns,val);
                    var ntit=ref(db,childData.id+"/title");
                    set(ntit,val2);
                    window.location.reload();
                    });
            });
            var dne=document.createElement('input');
            dne.id="chk";
            dne.className="done";
            
            dne.setAttribute('style',"position:absolute;margin-top:285px;margin-left:210px;border-radius:100%");
            if (childData.status=="true")
            dne.checked=true;
            else
            dne.checked=false;
            var status=dne.checked;
            dne.addEventListener("click",()=>{
                var sts=dne.checked;
                var rrf=ref(db,childData.id+"/status");
                if(sts)
                set(rrf,"true");
                else
                set(rrf,"false")
                window.location.reload();
                return;
            });
            dne.setAttribute('type',"checkbox");
            btt.id="rmv";
            btt.className="del";
            btt.setAttribute('style',"position:absolute;margin-top:280px;margin-left:10px;border-radius:100%");
            btt.innerHTML='<i class="material-icons">delete</i>';
            nt.append(btt);
            nt.append(dne);
            nt.append(ec);
            nt.append(ebt);
            var mc=document.getElementById("m2"); 
            mc.append(nt);
            btt.addEventListener("click",()=>{
                alert("sure?");
                btt.parentNode.remove();
                // console.log("deleted :"+uid);
                var ip=ref(db,childData.id);
                remove(ip);
                window.location.reload();
                return;
            });
          });
        });



});
function register()
{
    var t=document.querySelector(".ttl").value;
    var m=document.querySelector(".mainc").value;
    var d=document.querySelector(".dte").value;
    var uid=Math.random().toString(16).substring(7);// toString for base conversion for generating uid for each task
    var tsk={
        title:t,
        sub:m,
        date:d,
        id:uid,
        status:"false"
    }
    // console.log("created :"+uid);
    set(ref(db,uid),tsk);
    window.location.reload();
}
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
console.log("---");

