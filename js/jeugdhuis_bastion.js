angular.module('providers', []);
angular.module('services', []);
angular.module('controllers', []);

angular.module('providers').provider('urlFactory', function() {
    var homeUrl = '/home';
    var werkingUrl = '/werking';
    var lidWordenUrl = '/lidWorden';
    var activiteitenUrl = '/activiteiten';
    var fotosUrl = '/fotos';
    var eventFotosUrl = '/fotos/:eventId';
    var eventFotoUrl = '/fotos/:eventId/:fotoId';
    var gastenboekUrl = '/gastenboek';
    var contactUrl = '/contact';

    this.getHomeUrl = function() {
        return homeUrl;
    };

    this.getWerkingUrl = function() {
        return werkingUrl;
    };

    this.getLidWordenUrl = function() {
        return lidWordenUrl;
    };

    this.getActiviteitenUrl = function() {
        return activiteitenUrl;
    };

    this.getFotosUrl = function() {
        return fotosUrl;
    };

    this.getEventFotosUrl = function() {
        return eventFotosUrl;
    };

    this.getEventFotoUrl = function() {
        return eventFotoUrl;
    };

    this.getGastenboekUrl = function() {
        return gastenboekUrl;
    };

    this.getContactUrl = function() {
        return contactUrl;
    };

    this.$get = function($window) {
        return {
            getHomeUrl: function() {
                return "#" + homeUrl;
            },
            getWerkingUrl: function() {
                return "#" + werkingUrl;
            },
            getLidWordenUrl: function() {
                return "#" + lidWordenUrl;
            },
            getActiviteitenUrl: function() {
                return "#" + activiteitenUrl;
            },
            getFotosUrl: function() {
                return "#" + fotosUrl;
            },
            getEventFotosUrl: function(eventId) {
                var url = "#" + eventFotosUrl;
                url = url.replace(":eventId", eventId);
                return url;
            },
            getEventFotoUrl: function(eventId, fotoId) {
                var url = "#" + eventFotoUrl;
                url = url.replace(":eventId", eventId).replace(":fotoId", fotoId);
                return url;
            },
            getGastenboekUrl: function() {
                return "#" + gastenboekUrl;
            },
            getContactUrl: function() {
                return "#" + contactUrl;
            }
        };
    };
});

angular.module('services').factory('menuFactory', function() {
    var activePage = 'home';

    return {
        isActivePage: function(page) {
            return activePage === page;
        },
        setActivePage: function(page) {
            activePage = page;
        }
    };
}).factory('dateFactory', function() {
    var monthNames = [
        "Januari", "Februari", "Maart",
        "April", "Mei", "Juni", "Juli",
        "Augustus", "September", "Oktober",
        "November", "December"
    ];

    return {
        parseDateToLongFormat: function(dateString) {
            if (!!dateString) {
                var dateParts = dateString.split("/");

                if (dateParts.length == 1) {
                    return dateParts[0];
                } else if (dateParts.length == 2) {
                    return monthNames[dateParts[0] - 1] + ' ' + dateParts[1];
                } else if (dateParts.length == 3) {
                    return dateParts[1] + ' ' + monthNames[dateParts[0] - 1] + ' ' + dateParts[2];
                } else {
                    return undefined;
                }
            } else {
                return undefined;
            }
        }
    };
});

