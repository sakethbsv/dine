/*

Add all To-do's here:

Saketh:
1. Add a timeout to sync data every hour for the timebeing
2. Remove redundant data being stored
3. Keep the database storage space to minimum, and not overuse it
4. Help pavan with some of the front-end wrk.
5. Add even seated time stamp to the database when you are making seated value true for a guest while syncing.
6. Change add.php such that even time of adding is sent to it, not created dynamically since we have no idea when the data is syncing.

Pavan:
1. Waiting time when exceeding quoted time turns red.
2. Present the data which is shown on addition of a guest in an alert box with proper UI. Make sure when you present the above thing, you
take the diner's number of visits from the received data, decide his status and put up an appropriate color in the status box. Also, use this 
data to show a popup which says this guy deserves a free mocktail (when fr eg. u realize he has visited for the 5th time). This is customizable based
on needs of the restaurant.
3. Improve UI of login page (login.php), add a link to log out page on index.php (logout.php).
4. On click of a customer's name, make his details appear on screen so that the restaurant people can check the number and name and call him up. Saketh will add
the ability to check his past visits also on click later.
5. Add the meta data that allows pinning the app to home screen of ipad.
6. Check if all animations, transitions etc are smooth on ipad. Also check for accessibility of all options.

Avinash:
Create an analytics page that offers analytics week;y/monthly for various stats and stuff.
Get the 6 months code from aditya and use

Bracket, Avinash:
BizApark enrollment
B-Plan creation for competitions

Bracket + any 1 of the rest acc to who is free:
Meet cream center, mainland china guy and convince them with starting the trial.

*/

//toSync array is to keep track of guest added to list but not synced to cloud.
//seatedToSync array is to keep track of guest who are seated. Presently redundant with guests-seated array created by pavan

Date.prototype.toHHMM = function() {
    var hours = (this.getHours() > 12) ? (this.getHours() - 12) : this.getHours();
    var minutes = this.getMinutes();
    var ampm = (this.getHours() >= 12) ? 'PM' : 'AM';

    hours = (hours >= 10) ? hours + '' : '0' + hours;
    minutes = (minutes >= 10) ? minutes + '' : '0' + minutes;

    var dateString = hours + ':' + minutes + ' ' + ampm;

    return dateString;
}

var toSync = [];
var seatedToSync = [];
toSync = localStorage.getItem('toSyncArray');
toSync = toSync ? toSync.split(',') : [];
console.log(toSync + " toSyncArrayfromlocalDB");
seatedToSync = localStorage.getItem('seatedToSyncArray');
seatedToSync = seatedToSync ? seatedToSync.split(',') : [];
console.log(seatedToSync + " seatedToSyncArrayfromlocalDB");

