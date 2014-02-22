'use strict';

describe('Directive: fieldDirective', function () {

  // load the directive's module
  beforeEach(module('theBossApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<field-directive></field-directive>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the fieldDirective directive');
  }));
});
