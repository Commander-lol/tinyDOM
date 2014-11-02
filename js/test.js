if(!mu.exists(window.muTest)){
  window.muTest = {
    postJsonResponse: function(){
      mu.ajax({
        url: 'tests/jsonresponse.php',
        method: 'POST',
        responseType: 'json',
        success: function(data){
          console.log(data);
        }
      });
    }
  }
}
