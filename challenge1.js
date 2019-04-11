require('chromedriver');
var webdriver = require('selenium-webdriver');
var assert = require("chai").assert;

describe("challenge1 suite", function () {
    this.timeout(20000);
    var driver;

    before(function () {
        //init chrome driver
        driver = new webdriver.Builder()
            .withCapabilities(webdriver.Capabilities.chrome())
            .build();
    });

    after(function () {
        return driver.quit();
    });

    it("Should open the google website", function () {
        return driver.get("http://www.google.com");
    });

    it("The title is 'Google'", function () {
        //tyrin to verify the page title with manual promise
        return driver.getTitle().then(function (title) {
            assert.equal(title, "Google");
        });
    });

    it("The title is 'Google'", async function () {
        //tyrin to verify the page title with manual promise
        var title = await driver.getTitle();
        return assert.equal(title, "Google");
    });

    it("Should search Google for Porsche", async function () {
        var element = await driver.findElement(webdriver.By.name("q"));
        return element.sendKeys("Porsche" + webdriver.Key.ENTER)
    });

    it("Should assert 911 is in the list of results", async function(){
        await driver.wait(webdriver.until.titleContains("Porsche"), 5000);
        console.log(await driver.getTitle());
        var html = await driver.findElement(webdriver.By.tagName("body")).getAttribute("innerHTML");
        // console.log(html);
        return assert.include(html, "911");
    });


});
