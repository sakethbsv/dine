/*
var i = Number(localStorage.getItem('todo-counter')) + 1,
    $form = $('#party-form'),
    $partyPhone = $('#party-phone')
    $partyName = $('#party-name'),
    $partySize = $('#party-size'),
    $partyNotes = $('#party-notes'),
    $partyWaitTime = $('#party-wait-time');



$form.submit(function(e) {
    e.preventDefault();
    $.publish('/add/', []);
})

var affirmFormData = function() {
    var i = 0;
    var flag = 1;
    for (i = 0; i < arguments.length; i++){
        console.log(arguments[i].val());
        if (arguments[i].val() == "")
            flag = 0;
    }
    return flag;
}


$.subscribe('/add/', function() {
    // Test if the form has good data
    var isGood = affirmFormData($partyPhone, $partyName, $partySize, $partyWaitTime);
    console.log('isGood is ' + isGood);

    // Take the value of the input field and save it to localStorage        
    if (isGood) {
        localStorage.setItem(
            "party-" + i, $partyName.val() + "," + $partyPhone.val() + "," + $partySize.val() + "," + $partyWaitTime.val()
            )
    }

    // Set the to-do max counter so on page refresh it keeps going up instead of reset
    localStorage.setItem('party-counter', i);



        if ($newTodo.val() !== "") {
            // Take the value of the input field and save it to localStorage
            localStorage.setItem( 
                "todo-" + i, $newTodo.val() 
            );
             
            // Set the to-do max counter so on page refresh it keeps going up instead of reset
            localStorage.setItem('todo-counter', i);
             
            // Append a new list item with the value of the new todo list
            $itemList.append(
                "<li id='todo-" + i + "'>"
                + "<span class='editable'>"
                + localStorage.getItem("todo-" + i) 
                + " </span><a href='#'>x</a></li>"
            );
 
            $.publish('/regenerate-list/', []);
 
            // Hide the new list, then fade it in for effects
            $("#todo-" + i)
                .css('display', 'none')
                .fadeIn();
             
            // Empty the input field
            $newTodo.val("");
             
            i++;
        }
    });
*/


























    

/*
$(function() {
    var i = Number(localStorage.getItem('todo-counter')) + 1,
        j = 0,
        k,
        $form = $('#todo-form'),
        $removeLink = $('#show-items li a'),
        $itemList = $('#show-items'),
        $editable = $('.editable'),
        $clearAll = $('#clear-all'),
        $newTodo = $('#todo'),
        order = [],
        orderList;
 
    // Load todo list
    orderList = localStorage.getItem('todo-orders');
     
    orderList = orderList ? orderList.split(',') : [];
     
    for( j = 0, k = orderList.length; j < k; j++) {
        $itemList.append(
            "<li id='" + orderList[j] + "'>"
            + "<span class='editable'>"
            + localStorage.getItem(orderList[j]) 
            + "</span> <a href='#'>X</a></li>"
        );
    }
         
    // Add todo
    $form.submit(function(e) {
        e.preventDefault();
        $.publish('/add/', []);
    });
 
    // Remove todo
    $itemList.delegate('a', 'click', function(e) {
        var $this = $(this);
         
        e.preventDefault();
        $.publish('/remove/', [$this]);
    });
     
    // Sort todo
    $itemList.sortable({
        revert: true,
        stop: function() {
            $.publish('/regenerate-list/', []);
        }
    });
     
    // Edit and save todo
    $editable.inlineEdit({
        save: function(e, data) {
                var $this = $(this);
                localStorage.setItem(
                    $this.parent().attr("id"), data.value
                );
            }
    });
 
    // Clear all
    $clearAll.click(function(e) {
        e.preventDefault();
        $.publish('/clear-all/', []);
    });
 
    // Fade In and Fade Out the Remove link on hover
    $itemList.delegate('li', 'mouseover mouseout', function(event) {
        var $this = $(this).find('a');
         
        if(event.type === 'mouseover') {
            $this.stop(true, true).fadeIn();
        } else {
            $this.stop(true, true).fadeOut();
        }
    });
         
    // Subscribes
    $.subscribe('/add/', function() {
        if ($newTodo.val() !== "") {
            // Take the value of the input field and save it to localStorage
            localStorage.setItem( 
                "todo-" + i, $newTodo.val() 
            );
             
            // Set the to-do max counter so on page refresh it keeps going up instead of reset
            localStorage.setItem('todo-counter', i);
             
            // Append a new list item with the value of the new todo list
            $itemList.append(
                "<li id='todo-" + i + "'>"
                + "<span class='editable'>"
                + localStorage.getItem("todo-" + i) 
                + " </span><a href='#'>x</a></li>"
            );
 
            $.publish('/regenerate-list/', []);
 
            // Hide the new list, then fade it in for effects
            $("#todo-" + i)
                .css('display', 'none')
                .fadeIn();
             
            // Empty the input field
            $newTodo.val("");
             
            i++;
        }
    });
     
    $.subscribe('/remove/', function($this) {
        var parentId = $this.parent().attr('id');
         
        // Remove todo list from localStorage based on the id of the clicked parent element
        localStorage.removeItem(
            "'" + parentId + "'"
        );
         
        // Fade out the list item then remove from DOM
        $this.parent().fadeOut(function() { 
            $this.parent().remove();
             
            $.publish('/regenerate-list/', []);
        });
    });
     
    $.subscribe('/regenerate-list/', function() {
        var $todoItemLi = $('#show-items li');
        // Empty the order array
        order.length = 0;
         
        // Go through the list item, grab the ID then push into the array
        $todoItemLi.each(function() {
            var id = $(this).attr('id');
            order.push(id);
        });
         
        // Convert the array into string and save to localStorage
        localStorage.setItem(
            'todo-orders', order.join(',')
        );
    });
     
    $.subscribe('/clear-all/', function() {
        var $todoListLi = $('#show-items li');
         
        order.length = 0;
        localStorage.clear();
        $todoListLi.remove();
    });
});
*/

