/*
 * Your dashboard ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'moment', 'appController', 'ojs/ojtable', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojrowexpander', 'ojs/ojcollectiontreedatasource', 'ojs/ojflattenedtreetabledatasource'],
        function (oj, ko, moment, app) {

            function EventsViewModel() {


                var self = this;

                self.serviceURL = 'https://euregjug.cfapps.io/api/events';
                self.datasource = ko.observable();

                function parseEvent(response) {
                    return {
                        id: response.id,
                        heldOn: oj.IntlConverterUtils.dateToLocalIso(moment(response.heldOn).toDate()),
                        name: response.name,
                        speaker: response.speaker === undefined ? '' : response.speaker,
                        needsRegistration: response.needsRegistration
                    };
                }
                ;
                var Event = oj.Model.extend({
                    parse: parseEvent
                });
                var EventCollection = oj.Collection.extend({
                    url: self.serviceURL,
                    model: new Event(),
                    comparator: 'heldOn',
                    sortDirection: -1,
                    parse: function (response) {
                        return response['content'];
                    }
                });

                function parseRegistration(response) {                    
                    return {
                        id: response.id,
                        heldOn: null,
                        name: response.name + (response.firstName !== undefined ? ', ' + response.firstName : ''),
                        speaker: '',
                        registration: true
                    };
                }
                ;
                var Registration = oj.Model.extend({
                    parse: parseRegistration
                });

                var RegistrationCollection = oj.Collection.extend({
                    model: new Registration(),
                    oauth: app.oauth,
                    comparator: 'id',
                    sortDirection: -1
                });

                function parseMetadata(model) {
                    var retObj = {};
                    retObj['key'] = (model.attributes.registration ? 'r-' : 'e-') + model.attributes.id;
                    retObj['leaf'] = !model.attributes.needsRegistration || model.attributes.registration || !app.loggedIn();
                    retObj['depth'] = model.attributes.registration ? 1 : 0;                                        
                    return retObj;
                }
                function childCollectionCallback(col, parent) {
                    var rv = new RegistrationCollection([], {url: self.serviceURL + '/' + parent.id + '/registrations'});                
                    return rv;
                };

                self.datasource(new oj.FlattenedTreeTableDataSource(
                        new oj.FlattenedTreeDataSource(
                                new oj.CollectionTreeDataSource({root: new EventCollection(), parseMetadata: parseMetadata, childCollectionCallback: childCollectionCallback}))));
            }

            /*
             * Returns a constructor for the ViewModel so that the ViewModel is constrcuted
             * each time the view is displayed.  Return an instance of the ViewModel if
             * only one instance of the ViewModel is needed.
             */
            return new EventsViewModel();
        }
);
