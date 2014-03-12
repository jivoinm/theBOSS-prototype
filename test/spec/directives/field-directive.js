'use strict';

describe('Directive: fieldDirective', function () {

    // load the directive's module
    beforeEach(module('theBossApp'));
    var element,
        httpMock,
        scope;



    beforeEach(inject(function ($rootScope,$httpBackend) {
        scope = $rootScope.$new();
        httpMock = $httpBackend;
        element = angular.element('<div field="field" field-directive></div>');
    }));

    afterEach(function() {
        httpMock.verifyNoOutstandingExpectation();
        httpMock.verifyNoOutstandingRequest();
    });

    it('should render text field type', inject(function ($compile) {
        httpMock.expectGET('/views/directive-templates/field/textfield.html').respond('<input type="text">');

        scope.field = {
            field_title: 'Text field',
            field_type: 'textfield'
        };

        element = $compile(element)(scope);
        scope.$digest();
        httpMock.flush();
        expect(element.html()).toContain('<input type="text"');
    }));
});