var toSync = [];
var seatedToSync = [];
toSync = localStorage.getItem('toSyncArray');
toSync = toSync ? toSync.split(',') : [];
console.log(toSync + " toSyncArrayfromlocalDB");
seatedToSync = localStorage.getItem('seatedToSyncArray');
seatedToSync = seatedToSync ? seatedToSync.split(',') : [];
console.log(seatedToSync + " seatedToSyncArrayfromlocalDB");


/*$(document).ready(function() {*/


    console.log("ready!");
    var i = Number(localStorage.getItem('guest-counter')) + 1,
        j = 0,
        k,
        $form = $('#party-form'),                               // The form to enter a new party information
        $itemTable = $('#waitlist-table'),                      // The waitlist
        $editable = $('.editable'),                             // No clue
        $clearAll = $('#clear-all'),                            // No clear all button!!
        $comment = $('#party-notes'),                           // Form element - comment
        $name = $('#party-name'),                               // Form element - name
        $no = $('#party-phone'),                                // Form element - number
        $size = $('#party-size'),                               // Form element - size
        $time = $('#party-wait-time'),                          // Form element - time
        order = [],                                             // Order of the parties
        data,
        data1,
        orderList;

    // Load guest list
    orderList = localStorage.getItem('guest-orders');
    console.log(orderList);
    orderList = orderList ? orderList.split(',') : [];

    for (j = 0, k = orderList.length; j < k; j++) {
        console.log(localStorage.getItem(orderList[j]));
        data = localStorage.getItem(orderList[j]).split(',');
        var arrived = data[5].split(":");
        var CurrentDate = new Date();
        var hours = CurrentDate.getHours();
        var minutes = CurrentDate.getMinutes();
        var waitingMinutes = minutes - Number(arrived[1]);
        var waitingHours = hours - Number(arrived[0]);

        var wait1 = minutes - Number(arrived[1]);
        var wait2 = hours - Number(arrived[0]);

        if (waitingMinutes < 0) {
            wait1 = 60 + wait1;
            wait2 -= 1;
        }
        var waited = waitingHours + ":" + waitingMinutes;
        $itemTable.children("tbody").append(
            "<tr id='" + orderList[j] + "'>" + 
            "<td>" + data[3] + "</td> &nbsp;&nbsp;&nbsp;<td>" + data[0] + "</td>" + 
            "&nbsp;&nbsp;&nbsp;<td>" + data[5] + "</td>" + 
            "&nbsp;&nbsp;&nbsp;<td>" + data[2] + "</td>" + 
            "&nbsp;&nbsp;&nbsp;<td class='waited'>" + waited + "</td>" + 
            "&nbsp;&nbsp;&nbsp;<td><a class='notify' href='#'>Notify</a></td>" + 
            "&nbsp;&nbsp;&nbsp;<td><a class='seat' href='#'>Seat</a></td>" + "&nbsp;&nbsp;&nbsp;<td>" + data[4] + "</td>" + 
            "<td><a class='remove' href='#'>X</a></td></tr>"
        );

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
    $itemTable.delegate('.seat', 'click', function(e) {
        var $this = $(this);
        e.preventDefault();
        var Id = $(this).parent().parent().attr('id');
        console.log(Id + 'seating');
        var d = Id.split('-')[1];
        var data2 = localStorage.getItem(Id).split(',');
        //Seat(data2[1], data2[6], d);
        $this.parent().parent().fadeOut(function() {
            $this.parent().parent().remove();
            $.publish('/regenerate-list/', []);
        });
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
            var $date = d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate()
            localStorage.setItem(
                "guest-" + i, $name.val() + "," + $no.val() + "," + $time.val() + "," + $size.val() + "," + $comment.val() + "," + $now + "," + $date
            );

            // Set the to-do max counter so on page refresh it keeps going up instead of reset
            localStorage.setItem('guest-counter', i);



            // Append a new list item with the value of the new guest list
            data1 = localStorage.getItem("guest-" + i).split(',');

            console.log("adding table entry")

            $itemTable.children('tbody').append(
                " <tr id='guest-" + i + "'>" + "<td>" + data1[3] + "</td> &nbsp;&nbsp;&nbsp;<td>" + data1[0] + "</td>" + "&nbsp;&nbsp;&nbsp;<td>" + data1[5] + "</td>" + "&nbsp;&nbsp;&nbsp;<td>" + data1[2] + "</td>" + "&nbsp;&nbsp;&nbsp;<td class=\"waited\">0:0</td>" + "&nbsp;&nbsp;&nbsp;<td><a class='notify' href='#'>Notify</a></td>" + "&nbsp;&nbsp;&nbsp;<td><a class='seat' href='#'>Seat</a></td>" + "&nbsp;&nbsp;&nbsp;<td>" + data1[4] + "</td>" + "<td><a class='remove' href='#'>X</a></td></tr>"
            );


            $.publish('/regenerate-list/', []);

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
    /*
    $.subscribe('/add/', function() {

        i = Number(localStorage.getItem('guest-counter'));


        if ($comment.val() != "") {
            // Take the value of the input field and save it to localStorage
            var d = new Date();
            var $now = d.getHours() + ":" + d.getMinutes();
            var $date = d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate()
            localStorage.setItem(
                "guest-" + i, $name.val() + "," + $no.val() + "," + $time.val() + "," + $size.val() + "," + $comment.val() + "," + $now + "," + $date
            );

            // Set the to-do max counter so on page refresh it keeps going up instead of reset
            localStorage.setItem('guest-counter', i);


            //Getting previous visits
            $.ajax({ //create an ajax request to load_page.php
                type: "POST",
                url: "check.php",
                data: {
                    number: $no.val(),
                },
                dataType: "html", //expect html to be returned                
                success: function(response) {
                    //alert("Response" + response);
                    alert('Previous Visits');

                    alert(response + "Response for prev visits");
                },

                error: function(XMLHttpRequest, textStatus, errorThrown) {

                    alert("net cup and not ajax cup");
                    console.log("ajax exception" + textStatus + errorThrown);
                    alert("Unable to get previous visits");

                }

            });


            //Adding to cloud
            $.ajax({ //create an ajax request to load_page.php
                type: "POST",
                url: "add.php",
                data: {
                    name: $name.val(),
                    number: $no.val(),
                    time: $time.val(),
                    size: $size.val(),
                    comment: $comment.val(),
                    seated: 0
                },
                dataType: "html", //expect html to be returned                
                success: function(response) {
                    //alert("Response" + response);
                    if (response == "success") {
                        alert("ajax success");

                        //                      sync = true;
                        console.log("ajax success");
                    } else {
                        alert("Ajax cup and not net cup");
                        console.log(response + "ajax response");
                        alert("pushing to to-sync from success function " + i);
                        toSync.push("guest-" + i);
                        localStorage.setItem(
                            'toSyncArray', toSync.join(',')
                        );


                    }
                },

                error: function(XMLHttpRequest, textStatus, errorThrown) {

                    alert("net cup and not ajax cup");
                    console.log("ajax exception");
                    alert("pushing to to-sync from error function " + i);
                    toSync.push("guest-" + (i));
                    localStorage.setItem(
                        'toSyncArray', toSync.join(',')
                    );
                }

            });



            // Append a new list item with the value of the new guest list
            data1 = localStorage.getItem("guest-" + i).split(',');

            console.log("adding table entry")
            $itemTable.append(
                " <tr id='guest-" + i + "'>" + "<td>" + data1[3] + "</td> &nbsp;&nbsp;&nbsp;<td>" + data1[0] + "</td>" + "&nbsp;&nbsp;&nbsp;<td>" + data1[5] + "</td>" + "&nbsp;&nbsp;&nbsp;<td>" + data1[2] + "</td>" + "&nbsp;&nbsp;&nbsp;<td class=\"waited\">0:0</td>" + "&nbsp;&nbsp;&nbsp;<td><a class='notify' href='#'>Notify</a></td>" + "&nbsp;&nbsp;&nbsp;<td><a class='seat' href='#'>Seat</a></td>" + "&nbsp;&nbsp;&nbsp;<td>" + data1[4] + "</td>" + "<td><a class='remove' href='#'>X</a></td></tr>"
            );


            $.publish('/regenerate-list/', []);

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
            //i++;
        }
    });
*/

    var gen;
    $.subscribe('/remove/', function($this, $msg) {

        var parentId = $this.parent().parent().attr('id');

        // Remove guest list from localStorage based on the id of the clicked parent element    
        localStorage.removeItem(
            parentId
        );


        // Syncing stuff


        //var index = toSync.indexOf(parentId);
        //toSync.splice(index, 1);
        //localStorage.setItem('toSyncArray', toSync.join(','));

        // Fade out the list item then remove from DOM
        $this.parent().parent().fadeOut(function() {
            $this.parent().parent().remove();

            $.publish('/regenerate-list/', []);
        });


    });
    

    $.subscribe('/regenerate-list/', function() {
        //var $guestItemLi = $('#show-items li');
        var $guestItemTr = $itemTable.children('tbody').children('tr').has('td');

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








    // Prevent dropdown menu from closing on click any item in the form
    $('.dropdown-menu').find('form').click(function (e) {
        e.stopPropagation();
    });

//});