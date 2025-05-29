# tree-shaker
Your handy javascript bundle analyzer against tree shaking.

#### Installation
```
npm i -D tree-shaker
```

#### Usage
```
npx tree-shaker --input="./path/to/bundle.js"  --reportDir="./tree-shaker-reports" --min-percentage-threshold=21.37
```

#### Output
```
> npx tree-shaker --input="./path/to/bundle.js"  --reportDir="./tree-shaker-reports"
Your bundle is 82% tree-shakeable.
Open report in `tree-shaker-reports/report-202505291112.log` to see the details.
```
