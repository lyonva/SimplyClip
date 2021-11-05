import sys, os

os.chdir(os.path.dirname(__file__))
# sys.path.append(os.path.realpath(os.path.dirname(__file__)+"/src/test"))

from utils_test import get_driver, app_popup_page, get_control_key
import time

from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys


def test_copy():
    """
    Function:
        test_copy
    Description:
        Tests that the copy functionality works
    """
    print(sys.path)

    for i in range(5):
        driver = get_driver()
        assert "hide-div" not in driver.find_element_by_id("empty-div").get_attribute("class")
        # Navigate to a page and copy text
        driver.get(f"file://{os.path.dirname(__file__)}/testpage.html")
        text = driver.find_element_by_id("text1")
        ActionChains(driver).move_to_element_with_offset(text, 0, 0).click().key_down(
            Keys.SHIFT
        ).move_to_element_with_offset(text, 100, 0).click().key_up(Keys.SHIFT).perform()
        ActionChains(driver).key_down(get_control_key()).send_keys("c").key_up(get_control_key()).perform()
        # time.sleep(2)

        # Go pack to the page
        driver.get(app_popup_page)
        # time.sleep(2)
        assert "hide-div" in driver.find_element_by_id("empty-div").get_attribute("class")
