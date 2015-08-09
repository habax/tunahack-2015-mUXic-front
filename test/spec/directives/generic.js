'use strict';

describe('Directive: generic', function () {

  // load the directive's module
  beforeEach(module('muxicApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<generic></generic>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the generic directive');
  }));
});
