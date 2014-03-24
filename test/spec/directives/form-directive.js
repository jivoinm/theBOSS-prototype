'use strict';

describe('Directive: formDirective', function () {

    // load the directive's module
    beforeEach(module('theBossApp'));

    var element, scope, frmService,httpMock,compile,dlg;

    beforeEach(inject(function ($rootScope,$httpBackend,FormService,$compile,$dialogs) {
        scope = $rootScope.$new();
        httpMock = $httpBackend;
        frmService = FormService;
        compile = $compile;
        dlg = $dialogs;
        element = angular.element('<div formname="myform" form-directive></div>');
    }));

    afterEach(function() {
        httpMock.verifyNoOutstandingExpectation();
        httpMock.verifyNoOutstandingRequest();
    });

    it("should verify if the form with the name set already exists and if not ask to be created", function (){
        httpMock.expectGET('/views/directive-templates/form/form.html').respond('something');
        httpMock.expectGET('/api/form/myform').respond(null);
        element = compile(element)(scope);
        scope.$digest();
        httpMock.flush();
        spyOn(dlg, "confirm").andCallThrough();
        expect(scope.form).toBe({form_name: 'myform', module: 'myform',form_fields:[]});
    });

});