angular.module('controllers').controller('activiteitenController', ['$http', 'menuFactory', 'dateFactory',
    function($http, menuFactory, dateFactory) {
        var activiteitenModel = this;

        menuFactory.setActivePage('activiteiten');

        initialize();

        /**
         * Model functions
         */

        activiteitenModel.getDate = function(date) {
            return dateFactory.parseDateToLongFormat(date);
        };

        /**
         * Helper functions
         */

        function initialize() {
            hideModalBackdrop();

            getUpcomingEvents();
        }

        function getUpcomingEvents() {
            $http.get("data/activiteiten/upcomingevents.json", {
                cache: true
            }).success(function(result) {
                activiteitenModel.upcomingEvents = [];
                var eventsWithoutDate = [];

                for (var i = 0; i < result.upcomingevents.length; i++) {
                    var eventDate = new Date(result.upcomingevents[i].date).setHours(0, 0, 0, 0);
                    var yesterday = new Date();
                    yesterday.setDate(yesterday.getDate() - 1);
                    yesterday.setHours(0, 0, 0, 0);

                    if (!!eventDate) {
                        if (eventDate >= yesterday) {
                            activiteitenModel.upcomingEvents.push(result.upcomingevents[i]);
                        }
                    } else {
                        eventsWithoutDate.push(result.upcomingevents[i]);
                    }
                }

                sortUpcomingEventsByDate(activiteitenModel.upcomingEvents);

                for (var j = 0; j < eventsWithoutDate.length; j++) {
                    activiteitenModel.upcomingEvents.push(eventsWithoutDate[j]);
                }
            });
        }

        function sortUpcomingEventsByDate(upcomingEvents) {
            upcomingEvents.sort(function(upcomingEvent1, upcomingEvent2) {
                return new Date(upcomingEvent1.date) - new Date(upcomingEvent2.date);
            });
        }

        function hideModalBackdrop() {
            $('.modal-backdrop').remove();
        }
    }
]);

angular.module('controllers').controller('contactController', ['$http', 'menuFactory',
    function($http, menuFactory) {
        var contactModel = this;

        menuFactory.setActivePage('contact');

        initialize();

        /**
         * Model functions
         */

        contactModel.sendMail = function() {
            var subject = contactModel.mailForm.subject;
            var body = contactModel.mailForm.message;
            if (!!body) {
                body = body.replace('\n', '%0D%0A');
            }

            var a = document.createElement('a');
            a.href = "mailto:jeugdhuisbrecht@gmail.com?subject=" + subject + "&body=" + body;
            var clickEvent = document.createEvent("MouseEvents");
            clickEvent.initEvent("click", true, true);
            a.dispatchEvent(clickEvent);

            /*$http.post('php/sendMail.php', JSON.stringify(contactModel.mailModel))
                .success(
                    function(data) {
                        alert('Mail sent!');
                    })
                .error(
                    function(data) {
                        alert('Unable to sent mail!');
                    });*/
        };

        /**
         * Helper functions
         */

        function initialize() {
            hideModalBackdrop();

            createMailModel();
        }

        function createMailModel() {
            contactModel.mailForm = {};
            contactModel.mailForm.subject = '';
            contactModel.mailForm.message = '';
        }

        function hideModalBackdrop() {
            $('.modal-backdrop').remove();
        }
    }
]);

angular.module('controllers').controller('eventFotoController', ['$http', '$routeParams', 'menuFactory',
    function($http, $routeParams, menuFactory) {
        var eventFotoModel = this;

        menuFactory.setActivePage('fotos');

        initialize();

        /**
         * Model functions
         */

        /**
         * Helper functions
         */

        function initialize() {
            hideModalBackdrop();

            eventFotoModel.eventId = $routeParams.eventId;
            eventFotoModel.fotoId = $routeParams.fotoId;

            if (!!eventFotoModel.fotoId) {
                eventFotoModel.fotoName = atob(eventFotoModel.fotoId);
            }

            getEvent();
        }

        function getEvent() {
            $http.get("data/fotos/" + eventFotoModel.eventId + "/" + eventFotoModel.eventId + ".json", {
                cache: true
            }).success(function(result) {
                eventFotoModel.eventTitle = result.title;
            });
        }

        function hideModalBackdrop() {
            $('.modal-backdrop').remove();
        }
    }
]);

