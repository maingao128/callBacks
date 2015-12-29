# callBacks
仿写的callBacks 对象
jQuery callBack对象的思想就是：
有一个list数组，通过add()添加方法到数组进行缓存
然后通过fire再把list数组里面的方法一个一个调用，
其中还有三个参数，重要的两个是：memory和once
memory作用于add，只要有memory，add的时候自动调用fire
once作用于fire，只有第一次进入fire，之后不进入
