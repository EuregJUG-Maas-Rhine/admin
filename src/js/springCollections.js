/* 
 * Copyright 2016 EuregJUG.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define([], function () {
    function SpringCollections() {
        var self = this;

        /**
         * A function that translates org.springframework.data.domain.Page results 
         * to oj.Collection.
         * 
         * @param {type} response
         * @returns 
         */
        self.mapCollectionsToDataArguments = function (response) {
            return {
                totalResults: response['totalElements'],
                limit: response['size'],
                count: response['numberOfElements'],
                hasMore: !response['last'],
                offset: response['number'] * response['size']
            };
        };

        /**
         * A function that transforms oj.Collections option to the format of an
         * endpoint of an API that takes org.springframework.data.domain.Pageable
         * parameter.
         * 
         * @param {type} operation
         * @param {type} col
         * @param {type} options
         * @returns {String}
         */
        self.mapCollectionURLToDataURL = function (operation, col, options) {
            var rv = null;            
            if (operation === 'read') {
                rv = options.context.url
                        + '?size=' + options.fetchSize
                        + '&page=' + (options.startIndex / options.fetchSize)
                        + '&sort=' + options.sort + ',' + options.sortDir;
            }
            return rv;
        };
        
        /**
         * Extracts the content from a org.springframework.data.domain.Page result
         * @param {type} response
         * @returns {unresolved}
         */
        self.extractContent = function(response) {
            return response['content'];
        };
    }
    return new SpringCollections();
});