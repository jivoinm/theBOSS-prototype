'use strict';

describe('Directive: formDirective', function () {

  // load the directive's module
  beforeEach(module('theBossApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<form-directive></form-directive>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the formDirective directive');
  }));
});
