import math

colors = []
rs = []
gs = []
bs = []

count = 0
for i in range(2022, 2023):
    for j in range(0, 12):
        for k in range(1, 32):
            for l in range(0, 7):
                r = i - 2000 << 6 * 3 | j << 6 * 2 | k << 6 * 1 | l
                g = j << 6 * 3 | k << 6 * 2 | l << 6 * 1 | i - 2000
                b = i << 6 * 3 | l << 6 * 2 | j - 2000 << 6 * 1 | k
                count += 1
                if r not in rs and r not in gs and r not in bs:
                    rs.append(r)
                if g not in gs and g not in gs and g not in bs:
                    gs.append(g)
                if b not in bs and b not in gs and b not in bs:
                    bs.append(b)

print(count)
print(len(rs))
print(len(gs))
print(len(bs))
