'use strict';

describe('Service: Formservice', function () {

  // load the service's module
  beforeEach(module('theBossApp'));

  // instantiate service
  var Formservice;
  beforeEach(inject(function (_Formservice_) {
    Formservice = _Formservice_;
  }));

  it('should do something', function () {
    expect(!!Formservice).toBe(true);
  });

});
