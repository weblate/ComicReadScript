![页面填充示例](https://cdn.jsdelivr.net/gh/hymbz/ComicReadScript/docs/images/页面填充示例.webp)

<p align="center">
  <a href="https://sleazyfork.org/zh-CN/scripts/374903-comicread"><img src="https://img.shields.io/greasyfork/v/374903"></a>
  <a href="https://sleazyfork.org/zh-CN/scripts/374903-comicread"><img src="https://img.shields.io/greasyfork/dt/374903"></a>
  <a href="https://sleazyfork.org/zh-CN/scripts/374903-comicread/feedback"><img src="https://img.shields.io/greasyfork/rating-count/374903"></a>
  <a href="https://github.com/hymbz/ComicReadScript/issues"><img src="https://img.shields.io/github/issues/hymbz/ComicReadScript"></a>
</p>

## 简介

这是一个因为目前大部分漫画站都不支持双页显示，所以每次遇到 **漫画中的跨页大图被分割成两页** 就很不爽的人为了有更好的漫画阅读体验而写的油猴脚本，为主流漫画站增加了**双页阅读模式**和优化体验的增强功能。

脚本会在网页右下角弹出用于 **进入阅读模式** 的悬浮按钮，其上的快捷按钮用于切换站点增强功能的开启与否，脚本默认开启了**自动进入阅读模式**的功能，也可在这里关闭。脚本没有全局设置，所有修改都只会在当前站点生效保存。~~反正平时也就只上那几个站点~~

对于支持站点以外的网站，脚本也提供了「[简易阅读模式](#简易阅读模式)」，除了得手动跳转上/下一话外，和支持站点的使用体验没有区别。

> 如果喜欢这种阅读模式，也想用来看**本地漫画**的话，欢迎使用「[ComicRead PWA](https://comic-read.pages.dev/)」，只要打开网页拖入本地漫画即可获得完全一致的体验

## 安装

1. 首先需要在浏览器上装好 [Violentmonkey](https://violentmonkey.github.io/)、[Tampermonkey](https://tampermonkey.net/) 之类的油猴扩展
2. 然后通过 GreasyFork 安装脚本：[点我](https://sleazyfork.org/zh-CN/scripts/374903-comicread)

## 阅读模式快捷键

| 操作 | 快捷键 |
| -------- | ------- |
| 翻页 | `滚轮` `空格` `wasd` `方向键` `,.` `PageUp/PageDown` |
| 进入缩放模式 | `鼠标双击` `Alt + 滚轮` |
| 跳到漫画首尾 | `Home` / `End` |
| 切换页面填充 | `/` `m` `z` `鼠标中键` |
| 退出阅读模式 | `Esc` |
| 进入阅读模式 | `v` |

## 页面填充

> **省流：当跨页图被分割成两页且没有正确合并显示时，切换一下开启状态即可**

这个功能会在图片流中增加或删除空白页，以便在双页模式下调节图片左右页位置。

如果你在用双页模式阅读漫画时完全没有违和感，不追求漫画左右页的位置正确，那不需要了解也完全没事。反倒是在了解后可能就会因为意识到违和感的存在，并在阅读少部分漫画时因为不管怎么调整都觉得不对而浑身难受。

但如果你追求接近翻阅实体书的体验、希望了解页面填充功能，并且**不是强迫症敏感体质**，那还是非常推荐点进「[详情](https://github.com/hymbz/ComicReadScript/blob/master/docs/PageFill.md)」了解一下该功能的详情，并知道如何判断页面的左右页位置是否正确。

## 条漫

针对条漫，脚本设置了卷轴模式来阅读，在卷轴模式下可以通过缩放功能`Alt + 滚轮`来调节图片缩放。

脚本会自动通过图片的长宽比来识别当前漫画是否是条漫，并自动开启卷轴模式。但如果汉化组将条漫分割得太多太细的话就只能手动切换了。

## 简易阅读模式

> 通过油猴扩展菜单里脚本下的「使用简易阅读模式」菜单项开启。

用于在支持站点以外的网站阅读漫画。开启后，将把当前网页中显示的所有宽高均大于 500 像素的图片作为图源加载。

如果站点本身不需要翻页，能够在一个页面内显示所有漫画图片一屏到底的话，可以直接使用「简易阅读模式」阅读。

如果需要翻页的话，可以安装：

1. 能够**自动识别**大部分网页的「[东方永页机](https://greasyfork.org/zh-CN/scripts/438684)」
2. 目前已经手动支持了400+图站、漫画网站的「[怠惰輔助&聚图&下载](https://sleazyfork.org/zh-CN/scripts/463305)」
3. 等其他带有自动翻页、聚图功能的脚本

用其他脚本将多页图片聚合到一起作为图源。期间不需要手动操作，脚本会自动触发自动翻页脚本加载到最后一页。

默认会开启「记住当前站点」功能，在之后再次打开站点时自动使用「简易阅读模式」，可通过右下角悬浮按钮上的快捷按钮关闭。

<!-- 为防止在漫画页外的其他页面——比如首页、介绍页等——时也自动进入了阅读模式，脚本会记录漫画页的部分网页特征，之后只有在匹配到特征时才会自动使用「简易阅读模式」。所以在网站改版、更换自动翻页脚本后，脚本就可能识别不到特征而没有自动使用「简易阅读模式」，这时候只要重新手动开启下就行了。 -->

## 翻译

[manga-image-translator](https://github.com/zyddnys/manga-image-translator/blob/main/README_CN.md) 是一个实现了自动翻译并嵌字的项目，本身开源并且有 docker 可以很方便的部署到本地，同时也有即开即用的演示站 [Cotrans](https://cotrans.touhou.ai/) 可供试用。

为方便啃生肉，脚本通过调用其接口实现了一键汉化，并且同时支持本地部署的版本和 Cotrans。在设置中选择好翻译服务器后，就能通过侧边栏中的翻译按钮开启/关闭当前显示页图片的汉化。

但是！Cotrans 是由维护者用爱发电自费维护的，多人同时使用时需要排队等待，等待队列达到上限后再上传新图片会报错，需要过段时间再试，所以还请大家 **注意用量**。

也正因如此，更推荐大家使用本地部署的项目，不抢服务器资源也不需要排队。**一键翻译全部图片**的功能开关只会在使用本地版时可用，脚本的维护重心也是本地版，无法保证 Cotrans 相关 bug 的修复。具体部署方法可参考 [我的笔记](https://github.com/hymbz/ComicReadScript/blob/master/docs/manga-image-translator.md)。

脚本默认本地服务器的 url 是`http://127.0.0.1:5003`，如果部署的 url 与这个不同，请通过自定义 url 功能修改。

Cotrans 也有自己的油猴脚本 —— 「[Cotrans 漫画/图片翻译器](https://greasyfork.org/zh-CN/scripts/437569)」，支持 Pixiv、Twitter、Misskey、Calckey，欢迎有相关需求的人安装。

![翻译功能示例](https://cdn.jsdelivr.net/gh/hymbz/ComicReadScript/docs/images/翻译功能示例.webp)

## 支持网站

部分网站除适配阅读模式外，还添加了一些增强功能，具体可点击跳转查看详情

- [百合会](#百合会)
  - [记录阅读进度](#记录阅读进度)
  - [关闭快捷导航的跳转](#关闭快捷导航的跳转)
  - [固定导航条](#固定导航条)
  - [修正点击页数时的跳转判定](#修正点击页数时的跳转判定)
  - 自动签到
- 百合会新站
- 动漫之家
  - 解锁隐藏漫画
- [ehentai](#ehentai)
  - [nhentai 匹配](#nhentai匹配)
- [nhentai](#nhentai)
  - [彻底屏蔽漫画](#彻底屏蔽漫画)
  - [自动翻页](#自动翻页)

<!-- supportSiteList -->

- PonpomuYuri
- 明日方舟泰拉记事社
- 禁漫天堂
- 拷贝漫画(copymanga)
- 漫画柜(manhuagui)
- 漫画DB(manhuadb)
- 动漫屋(dm5)
- 绅士漫画(wnacg)
- mangabz
- komiic
- kemono
- welovemanga

<!-- supportSiteList -->

## 百合会

除了右下角的悬浮按钮外，将鼠标移动到帖子一楼的顶端也能看到一个新增的「漫画阅读」按钮

![百合会入口](https://cdn.jsdelivr.net/gh/hymbz/ComicReadScript/docs/images/百合会入口.jpg)

### 记录阅读进度

这个功能是用来快速回到帖子上次阅读进度的。开启后，每个帖子后面都会跟着一个跳转至上次阅读位置的TAG，点击即可跳转至上次阅读进度（阅读进度不仅包括了页数也包括了楼层数），后面跟着的数字是上次阅读后新增的回复数。

![百合会记录阅读进度功能](https://cdn.jsdelivr.net/gh/hymbz/ComicReadScript/docs/images/百合会记录阅读进度功能.jpg)

### 关闭快捷导航的跳转

顶部导航条的快捷导航可以方便地在各个板块之间跳转，但默认情况下只能通过鼠标悬浮的方式显示其板块菜单，直接点击的话会跳转至论坛主页，这在平板上很不方便，所以有了这个功能。功能很简单，就是关掉快捷导航的点击跳转，只保留悬浮显示菜单的功能。

### 固定导航条

快捷导航的跳转是很方便，但每次跳转都要把网页滚到顶部去就有点麻烦了。开启这个功能可以将顶部的导航条固定住，不管怎么滚动都始终保持在页面顶部。

### 修正点击页数时的跳转判定

明明在板块顶部有个“新窗”的选项来选择帖子的默认打开位置，但即使勾上了新窗，通过点击帖子后面的页数打开的页面还是会在当前页打开。开启这个功能可以补上这个缺漏。

## ehentai

![ehentai例图](https://cdn.jsdelivr.net/gh/hymbz/ComicReadScript/docs/images/ehentai例图.png)

除悬浮按钮外，也会在右侧边栏会增加一个「Load comic」按钮，功能和悬浮按钮一样。

### nhentai匹配

根据漫画标题匹配 nhentai 的本子，结果会以标签的形式显示在标签栏中，标签内容为 nhentai 上的漫画 ID ，鼠标悬停在标签上可以看到漫画标题。

点击标签后，标签菜单有两个选项：

1. Jump to nhentai：跳转至对应的 nhentai 网页
2. Load comic：直接加载使用 nhentai 的图源。相比 ehentai，nhentai 的资源加载更快，而且不会消耗配额

也可以直接右键标签点击「在新标签页中打开」跳至 nhentai。

> 不过目前因为 nhentai 加了 CloudFlare 的反爬风控，所以大部分情况下该功能会直接失败，需要手动进入一次 nhentai 页面刷新一下缓存才行。体感缓存很快就会失效，但目前也找不到什么好办法

### 快捷键翻页

在漫画列表页和详情页增加通过左右方向键翻页的功能。

## nhentai

除悬浮按钮外，也会在右侧边栏会增加一个「Load comic」按钮，功能和悬浮按钮一样。

### 彻底屏蔽漫画

nhentai 的屏蔽机制是在被屏蔽漫画封面加上一层半透明遮罩，所以对于那些屏蔽范围比较大的人来说，在首页或搜索结果里连续翻上几页都是满屏的被屏蔽漫画完全是家常便饭。开启此功能后，被屏蔽漫画将被彻底屏蔽，不会再出现在首页或搜索结果里了。

### 自动翻页

当网页滚动至底部时将自动在底部加载下一页的内容，加载时底部会有加载条表示正在加载，当加载条停止时表示已到最后页。
如果同时开启了「彻底屏蔽漫画」功能，将自动跳过没有结果的页面。
