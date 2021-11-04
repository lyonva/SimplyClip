# From https://stackoverflow.com/questions/25827160/importing-correctly-with-pytest
# Change current working directory so test case can find the source files
import sys, os
os.chdir(os.path.dirname(__file__))
# sys.path.append(os.path.realpath(os.path.dirname(__file__)+"/src/test"))

from utils_test import get_driver


def test_button_icon():
    print( sys.path )
    driver = get_driver()

    toggle_button = driver.find_element_by_id("toggle-button")
    toggle_icon = driver.find_element_by_id("toggle-button-icon")

    toggle_button.click()