angular.module('controllers').controller('eventFotosController', ['$http', '$routeParams', 'menuFactory', 'urlFactory',
    function($http, $routeParams, menuFactory, urlFactory) {
        var eventFotosModel = this;

        menuFactory.setActivePage('fotos');

        initialize();

        var activeImageIndex = 0;

        /**
         * Model functions
         */

        eventFotosModel.showImageDetails = function(imageIndex) {
            showImage(imageIndex);
            showModal();
        };

        eventFotosModel.hideModal = function() {
            hideModal();
        };

        eventFotosModel.lowerIndex = function() {
            if (activeImageIndex === 0) {
                activeImageIndex = eventFotosModel.eventImages.length - 1;
            } else {
                activeImageIndex--;
            }
            showImage(activeImageIndex);
        };

        eventFotosModel.higherIndex = function() {
            if (activeImageIndex == eventFotosModel.eventImages.length - 1) {
                activeImageIndex = 0;
            } else {
                activeImageIndex++;
            }
            showImage(activeImageIndex);
        };

        /**
         * Helper functions
         */

        function initialize() {
            hideModalBackdrop();

            eventFotosModel.eventId = $routeParams.eventId;
            getEvent();
        }

        function getEvent() {
            $http.get("data/fotos/" + eventFotosModel.eventId + "/" + eventFotosModel.eventId + ".json", {
                cache: true
            }).success(function(result) {
                eventFotosModel.eventTitle = result.title;
                eventFotosModel.eventImages = result.images;
            });
        }

        function showImage(imageIndex) {
            eventFotosModel.selectedImage = {};
            eventFotosModel.selectedImage.imageDetailName = eventFotosModel.eventImages[imageIndex].name;
            eventFotosModel.selectedImage.imageUrlFull = window.location.origin + "/" + urlFactory.getEventFotoUrl(eventFotosModel.eventId, btoa(eventFotosModel.eventImages[imageIndex].name));
            eventFotosModel.selectedImage.imageUrl = urlFactory.getEventFotoUrl(eventFotosModel.eventId, btoa(eventFotosModel.eventImages[imageIndex].name));
        }

        function showModal() {
            $('#imageDetailModal').modal('show');
            hideModalBackdrop();
        }

        function hideModal() {
            $('#imageDetailModal').modal('hide');
        }

        function hideModalBackdrop() {
            $('.modal-backdrop').remove();
        }
    }
]);

angular.module('controllers').controller('fotosController', ['$http', 'menuFactory', 'urlFactory', 'dateFactory',
    function($http, menuFactory, urlFactory, dateFactory) {
        var fotosModel = this;

        menuFactory.setActivePage('fotos');

        initialize();

        /**
         * Model functions
         */

        fotosModel.goToEvent = function(eventId) {
            return urlFactory.getEventFotosUrl(eventId);
        };

        fotosModel.getDate = function(date) {
            return dateFactory.parseDateToLongFormat(date);
        };

        /**
         * Helper functions
         */

        function initialize() {
            hideModalBackdrop();

            getEvents();
        }

        function getEvents() {
            $http.get("data/fotos/events.json", {
                cache: true
            }).success(function(result) {
                sortEventsByDate(result.events);
                fotosModel.events = result.events;
            });
        }

        function sortEventsByDate(events) {
            events.sort(function(event1, event2) {
                return new Date(event2.date) - new Date(event1.date);
            });
        }

        function hideModalBackdrop() {
            $('.modal-backdrop').remove();
        }
    }
]);

angular.module('controllers').controller('gastenboekController', ['menuFactory',
    function(menuFactory) {
        var gastenboekModel = this;

        menuFactory.setActivePage('gastenboek');

        initialize();

        /**
         * Helper functions
         */

        function initialize() {
            hideModalBackdrop();
        }

        function hideModalBackdrop() {
            $('.modal-backdrop').remove();
        }
    }
]);

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

