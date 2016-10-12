define(['ojs/ojcore', 'knockout', 'moment', 'appController', 'springCollections', 'ojs/ojtable', 'ojs/ojlistview', 'ojs/ojbutton', 'ojs/ojcollectiontabledatasource', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata'],
        function (oj, ko, moment, app, springCollections) {

            function EventsViewModel() {
                var self = this;

                self.serviceURL = 'https://euregjug.cfapps.io/api/events';
                self.datasource = ko.observable();
                self.registrationDatasource = ko.observable();
                self.selectedEventName = ko.observable();
                self.numberOfRegistrationsForSelectedEvent = ko.observable();
                self.registrationsTitle = ko.pureComputed(function () {
                    return oj.Translations.getTranslatedString('registrationsTitle', {
                        'num': self.numberOfRegistrationsForSelectedEvent(),
                        'event': self.selectedEventName()
                    });
                })
                function parseEvent(response) {
                    return {
                        id: response.id,
                        heldOn: oj.IntlConverterUtils.dateToLocalIso(moment(response.heldOn).toDate()),
                        name: response.name,
                        description: response.description,
                        speaker: response.speaker,
                        title: response.speaker === undefined ? response.name : response.speaker + ': ' + response.name
                    };
                }
                ;
                var Event = oj.Model.extend({
                    idAttribute: 'id',
                    parse: parseEvent
                });
                var EventCollection = oj.Collection.extend({
                    url: self.serviceURL,
                    customURL: springCollections.mapCollectionURLToDataURL,
                    customPagingOptions: springCollections.mapCollectionsToDataArguments,
                    parse: springCollections.extractContent,
                    model: new Event(),
                    fetchSize: 10,
                    comparator: 'heldOn',
                    sortDirection: -1
                });

                var Registration = oj.Model.extend({});
                var RegistrationCollection = oj.Collection.extend({
                    model: new Registration(),
                    oauth: app.oauth,
                    comparator: 'name',
                    sortDirection: 1
                });

                self.gotoList = function (event, ui) {
                    $("#listview").ojListView("option", "currentItem", null);
                    self.slide();
                };
                self.gotoContent = function (event, ui) {
                    if (ui.option === 'currentItem' && ui.value !== null) {
                        if (!app.loggedIn()) {
                            alert(oj.Translations.getTranslatedString("pleaseLogin"));
                        } else {

                            var rv = new RegistrationCollection([], {url: self.serviceURL + '/' + ui.value + '/registrations'});
                            self.datasource().get(ui.value).then(function (elem) {
                                self.selectedEventName(elem.data.title);
                            });
                            self.registrationDatasource(new oj.CollectionTableDataSource(rv));
                            rv.fetch({success: function () {
                                    self.numberOfRegistrationsForSelectedEvent(rv.size());
                                    self.slide();
                                }});
                        }
                    }
                };
                self.slide = function () {
                    $("#page1").toggleClass("hide");
                    $("#page2").toggleClass("hide");
                };

                self.datasource(new oj.CollectionTableDataSource(new EventCollection()));
            }

            return new EventsViewModel();
        }
);
