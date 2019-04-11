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

    it("I open the Copart website", function () {
        return driver.get("https://www.copart.com/");
    });


    it("The page contains Copart title", function () {
        //tyrin to verify the page title with manual promise
        return driver.getTitle().then(function (title) {
            assert.equal(title, "Auto Auction - Copart USA - Salvage Cars For Sale");
        });
    });

    it("Selects Exotic, and looks for Porsche"), function (){
        //selector for exotics '//div[@id="tabTrending"]//li//a[contains(text(),"Exotics")]'
    }

});
