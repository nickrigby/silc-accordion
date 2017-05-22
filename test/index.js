var assert = require('assert'),
    test = require('selenium-webdriver/testing'),
    webdriver = require('selenium-webdriver');

var By = webdriver.By;

describe('silc accordion', function () {
    var driver;
    this.timeout(15000);

    before(function () {
        driver = new webdriver.Builder().
            withCapabilities(webdriver.Capabilities.chrome()).
            build();
    });

    test.it('accordion', function () {

        driver.get('http://localhost:9001');
    });

    test.it('accordion with first item open', function () {

        driver.get('http://localhost:9001');
    });

    test.it('accordion that transforms to tabs', function () {

        driver.get('http://localhost:9001');
    });

    test.it('accordion that are tabs', function () {

        driver.get('http://localhost:9001');
    });
});
