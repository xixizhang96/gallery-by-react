require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react'; //webpack会优先看看你在没在resolve.alias里定没有定义react，如果没有，就在node_modules里找
import ReactDOM from 'react-dom';

// let yeomanImage = require('../images/yeoman.png');

//获取图片相关的数据
let imageDatas = require('../data/imageDatas.json');

//利用自执行函数，将图片名信息转成图片URL路径信息
// imageDatas = (function genImageURL(imageDatasArr) {
//   for (var i = 0, j = imageDatasArr.length; i < j; i++) {
//     var singleImageData = imageDatasArr[i];
//     singleImageData.imageURL = require('../images/' + singleImageData.fileName);

//     imageDatasArr[i] = singleImageData;
//   }
//   return imageDatasArr;
// })(imageDatas);
imageDatas = ((imageDatasArr) => {
  for (let i = 0, j = imageDatasArr.length; i < j; i++) {
    let singleImageData = imageDatasArr[i];
    singleImageData.imageURL = require('../images/' + singleImageData.fileName);
    imageDatasArr[i] = singleImageData;
  }
  return imageDatasArr;
})(imageDatas);

/* 
 * 获取区间内的一个随机数
 */
// function getRangeRandom(low, high) {
//   return Math.ceil(Math.random() * (high - low) + low);
// }
//ES6 写法
let getRangeRandom = (low, high) => Math.floor(Math.random() * (high - low) + low);


//单个图片组件
class ImgFigure extends React.Component {
  render() {

    var styleObj = {};

    //如果props属性中指定了这张图片的位置，则使用
    if (this.props.arrange.pos) {
      styleObj = this.props.arrange.pos;
    }

    return (
      <figure className="img-figure">
        <img src={this.props.data.imageURL}
             alt={this.props.data.title}/>
        <figcaption>
          <h2 className="img-title">{this.props.data.title}</h2>
        </figcaption>
      </figure>
    );
  }
};


class AppComponent extends React.Component {
  //设置常量Constant,存储图片排列的可取值范围，并设置初始值
  Constant: {
    centerPos: {
      left: 0,
      right: 0,
    },
    hPosRange: { //水平方向的取值范围
      leftSecX: [0, 0],
      rightSecX: [0, 0],
      y: [0, 0]
    },
    vPosRange: { //垂直方向的取值范围
      x: [0, 0],
      topY: [0, 0]
    }
  }

  /*
   *封装一个函数rearrange，重新布局图片的位置
   @param centerIndex -- 指定居中排布那个图片
   */
  // rearrange(centerIndex) {
  //   let imgsArrangeArr = this.state.imgsArrangeArr, //拿到变量，方便后面去到他们的值
  //     Constant = this.Constant,
  //     centerPos = Constant.centerPos,
  //     hPosRange = Constant.hPosRange,
  //     vPosRange = Constant.vPosRange,
  //     hPosRangeLeftSecX = hPosRange.leftSecX,
  //     hPosRangerightSecX = hPosRange.rightSecX,
  //     hPosRangeY = hPosRange.y,
  //     vPosRangeTopY = vPosRange.topY,
  //     vPosRangeX = vPosRange.x,

  //     imgsArrangeTopArr = [], // 用来存储分布在上片区域的图片的状态信息；会从整个图片数组中取0个或者1个放到上侧区域
  //     topImgNum = Math.ceil(Math.random() * 2), //取一个或者不取（让他随机，因为上侧区域可以没有图片）
  //     topImgSpliceIndex = 0, //标记上侧区域的这个图片是从数组对象中的哪个位置拿出来的,先赋值为0
  //     //把最中间的图片给他做一个居中;就是从centerIndex剔除掉一个,拿到的就是centerIndex这个位置表现的图片信息，也就是中心图片的信息
  //     imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1);

  //   //首先居中 centerIndex 的图片
  //   imgsArrangeCenterArr[0].pos = centerPos;

  //   //取出要布局上侧的图片的状态信息
  //   topImgSpliceIndex = Math.ceil(Math.random() * (imgsArrangeArr.length - topImgNum));
  //   imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);

  //   //布局位于上侧的图片
  //   imgsArrangeTopArr.forEach(function(value, index) {
  //     imgsArrangeTopArr[index].pos = {
  //       top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
  //       left: getRangeRandom(vPosRangeX[0], vPosRangeX[1])
  //     };
  //   });

  //   //布局左右两侧的图片
  //   for (var i = 0, j = imgsArrangeArr.length, k = j / 2; i < j; i++) {
  //     var hPosRangeLORX = null; //(left or right决定是左边还是右边)

  //     //前半部分布局左边，右半部分布局右边
  //     if (i < k) {
  //       hPosRangeLORX = hPosRangeLeftSecX; //布局在左边
  //     } else {
  //       hPosRangeLORX = hPosRangeRightSecX; //布局在右边
  //     }

  //     imgsArrangeArr[i].pos = {
  //       top: getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
  //       left: getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
  //     };
  //   }

  //   if (imgsArrangeTopArr && imgsArrangeTopArr[0]) {
  //     imgsArrangeArr.splice(topImgSpliceIndex, 0, imgsArrangeTopArr[0]);
  //   }

