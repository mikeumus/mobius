//
// broadcasting msg to graph controller
// procedure and graph data are not affected in this controller
//

vidamo.controller('nodeMenuCtrl',['$scope','$rootScope','generateCode',
    function($scope,$rootScope,generateCode) {

        $scope.dataList = generateCode.getDataList();
        $scope.interfaceList = generateCode.getInterfaceList();
        $scope.chartViewModel= generateCode.getChartViewModel();

        $scope.$watch(function () {
            return generateCode.getNodeIndex();
        }, function () {
            if (generateCode.getNodeIndex() !== $scope.nodeIndex) {
                $scope.nodeIndex = generateCode.getNodeIndex();
                $scope.procedures = $scope.dataList[$scope.nodeIndex];
                $scope.inputs = $scope.interfaceList[$scope.nodeIndex];
            }
        });

        $scope.addInputConnector = function(model){
            $rootScope.$broadcast("newInputConnector",model)
        };

        $scope.addOutputConnector = function(model){
            $rootScope.$broadcast("newOutputConnector",model)
        };

        $scope.checkDupOutput  = function(output){
            if($scope.chartViewModel.nodes[$scope.nodeIndex] !== undefined){
                var outputs = $scope.chartViewModel.nodes[$scope.nodeIndex].data.outputConnectors;
                for(var i = 0; i < outputs.length; i++){
                    if(outputs[i].name === output.name){
                        return false;
                    }
                }
            }
            return true;
        };

        $scope.checkDupInput  = function(input){
            if($scope.chartViewModel.nodes[$scope.nodeIndex] !== undefined){
                var inputs = $scope.chartViewModel.nodes[$scope.nodeIndex].data.inputConnectors;
                for(var i = 0; i < inputs.length; i++){
                    if(inputs[i].name === input.name){
                        return false;
                    }
                }
            }
            return true;
        };

        $scope.delete = function(){$rootScope.$broadcast("deleteSelected")};
        $scope.rename = function(){$rootScope.$broadcast("renameSelected")};
        $scope.saveAsNew = function(){$rootScope.$broadcast("saveAsNewType")};
        $scope.overwrite= function(){$rootScope.$broadcast("overWriteProcedure")};
        $scope.editProcedure= function(){$rootScope.$broadcast("editProcedure");};
    }]);