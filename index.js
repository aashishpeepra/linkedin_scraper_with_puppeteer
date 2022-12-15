const puppeteer = require("puppeteer");
const { readJsonFromFile, writeJsonToFile } = require("./helpers");
const {ENV_DATA} = require("./constants");

async function get_active_browser() {
  try {
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
      slowMo: 10,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    return browser;
  } catch (err) {
    console.error(err);
    return false;
  }
}

async function login(browser) {
  try {
    const page = await browser.newPage();
    const LOGIN_URL = "https://www.linkedin.com/";
    await page.goto(LOGIN_URL, { timeout: 0 });
    await page.type("#session_key",ENV_DATA.EMAIL);
    await page.type("#session_password",ENV_DATA.PASSWORD);
    await page.keyboard.press("Enter");
    await page.waitForNavigation();
    const cookies = await page.cookies();
    //  These cookies can be loaded back while logging in just to prevent loggin in flow again and again
    return page;
  } catch (err) {
    console.error(err);
    return false;
  }
}

async function scrapeAlumni(page,academyUrl){
    await page.goto(academyUrl+"people/");  // Make sure you attach a leading / in your academy page like sample below
    await page.waitForNavigation();
}

async function linkedin_alumni_scraper(academyUrl) {
  const browser = await get_active_browser();
  const loggedInPage = await login(browser);
  await scrapeAlumni(loggedInPage,academyUrl);
  
}
//  just call this function with the name of college / academy URL from linkedin
linkedin_alumni_scraper("https://www.linkedin.com/school/harvard-university/")
