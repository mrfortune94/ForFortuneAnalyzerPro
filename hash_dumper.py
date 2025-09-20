
import os

with open('/etc/passwd', 'r') as f:
    for line in f:
        print('[DUMP]', line.strip())
