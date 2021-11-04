import sys, os
# sys.path.append(os.path.realpath(os.path.dirname(__file__)+"/src/test"))

from selenium import webdriver

def get_driver():
    chop = webdriver.ChromeOptions()
    chop.add_extension("./src.crx")


    driver = webdriver.Chrome(chrome_options=chop)
    driver.get('chrome-extension://neoiebfjgggmmibjefmamjbjkajdgcei/popup.html')
    return driver
