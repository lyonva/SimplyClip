# From https://stackoverflow.com/questions/25827160/importing-correctly-with-pytest
# Change current working directory so test case can find the source files
import sys, os

os.chdir(os.path.dirname(__file__))
# sys.path.append(os.path.realpath(os.path.dirname(__file__)+"/src/test"))

from utils_test import get_driver
import time


def test_theme_button():
    print(sys.path)
    driver = get_driver()

    toggle_button = driver.find_element_by_class_name("switch")
    theme = driver.find_element_by_id("theme")

    current_theme = str(theme.get_attribute("href")).split("/")
    current_theme = current_theme[-1]
    assert current_theme == "light.css"

    for i in range(10):
        toggle_button.click()
        current_theme = str(theme.get_attribute("href")).split("/")
        current_theme = current_theme[-1]
        time.sleep(0.2)
        assert current_theme == "dark.css"

        toggle_button.click()
        current_theme = str(theme.get_attribute("href")).split("/")
        current_theme = current_theme[-1]
        time.sleep(0.2)
        assert current_theme == "light.css"
