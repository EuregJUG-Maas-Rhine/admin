/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your application specific code will go here
 */
define(['ojs/ojcore', 'knockout', 'jso', 'ojs/ojrouter', 'ojs/ojknockout', 'ojs/ojarraytabledatasource',
    'ojs/ojoffcanvas'],
        function (oj, ko, JSO) {
            function ControllerViewModel() {
                var self = this;

                // Check OAuth Token
                var location = window.location;
                self.jso = new JSO({
                    providerID: "euregjug",
                    client_id: "euregjug-admin-app",
                    authorization: "https://euregjug.cfapps.io/oauth/authorize",
                    redirect_uri: location.protocol + '//' + location.host + location.pathname,
                    scopes: {request: ["read", "write"]}
                });
                self.jso.callback();

                // Media queries for repsonsive layouts
                var smQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
                self.smScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);
                var mdQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.MD_UP);
                self.mdScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(mdQuery);

                // Router setup
                self.router = oj.Router.rootInstance;
                self.router.configure({
                    'dashboard': {label: oj.Translations.getTranslatedString('dashboard'), isDefault: true},
                    'posts': {label: oj.Translations.getTranslatedString('posts')},
                    'events': {label: oj.Translations.getTranslatedString('events')}
                });
                oj.Router.defaults['urlAdapter'] = new oj.Router.urlParamAdapter();

                // Navigation setup
                var navData = [
                    {name: oj.Translations.getTranslatedString('dashboard'), id: 'dashboard',
                        iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-chart-icon-24'},
                    {name: oj.Translations.getTranslatedString('posts'), id: 'posts',
                        iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-library-icon-24'},
                    {name: oj.Translations.getTranslatedString('events'), id: 'events',
                        iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-fire-icon-24'}
                ];
                self.navDataSource = new oj.ArrayTableDataSource(navData, {idAttribute: 'id'});

                // Drawer
                // Called by nav drawer option change events so we can close drawer after selection
                self.navChangeHandler = function (event, data) {
                    if (data.option === 'selection' && data.value !== self.router.stateId()) {
                        self.toggleDrawer();
                    }
                };
                // Close offcanvas on medium and larger screens
                self.mdScreen.subscribe(function () {
                    oj.OffcanvasUtils.close(self.drawerParams);
                });
                self.drawerParams = {
                    displayMode: 'push',
                    selector: '#navDrawer',
                    content: '#pageContent'
                };
                // Called by navigation drawer toggle button and after selection of nav drawer item
                self.toggleDrawer = function () {
                    return oj.OffcanvasUtils.toggle(self.drawerParams);
                };

                // Header
                // Application Name used in Branding Area
                self.appName = ko.observable("EuregJUG Admin App");
                self.currentYear = ko.observable(new Date().getFullYear());
             
                var token = self.jso.checkToken();
                self.loggedIn = ko.observable(token !== null);
                self.labelButtonLogin = ko.pureComputed(function () {
                    return oj.Translations.getTranslatedString(self.loggedIn() ? 'logout' : 'login');
                });
                self.login = function () {
                    if (self.loggedIn()) {
                        self.jso.wipeTokens();
                        self.loggedIn(false);
                    } else {
                        
                        self.jso.getToken(
                                function (token) {},
                                {}
                        );
                        self.loggedIn(true);
                    }
                };

                // Footer
                function footerLink(name, id, linkTarget) {
                    this.name = name;
                    this.linkId = id;
                    this.linkTarget = linkTarget;
                }
                self.footerLinks = ko.observableArray([
                    new footerLink('Sources', 'sources', 'https://github.com/euregJUG-Maas-Rhine/admin'),
                    new footerLink('EuregJUG', 'euregjug', 'http://www.euregjug.eu')
                ]);
            }

            return new ControllerViewModel();
        }
);
