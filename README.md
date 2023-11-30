# aoc-2023

Šogad būs labāk...

```bash
bun install
```

Lai palaistu jābūt konkrētās dienas folderī, jo man slinkums input faila ceļu pareizi dabūt

Skripts ko aizņēmos no https://github.com/Diamondtroller

```bash
#!/bin/zsh

day=$(date -u +%-d)
if [ ! -d $day ]
then
    cd src
    mkdir $day
    cd $day
    wget -O input.txt -U "Custom shell script by [epasts]" --no-cookies --header "Cookie: session=[cepums]" https://adventofcode.com/2023/day/$day/input
    cp ../00/template.ts a.ts
    cp ../00/template.ts b.ts
    touch test.txt
else
    echo "Folderis jau eksistē :("
fi
$SHELL # atver child procesā čaulu, lai nav cd jālaiž
```
