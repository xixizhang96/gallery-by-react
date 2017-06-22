require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';

//获取图片相关的数据
let imageDatas = require('json!../data/imageDatas.json');

//利用自执行函数，将图片名信息转成图片URL路径信息
// imageDatas = (function genImageURL(imageDatasArr) {
//   for (var i = 0, j = imageDatasArr.length; i < j; i++) {
//     var singleImageData = imageDatasArr[i];
//     singleImageData.imageURL = require('../images/' + singleImageData.fileName);

//     imageDatasArr[i] = singleImageData;
//   }
//   return imageDatasArr;
// })(imageDatas);
imageDatas = (function genImageURL(imageDatasArr) {
  for (var i = 0, j = imageDatasArr.length; i < j; i++) {
    var singleImageData = imageDatasArr[i];
    singleImageData.imageURL = require('../images/' + singleImageData.fileName);
    imageDatasArr[i] = singleImageData;
  }
  return imageDatasArr;
})(imageDatas);

class ImgFigure extends React.Component {
  render() {
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

    Array.prototype.forEach.call(imageDatas, (value)  =>  {          
      imgFigures.push(<ImgFigure data = {value} />);    
    });

    return (
      <section className="stage">
        <section className="img-sec">
          {imgFigures}
        </section>
        <nav className="controller-nav">
          {controllerUnits}
        </nav> 
      </section>
    );
  }
}

AppComponent.defaultProps = {};

export default AppComponent;