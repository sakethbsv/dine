$(function() {
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
		/*$itemList.append(
            "<li id='" + orderList[j] + "'>"
            + "<span class='editable'>" 
            + data[3]
            + "</span> &nbsp;&nbsp;&nbsp;<span>"+data[0]+"</span>"
			+ "&nbsp;&nbsp;&nbsp;<span>"+data[5]+"</span>"
			+ "&nbsp;&nbsp;&nbsp;<span>"+data[2]+"</span>"
			+ "&nbsp;&nbsp;&nbsp;<span>"+data[4]+"</span>"
			+ "<a href='#'>X</a></li>"
        );
		*/
			$itemTable.append(
            " <tr id='" + orderList[j] + "'>"
            + "<td>" 
            + data[3]
            + "</td> &nbsp;&nbsp;&nbsp;<td>"+data[0]+"</td>"
			+ "&nbsp;&nbsp;&nbsp;<td>"+data[5]+"</td>"
			+ "&nbsp;&nbsp;&nbsp;<td>"+data[2]+"</td>"
			+ "&nbsp;&nbsp;&nbsp;<td class=\"waited\">0:0</td>"
			+ "&nbsp;&nbsp;&nbsp;<td><a href='#'>Notify</a></td>"
			+ "&nbsp;&nbsp;&nbsp;<td><a href='#'>Seat</a></td>"
	     	+ "&nbsp;&nbsp;&nbsp;<td>"+data[4]+"</td>"
			+ "<td><a href='#'>X</a></td></tr>"
        );
    
    }
     
	 
	
	    
    // Add todo
    $form.submit(function(e) {
        e.preventDefault();
        $.publish('/add/', []);
    });
	/*
    // Remove todo
    $itemList.delegate('a', 'click', function(e) {
        var $this = $(this);
        
        e.preventDefault();
        $.publish('/remove/', [$this, "list"]);
    });
	*/
	$itemTable.delegate('a', 'click', function(e) {
        var $this = $(this);
        
        e.preventDefault();
        $.publish('/remove/', [$this, "table"]);
    });
    /*
    // Sort todo
    $itemList.sortable({
        revert: true,
        stop: function() {
            $.publish('/regenerate-list/', []);
        }
    });
    */
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

    // Fade In and Fade Out the Remove link on hover
   /* $itemTable.delegate('tr', 'mouseover mouseout', function(event) {
        var $this = $(this).find('a');
        
        if(event.type === 'mouseover') {
            $this.stop(true, true).fadeIn();
        } else {
            $this.stop(true, true).fadeOut();
        }
    });
     */   
    // Subscribes
    $.subscribe('/add/', function() {
        if ($comment.val() !== "") {
            // Take the value of the input field and save it to localStorage
			var d = new Date();
			var $now = d.getHours() + ":" + d.getMinutes();

            localStorage.setItem( 
                "todo-" + i, $name.val() + "," + $no.val() + "," + $time.val() + "," + $size.val() + "," + $comment.val() + "," + $now
            );
            
            // Set the to-do max counter so on page refresh it keeps going up instead of reset
            localStorage.setItem('todo-counter', i);
            
            // Append a new list item with the value of the new todo list
			data1 = localStorage.getItem("todo-" + i).split(',');
			/*
		$itemList.append(
            "<li id='todo-" + i + "'>"
            + "<span class='editable'>" 
            + data1[3]
            + "</span> &nbsp;&nbsp;&nbsp;<span>"+data1[0]+"</span>"
			+ "&nbsp;&nbsp;&nbsp;<span>"+data1[5]+"</span>"
			+ "&nbsp;&nbsp;&nbsp;<span>"+data1[2]+"</span>"
			+ "&nbsp;&nbsp;&nbsp;<span>"+data1[4]+"</span>"
			+ "<a href='#'>X</a></li>"
        );
		*/
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
		//alert("Added a party to waitlist");
            /*$itemList.append(
                "<li id='todo-" + i + "'>"
                + "<span class='editable'>"
                + localStorage.getItem("todo-" + i) 
                + " </span><a href='#'>x</a></li>"
            );*/

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
		/*if($msg == "list"){
        var parentId = $this.parent().attr('id');
		alert(parentId);
        
        // Remove todo list from localStorage based on the id of the clicked parent element
        localStorage.removeItem(
            parentId
        );
        
        // Fade out the list item then remove from DOM
        $this.parent().fadeOut(function() { 
            $this.parent().remove();
            
            $.publish('/regenerate-list/', []);
        });
		}
		else if($msg == "table"){
		*/
		var parentId = $this.parent().parent().attr('id');
		//alert(parentId);
        
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
