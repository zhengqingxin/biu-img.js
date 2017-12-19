const anime = require('animejs')
require('./style.css');

class BiuImg {
  constructor(options = {}) {
    this.containerStyle = options.containerStyle;
    this.queue = options.queue;
    this.duration = options.duration;
    this.imgStyle = options.imgStyle;
    this.multi = options.multi || false;
    // 记录最后一个图片，为了解决图片重叠的问题
    this.lastImg = null;
    this.init();
  }

  init() {
    this.container = document.createElement('div');
    this.container.className = 'biu-img-container';
    Object.assign(this.container.style, this.containerStyle);
    document.body.appendChild(this.container);
  }

  push(key) {
    const item = this.queue.filter(q => q.key == key)[0];
    if (!item) return;
    const img = document.createElement('img');
    img.className = 'biu-img-item';
    // 判断上一个 img 的右边在不在屏幕上
    let left;
    if (this.lastImg) {
      const bcr = this.lastImg.getBoundingClientRect();
      // 保证屏幕上只有一个图      
      if(!this.multi && bcr.left > 0){
        return;
      }
      const rightBorderPos = bcr.left + bcr.width;
      const windowWidth = window.innerWidth;
      if (rightBorderPos > windowWidth) {
        left =  (rightBorderPos + 20) + 'px';
      }
    }

    Object.assign(img.style, this.imgStyle,{left});
    img.src = item.src;
    this.container.appendChild(img);

    img.onload = ()=>{
      this.lastImg = img;
      // use css animation
      img.className += ' go';
      
      
      // const imgBcr = img.getBoundingClientRect();
      // let width = imgBcr.right - imgBcr.left;
      // const duration = this.duration;

      // anime({
      //   targets: img,
      //   left: -width,
      //   duration: this.duration,
      //   easing: 'linear',
      //   complete: () => {
      //     this.container.removeChild(img)
      //   }
      // })
    }
  
    
   
  }

}

module.exports = BiuImg;