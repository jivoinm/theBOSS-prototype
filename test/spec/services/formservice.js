'use strict';

describe('Service: Formservice', function () {

  // load the service's module
  beforeEach(module('theBossApp'));

  // instantiate service
  var FormService;
  beforeEach(inject(function (_FormService_) {
    FormService = _FormService_;
  }));

  it('should do something', function () {
    expect(!!FormService).toBe(true);
  });

});
