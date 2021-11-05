# From https://stackoverflow.com/questions/25827160/importing-correctly-with-pytest
# Change current working directory so test case can find the source files
import sys, os
os.chdir(os.path.dirname(__file__))
# sys.path.append(os.path.realpath(os.path.dirname(__file__)+"/src/test"))

from utils_test import get_driver, app_popup_page, get_control_key
import time

from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys

def test_button_icon():
    """
        Function:
            test_button_icon
        Description:
            Test that the toggle icon changes after a click.
    """
    driver = get_driver()

    toggle_button = driver.find_element_by_id("toggle-button")
    toggle_icon = driver.find_element_by_id("toggle-button-icon")
    
    assert toggle_icon.get_attribute("class") == "icon_on"

    for i in range(10):
        toggle_button.click()
        time.sleep(0.2)
        assert toggle_icon.get_attribute("class") == "icon_off"

        toggle_button.click()
        time.sleep(0.2)
        assert toggle_icon.get_attribute("class") == "icon_on"

def test_toggle_on():
    """
        Function:
            test_toggle_off
        Description:
            Test that the toggle disables the extension.
            Check that it works when extension is re-enabled.
    """
    driver = get_driver()

    # Turn the extension off and then on
    toggle_button = driver.find_element_by_id("toggle-button")
    toggle_button.click()
    time.sleep(0.2)
    toggle_button.click()

    # Navigate to a page and copy text
    driver.get(f"file://{os.path.dirname(__file__)}/testpage.html")
    text = driver.find_element_by_id("text1")
    ActionChains(driver).move_to_element_with_offset(text,0,0).click().key_down(Keys.SHIFT).move_to_element_with_offset(text,100,0).click().key_up(Keys.SHIFT).perform()
    time.sleep(0.1)
    ActionChains(driver).key_down(get_control_key()).send_keys('c').key_up(get_control_key()).perform()
    time.sleep(0.1)

    # Go pack to the page
    driver.get(app_popup_page)
    time.sleep(0.1)

    assert "hide-div" in driver.find_element_by_id("empty-div").get_attribute("class")

def test_toggle_off():
    """
        Function:
            test_toggle_off
        Description:
            Test that the toggle disables the extension.
            Check that it does not work when extension is disabled.
    """
    driver = get_driver()

    # Turn the extension off
    toggle_button = driver.find_element_by_id("toggle-button")
    toggle_button.click()

    # Navigate to a page and copy text
    driver.get(f"file://{os.path.dirname(__file__)}/testpage.html")
    text = driver.find_element_by_id("text1")
    ActionChains(driver).move_to_element_with_offset(text,0,0).click().key_down(Keys.SHIFT).move_to_element_with_offset(text,100,0).click().key_up(Keys.SHIFT).perform()
    time.sleep(0.1)
    ActionChains(driver).key_down(get_control_key()).send_keys('c').key_up(get_control_key()).perform()
    time.sleep(0.1)

    # Go pack to the page
    driver.get(app_popup_page)
    time.sleep(0.1)

    assert "hide-div" not in driver.find_element_by_id("empty-div").get_attribute("class")

def test_toggle_off3():
    """
        Function:
            test_toggle_off
        Description:
            Test that the toggle disables the extension.
    """
    driver = get_driver()

    # Turn the extension off
    toggle_button = driver.find_element_by_id("toggle-button")
    # toggle_button.click()

    # Navigate to a page and copy text
    driver.get(f"file://{os.path.dirname(__file__)}/testpage.html")
    text = driver.find_element_by_id("text1")
    ActionChains(driver).move_to_element_with_offset(text,0,0).click().key_down(Keys.SHIFT).move_to_element_with_offset(text,30,100).click().key_up(Keys.SHIFT).perform()
    ActionChains(driver).key_down(Keys.COMMAND).send_keys('c').key_up(Keys.COMMAND).perform()
    time.sleep(5)

    # Go pack to the page
    driver.get(app_popup_page)
    time.sleep(1)

    toggle_icon = driver.find_element_by_class_name("delete")
    toggle_icon.click()
    time.sleep(1)

    ActionChains(driver).send_keys('HELLO ').perform()
    time.sleep(2)

    ActionChains(driver).move_by_offset(0,0).click().perform()
    time.sleep(5)


def test_toggle_off4():
    """
        Function:
            test_toggle_off
        Description:
            Test that the toggle disables the extension.
    """
    driver = get_driver()

    # Turn the extension off
    toggle_button = driver.find_element_by_id("toggle-button")
    # toggle_button.click()

    # Navigate to a page and copy text
    driver.get(f"file://{os.path.dirname(__file__)}/testpage.html")
    text = driver.find_element_by_id("text1")
    ActionChains(driver).move_to_element_with_offset(text,0,0).click().key_down(Keys.SHIFT).move_to_element_with_offset(text,30,100).click().key_up(Keys.SHIFT).perform()
    ActionChains(driver).key_down(Keys.COMMAND).send_keys('c').key_up(Keys.COMMAND).perform()
    time.sleep(5)

    # Go pack to the page
    driver.get(app_popup_page)
    time.sleep(1)

    toggle_icon = driver.find_elements_by_class_name("delete")
    toggle_icon[1].click()
    time.sleep(1)

    ActionChains(driver).move_by_offset(0,0).click().perform()
    time.sleep(5)
    
