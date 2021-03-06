(function() {
    'use strict';

    angular
        .module('rhgeek.olympic-medals')
        .controller('OlympicMedalsController', OlympicMedalsController);

    OlympicMedalsController.$inject = ['OlympicMedalsService', '$timeout'];

    function OlympicMedalsController(OlympicMedalsService, $timeout) {
        var vm = this;

        vm.loading = true;
        vm.medals = [];

        var day = 6;
        var dayTimer;


        getMedals();

        //////////


        function getMedals() {
            vm.loading = true;
            return OlympicMedalsService.getDayOfMedals(day)
                .then(function(resp) {
                    vm.medals = vm.medals.concat(resp.data);
                    if(day<15) {
                        dayTimer = $timeout(getMedals, 3000);
                    }
                    return vm.results;
                }, function(e) {
                    console.log('e', e);
                })
                .finally(function() {
                    ++day;
                    vm.loading = false;
                });
        }

    }
})();