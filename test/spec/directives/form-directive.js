'use strict';

describe('Directive: formDirective', function () {

  // load the directive's module
  beforeEach(module('theBossApp'));

  var element, scope, FormService;

  beforeEach(inject(function ($rootScope,FormService) {
    scope = $rootScope.$new();
    FormService = FormService;
  }));

  describe('when created', function () {
      it('should try to load existing model', function () {
          var elm;
          //arrange
          scope.formname = 'TestForm';
          FormService.form(scope.formname).then()
          //act
          elm = compile(validHTML)(scope);
          //assert
          expect(elm.text()).toBe('Hello Test');
      });

      it('should watch for changes in the model', function () {
          var elm;
          
          //this is super brittle is there a better way!?
          elm = compile(validHTML)(scope);
          expect(elm.scope().$$watchers[0].exp).toBe('name');
          
          /* This version works fine when the scope is NOT isolated
          spyOn(scope, '$watch');
          elm = compile(validHTML)(scope);
          expect(scope.$watch.callCount).toBe(1);
          expect(scope.$watch).toHaveBeenCalledWith('name', jasmine.any(Function));
          */
      });
  });

});
