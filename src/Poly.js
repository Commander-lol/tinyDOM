/*
* Polyfill from https://gist.github.com/elijahmanor/6452535
*/
if (Element && !Element.prototype.matches) {
    var proto = Element.prototype;
    proto.matches = proto.matchesSelector ||
                    proto.mozMatchesSelector || proto.msMatchesSelector ||
                    proto.oMatchesSelector || proto.webkitMatchesSelector;
}
