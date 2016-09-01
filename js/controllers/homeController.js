angular.module('controllers').controller('homeController', ['$http', 'menuFactory',
    function($http, menuFactory) {
        var homeModel = this;

        menuFactory.setActivePage('home');

        initialize();

        /**
         * Helper functions
         */

        function initialize() {
            getNewsFeed();

            hideModalBackdrop();
        }

        function getNewsFeed() {
            $http.get("data/newsfeed/newsfeed.json", {
                cache: true
            }).success(function(result) {
                homeModel.newsFeed = result.newsFeed;
            });
        }

        function hideModalBackdrop() {
            $('.modal-backdrop').remove();
        }
    }
]);
