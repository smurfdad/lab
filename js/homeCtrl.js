/**
* Ejemplo de controlado AngularJS
*
*/
app.controller("homeCtrl", function ($scope,  $timeout, $interval, $log) {

  var REPOSITORIO = "https://lab-smurfdad.firebaseio.com/experimentos";
  $scope.experimentos = {};
  $scope.experimentosSize = function(){
	var resultado = Object.keys($scope.experimentos).length;
	$log.debug("Numero de experimentos: "+ resultado);
	return resultado;
  };

  var ref = new Firebase(REPOSITORIO);
  ref.on("child_added", function(snapshot) {
    $log.info("Recibiendo datos "+snapshot.key()+" "+snapshot.val().nombre);
    var valor = snapshot.val();
    var experimento = {};
    // experimento.nombre = snapshot.val().nombre;
    // experimento.descripcion = snapshot.val().descripcion;
    // experimento.href = snapshot.val().href;
    // experimento.id = snapshot.key();
    $scope.$apply(function(){
        // $scope.experimentos.push(experimento);
		$scope.experimentos[snapshot.key()] = snapshot.val();
    });

    //$scope.experimentos.push(experimento);
  });

	ref.on("child_changed", function(snapshot) {
	$log.debug("Recibiendo datos");
    $scope.$apply(function(){
         $scope.experimentos[snapshot.key()] = snapshot.val();
	});
	$log.debug("Datos procesados");
  });

  ref.on("child_removed", function(snapshot) {
    //setLoading();
    var index = -1;
    var encontrado = false;
    for(var i= 0; i < $scope.experimentos.length && !encontrado; i++){
      var experimento = $scope.experimentos[i];
      $log.debug("Evaluando: "+snapshot.key() +" == " +experimento.id)
      if (snapshot.key() == experimento.id){
        $log.debug("Encontrado");
        $scope.$apply(function(){
          $scope.experimentos.splice(i, 1);
        });
        encontrado = true;
      }
    }
    //$timeout(function(){
    //  removeLoading();
    //}, 500);
  });


  var _pilaLlamadasCargando = 0;
  $scope.isCargando = function(){
    return _pilaLlamadasCargando !== 0;
  };

  //$timeout(function(){
  //  ref.child("experimentos").push({"nombre":"Plugin", "href":"nexus/", "descripcion": "Utilizacion de un plugin jquery"}, function(){
  //    $log.info("Enviado a Firebase");
  //  });
  //}, 1000);
  //setLoading();
  //var timer = $interval(function(){
  //   $scope.experimentos.push({"nombre":"Plugin", "href":"nexus/", "descripcion": "Utilizacion de un plugin jquery"});
  //   if ($scope.experimentos.length === 10){
  //     $interval.cancel(timer);
  //     $timeout(function(){
  //       removeLoading();
  //     }, 500);
  //   }
  //}, 1000);

  function setLoading(){
    _pilaLlamadasCargando++;
  }
  function removeLoading(){
    if (_pilaLlamadasCargando !== 0){
      _pilaLlamadasCargando--;
    }
  }
});
