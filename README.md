# performance polyfill
This project support performance for unsupport browsers. I made feature based [performance-timeline v2](http://www.w3.org/TR/performance-timeline-2/) and [user-timing](http://www.w3.org/TR/user-timing/) specification. I refer to [some blink code](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/core/timing/) that being exception message and variable name.

## Support features
- **now** : This method returns a `DOMHighResTimeStamp`, measured in milliseconds. [[link](http://www.w3.org/TR/hr-time/#dom-performance-now)]
- **mark** : This method stores a timestamp with the associated name (a "mark"). [[link](http://www.w3.org/TR/user-timing/#dom-performance-mark)]
- **clearMarks** : Removes marks and their associated time values. [[link](http://www.w3.org/TR/user-timing/#dom-performance-clearmarks)]
- **measure** : This method stores the `DOMHighResTimeStamp` duration between two marks along with the associated name (a "measure"). [[link](http://www.w3.org/TR/user-timing/#dom-performance-measure)]
- **clearMeasures** : Removes measures and their associated time values. [[link](http://www.w3.org/TR/user-timing/#dom-performance-clearmeasures)]
- **getEntries** : This method returns a `PerformanceEntryList` object that contains a list of `PerformanceEntry` objects. [[link](http://www.w3.org/TR/performance-timeline-2/#dom-performance-getentries)]
- **getEntriesByName** : This method returns a `PerformanceEntryList` object returned by `getEntries({'name': name})` if optional entryType is omitted, and `getEntries({'name': name, 'entryType': type})` otherwise. [[link](http://www.w3.org/TR/performance-timeline-2/#dom-performance-getentriesbyname)]
- **getEntriesByType** : The method returns a `PerformanceEntryList` object returned by `getEntries({'entryType': type})`. [[link](http://www.w3.org/TR/performance-timeline-2/#dom-performance-getentriesbytype)]

## Usage

### download
```html
<script src="https://github.com/micro-perf/performance-polyfill/blob/master/perf.js"></script>
```
### bower
**not support yet. But I will register to bower soon.**
```
bower install perf-polyfill
```
### build
```
git clone https://github.com/micro-perf/performance-polyfill.git
cd performance-polyfill
grunt
```

## Licence

```
The MIT License (MIT)

Copyright (c) 2015 YongWoo Jeon

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```
