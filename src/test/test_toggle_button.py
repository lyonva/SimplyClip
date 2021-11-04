# From https://stackoverflow.com/questions/25827160/importing-correctly-with-pytest
# Change current working directory so test case can find the source files
import sys, os
os.chdir(os.path.dirname(__file__))
# sys.path.append(os.path.realpath(os.path.dirname(__file__)+"/src/test"))

from utils_test import get_driver
import time

def test_button_icon():
    """
        Function:
            test_button_icon
        Description:
            Test that the toggle icon changes after a click.
        Input:
            None
        Output:
            driver - A driver object
    """
    print( sys.path )
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

def test_toggle_off():
    pass
