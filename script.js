let id='no';
//-------------clear data----------------
selectdata();
function clearAll(){
    localStorage.clear();
    
    window.location.reload()

}
//-------------- manage data--------------
function managedata(){
    document.getElementById('msg').innerHTML='';
    let name=document.getElementById('name').value;
    if(name==''){
        Toastify({
            text: "Please Enter proper Data",
            position:"center"
          }).showToast();
  }
    else{
        if(id=='no'){
            let arr=new Array();
             arr=getcruddata();
            if(arr==null){
                let data=[name];
               setcruddata(data);
                }
            else{
                  arr.push(name); 
                   setcruddata(arr); 
                 }
                 Toastify({
                    text: "New Content is Added",
                    className:"danger",
                    position:"center"
                  }).showToast();
         } 
     else{
     let arr=getcruddata();
      arr[id]=name; 
      setcruddata(arr);
      Toastify({
        text: "Data Updated Succesfully",
        className:"danger",
        position:"center"
      }).showToast();
        id='no'
    }
    document.getElementById('name').value=""
selectdata();
}
document.getElementById('name').focus();
}
//-----------select data--------------
function selectdata(){
    arr=getcruddata();
      if(arr!=null){
        let html="";
        let sno=1;
        for(let k in arr){
            html=html+`<tr>
            <td>${sno}</td>
            <td class="nm">${arr[k]}</td>
            <td ><button class="btn btn-outline-success" onclick="editdata(${k})"><i class="material-icons">border_color</i></button></td>
            <td ><button class="btn btn-outline-danger"  onclick="deletedata(${k})"><i class="material-icons">delete</i></button></td>
            </tr>`
            sno++
        }
        document.getElementById("root").innerHTML=tableopen+html+tableclose;
    }
}
//--------------- delete data ---------------
function deletedata(rid){
    let arr=getcruddata();
    arr.splice(rid,1);
    setcruddata(arr);
    selectdata();
}
//------------------ edit data ---------------
function editdata(rid){
    id=rid;
    let arr=getcruddata();
    document.getElementById("name").value=arr[rid];

}
//------------ get data --------------------
function getcruddata(){
    arr=JSON.parse(localStorage.getItem('curd'));
    return arr;
}
//------------ set data ----------------------
function setcruddata(arr){
    localStorage.setItem('curd',JSON.stringify(arr));  

}



var tableopen=`  <table border class='table table-border'>
<thead>
    <tr>
        <th>S.No</th>
        <th>This is Your notes...</th>
        <th colspan="2">Action</th>
    </tr>
</thead>`


var tableclose=`
<tr>
<td colspan='4' align='center'>
<input type="button" class="form-control btn btn-danger" value="Clear All" onclick="clearAll()"/>
</td>
</tr>
</table>`