  //   imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);

  //   this.setState({ //触发重新渲染
  //     imgsArrangeArr: imgsArrangeArr
  //   });

  // }

  // // getInitialState() { //声明一个数组对象，把图片的状态存储到这里;
  // //   /*
  // //    *但是React在ES6中去掉了getInitialState()这个hook函数,规定state在constructor中实现
  // //    */
  // //   return {
  // //     imgsArrangeArr: [
  // //       // {
  // //       //   pos: {
  // //       //     left: '0',
  // //       //     top: '0'
  // //       //   }
  // //       // }
  // //     ]
  // //   };
  // // }
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     imgsArrangeArr: [
  //       // {
  //       //   pos: {
  //       //     left: '0',
  //       //     top: '0'
  //       //   }
  //       // }
  //     ]
  //   };
  // }

  // //(函数回调)组件加载以后，为每张图片计算其位置的范围
  // componentDidMount() {

  //   //首先拿到舞台的大小
  //   let stageDOM = ReactDOM.findDOMNode(this.refs.stage),
  //     stageW = stageDOM.scrollWidth,
  //     stageH = stageDOM.scrollHeight,

  //     halfStageW = Math.ceil(stageW / 2), //取到舞台宽度的一半，并取整
  //     halfStageH = Math.ceil(stageH / 2);

  //   //拿到一个imageFigure的大小
  //   let imgFigureDOM = ReactDOM.findDOMNode(this.refs.imgFigure0), //取索引值为0的图片的大小，因为所有的img都是一样的
  //     imgW = imgFigureDOM.scrollWidth,
  //     imgH = imgFigureDOM.scrollHeight,
  //     halfImgW = Math.ceil(imgW / 2),
  //     halfImgH = Math.ceil(imgH / 2);

  //   //计算中心图片的位置点
  //   this.Constant.centerPos = {
  //     left: halfStageW - halfImgW, //(舞台宽度的一半 - 图片宽度的一半)
  //     top: halfStageH - halfImgH //(舞台高度的一半 - 图片高度的一半)
  //   };

  //   //水平方向的取值范围:
  //   //计算左侧,右侧区域图片排布的取值范围
  //   this.Constant.hPosRange.leftSecX[0] = -halfImgW; //左侧区域的left最小值是(0 - 图片宽度的一半) 
  //   //左侧区域的left最大值是(舞台宽度的一半 - 图片宽度一半 * 3)
  //   this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;
  //   //右侧区域的right最小值是(舞台宽度的一半 + 图片宽度的一半) 
  //   this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
  //   //右侧区域的right最大值是(舞台宽度 - 图片宽度一半)
  //   this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;
  //   //y轴的取值范围
  //   this.Constant.hPosRange.y[0] = -halfImgH; //y轴最小值是(0 - 图片高度的一半)
  //   this.Constant.hPosRange.y[1] = stageH - halfImgH; //y轴最大值是(舞台的高度 - 图片高度的一半)

  //   //垂直方向的取值范围:
  //   //计算上侧区域图片排布的取值范围
  //   this.Constant.vPosRange.topY[0] = -halfImgH; //上侧区域的y点最小值是(0 - 图片高度的一半)
  //   //上侧区域的y点最大值是(舞台高度的一半 - 图片高度一半 * 3)
  //   this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;
  //   //x轴的取值范围
  //   this.Constant.vPosRange.x[0] = halfStageW - imgW; //x轴最小值是(舞台宽度的一半 - 图片的宽度)
  //   this.Constant.vPosRange.x[1] = halfStageW //x轴最大值是(舞台的宽度)

  //   this.rearrange(0); //调用rearrange函数，指定图片数组中的第一张图片居中
  // }

  render() {

    var controllerUnits = [],
      imgFigures = [];

    // imageDatas.forEach(function(value) {   
    //ES6语法里，因为imageDatas并不是数组，而是对象。所以不能用Array原生方法forEach，可以向上面注释的那段代码那样用，也可以用for in和for of
    // for (var chr of "xx") {
    //   console.log(chr);
    // }

    // var myArray = [1, 2, 3, 4];
    // myArray.forEach(function(value) {
    //   console.log(value);
    // });

    Array.prototype.forEach.call(imageDatas, (value, index)  =>  {   //index -- 为每张图片添加一个索引值       
      if (!this.state.imgsArrangeArr[index]) { //如果当前没有这个状态对象，那么就去初始化他
        this.state.imgsArrangeArr[index] = {
          pos: { //把它们都定位到左上角
            left: 0,
            top: 0
          }
        };
      } 
      imgFigures.push(<ImgFigure data={value} ref={'imgFigure' + index} arrange={this.state.imgsArrangeArr[index]} />);    
    });
    //给当前函数绑定bind方法，把React.Component传递到这里面；让其可以直接调用this

    return (
      //为主舞台添加一个ref属性，用this.refs就可以索引到这个属性的值
      <section className="stage" ref="stage">  
        <section className="img-sec">
          {imgFigures}
        </section> 
        <nav className="controller-nav">
          {controllerUnits}
        </nav>    
      </section >
    );
  }
}

AppComponent.defaultProps = {};

export default AppComponent;