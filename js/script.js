'use strict'

// methods for local storage
// localStorage.setItem('name', 'Rajnish Patel');
// localStorage.setItem('age', 30);
// localStorage.setItem('course', 'B.Tech');
// console.log(localStorage.getItem('name'));
// localStorage.clear();

// console.log(localStorage.getItem('name'));

//methods for session storage
// sessionStorage.setItem('name', 'Rajnish Patel');
// sessionStorage.setItem('age', 30);
// sessionStorage.setItem('course', 'B.Tech');
// console.log(localStorage.getItem('name'));
// localStorsessionlear();




let inputdata = document.getElementById('inputdata');
let addtaskbtn = document.getElementById('addtaskbtn');

// eventlistener on addtask

addtaskbtn.addEventListener('click', addTask);

//if we refresh the browser the data should be displayed
showTask();


function addTask() {

    if (inputdata.value == '') {
        alert("Please Enter a task");
        return;
    }

    else if (isFinite(inputdata.value)) {
        alert("Please don't enter a numeric value");
        // free up the input box
        inputdata.value = '';
        return;
    }
    // alert(inputdata.value);

    // localStorage.setItem('localstorage', JSON.stringify(inputdata.value)); //will not work ..single item is added only
    // first get the data from the local storage
    let storedtask = localStorage.getItem('localstorage');
    // alert(storedtask);
    let taskobj;
    if (storedtask == null) {
        // creaye an empty array
        taskobj = [];
    }

    else {
        // convert the json string into json array and push the data
        taskobj = JSON.parse(storedtask);
    }
    // taskobj.push(inputdata.value);// add  latest task to end of array
    taskobj.unshift(inputdata.value);  // add the latest added task to the top of the array
    // alert(taskobj);
    // now send the data to local storage in json string
    localStorage.setItem('localstorage', JSON.stringify(taskobj));

    // clear the input field
    inputdata.value = '';
    // after adding the task to local storage display the added task on web page also
    showTask();
}


function showTask() {

    // get all the task from local storage
    let storedtask = localStorage.getItem('localstorage');
    // alert(storedtask);
    if (storedtask == null) {
        return;
    }

    let taskobj = JSON.parse(storedtask);

    // just to avoid duplicate task 
    document.getElementById('taskdisplay').innerHTML = '';

    //showing the task in the web page
    for (let index = 0; index < taskobj.length; index++) {

        document.getElementById('taskdisplay').innerHTML += `<tr>
        <td>${index + 1}</td>
         <td>${taskobj[index]}</td>
         <td><button type="button" class="text-primary" onclick="editTask(${index})">Edit</button></td>
        <td><button type="button" class="text-danger" onclick="deleteTask(${index})">Delete</button></td>
      </tr>`;
    }
}

function editTask(index) {

    // alert(`index of edited task is: ${index}`);

    // hide the addtask button
    addtaskbtn.style.display = "none";

    //get the save task button i.e savetaskbtn
    let savetaskbtn = document.getElementById('savetaskbtn');

    //dispaly the save button
    savetaskbtn.style.display = "block";

    // now get data from local storage
    let storedtask = localStorage.getItem('localstorage');
    let taskobj = JSON.parse(storedtask);
    // alert(taskobj);

    // get the requird task to edit
    let edittask = taskobj[index];
    // alert(`the task which we want to edit is: ${edittask} and it's index is: ${index} `);
    // bring this edittask into input box
    inputdata.value = edittask;

    //  now use the hidden input tag used to save the index
    let saveindex = document.getElementById('saveindex');
    // now assign the index of the edited task to savindex
    saveindex.value = index;
    // alert(`saved index is: ${saveindex.value}`);



    // add event listener for save task button
    savetaskbtn.addEventListener('click', saveTask);

}

function saveTask() {

    // input task  validation
    if (inputdata.value == '') {
        alert("Please Enter a task");
        return;
    }

    else if (isFinite(inputdata.value)) {
        alert("Please don't enter a numeric value");
        // free up the input box
        inputdata.value = '';
        return;
    }

    // alert(`displaying the index of the task to be edited :${saveindex.value}`);
    // now get data from the local storage
    let storedtask = localStorage.getItem('localstorage');
    let taskobj = JSON.parse(storedtask);

    taskobj[saveindex.value] = inputdata.value;

    // alert(taskobj[saveindex.value]);

    // send the data back to the local storage
    localStorage.setItem('localstorage', JSON.stringify(taskobj));


    // clear the input field
    inputdata.value = '';
    // now display Add task button and hide save button

    // hide save button 
    savetaskbtn.style.display = "none";

    // display Add task button
    addtaskbtn.style.display = "block";

    // after adding the task to local storage display the added task on web page also
    showTask();
}




function deleteTask(index) {

    // alert(`getting the index of the task to be deleted  index is:${index}`);

    //before deleting the task confirm once again 

    let finaldelete = confirm("Have you completed the task?? want to delete??");

    if (finaldelete == true) {
        let storedtask = localStorage.getItem('localstorage');
        let taskobj = JSON.parse(storedtask);

        //no need to chech if storedtask is null
        // alert(taskobj);
        // alert(typeof storedtask); //object 

        //  delete the task with the help of index parameter
        taskobj.splice(index, 1); // return the deleted element  ...original array is changed
        // alert(taskobj); just checking if task is deleted

        // now send the taskobj  to the lolcal storage
        localStorage.setItem('localstorage', JSON.stringify(taskobj));

        //now call the showTask() function to show the remaining task 
        showTask();
    }

}

function deleteAllTask() {

    //check if data is present is present in the local storage 
    if (localStorage.getItem('localstorage') == null) {
        alert('nothing to delete');
        return;
    }

    let finaldelete = confirm("entire task will be deleted!! still want to delet all task??");
    if (finaldelete == true) {

        // delete entire local storage
        localStorage.clear();

        // refresh the page
        location.reload();
    }


}





