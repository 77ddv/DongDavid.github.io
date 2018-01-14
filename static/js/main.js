var _h = document.body.clientHeight;
var _ch = document.getElementById('container').clientHeight;
if (_ch < _h) {
    document.getElementById('container').style.height = _h - 100 + 'px';
}
// if (window.location.pathname === '/' || window.location.pathname === '/archive' || window.location.pathname === '/index') {
//     document.body.setAttribute('class', "ddv-home-body");
// }