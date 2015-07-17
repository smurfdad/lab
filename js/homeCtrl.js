/**
* Ejemplo de controlado AngularJS
*
*/

app.controller("homeCtrl", function ($scope,  $timeout, $interval, $log) {
  $scope.experimentos = new Array();
  $scope.experimentos.push({"nombre":"Plugin", "href":"nexus/", "descripcion": "Utilizacion de un plugin jquery"});
  var _pilaLlamadasCargando = 0;
  $scope.isCargando = function(){
    return _pilaLlamadasCargando !== 0;
  };

  setLoading();
  var timer = $interval(function(){
     $scope.experimentos.push({"nombre":"Plugin", "href":"nexus/", "descripcion": "Utilizacion de un plugin jquery"});
     if ($scope.experimentos.length === 10){
       $interval.cancel(timer);
       $timeout(function(){
         removeLoading();
       }, 500);
     }
  }, 1000);
  function setLoading(){
    _pilaLlamadasCargando++;
  }
  function removeLoading(){
    if (_pilaLlamadasCargando !== 0){
      _pilaLlamadasCargando--;
    }
  }
});
