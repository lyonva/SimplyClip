import sys, os
# sys.path.append(os.path.realpath(os.path.dirname(__file__)+"/src/test"))

from selenium import webdriver

app_id = "neoiebfjgggmmibjefmamjbjkajdgcei"
app_popup_page = f'chrome-extension://{app_id}/popup.html'

def get_driver():
    """
        Function:
            get_driver
        Description:
            Instances a new Chrome driver and returns it
        Input:
            None
        Output:
            driver - A driver object
    """
    chop = webdriver.ChromeOptions()
    chop.add_extension("./src.crx")


    driver = webdriver.Chrome(chrome_options=chop)
    driver.get(app_popup_page)
    return driver
