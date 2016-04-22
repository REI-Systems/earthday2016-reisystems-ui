"use strict";

describe('home.controller', function() {
  var _scope;
  var CONTROLLER_NAME = 'HomeCtrl as hwCtrl';

  beforeEach(module('app'));

  beforeEach(inject(function($injector) {
    _scope = $injector.get('$rootScope').$new();
  }));

  describe('init', function() {
    it('should be initialized correctly', inject(function ($controller) {
      $controller(CONTROLLER_NAME, {$scope: _scope});
    }));
  });
});
