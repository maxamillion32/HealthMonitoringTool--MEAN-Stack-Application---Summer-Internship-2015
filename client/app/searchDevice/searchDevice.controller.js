/**
 * Created by Dilip on 6/2/2015.
 */
(function () {
    'use strict';
    angular.module('app.ui.form').controller('searchDeviceCtrl', [
        '$scope', '$location', '$rootScope', '$route', '$document','filterFilter', function($scope, $location, $rootScope, $route, $document,filterFilter) {

            //scope variable initialization
            $scope.unusualList = [];
            $scope.wizard = {
                symptom: '',
                inpError : false,
            };

            //hardcoding diseases
            $scope.diseaseList = [{name : "Heart Failure", selected : "false"},
                {name : "COPD", selected : "false"},
                {name : "Atrial Fibrillation", selected : "false"},
                {name : "Diabetes", selected : "false"}];

            //selection list
            $scope.diseaseSelection = [];
            $scope.riskSelection = [];
            $scope.featureSelection = [];

            //helper function to convert array to JSON format for checkbox implementation
            var convertArrToJson = function(arr){
                for(var val in arr){
                    arr[val] = {name : arr[val], selected : "false"};
                }
                return arr;
            };

            // hardcoding risk factors
            var rf = ["Weight Loss", "BMI", "LDL Cholesterol", "Diastolic Blood Pressure", "Haemoglobin A1c", "Lack of Physical Activity", "Smoking cessation", "Blood Glucose Fluctuation", "Obesity", "Behavior patterns", "Poor Diet Patterns", "Total Cholesterol", "HDL Cholesterol", "High Triglycerides", "Framingham Risk Score", "Age"];
            $scope.riskFactors = convertArrToJson(rf);

            // hardcoding device features
            var df = ["Cost", "Smartphone Connectivity", "BP", "ECG", "HR", "SpO2", "Resp. Rate", "Steps", "Distance", "Calories", "Position", "Sleep", "Glucose", "EEG", "GSR", "Weight", "Fat %", "BMI", "Hydration", "Temperature"];
            $scope.deviceFeatures = convertArrToJson(df);

            //filter selection
            $scope.selectedDiseases = function selectedDiseases() {
                return filterFilter($scope.diseaseList, { selected: true });
            };
            $scope.selectedRisks = function selectedRisks(){
                return filterFilter($scope.riskFactors, { selected: true });
            };
            $scope.selectedFeatures = function selectedFeatures(){
                return filterFilter($scope.deviceFeatures, { selected: true });
            };

            //watchers
            $scope.$watch('diseaseList|filter:{selected:true}', function (nv) {
                $scope.diseaseSelection = nv.map(function (item) {
                    return item.name;
                });
            }, true);
            $scope.$watch('riskFactors|filter:{selected:true}', function (nv) {
                $scope.riskSelection = nv.map(function (item) {
                    return item.name;
                });
            }, true);
            $scope.$watch('deviceFeatures|filter:{selected:true}', function (nv) {
                $scope.featureSelection = nv.map(function (item) {
                    return item.name;
                });
            }, true);

            $scope.isValidateStep1 = function() {

                //pull from database risk factors for each disease using a service call or find an optimization
                if($scope.diseaseSelection.indexOf("Heart Failure") != -1){
                    rf = ["Weight", "BMI", "Pulse", "Blood Pressure", "Oxygen Saturation", "Activity"];
                    $scope.riskFactors = convertArrToJson(rf);
                }
                else{
                    rf = ["Weight Loss", "BMI", "LDL Cholesterol", "Diastolic Blood Pressure", "Haemoglobin A1c", "Lack of Physical Activity", "Smoking cessation", "Blood Glucose Fluctuation", "Obesity", "Behavior patterns", "Poor Diet Patterns", "Total Cholesterol", "HDL Cholesterol", "High Triglycerides", "Framingham Risk Score", "Age"];
                    $scope.riskFactors = convertArrToJson(rf);
                }
            };

            // function to validate risk factor selection
            $scope.isValidateStep2 = function(){
                // $scope.riskSelection contains the selected risk factors

            };

            $scope.search = function(){
                console.log($scope.featureSelection);
                alert("Searching...");
            };

            $scope.addUnusualSymptom = function(){
                if($scope.wizard.symptom != '' && !angular.isUndefined($scope.wizard.symptom)){
                    $scope.unusualList.push($scope.wizard.symptom);
                    $scope.wizard.symptom = '';
                    $scope.wizard.inpError = false;
                }
                else{
                    $scope.wizard.inpError = true;
                }

            };

            return $scope.finishedWizard = function() {
                //find device call
            };

            }
    ]);
})();
