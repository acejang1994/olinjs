var $inStock; // in stock forms
var $outOfStock; // out of stock forms
var $editIngr; // edit buttons
var $addIngr; // add ingredient form



var everything = function(){
  $inStock = $('form.inStock').unbind();
  $editIn = $('input.edit').unbind();
  $addIn = $('form#newIngredient').unbind();
  $outOfStock = $('form.outStock').unbind();
  $submitOrder = $('form.orderForm').unbind();




  $submitOrder.click(function(event){
    var $form = $(event.target).closest('form');
    var $checked = event.target;
    console.log('checked',checked)
    var totalCost = $form.find('div[id="total"]');
    var ingredientIds = [];
    if($checked.is(':checked')) {
      totalCost.val(totalCost.val + $checked.price);
      ingredientIds.push($checked._id);
    }
    $.post('/submitOrder', {
            'ingredientIds': ingredientIds
    });

  });


  $inStock.submit(function(event){
    event.preventDefault();
    var $form = $(event.target).closest('form');
    // debugger

    $.post('/markOutOfStock', {
            id: $form.attr('id'),
            inStock: false
    }).done(function(data, status){
      $form.find('input.submit').val('Restock');
      $form.attr('action', 'markInStock');
      $('div#out').append($form);
    });
  });

  $outOfStock.submit(function(event){
    event.preventDefault();
    var $form = $(event.target).closest('form');

    $.post('/markInStock', {
            id: $form.attr('id'),
            inStock: true
    }).done(function(data, status){
      $form.find('input.submit').val('Out of Stock');
      $form.attr('action', 'markOutOfStock');
      $('div#in').append($form);
    });

  });

  $editIn.click(function(event){
    event.preventDefault();
      
      var $form = $(event.target).closest('form');
      var name = prompt("Edit Ingredient name");
      var price = prompt("Edit Ingredient cost");
      $form.find('span').html(name + ": $" + price);
      $.post('/ingredients', {
            id: $form.attr('id'), 
            name: name, 
            price: price
    }).done(function(data, status) {
      data = JSON.parse(data);
      var $form = $('#'+data.id);
      $form.find('span').html(data.name + " : $ "+ data.price);
    });
  });

  $addIn.submit(function (event){
    event.preventDefault();
    console.log("inside addIn", $addIn.serialize());
    $form = $(event.target);
    var name = $form.find('input[id="name"]');
    var price = $form.find('input[id="price"]');
    // console.log("name",name.val());
    // console.log("price",price.val());
    // debugger;
    $.post('/newIngredient', {
          name: name.val()
        , price: price.val()
    }).done(function (data, status) {

      console.log("data", data);
      console.log("status", status);

      $formIn = $("form.inStock").clone().first();
      console.log("form", $formIn.serialize());
    //   var HTML = '<form class="inStock" id=' + data._id +  'action="markOutOfStock" method="POST">
    //   <span>'+  data.name +' : $'+  data.price'</span>
    //   <input type="button" class="edit" value="Edit">
    //   <input type="submit" class="submit" value="Out of Stock">
    // </form>';

      $formIn.attr('id', data._id);
      $formIn.find('span').html(data.name + ": $ " + data.price);
      // $formIn.html(data.name + ": $ " + data.price);
      $formIn.find('input.submit').val('Out Of Stock');
      
      $('div#in').append($formIn);
      

    }).error(function(data, status){
      console.log("data", data);
      console.log("status", status);
    });
    everything();

  });


};

everything();