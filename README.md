# 轮播组件

## 概述

特点如下：
1. 支持ES6, CMD, AMD 写法。
2. 支持jquery plugin 插件调用方式。
3. 如果引入了 lazyelem 模块，则轮播图片会走懒加载的形式。

## api


### html DOM 推荐结构

``` html
<!-- css 样式需要使用者自己控制 -->
<div class="banner-wrapper">
    <div class="banner">
        <ul>
        <!-- todo:  -->
            <li></li>
            <li></li>
        </ul>
    </div>
    <!-- pre 按钮，可以通过自定义 class改变样式 -->
    <a href="javascript:;" class="btn btn-left"></a>
    <!-- next 按钮，可以通过自定义 class改变样式 -->
    <a href="javascript:;" class="btn btn-right"></a>
    <!-- 插件自己会生产，样式需要使用者自定义 -->
    <div class="banner-nav-wrapper">
        <!-- 插件自动生产代码 ，不需要使用者额外写-->
        <div class="banner-nav">
            <a href="javascript:;" class="page-item">1</a>
            <a href="javascript:;" class="page-item">2</a>
            <a href="javascript:;" class="page-item">3</a>
            <a href="javascript:;" class="page-item">4</a>
            <a href="javascript:;" class="page-item">5</a>
            <a href="javascript:;" class="page-item">6</a>
            <a href="javascript:;" class="page-item">7</a>
            <a href="javascript:;" class="page-item current">8</a>
        </div>
    </div>
</div
```

### ES6
```
new Slide(elemnent, [options])
```

```
import Slide from 'web-slide';

var slide = new Slide('.banner',{
     event: "click",  //
     mouseOverDelay: 0, //
     auto: true, //
     delay: 5000, //
     duration: 500, //
     showLabel: true, //
     onchange: function(c) {}, //
     onchangestart: function(c) {}, //
     oninitend: function(c) {} //
})
```


### jquery plugin
```
$(element).slide([options])
```

```
$('.banner').slide({
    mouseOverDelay: 200,
    duration: 500,
    delay: 5000,
    onchange: function (options) {
        console.log('onchange', options);
    },
    onchangestart: function (options) {
        console.log('onchangestart', options);
    },
    oninitend: function (options) {
        console.log('oninitend', options);
    }
});
```


## 参数

|名称	|类型	|默认值	|描述
|:------|:------|:------|:------
|event	|string	|"click"	| 如果 mouseOverDelay不设置，或者为 0 的情况下，表示 slide-nav 的响应事件，默认是 ‘click’类型。支持类型有 hover,click
|mouseOverDelay	|number	|0	| 如果设置了，且不为0 ，则slide-nav 的响应事件变为 hover,表示延迟处理时间，单位 ms
|auto	|boolean	| true	| 是否自动轮播
|delay	|number	| 5000	| 轮播切换图片间隔时间
|duration	|number	|500	| 图片 渐入检出的时间
|showLabel	|boolean	| true	| 是否显示 slide-nav 栏
|onchange	|function	| null	| 切换轮播图片完之后触发, 返回值： 切换到的图片的index值。
|onchangestart	|function	| null	| 切换轮播图片前触发，返回值： 即将切换到的图片的index值。（同onchange 函数的返回值）
|oninitend	|function	| null	| slide 初始化结束响应函数，返回值： $container 对象


## 方法


### ES6 方法
```
// 新建一个 slide 对象
var slide = new Slide();
```

```
// 切换到上一帧，如果从第一帧触发的，则到最后一帧。
slide.prev();
```

```
// 切换到下一帧，如果从最后一帧触发的，则到第一帧。
slide.next();
```

```
// 切换到指定帧，index 从 0 开始。
slide.to(index);
```

```
// 开始轮播
slide.autoStart();
```

```
// 暂停轮播
slide.autoPause();
```


### jquery plugin


```
$('.banner').slide({
})
```

```
// 同 slide.prev() 方法
$('.banner').slide('prev');
```

```
// 同 slide.next() 方法
$('.banner').slide('next');
```

```
// 同slide.to(index) 方法
$('.banner').slide(3);
```

```
// 同 slide.autoPause()方法
$('.banner').slide('autoPause');
```

```
// 同 slide.autoStart() 方法
$('.banner').slide('autoStart');
```


