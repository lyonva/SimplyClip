# From https://stackoverflow.com/questions/25827160/importing-correctly-with-pytest
# Change current working directory so test case can find the source files
import sys, os
os.chdir(os.path.dirname(__file__))
# sys.path.append(os.path.realpath(os.path.dirname(__file__)+"/src/test"))

from utils_test import get_driver, app_popup_page, app_id
import time
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys
import pyautogui


def test_copy_link():
    """
        Function:
            test_copy_link
        Description:
            Test if copy link context menu works
        Input:
            None
        Output:
            driver - A driver object
    """

    for i in range(3):
        driver = get_driver()
        assert "hide-div" not in driver.find_element_by_id("empty-div").get_attribute("class")
        driver.get(f"file://{os.path.dirname(__file__)}/testpage.html")
        link = driver.find_element_by_id("link1")
        action = ActionChains(driver)
        action.context_click(link).perform()
        time.sleep(0.2)
        pyautogui.press('down')
        time.sleep(0.2)
        pyautogui.press('down')
        time.sleep(0.2)
        pyautogui.press('down')
        time.sleep(0.2)
        pyautogui.press('down')
        time.sleep(0.2)
        pyautogui.press('down')
        time.sleep(0.2)
        pyautogui.press('down')
        time.sleep(0.2)
        pyautogui.press('enter')
        time.sleep(0.2)

        # Go back to the page
        driver.get(app_popup_page)
        # time.sleep(3)

        assert "hide-div" in driver.find_element_by_id("empty-div").get_attribute("class")

    driver.close()