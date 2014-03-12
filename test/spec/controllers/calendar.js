'use strict';
describe('Controller:CalendarCtrl', function () {
    //Date Objects needed for event
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
    var scope, $compile, $locale, $controller, CalendarCtrl, calendar;

    beforeEach(module('ui.calendar'));
    beforeEach(module('theBossApp'));

    beforeEach(inject(function (_$compile_,_$controller_, _$rootScope_,_$locale_,Calendar) {
        scope = _$rootScope_.$new();
        $compile = _$compile_;
        $controller = _$controller_;
        $locale = _$locale_;

        calendar = Calendar;
        var res = spyOn(calendar, 'getMonthEvents').andReturn([{id:123,title:'Title'}]);
        CalendarCtrl = $controller('CalendarCtrl', {
            $scope: scope,
            Calendar:calendar
        });
    }));


    it('expects the calendar to load current month calendar by default', function() {
        expect(scope.events.length).toBe(1);
    });

    describe('expecting that calendar on event drop to check if the day and time slot is available', function(){
        beforeEach(function(){
            spyOn(calendar, 'isSlotAvailable').andReturn({isAvailable:false,reason:'The error'});
            scope.alertOnDrop({date:date,title:'Title event'}, 1, 0, true, function(){}, null, null, null);
        })
        it('expect to show aflert if new time slot is not avilable on new event drop', function() {
            expect(scope.alertMessage).toBe(('The error'));
        });
    });
});