function Notify(notifNum) {

    console.log(notifNum);
    //https://control.msg91.com/api/sendhttp.php?authkey=65373Aur7ub23VBi533913dd&mobiles=9840346380&message=Your%20table%20is%20now%20ready&sender=DINEIN&route=4  

    $.ajax({ //create an ajax request to notify.php to send message to the guest
        type: "POST",
        url: "notify.php",
        data: {
            number: notifNum
        },
        dataType: "html", //expect html to be returned                
        success: function(response) {
            console.log("Response for msg sending" + response);

        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {

            console.log("Ajax cup for senging msg");
            console.log("ajax exception");

        }
    });
}


function Seat(num1, date1, d) {
    //Basically pushes to seatedToSync to sync to db later abt person being seated.
    console.log(num1, date1);
    console.log("pushing to seated-to-sync from success function " + d);
    seatedToSync.push("guest-" + d);
    localStorage.setItem('seatedToSyncArray', seatedToSync.join(','));
}

function Sync() {
    alert("Syncing");
    if (toSync.length == 0) {
        console.log("Database is synced on cloud completely");
    } else {
        console.log("Database will now sync. Please make sure of internet connection.");
        //Goes thru each item in toSync array and syncs with cloud
        for (var z = 0; z < toSync.length; z++) {
            var datarow = localStorage.getItem(toSync[z]).split(",");
            //console.log(datarow[2]);
            $.ajax({ //create an ajax request to add.php to add a new guest to the diner_tbl1 table
                type: "POST",
                url: "add.php",
                data: {
                    name: datarow[0],
                    number: datarow[1],
                    time: datarow[2],
                    size: datarow[3],
                    comment: datarow[4],
                    restaurant: username
                },
                dataType: "html", //expect html to be returned                
                success: function(response) {
                    console.log("Response" + response);
                    if (response == "success") {
                        //sync = true;
                        console.log("ajax success");
                        var index = toSync.indexOf(localStorage.key(z));
                        toSync.splice(index, 1);
                        localStorage.setItem(
                            'toSyncArray', toSync.join(',')
                        );
                    } else {
                        console.log(response + "ajax response");

                    }
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {

                    console.log("Ajax cup");
                    console.log("ajax exception");

                }
            });

        }
    }
    if (seatedToSync.length == 0) {
        console.log("Seated Database is synced on cloud completely");
    } else {
        console.log("Seated Database will now sync. Please make sure of internet connection.");
        //Changes seated value to true for each guest loggen in seatedToSync array
        for (var z = 0; z < seatedToSync.length; z++) {
            var datarow = localStorage.getItem(seatedToSync[z]).split(",");
            var guestnum = z;
            console.log(datarow[1], datarow[6], username);
            $.ajax({ //create an ajax request to update.php to change seated to true in cloud
                type: "POST",
                url: "update.php",
                data: {
                    number: datarow[1],
                    date: datarow[6],
                    restaurant: username
                },
                dataType: "html", //expect html to be returned                
                success: function(response) {
                    console.log("Response" + response);
                    if (response == "success") {
                        //sync = true;
                        console.log("ajax success toseat");
                        console.log(z);
                        console.log(localStorage.key(guestnum));
                        var index = seatedToSync.indexOf(localStorage.key(guestnum));
                        console.log(index);
                        console.log(seatedToSync.length);
                        seatedToSync.splice(index, 1);
                        console.log(seatedToSync.length);
                        localStorage.setItem(
                            'seatedToSyncArray', seatedToSync.join(',')
                        );
                        localStorage.removeItem(localStorage.key(guestnum));

                    } else {
                        console.log(response + "ajax response");

                    }
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {

                    console.log("Ajax cup");
                    console.log("ajax exception");

                }
            });




        }
    }
}
/*$(document).ready(function() {*/


console.log("ready!");
var i = Number(localStorage.getItem('guest-counter')) + 1,
    j = 0,
    k,
    $form = $('#party-form'), // The form to enter a new party information
    $itemTable = $('#waitlist-table'), // The waitlist
    $editable = $('.editable'), // No clue
    $clearAll = $('#clear-all'), // No clear all button!!
    $comment = $('#party-notes'), // Form element - comment
    $name = $('#party-name'), // Form element - name
    $no = $('#party-phone'), // Form element - number
    $size = $('#party-size'), // Form element - size
    $time = $('#party-wait-time'), // Form element - time
    order = [], // Order of the parties
    data,
    dataRow,
    data1,
    orderList;


// Analytics elements
$totalSeated = $('#total-seated');
$totalWaiting = $('#total-waiting');
$avgWaitCat1 = $('#wait-cat-1');
$avgWaitCat2 = $('#wait-cat-2');
$avgWaitCat3 = $('#wait-cat-3');

// Load guest list
orderList = localStorage.getItem('guest-orders');
console.log(orderList);
orderList = orderList ? orderList.split(',') : [];

for (j = 0, k = orderList.length; j < k; j++) {
    console.log(localStorage.getItem(orderList[j]));
    data = localStorage.getItem(orderList[j]).split(',');

    var arrivedDate = new Date(data[5])

    var CurrentDate = new Date();
    var hours = CurrentDate.getHours();
    var minutes = CurrentDate.getMinutes();

    var arrivedTime = arrivedDate;
    var currentTime = new Date();

    var waitedTime = parseInt(((currentTime.getTime() - arrivedTime.getTime()) / 1000 / 60)) // In minutes

    waitedTime = (waitedTime >= 60) ?
        (parseInt(waitedTime / 60) + 'hr ' + waitedTime % 60 + 'mins') :
        (waitedTime + 'mins'); // In standard format 2hr 30mins 



    // Generating the string for the arrrived time
    var arrivedDateString = arrivedDate.toHHMM();

    dataRow = data;

    var toAppendHTMLString = '';
    toAppendHTMLString = " <tr id='" + orderList[j] + "'>" + // adding the id for the table row
    "<td>" + 'status' + "</td>" + // html for the status column
    "<td>" + dataRow[3] + "</td>" + // size of the party
    "<td>" + dataRow[0] + "</td>" + // name of the party
    "<td>" + arrivedDateString + "</td>" + // arrival time of the party
    "<td>" + dataRow[2] + "</td>" + // quoted time of the party
    "<td class=\"waited\">" + waitedTime + "</td>" + // waiting time. Initially 0:0
    "<td><a class='notify' href='#'>Notify</a></td>" + // notify button
    "<td><a class='seat' href='#'>Seat</a></td>" + // seat button
    //"<td>" + dataRow[4] + "</td>" +                   // comments
    "<td><a class='remove' href='#'>X</a></td></tr>";


    // Logic for checking if the day has changed to another day i.e if its a new and the local storage has to cleared.
    // This has to be accompanied by uploading all the contents of the local storage into the database.
    var isNewDay = ((CurrentDate.getDate() != arrivedDate.getDate()) && (CurrentDate.getTime() > arrivedDate.getTime())) ? 1 : 0;


    // If its a new day upload to server and clear the appendHTMLString

    // Sync to server code
    // If failed try again after some time and store all this in some other form of local storage not interrupting the current one

    // Sync code come here
    // toAppendHTMLString = isNewDay ? '' : toAppendHTMLString;

    $itemTable.children('tbody').append(toAppendHTMLString);

}

//Sync();

// Add guest
$form.submit(function(e) {
    e.preventDefault();
    $.publish('/add/', []);
    console.log('submit button pressed');
});


// On clicking the remove button in the table for a party
$itemTable.delegate('.remove', 'click', function(e) {
    var $this = $(this);
    e.preventDefault();
    $.publish('/remove/', [$this, "table"]);
});

// On clicking the notify button in the table for a party
$itemTable.delegate('.notify', 'click', function(e) {
    var $this = $(this);
    e.preventDefault();
    var notifyId = $(this).parent().parent().attr('id');
    console.log(notifyId + 'notifying');
    var data2 = localStorage.getItem(notifyId).split(',');
    //  Notify(data2[1]);
});


// On clicking the seat button in the table for a party

// We store all the seated people in a localStorage key called guests-seated. Delimiter used is ||
$itemTable.delegate('.seat', 'click', function(e) {
    var $this = $(this);
    e.preventDefault();
    var Id = $(this).parent().parent().attr('id');
    console.log(Id + 'seating');
    var d = Id.split('-')[1];

    // Saketh sync part
    var dataRowArray = localStorage.getItem(Id).split(',');
    Seat(dataRowArray[1], dataRowArray[6], d);

    var curGuestId = Id;
    var guestsSeated = localStorage.getItem('guests-seated');
    guestsSeated = guestsSeated ? guestsSeated + ',' + curGuestId : curGuestId;

    localStorage.setItem('guests-seated', guestsSeated);

    $this.parent().parent().fadeOut(function() {
        $this.parent().parent().remove();
        $.publish('/regenerate-list/', []);
        $.publish('/regenerate-stats/', []);
    });

    // Appending the seating time to local Storage
    var currentTime = new Date()
    var seatedGuestInfo = localStorage.getItem(curGuestId);
    seatedGuestInfo += ',' + currentTime.toString();

    localStorage.setItem(curGuestId, seatedGuestInfo);
});



// Clear all
$clearAll.click(function(e) {
    e.preventDefault();
    $.publish('/clear-all/', []);
});



// Subscribes
$.subscribe('/add/', function() {
    i = Number(localStorage.getItem('guest-counter'));
    console.log('element added');

    if ($comment.val() == "") {
        console.log('the comment section is Empty');
    }

    if ($comment.val() != "") {
        // Take the value of the input field and save it to localStorage
        var d = new Date();
        var $now = d.getHours() + ":" + d.getMinutes();
        var $date = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate()

        //localStorage.setItem(
        //    "guest-" + i, $name.val() + "," + $no.val() + "," + $time.val() + "," + $size.val() + "," + $comment.val() + "," + $now + "," + $date
        //);
        localStorage.setItem("guest-" + i, $name.val() + "," +
            $no.val() + "," + $time.val() + "," + $size.val() + "," + $comment.val() + "," + d.toString() + "," + $date);

        // Set the to-do max counter so on page refresh it keeps going up instead of reset
        localStorage.setItem('guest-counter', i);

        //Getting previous visits
        $.ajax({ //create an ajax request to load_page.php
            type: "POST",
            url: "check.php",
            data: {
                number: $no.val(),
                restaurant: username
            },
            dataType: "html", //expect html to be returned                
            success: function(response) {
                //console.log("Response" + response);
                console.log('Previous Visits');

                alert(response + "Response for prev visits");
            },

            error: function(XMLHttpRequest, textStatus, errorThrown) {

                console.log("net cup and not ajax cup");
                console.log("ajax exception" + textStatus + errorThrown);
                console.log("Unable to get previous visits");

            }

        });

        console.log("pushing to to-sync from success function " + i);
        toSync.push("guest-" + i);
        localStorage.setItem('toSyncArray', toSync.join(','));


        // Append a new list item with the value of the new guest list
        dataRow = localStorage.getItem("guest-" + i).split(',');

        var arrivedDate = new Date(dataRow[5]);
        var arrivedDateString = arrivedDate.toHHMM();



        console.log("adding table entry")

        var toAppendHTMLString = '';
        toAppendHTMLString = "<tr id='guest-" + i + "'>" + // adding the id for the table row
        "<td>" + 'status' + "</td>" + // html for the status column
        "<td>" + dataRow[3] + "</td>" + // size of the party
        "<td>" + dataRow[0] + "</td>" + // name of the party
        "<td>" + arrivedDateString + "</td>" + // arrival time of the party
        "<td>" + dataRow[2] + "</td>" + // quoted time of the party
        "<td class=\"waited\">0hr 0mins</td>" + // waiting time. Initially 0:0
        "<td><a class='notify' href='#'>Notify</a></td>" + // notify button
        "<td><a class='seat' href='#'>Seat</a></td>" + // seat button
        //"<td>" + dataRow[4] + "</td>" +                   // comments
        "<td><a class='remove' href='#'>X</a></td></tr>";

        $itemTable.children('tbody').append(toAppendHTMLString);

        //$itemTable.children('tbody').append(
        //    " <tr id='guest-" + i + "'>" + "<td>" + data1[3] + "</td> &nbsp;&nbsp;&nbsp;<td>" + data1[0] + "</td>" + "&nbsp;&nbsp;&nbsp;<td>" + data1[5] + "</td>" + "&nbsp;&nbsp;&nbsp;<td>" + data1[2] + "</td>" + "&nbsp;&nbsp;&nbsp;<td class=\"waited\">0:0</td>" + "&nbsp;&nbsp;&nbsp;<td><a class='notify' href='#'>Notify</a></td>" + "&nbsp;&nbsp;&nbsp;<td><a class='seat' href='#'>Seat</a></td>" + "&nbsp;&nbsp;&nbsp;<td>" + data1[4] + "</td>" + "<td><a class='remove' href='#'>X</a></td></tr>"
        //);


        $.publish('/regenerate-list/', []);
        $.publish('/regenerate-stats/', []);

        // Hide the new list, then fade it in for effects
        $("#guest-" + i)
            .css('display', 'none')
            .fadeIn();

        // Empty the input field
        $comment.val("");
        $size.val("");
        $no.val("");
        $name.val("");
        $time.val("");

        localStorage.setItem('guest-counter', i + 1);
    }


})


var gen;
$.subscribe('/remove/', function($this, $msg) {
    console.log('remove button pressed');

    var parentId = $this.parent().parent().attr('id');

    // Remove guest list from localStorage based on the id of the clicked parent element    
    localStorage.removeItem(
        parentId
    );

    var index = toSync.indexOf(parentId);
    //console.log(index + "index");
    toSync.splice(index, 1);
    localStorage.setItem('toSyncArray', toSync.join(','));

    // Fade out the list item then remove from DOM
    $this.parent().parent().fadeOut(function() {
        $this.parent().parent().remove();
        $.publish('/regenerate-list/', []);
        $.publish('/regenerate-stats/', []);
    });


});

var $guestItemTr;
$.subscribe('/regenerate-list/', function() {
    //var $guestItemLi = $('#show-items li');
    console.log("regenerate-list called");
    $guestItemTr = $itemTable.children('tbody').children('tr').has('td');
    console.log($guestItemTr);

    // Empty the order array
    order.length = 0;

    // Go through the list item, grab the ID then push into the array
    $guestItemTr.each(function() {
        var id = $(this).attr('id');
        order.push(id);
    });
    // Convert the array into string and save to localStorage
    localStorage.setItem(
        'guest-orders', order.join(',')
    );
});

$.subscribe('/clear-all/', function() {
    //var $guestListLi = $('#show-items li');
    var $guestTableTr = $itemTable.children('tbody').children('tr').has('td');
    order.length = 0;
    localStorage.clear();
    //$guestListLi.remove();
    $guestTableTr.remove();
});

$.subscribe('/regenerate-stats/', function() {
    console.log('regenerating stats...');

    var index;
    var totalWaiting = 0;
    var totalSeated = 0;

    var totalWaitCategory1 = 0; // Category 1 is 1-4 people party
    var totalWaitCategory2 = 0; // Category 2 is 5-7 people party
    var totalWaitCategory3 = 0; // Category 3 is 7+ people

    var numPartyCategory1 = 0;
    var numPartyCategory2 = 0;
    var numPartyCategory3 = 0;

    var orderList = localStorage.getItem('guest-orders');
    orderList = orderList ? orderList.split(',') : [];

    var seatedList = localStorage.getItem('guests-seated');
    seatedList = seatedList ? seatedList.split(',') : [];

    for (index = 0; index < orderList.length; index++) {
        var numPeopleInParty = Number(localStorage.getItem(orderList[index]).split(',')[3]);
        totalWaiting += numPeopleInParty;
    }

    for (index = 0; index < seatedList.length; index++) {
        var curItem = localStorage.getItem(seatedList[index]).split(',')

        var numPeopleInSeatedParty = Number(curItem[3]);
        totalSeated += numPeopleInSeatedParty;


        var curId = seatedList[index]; // getting the id of the person who finished waiting
        var arrivedTime = new Date(curItem[5]);
        var seatedTime = new Date(curItem[6]);
        var waitedTime = (seatedTime.getTime() - arrivedTime.getTime()) / 1000

        if (numPeopleInSeatedParty >= 1 && numPeopleInSeatedParty <= 4) {
            totalWaitCategory1 += waitedTime;
            numPartyCategory1 += 1;
        } else if (numPeopleInSeatedParty >= 5 && numPeopleInSeatedParty <= 7) {
            totalWaitCategory2 += waitedTime;
            numPartyCategory2 += 1;
        } else if (numPeopleInSeatedParty >= 7) {
            totalWaitCategory3 += waitedTime;
            numPartyCategory3 += 1;
        }
    };

    console.log('total waiting = ' + totalWaiting);
    console.log('number seated = ' + totalSeated);
    console.log('totalWaiting in Category1 = ' + totalWaitCategory1);

    $totalSeated.html(totalSeated);
    $totalWaiting.html(totalWaiting);

    // When numParty is 0 this is NaN. Fix it.

    $avgWaitCat1.html(parseInt(totalWaitCategory1 / numPartyCategory1 / 60));
    $avgWaitCat2.html(parseInt(totalWaitCategory2 / numPartyCategory2 / 60));
    $avgWaitCat3.html(parseInt(totalWaitCategory3 / numPartyCategory3 / 60));
})

var gb;
$.subscribe('/regenerate-wait-times/', function() {
    var index;

    var orderList = localStorage.getItem('guest-orders');
    orderList = orderList ? orderList.split(',') : [];


    for (index = 0; index < orderList.length; index++) {
        var curId = orderList[index];
        var curItem = localStorage.getItem(curId).split(',');

        var arrivedTime = new Date(curItem[5]);
        var currentTime = new Date();
        var waitedTime = parseInt(((currentTime.getTime() - arrivedTime.getTime()) / 1000 / 60)) // In minutes

        waitedTime = (waitedTime >= 60) ?
            (parseInt(waitedTime / 60) + 'hr ' + waitedTime % 60 + 'mins') :
            (waitedTime + 'mins'); // In standard format 2hr 30mins    

        gb = $('#' + curId);
        gb = $('#' + curId).children('.waited').html(waitedTime);
        console.log(waitedTime);
    }
})


$.publish('/regenerate-stats/', []);
setInterval(function(){$.publish('/regenerate-wait-times/', []);console.log('internval')}, 60000);

// Prevent dropdown menu from closing on click any item in the form
$('.dropdown-menu').find('form').click(function(e) {
    e.stopPropagation();
});

//});
