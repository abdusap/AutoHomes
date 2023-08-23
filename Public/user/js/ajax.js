function addToCart(productName, category) {
    $.ajax({
      url: '/add_to_cart',
      method: 'patch',
      data: {
        name: productName,
        category: category
      }
    })
    .done((response) => {
      // $("#cart-count").load(location.href + " #cart-count")
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: response.message,
        showConfirmButton: false,
        timer: 1500
      })
      let count=$('#cart-count').html()
      count=parseInt(count)+1
      $('#cart-count').html(count)
      // Handle the success response here
    })
    .fail((error) => {
      console.log(error.responseJSON.message);
      Swal.fire({
        position: 'center',
            icon: 'warning',
            title: error.responseJSON.message,
            showConfirmButton: false,
            timer: 1500
      }); 
      // Handle the error here
    });
  }
  
  function deleteItem(id) {
    $.ajax({
      url: '/cart',
      method: 'patch',
      data: {
        id: id
      }
      })
    .done((response) => {
      $("#user-cart").load(location.href + " #user-cart")
      // $("#cart-count").load(location.href + " #cart-count")
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: response.message,
        showConfirmButton: false,
        timer: 1500
      })
      let count=$('#cart-count').html()
      count=parseInt(count)-1
      $('#cart-count').html(count)
      // let subtotal=$('#subtotal_2').html()
      //       subtotal=parseInt(subtotal)+price
      //       $('#subtotal_1').html(subtotal)
      //       $('#subtotal_2').html(subtotal)
    }).fail((error) => {
      Swal.fire({
        position: 'center',
            icon: 'warning',
            title: error.responseJSON.message,
            showConfirmButton: false,
            timer: 1500
      }); 
    });

  }

	//Contact Form Validation
	if($('#email-form').length){
		$('#submit').click(function(){
			
            var o = new Object();
            var form = '#email-form';
			var username = $('#email-form .username').val();
			var email = $('#email-form .email').val();
			if(username == '' || email == '')
			{
				$('#email-form .response').html('<div class="failed">Please fill the required fields.</div>');
				return false;
			}

        // Email validation using a regular expression
        var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailPattern.test(email)) {
            $('#email-form .response').html('<div class="failed">Invalid email format.</div>');
            return false;
        }
            
            $.ajax({
                url:"/contact",
                method:"POST",
                data: $(form).serialize(),
                beforeSend:function(){
                    $('#email-form .response').html('<div class="text-info"><img style="height:33px" src="/Public/user/images/icons/loader.gif"> Loading...</div>');
                },
                success:function(data){
                    $('form').trigger("reset");
                    $('#email-form .response').fadeIn().html(data.message).css('color', 'green')
                    setTimeout(function(){
                        $('#email-form .response').fadeOut("slow");
                    }, 5000);
                },
                error: function(jqXHR) {
                  $('#email-form .response').fadeIn().html(jqXHR.responseJSON.message).css('color', 'red')
                }
                
            });
        });
	}



	// //Contact Form Validation
  if($('#cart-form').length){
    $('#cart-detail-button').off('click'); 
  // $(document).ready(function() {
    $('#cart-detail-button').click(function(e) {
      // $('#cart-form').prop('disabled', true)
      e.preventDefault();
            var o = new Object();
            var form = '#cart-form';
			var username = $('#cart-name').val();
			var email = $('#cart-email').val();
			var mobile = $('#cart-mobile').val();
			if(username == '' || email == '' || mobile == '')
			{
				$('#cart-message').html('Please fill the required fields.').css('color', 'red')
				return false;
			}

        // Email validation using a regular expression
        var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailPattern.test(email)) {
            $('#cart-message').html('Invalid email format.').css('color', 'red')
            return false;
        }
            
            $.ajax({
                url:"/cart",
                method:"POST",
                data: $(form).serialize(),
                beforeSend:function(){
                    $('#cart-message').html('<div class="text-info"><img style="height:33px" src="/Public/user/images/icons/loader.gif"> Loading...</div>');
                },
                success:function(data){
                    // $('form').trigger("reset");
                    // $('#cart-message').fadeIn().html(data.message).css('color', 'green')
                    // setTimeout(function(){
                    //     $('#email-form .response').fadeOut("slow");
                    // }, 5000);
                    if(data.success){

                      Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: "We will Contact You Shortly",
                        showConfirmButton: false,
                        timer: 1500
                      })
                      
                      window.location='/'
                    }
                   
                },
                error: function(jqXHR) {
                  $('#cart-message').fadeIn().html(jqXHR.responseJSON.message).css('color', 'red')
                }
                
            });
        });
	}

