'use strict';

angular.module('theBossApp')
  .directive('fieldDirective', ['$http','$compile', function ($http,$compile) {
        var getTemplateUrl = function(field) {
            var type = field.field_type;
            var templateUrl = '/views/directive-templates/field/'+type+'.html';
            
            return templateUrl;
        }

        var linker = function(scope, element) {
            // GET template content from path
            var templateUrl = getTemplateUrl(scope.field);
            switch(scope.field.field_type) {
            
                case 'date':
                    scope.show_calendar = false;
                    scope.openCalendar = function($event){
                        $event.preventDefault();
                        $event.stopPropagation();

                        scope.show_calendar = true;
                    }
                    break;
            }

            $http.get(templateUrl).success(function(data) {
                element.html(data);
                $compile(element.contents())(scope);
            });
        }

        return {
            template: '<div ng-cloak>{{field}}</div>',
            restrict: 'E',
            scope: {
                field:'='
            },
            link: linker
        };
  }]);
