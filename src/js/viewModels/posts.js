define(['ojs/ojcore', 'knockout', 'moment', 'springCollections', 'ojs/ojtable', 'ojs/ojpagingcontrol', 'ojs/ojpagingtabledatasource', 'ojs/ojcollectiontabledatasource', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata'],
        function (oj, ko, moment, springCollections) {

            function PostsViewModel() {
                var self = this;

                self.serviceURL = 'https://euregjug.cfapps.io/api/posts';
                self.datasource = ko.observable(); // datasource is an observable so when it is triggered/refreshed, the table component is triggered

                function parsePost(response) {
                    var publishedOn = moment(response.publishedOn);
                    return {
                        id: response.id,
                        publishedOn: oj.IntlConverterUtils.dateToLocalIso(publishedOn.toDate()),
                        title: response.title,
                        locale: response.locale,
                        link: 'http://www.euregjug.eu/' + publishedOn.format('YYYY/MM/DD') + '/' + response.slug
                    };
                }
                ;
                var event = oj.Model.extend({
                    parse: parsePost
                });

                self.createPermalink = function (context) {                    
                    var link = $(document.createElement('a'));
                    link.attr('href', context.row.link);
                    link.attr('target', 'blank');
                    link.append(oj.Translations.getTranslatedString('readPost'));
                    $(context.cellContext.parentElement).append(link);
                };

                var PostCollection = oj.Collection.extend({
                    url: self.serviceURL,
                    customURL: springCollections.mapCollectionURLToDataURL,
                    customPagingOptions: springCollections.mapCollectionsToDataArguments,
                    parse: springCollections.extractContent,
                    fetchSize: 10,
                    model: new event(),
                    comparator: 'publishedOn',
                    sortDirection: -1,                    
                });

                self.pagingDatasource = new oj.PagingTableDataSource(new oj.CollectionTableDataSource(new PostCollection()));
            }

            /*
             * Returns a constructor for the ViewModel so that the ViewModel is constrcuted
             * each time the view is displayed.  Return an instance of the ViewModel if
             * only one instance of the ViewModel is needed.
             */
            return new PostsViewModel();
        }
);