angular.module('controllers').controller('indexController', ['urlFactory', 'menuFactory',
    function(urlFactory, menuFactory) {
        var indexModel = this;

        initialize();

        /**
         * Model functions
         */

        indexModel.goToHome = function() {
            return urlFactory.getHomeUrl();
        };

        indexModel.goToWerking = function() {
            return urlFactory.getWerkingUrl();
        };

        indexModel.goToLidWorden = function() {
            return urlFactory.getLidWordenUrl();
        };

        indexModel.goToActiviteiten = function() {
            return urlFactory.getActiviteitenUrl();
        };

        indexModel.goToFotos = function() {
            return urlFactory.getFotosUrl();
        };

        indexModel.goToGastenboek = function() {
            return urlFactory.getGastenboekUrl();
        };

        indexModel.goToContact = function() {
            return urlFactory.getContactUrl();
        };

        indexModel.isActivePage = function(page) {
            return menuFactory.isActivePage(page);
        };

        /**
         * Helper functions
         */

        function initialize() {
            hideModalBackdrop();
        }

        function hideModalBackdrop() {
            $('.modal-backdrop').remove();
        }
    }
]);

angular.module('controllers').controller('lidWordenController', ['menuFactory',
    function(menuFactory) {
        var lidWordenModel = this;

        menuFactory.setActivePage('lidWorden');

        initialize();

        /**
         * Helper functions
         */

        function initialize() {
            hideModalBackdrop();
        }

        function hideModalBackdrop() {
            $('.modal-backdrop').remove();
        }
    }
]);

angular.module('controllers').controller('werkingController', ['menuFactory',
    function(menuFactory) {
        var werkingModel = this;

        menuFactory.setActivePage('werking');

        initialize();

        /**
         * Helper functions
         */

        function initialize() {
            hideModalBackdrop();
        }

        function hideModalBackdrop() {
            $('.modal-backdrop').remove();
        }
    }
]);

var bastionApp = angular.module('bastionApp', ['ngRoute', 'ngAnimate', 'providers', 'services', 'controllers', 'ui.bootstrap']);

bastionApp.config(['$routeProvider', 'urlFactoryProvider',
    function($routeProvider, urlFactoryProvider) {
        $routeProvider.when(urlFactoryProvider.getHomeUrl(), {
            templateUrl: 'templates/home.html',
            controller: 'homeController',
            controllerAs: 'homeModel'
        }).when(urlFactoryProvider.getWerkingUrl(), {
            templateUrl: 'templates/werking.html',
            controller: 'werkingController',
            controllerAs: 'werkingModel'
        }).when(urlFactoryProvider.getLidWordenUrl(), {
            templateUrl: 'templates/lidWorden.html',
            controller: 'lidWordenController',
            controllerAs: 'lidWordenModel'
        }).when(urlFactoryProvider.getActiviteitenUrl(), {
            templateUrl: 'templates/activiteiten.html',
            controller: 'activiteitenController',
            controllerAs: 'activiteitenModel'
        }).when(urlFactoryProvider.getFotosUrl(), {
            templateUrl: 'templates/fotos.html',
            controller: 'fotosController',
            controllerAs: 'fotosModel'
        }).when(urlFactoryProvider.getEventFotosUrl(), {
            templateUrl: 'templates/eventFotos.html',
            controller: 'eventFotosController',
            controllerAs: 'eventFotosModel'
        }).when(urlFactoryProvider.getEventFotoUrl(), {
            templateUrl: 'templates/eventFoto.html',
            controller: 'eventFotoController',
            controllerAs: 'eventFotoModel'
        }).when(urlFactoryProvider.getGastenboekUrl(), {
            templateUrl: 'templates/gastenboek.html',
            controller: 'gastenboekController',
            controllerAs: 'gastenboekModel'
        }).when(urlFactoryProvider.getContactUrl(), {
            templateUrl: 'templates/contact.html',
            controller: 'contactController',
            controllerAs: 'contactModel'
        }).otherwise({
            templateUrl: 'templates/home.html',
            controller: 'homeController',
            controllerAs: 'homeModel'
        });
    }
]);
