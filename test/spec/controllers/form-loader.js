'use strict';

describe('Controller: FormLoaderCtrl', function () {

  // load the controller's module
  beforeEach(module('theBossApp'));

  var FormLoaderCtrl,
    scope,
    $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    scope = $rootScope.$new();
    FormLoaderCtrl = $controller('FormLoaderCtrl', {
      $scope: scope
    });
  }));

//  it('should attach a list of awesomeThings to the scope', function () {
//    expect(scope.awesomeThings).toBeUndefined();
//    $httpBackend.flush();
//    expect(scope.awesomeThings.length).toBe(4);
//  });
});
