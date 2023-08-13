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
      console.log('Success:', response);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: response.message,
        showConfirmButton: false,
        timer: 1500
      })
      // Handle the success response here
    })
    .fail((error) => {
      console.error('Error:', error);
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
  