var toSync = [];
var seatedToSync = [];
toSync = localStorage.getItem('toSyncArray');
toSync = toSync ? toSync.split(',') : [];
console.log(toSync + " toSyncArrayfromlocalDB");
seatedToSync = localStorage.getItem('seatedToSyncArray');
seatedToSync = seatedToSync ? seatedToSync.split(',') : [];
console.log(seatedToSync + " seatedToSyncArrayfromlocalDB");

//alert("Hello " + username);

function Notify(notifNum){
	
	console.log(notifNum);	
	//https://control.msg91.com/api/sendhttp.php?authkey=65373Aur7ub23VBi533913dd&mobiles=9840346380&message=Your%20table%20is%20now%20ready&sender=DINEIN&route=4	
	
	$.ajax({ //create an ajax request to load_page.php
					type: "POST",
					url: "notify.php",
					data: {
						number: notifNum
					},
					dataType: "html", //expect html to be returned                
					success: function (response) {
								alert("Response for msg sending" + response);
								
					  },
					 error: function(XMLHttpRequest, textStatus, errorThrown) {
     
							alert("Ajax cup for senging msg");
							console.log("ajax exception");
							
					   }
			    });
}

function Seat(num1, date1, d){
	
	console.log(num1, date1);	
	alert("pushing to seated-to-sync from success function " + d);
	seatedToSync.push("guest-" + d);
	localStorage.setItem('seatedToSyncArray', seatedToSync.join(','));
}

function Sync(){
	  alert("Syncing");
	 if(toSync.length == 0){
		alert("Database is synced on cloud completely"); 
	 }
	 else{
		alert("Database will now sync. Please make sure of internet connection.");
		for(var z = 0; z < toSync.length; z++){
			var datarow = localStorage.getItem(toSync[z]).split(",");
			//alert(datarow[2]);
				$.ajax({ //create an ajax request to load_page.php
					type: "POST",
					url: "add.php",
					data: {
						name: datarow[0],
						number: datarow[1],
						time: datarow[2],
						size: datarow[3],
						comment: datarow[4],
						restaurant:username
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
	 if(seatedToSync.length == 0){
		alert("Seated Database is synced on cloud completely"); 
	 }
	 else{
		alert("Seated Database will now sync. Please make sure of internet connection.");
		for(var z = 0; z < seatedToSync.length; z++){
			var datarow = localStorage.getItem(seatedToSync[z]).split(",");
			var guestnum = z;
			//alert(datarow[2]);
				$.ajax({ //create an ajax request to load_page.php
					type: "POST",
					url: "update.php",
					data: {
						number: datarow[1],
						date: datarow[6],
						restaurant:username
					},
					dataType: "html", //expect html to be returned                
					success: function (response) {
								alert("Response" + response);
								if(response == "success"){
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
    var i = Number(localStorage.getItem('guest-counter')) + 1,
        j = 0,
        k,
        $form = $('#guest-form'),
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

    // Load guest list
    orderList = localStorage.getItem('guest-orders');
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
			+ "&nbsp;&nbsp;&nbsp;<td><a class='notify' href='#'>Notify</a></td>"
			+ "&nbsp;&nbsp;&nbsp;<td><a class='seat' href='#'>Seat</a></td>"
	     	+ "&nbsp;&nbsp;&nbsp;<td>"+data[4]+"</td>"
			+ "<td><a class='remove' href='#'>X</a></td></tr>"
        );
    
    }
     
	Sync();
    
	// Add guest
    $form.submit(function(e) {
        e.preventDefault();
        $.publish('/add/', []);
    });
	
	$itemTable.delegate('.remove', 'click', function(e) {
        var $this = $(this);
        
        e.preventDefault();
        $.publish('/remove/', [$this, "table"]);
    });
	
	$itemTable.delegate('.notify', 'click', function(e) {
        var $this = $(this);
        e.preventDefault();
        var notifyId = $(this).parent().parent().attr('id');
		console.log(notifyId + 'notifying');
		var data2 = localStorage.getItem(notifyId).split(',');
  		//	Notify(data2[1]);
    });

	$itemTable.delegate('.seat', 'click', function(e) {
        var $this = $(this);
        e.preventDefault();
        var Id = $(this).parent().parent().attr('id');
		console.log(Id + 'seating');
		var d = Id.split('-')[1];
		var data2 = localStorage.getItem(Id).split(',');
  			Seat(data2[1], data2[6], d);
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
		
		//alert(i + "i");
        i = Number(localStorage.getItem('guest-counter'));
		//alert("new i" + i);
		if ($comment.val() != "") {
            // Take the value of the input field and save it to localStorage
			var d = new Date();
			var $now = d.getHours() + ":" + d.getMinutes();
			var $date = d.getFullYear()+"-"+(d.getMonth()+ 1)+"-"+d.getDate()
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
						restaurant: username						
					},
					dataType: "html", //expect html to be returned                
					success: function (response) {
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
			
			alert("pushing to to-sync from success function " + i);
			toSync.push("guest-" + i);
			localStorage.setItem('toSyncArray', toSync.join(','));
			
            // Append a new list item with the value of the new guest list
			data1 = localStorage.getItem("guest-" + i).split(',');
		
		console.log("adding table entry")
		$itemTable.append(
            " <tr id='guest-" + i + "'>"
            + "<td>" 
            + data1[3]
            + "</td> &nbsp;&nbsp;&nbsp;<td>"+data1[0]+"</td>"
			+ "&nbsp;&nbsp;&nbsp;<td>"+data1[5]+"</td>"
			+ "&nbsp;&nbsp;&nbsp;<td>"+data1[2]+"</td>"
			+ "&nbsp;&nbsp;&nbsp;<td class=\"waited\">0:0</td>"
			+ "&nbsp;&nbsp;&nbsp;<td><a class='notify' href='#'>Notify</a></td>"
			+ "&nbsp;&nbsp;&nbsp;<td><a class='seat' href='#'>Seat</a></td>"
	     	+ "&nbsp;&nbsp;&nbsp;<td>"+data1[4]+"</td>"
     		+ "<td><a class='remove' href='#'>X</a></td></tr>"
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
            
			localStorage.setItem('guest-counter', i+1);
            //i++;
        }
    });
var gen;    
    $.subscribe('/remove/', function($this, $msg) {
		
		var parentId = $this.parent().parent().attr('id');
        
        // Remove guest list from localStorage based on the id of the clicked parent element	
        localStorage.removeItem(
            parentId
        );
		
		var index = toSync.indexOf(parentId);
		//alert(index + "index");
		toSync.splice(index, 1);	
		localStorage.setItem('toSyncArray', toSync.join(','));
										   		
        // Fade out the list item then remove from DOM
        $this.parent().parent().fadeOut(function() { 
            $this.parent().parent().remove();
            
            $.publish('/regenerate-list/', []);
        });
			
		
    });
    
    $.subscribe('/regenerate-list/', function() {
        //var $guestItemLi = $('#show-items li');
		var $guestItemTr = $('#show-items-table tr').has('td');
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
        var $guestTableTr = $('#show-items-table tr').has('td');
        order.length = 0;
        localStorage.clear();
        //$guestListLi.remove();
		$guestTableTr.remove();
    });
});
