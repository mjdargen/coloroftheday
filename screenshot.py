import os
from pydrive2.auth import GoogleAuth
from pydrive2.drive import GoogleDrive
from time import sleep
from selenium import webdriver
from selenium.webdriver.chrome.options import Options


def screenshot():
    chrome_options = Options()
    chrome_options.add_argument('--no-sandbox')
    chrome_options.add_argument('--disable-dev-shm-usage')
    chrome_options.add_argument("--window-size=1080,1920")

    driver = webdriver.Chrome(options=chrome_options)
    driver.get("https://dargen.io/coloroftheday/")

    sleep(5)

    driver.get_screenshot_as_file("screenshot.png")
    driver.quit()
    print("end...")


def upload_file(filename):

    gauth = GoogleAuth()
    # try to load saved client credentials
    # this is specific to computer/user account
    gauth.LoadCredentialsFile("mycreds.txt")
    if gauth.credentials is None:
        # authenticate if they're not there
        gauth.LocalWebserverAuth()
    elif gauth.access_token_expired:
        # refresh them if expired
        gauth.Refresh()
    else:
        # initialize the saved creds
        gauth.Authorize()
    # save the current credentials to a file
    gauth.SaveCredentialsFile("mycreds.txt")

    drive = GoogleDrive(gauth)

    # color Videos: Folder ID = 1wulI7KwCBDHFK0KZf1t-oFbUDFk64Ixt
    myfile = drive.CreateFile(
        {'parents': [{'id': '1wulI7KwCBDHFK0KZf1t-oFbUDFk64Ixt'}]})
    # https://drive.google.com/file/d/1G6wCgf5ymdlub2O23CXapHEIevhnDsag/view?usp=sharing
    update_file = drive.CreateFile({'id': '1G6wCgf5ymdlub2O23CXapHEIevhnDsag'})
    update_file.SetContentFile(filename)
    update_file.Upload()
    print("File uploaded!")


screenshot()
upload_file("screenshot.png")
