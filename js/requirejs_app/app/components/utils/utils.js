/**
 * Created by Ivan Zmerzlyi on 28.04.2015.
 */
define(function () {
    return {
        newGUID: function () {
            var S4 = function () {
                return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
            };
            return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
        }
    }
});