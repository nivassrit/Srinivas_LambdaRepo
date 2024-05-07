import { expect } from "@playwright/test";
//import test from "../lambdatest-setup";
  import test from '@playwright/test'
const userData = {
  Url: "https://www.lambdatest.com/selenium-playground/",
  Welcome_Msg: "Welcome to LambdaTest",
  User_Name: "Srinivasu Thaninki",
  Email: "nivas.sri@yahoo.com",
  Password: "Test@123",
  State: "Texas",
  ZIP_Code: "75002",
  Success_Msg: "Thanks for contacting us, we will get back to you shortly.",
  Company: "XYZ Company",
  Website: "www.xyz.com",
  Country: "United States",
  City: "Texas",
  Address1: "Happy Street",
  Address2: "Near to Xmart mall",
};

test.describe("PlayWright Assignment Test Scenarios", async () => {
  test.beforeEach(async ({ page }) => {
    test.step("Launch Application ", async () => {
      await page.goto(userData.Url);
      await page.waitForLoadState("domcontentloaded");
    });
  });

  test.only("Lambda101 Test Scenario 1", async ({ page }) => {
    await page.getByRole("link", { name: "Simple Form Demo" }).click();
    await page.getByPlaceholder("Please enter your Message").fill(userData.Welcome_Msg);
    await page.getByRole("button", { name: "Get Checked Value" }).click();
    await expect(page.locator("#message")).toHaveText(userData.Welcome_Msg);
  });

  test("Lambda101 Test Scenario 2", async ({ page }) => {
    await page.getByRole("link", { name: "Drag & Drop Sliders" }).click();
    await page.waitForSelector("#slider3");
    let defaultValTxt = await page.locator("#rangeSuccess").innerText();
    expect(defaultValTxt).toBe("15");
    await page.locator("#slider3").getByRole("slider").fill("95");
    let afterValTxt = await page.locator("#rangeSuccess").innerText();
    expect(afterValTxt).toBe("95");
  });

  test("Lambda101 Test Scenario 3", async ({ page }) => {
    await page.getByRole("link", { name: "Input Form Submit" }).click();
    await page.getByRole("button", { name: "Submit" }).click();
    await page.getByPlaceholder("Name", { exact: true }).fill(userData.User_Name);
    await page.getByPlaceholder("Email", { exact: true }).fill(userData.Email);
    await page.getByPlaceholder("Password").fill(userData.Password);
    await page.getByPlaceholder("Company").fill(userData.Company);
    await page.getByPlaceholder("Website").fill(userData.Website);
    await page.getByRole("combobox").selectOption(userData.Country);
    await page.getByPlaceholder("City").fill(userData.City);
    await page.getByPlaceholder("Address 1").fill(userData.Address1);
    await page.getByPlaceholder("Address 2").fill(userData.Address2);
    await page.getByPlaceholder("State").fill(userData.State);
    await page.getByPlaceholder("Zip code").fill(userData.ZIP_Code);
    await page.getByRole("button", { name: "Submit" }).click();
    await page.waitForTimeout(2000);
    const successMessage = await page
      .locator('//*[contains(@class,"loginform")]//p')
      .textContent();
    expect(successMessage).toBe(userData.Success_Msg);
  });
});
