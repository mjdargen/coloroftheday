import re

with open('log.txt', 'r') as f:
    contents = f.read().splitlines()

colors = [re.sub(r'.*?rgb', '', c) for c in contents]
colors = [re.findall(r'\d+', c) for c in colors]

unique = []

for color in colors:
    if color not in unique:
        unique.append(color)

# print(unique)
print(len(colors))
print(len(unique))
