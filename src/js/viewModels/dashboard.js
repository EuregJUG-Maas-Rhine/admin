define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojtable', 'ojs/ojcollectiontabledatasource', 'ojs/ojchart'],
        function (oj, ko, $) {

            function DashboardViewModel() {
                var self = this;
                self.serviceURL = 'https://euregjug.cfapps.io/api/system/metrics';

                self.barSeriesValue = ko.observableArray([]);
                self.barGroupsValue = ko.observableArray([]);

                $.ajax({url: self.serviceURL})
                .done(function (metrics) {
                    var counterPrefix = 'counter.status.200.';
                    var resources = [];
                    for (var property in metrics) {
                        if (metrics.hasOwnProperty(property) && property.startsWith(counterPrefix)) {
                            var name = property.replace(counterPrefix, '');
                            resources.push({name: name, values: [metrics[property], metrics['gauge.response.' + name]]});
                        }
                    }
                    resources.sort(function (a, b) {
                        return b.values[0] - a.values[0];
                    });
                    resources = resources.slice(0, 10);

                    self.barGroupsValue(resources.map(function (obj) {
                        return obj.name;
                    }));

                    var totalNumberOfRequestsSeries = {
                        name: oj.Translations.getTranslatedString('totalNumberOfRequests'),
                        type: 'bar',
                        items: resources.map(function (obj) {
                            return obj.values[0];
                        })
                    };
                    var lastResponseTimeSeries = {
                        name: oj.Translations.getTranslatedString('lastResponseTime'),
                        type: 'line',
                        items: resources.map(function (obj) {
                            return obj.values[1];
                        })
                    };
                    self.barSeriesValue([totalNumberOfRequestsSeries, lastResponseTimeSeries]);
                });

            }

            /*
             * Returns a constructor for the ViewModel so that the ViewModel is constrcuted
             * each time the view is displayed.  Return an instance of the ViewModel if
             * only one instance of the ViewModel is needed.
             */
            return new DashboardViewModel();
        }
);
