var toSync = [];
toSync = localStorage.getItem('toSyncArray');
toSync = toSync ? toSync.split(',') : [];
console.log(toSync + " toSyncArrayfromlocalDB");

function Sync(){
	  alert("Syncing");
	 if(toSync.length == 0){
		alert("Database is synced on cloud completely"); 
	 }
	 else{
		alert("Database will now sync. Please make sure of internet connection.");
		for(var z = 0; z < toSync.length; z++){
			var datarow = localStorage.getItem(localStorage.key(z)).split(",");
				$.ajax({ //create an ajax request to load_page.php
					type: "POST",
					url: "add.php",
					data: {
						name: datarow[0],
						number: datarow[1],
						time: datarow[2],
						size: datarow[3],
						comment: datarow[4]
					},
					dataType: "html", //expect html to be returned                
					success: function (response) {
								alert("Response" + response);
								if(response == "success"){
									//sync = true;
									console.log("ajax success");
									var index = toSync.indexOf(localStorage.key(z));
									toSync.splice(index, 1);
									localStorage.setItem(
									   'toSyncArray', toSync.join(',')
									   );
								}
								else{
									console.log(response + "ajax response");
									
								}
					  },
					  error: function(XMLHttpRequest, textStatus, errorThrown) {
     
							alert("Ajax cup");
							console.log("ajax exception");
							
					   }
			    });
				
			
			
			
		}
	 }
	 }
	 
	$( document ).ready(function() {
    console.log( "ready!" );
    var i = Number(localStorage.getItem('todo-counter')) + 1,
        j = 0,
        k,
        $form = $('#todo-form'),
		$itemTable = $('#show-items-table'),
        $editable = $('.editable'),
        $clearAll = $('#clear-all'),
        $comment = $('#comment'),
		$name = $('#name'),
		$no = $('#number'),
		$size = $('#size'),
		$time = $('#time'),
        order = [],
		data,
		data1,
        orderList;

    // Load todo list
    orderList = localStorage.getItem('todo-orders');
    console.log(orderList);
    orderList = orderList ? orderList.split(',') : [];
    
    for( j = 0, k = orderList.length; j < k; j++) {
		console.log(localStorage.getItem(orderList[j]));
		data = localStorage.getItem(orderList[j]).split(',');
		var arrived = data[5].split(":");
		var CurrentDate=new Date();
		var hours=CurrentDate.getHours();
		var minutes=CurrentDate.getMinutes();
		var wait1 = minutes - Number(arrived[1]);
		var wait2 = hours - Number(arrived[0]);
		if(wait1 < 0) {
			wait1 = 60 + wait1;
			wait2 -= 1;
		}
		var waited = wait2 + ":" + wait1;
			$itemTable.append(
            " <tr id='" + orderList[j] + "'>"
            + "<td>" 
            + data[3]
            + "</td> &nbsp;&nbsp;&nbsp;<td>"+data[0]+"</td>"
			+ "&nbsp;&nbsp;&nbsp;<td>"+data[5]+"</td>"
			+ "&nbsp;&nbsp;&nbsp;<td>"+data[2]+"</td>"
			+ "&nbsp;&nbsp;&nbsp;<td class='waited'>"+waited+"</td>"
			+ "&nbsp;&nbsp;&nbsp;<td><span href='#'><b>Notify</b></span></td>"
			+ "&nbsp;&nbsp;&nbsp;<td><span href='#'><b>Seat</b></span></td>"
	     	+ "&nbsp;&nbsp;&nbsp;<td>"+data[4]+"</td>"
			+ "<td><a href='#'>X</a></td></tr>"
        );
    
    }
     
	 Sync();
    // Add todo
    $form.submit(function(e) {
        e.preventDefault();
        $.publish('/add/', []);
    });
	
	$itemTable.delegate('a', 'click', function(e) {
        var $this = $(this);
        
        e.preventDefault();
        $.publish('/remove/', [$this, "table"]);
    });
   
	/*
    // Edit and save todo
    $editable.inlineEdit({
        save: function(e, data) {
                var $this = $(this);
                localStorage.setItem(
                    $this.parent().attr("id"), data.value
                );
            }
    });
    */
    // Clear all
    $clearAll.click(function(e) {
        e.preventDefault();
        $.publish('/clear-all/', []);
    });

     
    // Subscribes
    $.subscribe('/add/', function() {
        if ($comment.val() != "") {
            // Take the value of the input field and save it to localStorage
			var d = new Date();
			var $now = d.getHours() + ":" + d.getMinutes();
			
            localStorage.setItem( 
                "todo-" + i, $name.val() + "," + $no.val() + "," + $time.val() + "," + $size.val() + "," + $comment.val() + "," + $now
            );
            
            // Set the to-do max counter so on page refresh it keeps going up instead of reset
            localStorage.setItem('todo-counter', i);
            
			
				$.ajax({ //create an ajax request to load_page.php
					type: "POST",
					url: "add.php",
					data: {
						name: $name.val(),
						number: $no.val(),
						time: $time.val(),
						size: $size.val(),
						comment: $comment.val(),
					},
					dataType: "html", //expect html to be returned                
					success: function (response) {
							alert("Response" + response);
							if(response == "success"){
							//alert("Response" + response);

		//						sync = true;
								console.log("ajax success");
							}
							else{
								
								console.log(response + "ajax response");
								alert("pushing to to-sync " + i)
								toSync.push("todo-" + i);
								localStorage.setItem(
         						   'toSyncArray', toSync.join(',')
     							   );
							}
					},
					
					error: function(XMLHttpRequest, textStatus, errorThrown) {
     
							alert("Ajax cup");
							console.log("ajax exception");
							alert("pushing to to-sync " + i)
							toSync.push("todo-" + i);
							localStorage.setItem(
											   'toSyncArray', toSync.join(',')
											   );
						}
					  
			    });
				
			
			
			
            // Append a new list item with the value of the new todo list
			data1 = localStorage.getItem("todo-" + i).split(',');
		
		console.log("adding table entry")
		$itemTable.append(
            " <tr id='todo-" + i + "'>"
            + "<td>" 
            + data1[3]
            + "</td> &nbsp;&nbsp;&nbsp;<td>"+data1[0]+"</td>"
			+ "&nbsp;&nbsp;&nbsp;<td>"+data1[5]+"</td>"
			+ "&nbsp;&nbsp;&nbsp;<td>"+data1[2]+"</td>"
			+ "&nbsp;&nbsp;&nbsp;<td class=\"waited\">0:0</td>"
			+ "&nbsp;&nbsp;&nbsp;<td><a href='#'>Notify</a></td>"
			+ "&nbsp;&nbsp;&nbsp;<td><a href='#'>Seat</a></td>"
	     	+ "&nbsp;&nbsp;&nbsp;<td>"+data1[4]+"</td>"
     		+ "<td><a href='#'>X</a></td></tr>"
        );
		

            $.publish('/regenerate-list/', []);

            // Hide the new list, then fade it in for effects
            $("#todo-" + i)
                .css('display', 'none')
                .fadeIn();
            
            // Empty the input field
            $comment.val("");
			$size.val("");
			$no.val("");
			$name.val("");
			$time.val("");
            
            i++;
        }
    });
var gen;    
    $.subscribe('/remove/', function($this, $msg) {
		
		var parentId = $this.parent().parent().attr('id');
        
        // Remove todo list from localStorage based on the id of the clicked parent element	
        localStorage.removeItem(
            parentId
        );
        
        // Fade out the list item then remove from DOM
        $this.parent().parent().fadeOut(function() { 
            $this.parent().parent().remove();
            
            $.publish('/regenerate-list/', []);
        });
			
		
    });
    
    $.subscribe('/regenerate-list/', function() {
        //var $todoItemLi = $('#show-items li');
		var $todoItemTr = $('#show-items-table tr').has('td');
        // Empty the order array
        order.length = 0;
        
        // Go through the list item, grab the ID then push into the array
        $todoItemTr.each(function() {
            var id = $(this).attr('id');
            order.push(id);
        });
        // Convert the array into string and save to localStorage
        localStorage.setItem(
            'todo-orders', order.join(',')
        );
    });
    
    $.subscribe('/clear-all/', function() {
        //var $todoListLi = $('#show-items li');
        var $todoTableTr = $('#show-items-table tr').has('td');
        order.length = 0;
        localStorage.clear();
        //$todoListLi.remove();
		$todoTableTr.remove();
    });
});
