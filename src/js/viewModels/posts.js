/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your incidents ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'moment', 'ojs/ojtable', 'ojs/ojpagingcontrol', 'ojs/ojpagingtabledatasource', 'ojs/ojcollectiontabledatasource'],
 function(oj, ko, $) {
  
    function IncidentsViewModel() {
      var self = this;

var deptArray = [{DepartmentId: 10015, DepartmentName: 'ADFPM 1001 neverending', LocationId: 200, ManagerId: 300},
       {DepartmentId: 556, DepartmentName: 'BB', LocationId: 200, ManagerId: 300},
       {DepartmentId: 10, DepartmentName: 'Administration', LocationId: 200, ManagerId: 300},
       {DepartmentId: 20, DepartmentName: 'Marketing', LocationId: 200, ManagerId: 300},
       {DepartmentId: 30, DepartmentName: 'Purchasing', LocationId: 200, ManagerId: 300},
       {DepartmentId: 40, DepartmentName: 'Human Resources1', LocationId: 200, ManagerId: 300},
       {DepartmentId: 50, DepartmentName: 'Administration2', LocationId: 200, ManagerId: 300},
       {DepartmentId: 60, DepartmentName: 'Marketing3', LocationId: 200, ManagerId: 300},
       {DepartmentId: 70, DepartmentName: 'Purchasing4', LocationId: 200, ManagerId: 300},
       {DepartmentId: 80, DepartmentName: 'Human Resources5', LocationId: 200, ManagerId: 300},
       {DepartmentId: 90, DepartmentName: 'Human Resources11', LocationId: 200, ManagerId: 300},
       {DepartmentId: 100, DepartmentName: 'Administration12', LocationId: 200, ManagerId: 300},
       {DepartmentId: 110, DepartmentName: 'Marketing13', LocationId: 200, ManagerId: 300},
       {DepartmentId: 120, DepartmentName: 'Purchasing14', LocationId: 200, ManagerId: 300},
       {DepartmentId: 130, DepartmentName: 'Human Resources15', LocationId: 200, ManagerId: 300},
       {DepartmentId: 1001, DepartmentName: 'ADFPM 1001 neverending', LocationId: 200, ManagerId: 300},
       {DepartmentId: 55611, DepartmentName: 'BB', LocationId: 200, ManagerId: 300},
       {DepartmentId: 1011, DepartmentName: 'Administration', LocationId: 200, ManagerId: 300},
       {DepartmentId: 2011, DepartmentName: 'Marketing', LocationId: 200, ManagerId: 300},
       {DepartmentId: 3011, DepartmentName: 'Purchasing', LocationId: 200, ManagerId: 300},
       {DepartmentId: 4011, DepartmentName: 'Human Resources1', LocationId: 200, ManagerId: 300},
       {DepartmentId: 5011, DepartmentName: 'Administration2', LocationId: 200, ManagerId: 300},
       {DepartmentId: 6011, DepartmentName: 'Marketing3', LocationId: 200, ManagerId: 300},
       {DepartmentId: 7011, DepartmentName: 'Purchasing4', LocationId: 200, ManagerId: 300},
       {DepartmentId: 8011, DepartmentName: 'Human Resources5', LocationId: 200, ManagerId: 300},
       {DepartmentId: 9011, DepartmentName: 'Human Resources11', LocationId: 200, ManagerId: 300},
       {DepartmentId: 10011, DepartmentName: 'Administration12', LocationId: 200, ManagerId: 300},
       {DepartmentId: 11011, DepartmentName: 'Marketing13', LocationId: 200, ManagerId: 300},
       {DepartmentId: 12011, DepartmentName: 'Purchasing14', LocationId: 200, ManagerId: 300},
       {DepartmentId: 13011, DepartmentName: 'Human Resources15', LocationId: 200, ManagerId: 300},
       {DepartmentId: 100111, DepartmentName: 'ADFPM 1001 neverending', LocationId: 200, ManagerId: 300},
       {DepartmentId: 55622, DepartmentName: 'BB', LocationId: 200, ManagerId: 300},
       {DepartmentId: 1022, DepartmentName: 'Administration', LocationId: 200, ManagerId: 300},
       {DepartmentId: 2022, DepartmentName: 'Marketing', LocationId: 200, ManagerId: 300},
       {DepartmentId: 3022, DepartmentName: 'Purchasing', LocationId: 200, ManagerId: 300},
       {DepartmentId: 4022, DepartmentName: 'Human Resources1', LocationId: 200, ManagerId: 300},
       {DepartmentId: 5022, DepartmentName: 'Administration2', LocationId: 200, ManagerId: 300},
       {DepartmentId: 6022, DepartmentName: 'Marketing3', LocationId: 200, ManagerId: 300},
       {DepartmentId: 7022, DepartmentName: 'Purchasing4', LocationId: 200, ManagerId: 300},
       {DepartmentId: 8022, DepartmentName: 'Human Resources5', LocationId: 200, ManagerId: 300},
       {DepartmentId: 9022, DepartmentName: 'Human Resources11', LocationId: 200, ManagerId: 300},
       {DepartmentId: 10022, DepartmentName: 'Administration12', LocationId: 200, ManagerId: 300},
       {DepartmentId: 11022, DepartmentName: 'Marketing13', LocationId: 200, ManagerId: 300},
       {DepartmentId: 12022, DepartmentName: 'Purchasing14', LocationId: 200, ManagerId: 300},
       {DepartmentId: 13022, DepartmentName: 'Human Resources15', LocationId: 200, ManagerId: 300}];
   self.pagingDatasource = new oj.PagingTableDataSource(new oj.ArrayTableDataSource(deptArray, {idAttribute: 'DepartmentId'}));

    }

    /*
     * Returns a constructor for the ViewModel so that the ViewModel is constrcuted
     * each time the view is displayed.  Return an instance of the ViewModel if
     * only one instance of the ViewModel is needed.
     */
    return new IncidentsViewModel();
  }
);
