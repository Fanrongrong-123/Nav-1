const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x') //拿到这个key
const xObject = JSON.parse(x) //字符串转换为对象

const hashMap = xObject || [
    { logo: 'G', logoType: 'text', url: 'https://github.com/' },
    { logo: 'G', logoType: 'text', url: 'https://gitee.com/' },
    { logo: 'I', logoType: 'text', url: 'https://www.iconfont.cn/' },
    { logo: 'J', logoType: 'text', url: 'https://www.jianshu.com/' },
    { logo: 'C', logoType: 'text', url: 'https://cssgradient.io/' }
]

const removeX = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/, '')
}

const render = () => {
    $siteList.find('li:not(.last)').remove() //移除出.last以外的li
    hashMap.forEach((node, index) => { //node浏览器传的节点
        const $li = $(`<li>
                    <div class="site">
                        <div class="log">${node.logo}</div>
                        <div class="link">${removeX(node.url)}</div>
                        <div class='close'>
                    <svg class="icon">
                        <use xlink:href="#icon-close"></use>
                    </svg>
                    </div>
                        </div>
        </li>`).insertBefore($lastLi)//在lastLi之前插入

        $li.on('click', () => {
            window.open(node.url) //打开一个新页面
        })
        $li.on('click', '.close', (e) => {
            e.stopPropagation() //阻止冒泡（点击close不会影响到整个li)
            console.log(hashMap)
            hashMap.splice(index, 1) //删除下标为index的元素
            render()
        })
    })
}
render()



$('.addButton')
    .on('click', () => {
        let url = window.prompt('请输入网址')
        if (url.indexOf('http') === -1) {
            url = ('https://') + url
        }

        hashMap.push({ //点击时向hashMap里推入一下节点
            logo: removeX(url)[0],
            logoType: 'text',
            url: url
        })
        render()
    })
window.onbeforeunload = () => {
    console.log('页面要关闭了')
    const string = JSON.stringify(hashMap) //对象转换为字符串
    window.localStorage.setItem('x', string) //以x为key,string为value存入localStorage
}


$(document).on('keypress', (e) => {
    console.log(e.key)
    const { key } = e  //const key = e.key
    for (let i = 0; i < hashMap.length; i++) {
        if (hashMap[i].logo.toLowerCase() === key) { //将logo转化为小写再比较
            window.open(hashMap[i].url)
        }
    }
})