---
sidebar_position: 4
---

# 生成器面板

生成器面板是将众多对象按照统一模板自动生成，且支持翻页查看的特殊面板

## 声明

除了常规面板通用的属性外，生成器面板具有一个独立的配置节点  
通过此节点可以声明一个生成器面板

| **节点**        | 接受值    | 描述          |
|---------------|--------|-------------|
| **generator** | Object | 声明生成器面板相关设置 |

## 属性

下列属性均为 `generator` 节点下的

| **节点**       | 接受值        | 描述              |
|--------------|------------|-----------------|
| **source**   | String     | 对象源（默认为 CUSTOM） |
| **elements** | ListObject | 自定义对象源          |
| **filter**   | String     | 过滤脚本（Kether 语句） |
| **sortBy**   | String     | 排序依据（对象的一个 key） |
| **output**   | Icon       | 输出图标模板          |

## 对象源

首先理解生成器的对象，其实质是一个 Map\<String,String\>  键-值  
也可以在配置中体现出来

例如我们需要做一个称号的列表，那么 `称号` 就可以被当作对象来写  
我们给 `称号` 这个对象以 `prefix` 和 `perm` 两个属性，通过自定义对象源来实现

配置如下

```yaml
elements:
  - prefix: '[VIP]'
    perm: group.vip
  - prefix: '[SVIP]'
    perm: group.svip
  - prefix: '[MVP]'
    perm: group.mvp
  - prefix: '[MOD]'
    perm: group.mod
```

除了自定义对象源外，插件针对常规需求也预置了一些 **动态的对象源** 如下

### PLAYER

> Bukkit 服务器在线玩家

| **属性**      |
|-------------|
| name        |
| displayName |
| isSneaking  |
| isSprinting |
| x           |
| y           |
| z           |
| yaw         |
| pitch       |
| address     |

### WORLD

> Bukkit 服务器世界列表

| **属性**        |
|---------------|
| name          |
| uid           |
| environment   |
| seed          |
| minHeight     |
| maxHeight     |
| allowAnimals  |
| allowMonsters |
| difficulty    |
| time          |

### SOUND

> Bukkit 音效名称列表

| **属性**  | **描述** |
|---------|--------|
| name    | 名称     |
| ordinal | 序号     |

### MENU

> Invero 已加载到内存中的菜单对象

| **属性**  | **描述**  |
|---------|---------|
| id      | 标识符     |
| type    | 容器类型    |
| rows    | 容器行数    |
| panels  | 面板数量    |
| virtual | 是否为虚拟容器 |

## 属性调用

在过滤器或输出图标的语境中，支持调用元素的属性  
Kether 语句为
```element <key>```

例如，针对 PLAYER 对象源，需要调用玩家的 IP 地址，则使用 `element address`

## 过滤器

过滤器是一条 Kether 条件表达式，返回否则过滤掉此元素
在此表达式中可以使用 `element` 语句来调用元素的属性

如过滤 `rank` 属性大于 5 的对象，则设置为

```yaml
generator:
  filter: 'check element rank > 5'
```

## 排序依据

排序依据是对象源的一个键名称，  
例如依据玩家的名称进行排序，则设置为

```yaml
generator:
  sortBy: name
```

## 输出图标

输出图标与常规图标写法完全一致，  
只是在该图标语境下可使用 `element` 调用属于对象的属性

例如，针对玩家对象源实现的玩家列表，可以这样设置

```yaml
generator:
  source: player
  output:
    head: '{{element name}}'
    name: '{{element name}}'
    action: |-
      msg "You clicked {{element name}}"
```

## 生成池

生成器面板允许使用 `layout` 和 `icons` 节点来设置默认静态图标  
未被默认图标占用的槽位即是生成池，对象源会在其上顺序排列  

## 示例

### 声音列表

> 以下是由 YAML 单文件编写的一个自动生成多页，可过滤 & 排序的音效预览示例

![](/post/example_sounds.gif)

- https://github.com/iiabc/Invero/blob/main/src/main/resources/default/generator_sounds.yml

### tpa选人菜单

> 一个可以列出服务器所有在线玩家，可以请求传送的 tpa 案例

![](https://img.fastmirror.net/s/2024/08/21/66c50f9137702.png)

- https://www.minebbs.com/resources/.9240

### 签到菜单

> 仿 LiteSignin 插件的签到，有最基本的签到和补签功能

![](https://img.fastmirror.net/s/2024/08/20/66c4779828bc6.png)

- https://www.minebbs.com/resources/.9237
