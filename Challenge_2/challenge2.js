require('chromedriver');
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;
var assert = require("chai").assert;

describe("challenge2 suite", function () {
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

    it("Should open the copart website", function () {
        return driver.get("http://www.copart.com");
    });

    it("The title is 'Auto Auction - Copart USA - Salvage Cars For Sale'", function () {
        //tyrin to verify the page title with manual promise
        return driver.getTitle().then(function (title) {
            assert.equal(title, "Auto Auction - Copart USA - Salvage Cars For Sale");
        });
    });

    it("The title contains 'Auto Auction - Copart USA'", async function () {
        var title = await driver.getTitle();
        return assert.include(title, "Auto Auction - Copart USA");
    });

    it("Searches Copart for 'exotics'", async function () {
        var element = await driver.findElement(By.id('input-search'), 5000);
        return element.sendKeys('exotics' + webdriver.Key.ENTER)
    });


    it("Finds for 'PORSCHE' on the page", async function () {
        await driver.wait(until.titleContains('exotics'),5000);
        console.log(await driver.getTitle());
        var html = await driver.findElement(By.tagName('body')).getAttribute("innerHTML");
        return assert.include(html,'PORSCHE');
    });

});
