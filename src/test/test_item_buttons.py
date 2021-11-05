# From https://stackoverflow.com/questions/25827160/importing-correctly-with-pytest
# Change current working directory so test case can find the source files
import sys, os
os.chdir(os.path.dirname(__file__))
# sys.path.append(os.path.realpath(os.path.dirname(__file__)+"/src/test"))

from utils_test import get_driver, app_popup_page, get_control_key
import time

from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys

def test_edit():
    """
        Function:
            test_edit
        Description:
            Test the edit button.
    """
    driver = get_driver()

    # Turn the extension off
    toggle_button = driver.find_element_by_id("toggle-button")
    # toggle_button.click()

    # Navigate to a page and copy text
    driver.get(f"file://{os.path.dirname(__file__)}/testpage.html")
    text = driver.find_element_by_id("text1")
    ActionChains(driver).move_to_element_with_offset(text,0,0).click().key_down(Keys.SHIFT).move_to_element_with_offset(text,30,100).click().key_up(Keys.SHIFT).perform()
    ActionChains(driver).key_down(get_control_key()).send_keys('c').key_up(get_control_key()).perform()
    time.sleep(1)

    # Go pack to the page
    driver.get(app_popup_page)
    time.sleep(1)

    toggle_icon = driver.find_element_by_class_name("delete")
    toggle_icon.click()
    time.sleep(1)

    ActionChains(driver).send_keys('HELLO ').perform()
    time.sleep(2)

    ActionChains(driver).move_by_offset(0,0).click().perform()
    driver.close()


def test_delete():
    """
        Function:
            test_delete
        Description:
            Test the delete button.
    """
    driver = get_driver()

    # Turn the extension off
    toggle_button = driver.find_element_by_id("toggle-button")
    # toggle_button.click()

    # Navigate to a page and copy text
    driver.get(f"file://{os.path.dirname(__file__)}/testpage.html")
    text = driver.find_element_by_id("text1")
    ActionChains(driver).move_to_element_with_offset(text,0,0).click().key_down(Keys.SHIFT).move_to_element_with_offset(text,30,100).click().key_up(Keys.SHIFT).perform()
    ActionChains(driver).key_down(get_control_key()).send_keys('c').key_up(get_control_key()).perform()
    time.sleep(1)

    # Go pack to the page
    driver.get(app_popup_page)
    time.sleep(1)

    toggle_icon = driver.find_elements_by_class_name("delete")
    toggle_icon[1].click()
    time.sleep(1)

    ActionChains(driver).move_by_offset(0,0).click().perform()
    driver.close()
    
