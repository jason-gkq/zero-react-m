import React from 'react';
const defaultStyle = {
    backgroundColor: 'white',
    height: 45,
    width: '100%'
}
/* 上下留白的间距 */
export default ({height, style, className, children}) => <div style={{height: height, ...defaultStyle, ...style}} className={className}>{children}</div>
